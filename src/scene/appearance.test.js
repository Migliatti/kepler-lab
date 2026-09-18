import { describe, expect, it } from 'vitest'

import { DESTINATION_CATEGORIES } from '../content/categories.js'
import { destinations } from '../content/destinations.js'
import { getAppearanceProfile, getBodyAppearance } from './appearance.js'

describe('appearance profiles', () => {
  it('gives every category in the catalogue a visible profile', () => {
    for (const category of DESTINATION_CATEGORIES) {
      const profile = getAppearanceProfile(category)

      expect(profile.color).toMatch(/^#[0-9a-f]{6}$/i)
      expect(profile.emissive).toMatch(/^#[0-9a-f]{6}$/i)
      expect(profile.opacity).toBeGreaterThan(0)
      expect(profile.opacity).toBeLessThanOrEqual(1)
    }
  })

  it('covers every destination in the catalogue', () => {
    for (const { id, category } of destinations) {
      expect(() => getBodyAppearance(id, category)).not.toThrow()
    }
  })

  it('refuses an unknown category instead of rendering nothing', () => {
    expect(() => getAppearanceProfile('wormhole')).toThrow(/wormhole/)
  })

  it('gives stars, nebulae and the black hole a halo, and planets none', () => {
    expect(getAppearanceProfile('star').halo).toMatchObject({ scale: expect.any(Number) })
    expect(getAppearanceProfile('nebula').halo).not.toBeNull()
    expect(getAppearanceProfile('black-hole').halo).not.toBeNull()
    expect(getAppearanceProfile('planet').halo).toBeNull()
  })

  it('stops rotation and drift under reduced motion, keeping the body visible', () => {
    const nebula = getAppearanceProfile('nebula', { reducedMotion: true })

    expect(nebula.spin).toBe(0)
    expect(nebula.particles.drift).toBe(0)
    expect(nebula.particles.count).toBeGreaterThan(0)
    expect(nebula.opacity).toBe(getAppearanceProfile('nebula').opacity)
    expect(getAppearanceProfile('planet', { reducedMotion: true }).spin).toBe(0)
  })

  it('keeps some motion when reduced motion is off', () => {
    expect(getAppearanceProfile('planet').spin).toBeGreaterThan(0)
    expect(getAppearanceProfile('nebula').particles.drift).toBeGreaterThan(0)
  })

  it('reads Saturn and Uranus rings from the profile, not from the component', () => {
    const saturn = getBodyAppearance('saturn', 'planet')
    const uranus = getBodyAppearance('uranus', 'planet')

    expect(saturn.ring).toMatchObject({ inner: expect.any(Number), outer: expect.any(Number) })
    expect(saturn.ring.outer).toBeGreaterThan(saturn.ring.inner)
    expect(saturn.ring.gap).toHaveLength(2)
    expect(uranus.ring.tilt).toBeGreaterThan(1)
    expect(getBodyAppearance('jupiter', 'planet').ring).toBeNull()
  })

  it('lets a body override its category halo without losing the rest', () => {
    const sun = getBodyAppearance('sun', 'star-system')

    expect(sun.halo.scale).toBeGreaterThan(getAppearanceProfile('star-system').halo.scale)
    expect(sun.color).toBe(getAppearanceProfile('star-system').color)
  })

  it('still silences an overridden body under reduced motion', () => {
    expect(getBodyAppearance('milky-way', 'galactic-region', { reducedMotion: true })).toMatchObject({
      spin: 0,
      particles: { drift: 0 },
    })
  })
})
