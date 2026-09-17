import { describe, expect, it } from 'vitest'

import { SCALE_NOTICE } from './notices.js'

describe('notices', () => {
  it('states explicitly that visual positions and sizes are illustrative', () => {
    expect(SCALE_NOTICE).toMatch(/posições e tamanhos/i)
    expect(SCALE_NOTICE).toMatch(/ilustrativ/i)
  })
})
