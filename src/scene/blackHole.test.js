import { describe, expect, it } from 'vitest'

import { BLACK_HOLE_GEOMETRY, buildDiscBrightness, dopplerBrightness } from './blackHole.js'

describe('black hole', () => {
  it('keeps the shadow inside the photon ring, and the disc outside both', () => {
    const { shadow, photonInner, photonOuter, discInner, discOuter } = BLACK_HOLE_GEOMETRY

    expect(shadow).toBeLessThan(photonInner)
    expect(photonInner).toBeLessThan(photonOuter)
    expect(photonOuter).toBeLessThanOrEqual(discInner)
    expect(discInner).toBeLessThan(discOuter)
  })

  it('brightens the approaching side and dims the receding one', () => {
    expect(dopplerBrightness(-Math.PI / 2)).toBeCloseTo(1)
    expect(dopplerBrightness(Math.PI / 2)).toBeCloseTo(0)
    expect(dopplerBrightness(0)).toBeCloseTo(0.5)
  })

  it('never leaves [0, 1] around the whole disc', () => {
    for (let i = 0; i <= 64; i++) {
      const value = dopplerBrightness((i / 64) * Math.PI * 2)

      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(1)
    }
  })

  it('samples one brightness per segment boundary', () => {
    const brightness = buildDiscBrightness(8)

    expect(brightness).toBeInstanceOf(Float32Array)
    expect(brightness).toHaveLength(9)
    expect(brightness[0]).toBeCloseTo(brightness[8])
  })
})
