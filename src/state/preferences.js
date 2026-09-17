// Preferências locais do visitante. Puro de propósito: sem React, sem DOM e
// sem matchMedia — quem consulta o navegador é o PreferencesProvider, que
// passa o resultado como systemHints.

export const PREFERENCES_STORAGE_KEY = 'kepler-lab:preferences'
export const PREFERENCES_SCHEMA_VERSION = 2

export const TRAVEL_MODES = Object.freeze(['full', 'short', 'instant'])
export const TEXT_SIZES = Object.freeze(['default', 'large'])
export const CONTRAST_MODES = Object.freeze(['default', 'high'])
export const LABEL_MODES = Object.freeze(['none', 'hover', 'always'])

const isBoolean = (value) => value === true || value === false
const isOneOf = (allowed) => (value) => allowed.includes(value)

// Uma entrada por campo: o padrão e o que conta como valor válido. Um campo
// inválido cai no próprio padrão sem contaminar os vizinhos.
const FIELDS = Object.freeze({
  sound: { fallback: false, isValid: isBoolean },
  travel: { fallback: 'full', isValid: isOneOf(TRAVEL_MODES) },
  reducedMotion: { fallback: null, isValid: (value) => value === null || isBoolean(value) },
  textSize: { fallback: 'default', isValid: isOneOf(TEXT_SIZES) },
  contrast: { fallback: 'default', isValid: isOneOf(CONTRAST_MODES) },
  labels: { fallback: 'hover', isValid: isOneOf(LABEL_MODES) },
  hasSeenOnboarding: { fallback: false, isValid: isBoolean },
})

const FIELD_KEYS = Object.freeze(Object.keys(FIELDS))

export function createDefaultPreferences() {
  const preferences = {}
  for (const key of FIELD_KEYS) preferences[key] = FIELDS[key].fallback
  return preferences
}

export const DEFAULT_PREFERENCES = Object.freeze(createDefaultPreferences())

function readField(data, key) {
  const { fallback, isValid } = FIELDS[key]
  const value = data?.[key]
  return isValid(value) ? value : fallback
}

export function parsePreferences(raw) {
  if (typeof raw !== 'string') return createDefaultPreferences()

  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return createDefaultPreferences()
  }

  // A v1 guardava apenas hasSeenOnboarding. Descartá-la faria o onboarding
  // reaparecer para quem já o viu.
  if (data?.version === 1) {
    return { ...createDefaultPreferences(), hasSeenOnboarding: readField(data, 'hasSeenOnboarding') }
  }

  if (data?.version !== PREFERENCES_SCHEMA_VERSION) return createDefaultPreferences()

  const preferences = {}
  for (const key of FIELD_KEYS) preferences[key] = readField(data, key)
  return preferences
}

export function updatePreference(preferences, key, value) {
  const field = FIELDS[key]
  if (!field || !field.isValid(value)) return preferences
  if (preferences[key] === value) return preferences

  return { ...preferences, [key]: value }
}

export function resolveReducedMotion(preferences, systemHints) {
  if (isBoolean(preferences?.reducedMotion)) return preferences.reducedMotion
  return systemHints?.prefersReducedMotion === true
}

const REDUCED_MOTION_CHOICES = Object.freeze({ system: null, on: true, off: false })

export function toReducedMotionChoice(value) {
  if (value === true) return 'on'
  if (value === false) return 'off'
  return 'system'
}

export function fromReducedMotionChoice(choice) {
  return Object.hasOwn(REDUCED_MOTION_CHOICES, choice) ? REDUCED_MOTION_CHOICES[choice] : null
}

export function serializePreferences(preferences) {
  const payload = { version: PREFERENCES_SCHEMA_VERSION }
  for (const key of FIELD_KEYS) payload[key] = readField(preferences, key)
  return JSON.stringify(payload)
}

export function loadPreferences(storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    return parsePreferences(target ? target.getItem(PREFERENCES_STORAGE_KEY) : null)
  } catch {
    return createDefaultPreferences()
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
