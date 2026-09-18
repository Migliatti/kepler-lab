import { describe, expect, it } from 'vitest'

import { destinations } from '../content/destinations.js'
import { getBodySurface, hasBodySurface, SURFACE_IDS } from './bodySurfaces.js'

const HEX = /^#[0-9a-f]{6}$/i

describe('body surfaces', () => {
  it('only claims a surface for bodies that exist in the catalogue', () => {
    const ids = new Set(destinations.map(({ id }) => id))

    for (const id of SURFACE_IDS) expect(ids).toContain(id)
  })

  // A lista cresce na Task 14, com os quatro gigantes gasosos.
  it('gives a surface to every rocky and icy body', () => {
    expect([...SURFACE_IDS].sort()).toEqual([
      'earth', 'europa', 'io', 'mars', 'mercury', 'moon', 'pluto', 'titan', 'venus',
    ])
  })

  it('answers nothing for a body without a surface', () => {
    expect(hasBodySurface('sun')).toBe(false)
    expect(getBodySurface('orion-nebula')).toBeNull()
    expect(getBodySurface('sagittarius-a-star')).toBeNull()
  })

  it('describes every surface with usable colours', () => {
    for (const id of SURFACE_IDS) {
      const surface = getBodySurface(id)

      expect(surface.oceanLow).toMatch(HEX)
      expect(surface.oceanHigh).toMatch(HEX)
      for (const patch of surface.patches ?? []) {
        expect(patch.id).toMatch(/\S/)
        expect(patch.outline.length).toBeGreaterThan(2)
        if (patch.fill !== null) expect(patch.fill).toMatch(HEX)
      }
    }
  })

  it('states the scientific facts the art direction encodes', () => {
    // Vênus não tem relevo visível: é justamente o fato.
    expect(getBodySurface('venus').patches ?? []).toHaveLength(0)
    expect(getBodySurface('venus').atmosphereOpacity).toBeGreaterThan(0.4)

    // Mercúrio e a Lua não têm atmosfera; Mercúrio tem o campo de crateras mais
    // denso do catálogo.
    expect(getBodySurface('mercury').showAtmosphere).toBe(false)
    expect(getBodySurface('moon').showAtmosphere).toBe(false)
    expect(getBodySurface('mercury').craters.length).toBeGreaterThan(10)

    // Marte tem calotas nos dois polos.
    const caps = getBodySurface('mars').patches.filter(({ id }) => id.includes('cap'))
    expect(caps).toHaveLength(2)

    // As fraturas de Europa são só linha, sem preenchimento.
    const fractures = getBodySurface('europa').patches.filter(({ fill }) => fill === null)
    expect(fractures.length).toBeGreaterThan(3)
  })

  it('is deterministic: the same surface every call', () => {
    expect(getBodySurface('mars')).toEqual(getBodySurface('mars'))
  })
})
