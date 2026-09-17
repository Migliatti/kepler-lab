export const PREFERENCES_STORAGE_KEY = 'kepler-lab:preferences'
export const PREFERENCES_SCHEMA_VERSION = 1
export const DEFAULT_PREFERENCES = Object.freeze({ hasSeenOnboarding: false })

const createDefaults = () => ({ ...DEFAULT_PREFERENCES })

export function parsePreferences(raw) {
  if (typeof raw !== 'string') return createDefaults()

  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return createDefaults()
  }

  if (data?.version !== PREFERENCES_SCHEMA_VERSION) return createDefaults()

  return { hasSeenOnboarding: data.hasSeenOnboarding === true }
}

export function serializePreferences(preferences) {
  return JSON.stringify({
    version: PREFERENCES_SCHEMA_VERSION,
    hasSeenOnboarding: preferences.hasSeenOnboarding === true,
  })
}

export function loadPreferences(storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    return parsePreferences(target ? target.getItem(PREFERENCES_STORAGE_KEY) : null)
  } catch {
    return createDefaults()
  }
}

export function savePreferences(preferences, storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    if (!target) return false
    target.setItem(PREFERENCES_STORAGE_KEY, serializePreferences(preferences))
    return true
  } catch {
    return false
  }
}
