import { describe, expect, it } from 'vitest'

import { getBodySurface, SURFACE_IDS } from './bodySurfaces.js'
import { resolveContinents } from './continents.js'

describe('resolveContinents', () => {
  it('only draws procedural blobs for a body that asks for them', () => {
    // Mercúrio, Vênus, Saturno e Urano não têm relevo desenhado: sem isso eles
    // herdavam os continentes verdes da Terra.
    expect(resolveContinents(undefined)).toEqual([])
    expect(resolveContinents([])).toEqual([])
    expect(resolveContinents([{ center: [0, 0, 1], points: 8, baseR: 0.3, jitter: 0.3, seed: 1 }]))
      .toHaveLength(1)
  })

  it('leaves no catalogued body relying on the green fallback', () => {
    for (const id of SURFACE_IDS) {
      expect(resolveContinents(getBodySurface(id).continents)).toEqual([])
    }
  })
})
