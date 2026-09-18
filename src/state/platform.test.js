import { describe, expect, it } from 'vitest'

import { PLATFORMS, readPlatform, showsSceneReadout } from './platform.js'

describe('readPlatform', () => {
  it('reads a coarse pointer as touch and anything else as desktop', () => {
    const media = (matches) => ({ matchMedia: () => ({ matches }) })

    expect(readPlatform(media(true))).toBe(PLATFORMS.touch)
    expect(readPlatform(media(false))).toBe(PLATFORMS.desktop)
  })

  it('falls back to desktop where matchMedia does not exist', () => {
    expect(readPlatform({})).toBe(PLATFORMS.desktop)
    expect(readPlatform(undefined)).toBe(PLATFORMS.desktop)
  })
})

describe('showsSceneReadout', () => {
  it('keeps the readout off touch: em celular a telemetria atrapalha a navegação', () => {
    expect(showsSceneReadout(PLATFORMS.touch)).toBe(false)
    expect(showsSceneReadout(PLATFORMS.desktop)).toBe(true)
  })
})
