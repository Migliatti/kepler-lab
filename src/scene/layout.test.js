import { describe, expect, it } from 'vitest'
import { destinations } from '../content/destinations.js'
import {
  EARTH_CAMERA_POSITION,
  SCALE_NOTICE,
  getCategoryAppearance,
  getSceneDestination,
  getSceneDestinations,
  getVisibleMarkerItems,
} from './layout.js'

describe('scene layout', () => {
  it('gives Earth the illustrative origin and stable camera position', () => {
    expect(getSceneDestination(destinations.find(({ id }) => id === 'earth'))).toMatchObject({
      id: 'earth', position: [0, 0, 0], radius: 1,
    })
    expect(EARTH_CAMERA_POSITION).toEqual([0, 9, 24])
  })

  it('maps every catalogue destination without mutating its scientific content', () => {
    const original = structuredClone(destinations)
    expect(getSceneDestinations(destinations)).toHaveLength(22)
    expect(destinations).toEqual(original)
  })

  it('has one visual presentation for each catalogue id', () => {
    expect(getSceneDestinations(destinations).map(({ id }) => id).sort()).toEqual(
      destinations.map(({ id }) => id).sort(),
    )
  })

  it('provides a visible appearance for every rendered category', () => {
    expect(getCategoryAppearance('planet')).toMatchObject({ color: expect.stringMatching(/^#/) })
    expect(getCategoryAppearance('nebula')).toMatchObject({ transparent: true, opacity: expect.any(Number) })
  })

  it('keeps featured markers discoverable while hiding distant non-featured markers', () => {
    const items = getVisibleMarkerItems([
      { id: 'earth', featured: true, position: [0, 0, 0] },
      { id: 'mercury', featured: false, position: [100, 0, 0] },
    ], [0, 0, 0])

    expect(items.map((item) => item.destination?.id)).toContain('earth')
    expect(items.map((item) => item.destination?.id)).not.toContain('mercury')
  })

  it('clusters nearby non-featured markers but keeps featured markers individual', () => {
    const items = getVisibleMarkerItems([
      { id: 'io', featured: false, position: [10, 0, 0] },
      { id: 'europa', featured: false, position: [12, 0, 0] },
      { id: 'jupiter', featured: true, position: [11, 0, 0] },
    ], [0, 0, 0])

    expect(items).toEqual(expect.arrayContaining([
      expect.objectContaining({ kind: 'cluster', destinations: ['europa', 'io'] }),
      expect.objectContaining({
        kind: 'destination',
        destination: expect.objectContaining({ id: 'jupiter' }),
      }),
    ]))
  })

  it('returns an individual selectable marker for every featured catalogue destination from Earth', () => {
    const ids = getVisibleMarkerItems(getSceneDestinations(destinations), [0, 0, 0])
      .filter(({ kind }) => kind === 'destination')
      .map(({ destination }) => destination.id)

    expect(ids).toEqual(expect.arrayContaining(
      destinations.filter(({ featured }) => featured).map(({ id }) => id),
    ))
  })

  it('states explicitly that visual positions and sizes are illustrative', () => {
    expect(SCALE_NOTICE).toMatch(/posições e tamanhos/i)
    expect(SCALE_NOTICE).toMatch(/ilustrativ/i)
  })
})
