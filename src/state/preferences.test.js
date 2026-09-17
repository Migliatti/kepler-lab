import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  parsePreferences,
  PREFERENCES_STORAGE_KEY,
  savePreferences,
  serializePreferences,
} from './preferences.js'

function createMemoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial))

  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  }
}

const throwingStorage = {
  getItem: () => { throw new Error('blocked') },
  setItem: () => { throw new Error('quota') },
}

describe('preferences', () => {
  it('falls back to defaults when nothing is stored', () => {
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to defaults on corrupted JSON', () => {
    expect(parsePreferences('{not json')).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to defaults when the schema version is missing or different', () => {
    expect(parsePreferences('{"hasSeenOnboarding":true}')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"version":2,"hasSeenOnboarding":true}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('reads only known fields with the expected type', () => {
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":"yes","token":"x"}')).toEqual({
      hasSeenOnboarding: false,
    })
  })

  it('writes the schema version with the preferences', () => {
    expect(JSON.parse(serializePreferences({ hasSeenOnboarding: true }))).toEqual({
      version: 1,
      hasSeenOnboarding: true,
    })
  })

  it('round-trips through storage under the versioned key', () => {
    const storage = createMemoryStorage()

    expect(savePreferences({ hasSeenOnboarding: true }, storage)).toBe(true)
    expect(storage.getItem(PREFERENCES_STORAGE_KEY)).toContain('"version":1')
    expect(loadPreferences(storage)).toEqual({ hasSeenOnboarding: true })
  })

  it('never throws when storage is unavailable or blocked', () => {
    expect(loadPreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(loadPreferences(throwingStorage)).toEqual(DEFAULT_PREFERENCES)
    expect(savePreferences({ hasSeenOnboarding: true }, null)).toBe(false)
    expect(savePreferences({ hasSeenOnboarding: true }, throwingStorage)).toBe(false)
  })

  it('returns a fresh defaults object each time', () => {
    const first = parsePreferences(null)
    first.hasSeenOnboarding = true

    expect(parsePreferences(null)).toEqual({ hasSeenOnboarding: false })
  })
})
