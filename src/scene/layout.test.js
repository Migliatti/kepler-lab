import { describe, expect, it } from 'vitest'
import { destinations } from '../content/destinations.js'
import {
  EARTH_CAMERA_POSITION,
  getCategoryAppearance,
  getSceneDestination,
  getSceneDestinations,
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

  it('provides a visible appearance for every rendered category', () => {
    expect(getCategoryAppearance('planet')).toMatchObject({ color: expect.stringMatching(/^#/) })
    expect(getCategoryAppearance('nebula')).toMatchObject({ transparent: true, opacity: expect.any(Number) })
  })
})
