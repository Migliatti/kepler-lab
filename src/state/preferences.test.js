import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PREFERENCES,
  createDefaultPreferences,
  fromReducedMotionChoice,
  loadPreferences,
  parsePreferences,
  PREFERENCES_STORAGE_KEY,
  resolveReducedMotion,
  savePreferences,
  serializePreferences,
  toReducedMotionChoice,
  updatePreference,
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
  it('defaults every field, following the system for reduced motion', () => {
    expect(createDefaultPreferences()).toEqual({
      sound: false,
      travel: 'full',
      reducedMotion: null,
      textSize: 'default',
      contrast: 'default',
      labels: 'hover',
      hasSeenOnboarding: false,
    })
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to every default on corrupted JSON or an unknown version', () => {
    expect(parsePreferences('{not json')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"version":99,"labels":"always"}')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"labels":"always"}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('migrates v1 keeping hasSeenOnboarding and defaulting the rest', () => {
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":true}')).toEqual({
      ...DEFAULT_PREFERENCES,
      hasSeenOnboarding: true,
    })
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":"yes"}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('drops only the invalid field, keeping the valid ones around it', () => {
    const parsed = parsePreferences(JSON.stringify({
      version: 2,
      sound: true,
      travel: 'warp',
      reducedMotion: true,
      textSize: 'large',
      contrast: 'nope',
      labels: 'always',
      hasSeenOnboarding: true,
      token: 'x',
    }))

    expect(parsed).toEqual({
      sound: true,
      travel: 'full',
      reducedMotion: true,
      textSize: 'large',
      contrast: 'default',
      labels: 'always',
      hasSeenOnboarding: true,
    })
    expect(parsed).not.toHaveProperty('token')
  })

  it('keeps the three reduced-motion states apart', () => {
    expect(parsePreferences('{"version":2,"reducedMotion":null}').reducedMotion).toBeNull()
    expect(parsePreferences('{"version":2,"reducedMotion":false}').reducedMotion).toBe(false)
    expect(parsePreferences('{"version":2,"reducedMotion":"reduce"}').reducedMotion).toBeNull()
  })

  it('resolves reduced motion from the system only while nothing was chosen', () => {
    const untouched = createDefaultPreferences()

    expect(resolveReducedMotion(untouched, { prefersReducedMotion: true })).toBe(true)
    expect(resolveReducedMotion(untouched, { prefersReducedMotion: false })).toBe(false)
    expect(resolveReducedMotion(untouched, undefined)).toBe(false)

    const off = updatePreference(untouched, 'reducedMotion', false)
    expect(resolveReducedMotion(off, { prefersReducedMotion: true })).toBe(false)

    const on = updatePreference(untouched, 'reducedMotion', true)
    expect(resolveReducedMotion(on, { prefersReducedMotion: false })).toBe(true)
  })

  it('maps the reduced-motion tri-state to and from the radio choice', () => {
    expect(toReducedMotionChoice(null)).toBe('system')
    expect(toReducedMotionChoice(true)).toBe('on')
    expect(toReducedMotionChoice(false)).toBe('off')
    expect(fromReducedMotionChoice('system')).toBeNull()
    expect(fromReducedMotionChoice('on')).toBe(true)
    expect(fromReducedMotionChoice('off')).toBe(false)
    expect(fromReducedMotionChoice('whatever')).toBeNull()
  })

  it('updates one key without mutating the previous object', () => {
    const before = createDefaultPreferences()
    const after = updatePreference(before, 'labels', 'always')

    expect(after.labels).toBe('always')
    expect(before.labels).toBe('hover')
    expect(after).not.toBe(before)
  })

  it('ignores an unknown key or an invalid value, returning the same object', () => {
    const before = createDefaultPreferences()

    expect(updatePreference(before, 'token', 'x')).toBe(before)
    expect(updatePreference(before, 'travel', 'warp')).toBe(before)
    expect(updatePreference(before, 'sound', 'yes')).toBe(before)
  })

  it('writes the schema version with every field', () => {
    expect(JSON.parse(serializePreferences({ ...DEFAULT_PREFERENCES, labels: 'always' }))).toEqual({
      version: 2,
      sound: false,
      travel: 'full',
      reducedMotion: null,
      textSize: 'default',
      contrast: 'default',
      labels: 'always',
      hasSeenOnboarding: false,
    })
  })

  it('round-trips through storage under the versioned key', () => {
    const storage = createMemoryStorage()
    const preferences = { ...DEFAULT_PREFERENCES, textSize: 'large', reducedMotion: true }

    expect(savePreferences(preferences, storage)).toBe(true)
    expect(storage.getItem(PREFERENCES_STORAGE_KEY)).toContain('"version":2')
    expect(loadPreferences(storage)).toEqual(preferences)
  })

  it('never throws when storage is unavailable or blocked', () => {
    expect(loadPreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(loadPreferences(throwingStorage)).toEqual(DEFAULT_PREFERENCES)
    expect(savePreferences(DEFAULT_PREFERENCES, null)).toBe(false)
    expect(savePreferences(DEFAULT_PREFERENCES, throwingStorage)).toBe(false)
  })

  it('returns a fresh defaults object each time', () => {
    const first = parsePreferences(null)
    first.hasSeenOnboarding = true

    expect(parsePreferences(null).hasSeenOnboarding).toBe(false)
  })
})
