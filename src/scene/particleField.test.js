import { describe, expect, it } from 'vitest'

import { buildParticleField } from './particleField.js'

describe('particle field', () => {
  it('is deterministic for the same seed', () => {
    const options = { count: 40, spread: 2, shape: 'cloud', seed: 3 }

    expect([...buildParticleField(options).positions])
      .toEqual([...buildParticleField(options).positions])
  })

  it('gives each body its own pattern', () => {
    const cloud = buildParticleField({ count: 40, spread: 2, shape: 'cloud', seed: 3 })
    const other = buildParticleField({ count: 40, spread: 2, shape: 'cloud', seed: 4 })

    expect([...cloud.positions]).not.toEqual([...other.positions])
  })

  it('keeps a cloud inside the requested spread', () => {
    const { positions, count } = buildParticleField({ count: 200, spread: 2.5, shape: 'cloud', seed: 1 })

    for (let i = 0; i < count; i++) {
      const distance = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      expect(distance).toBeLessThanOrEqual(2.5 + 0.001)
    }
  })

  it('flattens a disc: wide across, thin through', () => {
    const { positions, count } = buildParticleField({ count: 300, spread: 3, shape: 'disc', seed: 2 })
    let maxRadial = 0
    let maxHeight = 0

    for (let i = 0; i < count; i++) {
      maxRadial = Math.max(maxRadial, Math.hypot(positions[i * 3], positions[i * 3 + 2]))
      maxHeight = Math.max(maxHeight, Math.abs(positions[i * 3 + 1]))
    }

    expect(maxRadial).toBeGreaterThan(2)
    expect(maxHeight).toBeLessThan(maxRadial / 4)
  })

  it('returns nothing for a body without particles', () => {
    expect(buildParticleField({ count: 0, spread: 1, shape: 'cloud', seed: 1 }).count).toBe(0)
  })
})
