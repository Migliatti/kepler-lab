// Casca React das preferências: carrega, persiste e reflete no <html> o que
// src/state/preferences.js decide. Nenhuma regra mora aqui.

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  loadPreferences,
  resolveReducedMotion,
  savePreferences,
  updatePreference,
} from './preferences.js'

const PreferencesContext = createContext(null)

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function readSystemHints() {
  return {
    prefersReducedMotion: globalThis.matchMedia?.(REDUCED_MOTION_QUERY).matches === true,
  }
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => loadPreferences())
  const [systemHints, setSystemHints] = useState(readSystemHints)
  const reducedMotion = resolveReducedMotion(preferences, systemHints)

  // Quem nunca escolheu segue o sistema; se o sistema mudar com a página
  // aberta, a cena acompanha sem recarregar.
  useEffect(() => {
    const query = globalThis.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!query?.addEventListener) return undefined

    function handleChange(event) {
      setSystemHints({ prefersReducedMotion: event.matches === true })
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  // Tamanho de texto e contraste são apresentação: viram atributo no <html> e
  // o CSS responde. Nenhum componente precisa saber que existem.
  useEffect(() => {
    const root = globalThis.document?.documentElement
    if (!root) return
    root.dataset.textSize = preferences.textSize
    root.dataset.contrast = preferences.contrast
    root.dataset.reducedMotion = reducedMotion ? 'on' : 'off'
  }, [preferences.textSize, preferences.contrast, reducedMotion])

  const value = useMemo(() => ({
    preferences,
    setPreference: (key, nextValue) => {
      setPreferences((current) => updatePreference(current, key, nextValue))
    },
    reducedMotion,
  }), [preferences, reducedMotion])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences precisa de um PreferencesProvider acima')
  return value
}
