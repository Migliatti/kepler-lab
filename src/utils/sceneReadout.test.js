import { describe, expect, it } from 'vitest'

import { destinations } from '../content/destinations.js'
import { SCALE_NOTICE } from '../content/notices.js'
import { buildSceneReadout } from './sceneReadout.js'

const byId = (id) => destinations.find((destination) => destination.id === id)

describe('buildSceneReadout', () => {
  it('shows fixed sky coordinates for a distant object', () => {
    const readout = buildSceneReadout(byId('betelgeuse'))

    expect(readout.name).toBe('Betelgeuse')
    expect(readout.kind).toBe('equatorial')
    expect(readout.entries.map(({ label }) => label)).toEqual([
      'Ascensão reta', 'Declinação', 'Distância da Terra',
    ])
  })

  it('shows orbital data, never a sky position, for a Solar System body', () => {
    const readout = buildSceneReadout(byId('mars'))

    expect(readout.kind).toBe('orbital')
    expect(readout.entries.map(({ label }) => label)).not.toContain('Ascensão reta')
  })

  it('always carries the illustrative scale notice', () => {
    for (const destination of destinations) {
      expect(buildSceneReadout(destination).scaleNotice, destination.id).toBe(SCALE_NOTICE)
    }
  })

  it('returns entries that do not share references with the catalogue', () => {
    const mars = byId('mars')
    const readout = buildSceneReadout(mars)

    expect(readout.entries).toEqual(mars.coordinates.entries)
    expect(readout.entries).not.toBe(mars.coordinates.entries)
    expect(readout.entries[0]).not.toBe(mars.coordinates.entries[0])
  })

  it('warns that the black hole appearance is illustrative, and only there', () => {
    const blackHole = destinations.find(({ id }) => id === 'sagittarius-a-star')
    const earth = destinations.find(({ id }) => id === 'earth')

    expect(buildSceneReadout(blackHole).appearanceNotice).toMatch(/ilustrativ/i)
    expect(buildSceneReadout(earth).appearanceNotice).toBeNull()
  })
})
