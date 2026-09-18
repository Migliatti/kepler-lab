import { describe, expect, it } from 'vitest'

import { createRandom } from './random.js'

describe('seeded random', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = createRandom(7)
    const b = createRandom(7)

    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('gives different sequences for different seeds', () => {
    expect(createRandom(7)()).not.toBe(createRandom(8)())
  })

  it('stays inside [0, 1)', () => {
    const random = createRandom(42)

    for (let i = 0; i < 500; i++) {
      const value = random()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })
})
