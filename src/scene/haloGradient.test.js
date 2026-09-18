import { describe, expect, it } from 'vitest'

import { buildHaloPixels } from './haloGradient.js'

describe('buildHaloPixels', () => {
  it('fades from an opaque centre to transparent edges', () => {
    const size = 64
    const pixels = buildHaloPixels(size)
    const alphaAt = (x, y) => pixels[(y * size + x) * 4 + 3]

    expect(pixels).toHaveLength(size * size * 4)
    expect(alphaAt(32, 32)).toBeGreaterThan(alphaAt(40, 32))
    expect(alphaAt(40, 32)).toBeGreaterThan(alphaAt(50, 32))
    expect(alphaAt(0, 0)).toBe(0)
    expect(alphaAt(63, 32)).toBe(0)
  })
})
