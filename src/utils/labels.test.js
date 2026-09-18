import { describe, expect, it } from 'vitest'

import { LABEL_MODES } from '../state/preferences.js'
import { resolveLabelVisibility } from './labels.js'

describe('label visibility', () => {
  it('draws the name next to every body when labels are always on', () => {
    expect(resolveLabelVisibility('always')).toEqual({ hover: false, scene: true })
  })

  it('keeps the pointer label as the default', () => {
    expect(resolveLabelVisibility('hover')).toEqual({ hover: true, scene: false })
  })

  it('suppresses both when labels are hidden', () => {
    expect(resolveLabelVisibility('none')).toEqual({ hover: false, scene: false })
  })

  it('falls back to the pointer label for anything unknown', () => {
    expect(resolveLabelVisibility(undefined)).toEqual({ hover: true, scene: false })
    expect(resolveLabelVisibility('shout')).toEqual({ hover: true, scene: false })
  })

  it('answers for every mode the schema accepts', () => {
    for (const mode of LABEL_MODES) {
      expect(resolveLabelVisibility(mode)).toMatchObject({
        hover: expect.any(Boolean),
        scene: expect.any(Boolean),
      })
    }
  })
})
