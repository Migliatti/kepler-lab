import { describe, expect, it } from 'vitest'

import { BLACK_HOLE_NOTICE, SCALE_NOTICE } from './notices.js'

describe('notices', () => {
  it('states explicitly that visual positions and sizes are illustrative', () => {
    expect(SCALE_NOTICE).toMatch(/posições e tamanhos/i)
    expect(SCALE_NOTICE).toMatch(/ilustrativ/i)
  })

  it('says the folded accretion disc is an illustrative representation', () => {
    expect(BLACK_HOLE_NOTICE).toMatch(/ilustrativ/i)
    expect(BLACK_HOLE_NOTICE).toMatch(/disco/i)
    expect(BLACK_HOLE_NOTICE).not.toBe(SCALE_NOTICE)
  })
})
