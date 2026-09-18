import { describe, expect, it } from 'vitest'

import { bandStops } from './latitudeBands.js'

const BANDS = [
  { latitude: -90, color: '#111111' },
  { latitude: 0, color: '#222222' },
  { latitude: 90, color: '#333333' },
]

describe('latitude bands', () => {
  it('returns nothing when the body has no bands', () => {
    expect(bandStops(undefined, 0)).toBeNull()
    expect(bandStops([], 0)).toBeNull()
  })

  it('uses the only colour a single band offers', () => {
    expect(bandStops([{ latitude: 0, color: '#abcdef' }], 40))
      .toEqual({ from: '#abcdef', to: '#abcdef', t: 0 })
  })

  it('lands exactly on a stop at its own latitude', () => {
    expect(bandStops(BANDS, 0)).toMatchObject({ from: '#222222', t: 0 })
    expect(bandStops(BANDS, -90)).toMatchObject({ from: '#111111', t: 0 })
  })

  it('blends between the two neighbouring stops', () => {
    expect(bandStops(BANDS, 45)).toEqual({ from: '#222222', to: '#333333', t: 0.5 })
    expect(bandStops(BANDS, -22.5)).toEqual({ from: '#111111', to: '#222222', t: 0.75 })
  })

  it('clamps outside the declared range instead of extrapolating', () => {
    expect(bandStops(BANDS, 200)).toMatchObject({ from: '#333333', t: 0 })
    expect(bandStops(BANDS, -200)).toMatchObject({ from: '#111111', t: 0 })
  })
})
