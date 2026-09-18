import { useEffect, useRef } from 'react'

import { SETTINGS_GROUPS, SETTINGS_TITLE } from '../content/settingsOptions.js'
import { usePreferences } from '../state/PreferencesProvider.jsx'
import { fromReducedMotionChoice, toReducedMotionChoice } from '../state/preferences.js'

const FOCUSABLE = 'button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])'

// O valor que o grupo mostra. reducedMotion é o único que não guarda a própria
// escolha: guarda null/true/false e mostra 'system'/'on'/'off'.
function currentValue(preferences, key) {
  return key === 'reducedMotion' ? toReducedMotionChoice(preferences.reducedMotion) : preferences[key]
}

function nextValue(key, value) {
  return key === 'reducedMotion' ? fromReducedMotionChoice(value) : value
}

export function SettingsPanel({ isOpen, onClose }) {
  const { preferences, setPreference } = usePreferences()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const opener = document.activeElement
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Foco preso: a lista é recalculada a cada Tab porque o painel não muda
      // de tamanho, mas os controles podem ficar desabilitados.
      const focusable = [...(panelRef.current?.querySelectorAll(FOCUSABLE) ?? [])]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Devolver o foco a quem abriu, se ainda estiver na página.
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="settings-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={panelRef}
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header className="settings-panel__header">
          <h2 id="settings-title">{SETTINGS_TITLE}</h2>
          <button type="button" className="settings-panel__close" onClick={onClose}>
            Fechar
          </button>
        </header>

        {SETTINGS_GROUPS.map((group) => (
          <fieldset key={group.key} className="settings-group">
            <legend>{group.legend}</legend>

            {group.control === 'checkbox' ? (
              <label className="settings-option">
                <input
                  type="checkbox"
                  checked={preferences[group.key] === true}
                  onChange={(event) => setPreference(group.key, event.target.checked)}
                />
                <span>{group.label}</span>
              </label>
            ) : (
              group.options.map((option) => (
                <label key={option.value} className="settings-option">
                  <input
                    type="radio"
                    name={`settings-${group.key}`}
                    value={option.value}
                    checked={currentValue(preferences, group.key) === option.value}
                    onChange={() => setPreference(group.key, nextValue(group.key, option.value))}
                  />
                  <span>
                    {option.label}
                    {option.hint && <small>{option.hint}</small>}
                  </span>
                </label>
              ))
            )}

            {group.note && <p className="settings-group__note">{group.note}</p>}
          </fieldset>
        ))}
      </section>
    </div>
  )
}
