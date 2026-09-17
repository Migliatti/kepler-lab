import { describe, expect, it } from 'vitest'

import { destinations } from './destinations.js'
import { deepSkyDestinations } from './destinations/deepSky.js'
import { solarSystemDestinations } from './destinations/solarSystem.js'
import { SOLAR_SYSTEM_IDS } from './regions.js'

const LAUNCH_DESTINATION_IDS = [
  'sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'europa', 'io',
  'saturn', 'titan', 'uranus', 'neptune', 'pluto',
  'alpha-centauri', 'sirius', 'betelgeuse', 'orion-nebula', 'crab-nebula',
  'sagittarius-a-star', 'galactic-center', 'milky-way',
]

describe('launch catalogue', () => {
  it('contains exactly the 22 approved destinations', () => {
    expect(destinations.map(({ id }) => id).sort()).toEqual(
      [...LAUNCH_DESTINATION_IDS].sort(),
    )
  })

  it('validates the stellar and galactic content batch', () => {
    const ids = [
      'alpha-centauri',
      'sirius',
      'betelgeuse',
      'orion-nebula',
      'crab-nebula',
      'galactic-center',
      'milky-way',
    ]
    const batch = destinations.filter(({ id }) => ids.includes(id))

    expect(batch).toHaveLength(ids.length)
  })

  it('keeps every source attributable and secure', () => {
    for (const destination of destinations) {
      expect(destination.sources.length).toBeGreaterThan(0)
      for (const source of destination.sources) {
        expect(source.publisher).not.toHaveLength(0)
        expect(source.url).toMatch(/^https:\/\//)
      }
    }
  })

  it('contains no editorial placeholders', () => {
    const serialized = JSON.stringify(destinations)

    expect(serialized).not.toMatch(/\b(?:TBD|TODO)\b/)
    expect(serialized).not.toMatch(/lorem ipsum/i)
  })

  it('does not repeat a source URL inside one destination', () => {
    for (const destination of destinations) {
      const urls = destination.sources.map(({ url }) => url)

      expect(new Set(urls).size).toBe(urls.length)
    }
  })

  it('keeps the catalogue order stable across the split files', () => {
    expect(destinations.map(({ id }) => id)).toEqual([
      'sun', 'mercury', 'venus', 'moon', 'mars', 'earth', 'jupiter', 'europa', 'io',
      'saturn', 'titan', 'uranus', 'neptune', 'pluto',
      'alpha-centauri', 'sirius', 'betelgeuse', 'orion-nebula', 'crab-nebula',
      'galactic-center', 'milky-way', 'sagittarius-a-star',
    ])
  })

  it('declares exactly the Solar System destinations in SOLAR_SYSTEM_IDS', () => {
    expect(solarSystemDestinations.map(({ id }) => id)).toEqual([...SOLAR_SYSTEM_IDS])
    expect(deepSkyDestinations.some(({ id }) => SOLAR_SYSTEM_IDS.includes(id))).toBe(false)
  })

  it('gives every destination its curiosities', () => {
    for (const destination of destinations) {
      expect(destination.curiosities, destination.id).toBeInstanceOf(Array)
    }
  })

  it('offers a contextualized formula exactly where it teaches something', () => {
    const withFormula = destinations
      .filter(({ physics }) => physics.formula !== undefined)
      .map(({ id }) => id)
      .sort()

    expect(withFormula).toEqual([
      'alpha-centauri', 'betelgeuse', 'crab-nebula', 'earth', 'jupiter',
      'moon', 'sagittarius-a-star', 'saturn', 'sun',
    ])
  })
})
