import { describe, expect, it } from 'vitest'

import {
  CONTRAST_MODES,
  LABEL_MODES,
  TEXT_SIZES,
  TRAVEL_MODES,
} from '../state/preferences.js'
import { SETTINGS_GROUPS, SETTINGS_TITLE } from './settingsOptions.js'

const byKey = (key) => SETTINGS_GROUPS.find((group) => group.key === key)

describe('settings options', () => {
  it('covers every preference the visitor can change', () => {
    expect(SETTINGS_GROUPS.map(({ key }) => key)).toEqual([
      'sound', 'travel', 'reducedMotion', 'textSize', 'contrast', 'labels',
    ])
    expect(SETTINGS_TITLE).toMatch(/configura/i)
  })

  it('offers exactly the values the schema accepts', () => {
    expect(byKey('travel').options.map(({ value }) => value)).toEqual([...TRAVEL_MODES])
    expect(byKey('textSize').options.map(({ value }) => value)).toEqual([...TEXT_SIZES])
    expect(byKey('contrast').options.map(({ value }) => value)).toEqual([...CONTRAST_MODES])
    expect(byKey('labels').options.map(({ value }) => value)).toEqual([...LABEL_MODES])
    expect(byKey('reducedMotion').options.map(({ value }) => value)).toEqual(['system', 'on', 'off'])
  })

  it('marks sound as reserved and says so in Portuguese', () => {
    expect(byKey('sound')).toMatchObject({ control: 'checkbox', reserved: true })
    expect(byKey('sound').note).toMatch(/próxima etapa/i)
  })

  it('labels every control and option in Portuguese', () => {
    for (const group of SETTINGS_GROUPS) {
      expect(group.legend).toMatch(/\S/)
      for (const option of group.options ?? []) {
        expect(option.label).toMatch(/\S/)
        expect(option.label).not.toMatch(/^[a-z-]+$/)
      }
    }
  })

  it('never imports the interface', async () => {
    const source = await import('node:fs/promises')
      .then(({ readFile }) => readFile(new URL('./settingsOptions.js', import.meta.url), 'utf8'))

    expect(source).not.toMatch(/from 'react'/)
    expect(source).not.toMatch(/three/)
  })
})
