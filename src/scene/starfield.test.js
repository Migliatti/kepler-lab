import { describe, expect, it } from 'vitest'

import { buildStarfield, STARFIELD_COUNT, STARFIELD_RADIUS } from './starfield.js'

describe('starfield', () => {
  it('keeps the point budget in a single constant, sized for mobile', () => {
    expect(STARFIELD_COUNT).toBeLessThanOrEqual(2000)
    expect(buildStarfield().count).toBe(STARFIELD_COUNT)
  })

  it('is deterministic across runs', () => {
    expect([...buildStarfield().positions]).toEqual([...buildStarfield().positions])
  })

  it('fills one flat buffer per attribute', () => {
    const field = buildStarfield({ count: 10 })

    expect(field.positions).toBeInstanceOf(Float32Array)
    expect(field.positions).toHaveLength(30)
    expect(field.sizes).toHaveLength(10)
  })

  it('places every star on a shell far beyond the catalogue', () => {
    const { positions, count } = buildStarfield({ count: 200 })

    for (let i = 0; i < count; i++) {
      const distance = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      expect(distance).toBeGreaterThan(STARFIELD_RADIUS * 0.8)
      expect(distance).toBeLessThanOrEqual(STARFIELD_RADIUS + 0.001)
    }
  })

  it('does not always point the same way', () => {
    const { positions } = buildStarfield({ count: 50 })
    const heights = new Set(Array.from({ length: 50 }, (_, i) => positions[i * 3 + 1]))

    expect(heights.size).toBeGreaterThan(40)
  })
})
