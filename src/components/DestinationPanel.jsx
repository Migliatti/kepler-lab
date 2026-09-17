import { useEffect, useRef } from 'react'
import { isFormulaRevealed } from '../state/panel.js'
import { buildDestinationPanel } from '../utils/destinationPanel.js'

function FactList({ facts }) {
  return (
    <dl className="destination-panel__facts">
      {facts.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Formula({ formula, isRevealed, onToggle }) {
  return (
    <div className="formula">
      <button type="button" className="formula__toggle" aria-expanded={isRevealed} onClick={onToggle}>
        {isRevealed ? 'Ocultar fórmula' : 'Mostrar fórmula'}
      </button>
      {isRevealed && (
        <div className="formula__content">
          <p className="formula__expression">{formula.expression}</p>
          <dl className="destination-panel__facts">
            {formula.variables.map(({ symbol, meaning, value }) => (
              <div key={symbol}>
                <dt>{symbol} — {meaning}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>{formula.interpretation}</p>
        </div>
      )}
    </div>
  )
}

function SectionBody({ section, isRevealed, onToggleFormula }) {
  switch (section.id) {
    case 'overview':
      return <p>{section.overview}</p>
    case 'physics':
      return (
        <>
          <p>{section.explanation}</p>
          {section.formula && (
            <Formula formula={section.formula} isRevealed={isRevealed} onToggle={onToggleFormula} />
          )}
        </>
      )
    case 'curiosities':
      return (
        <>
          <p>{section.history}</p>
          <dl className="destination-panel__facts">
            {section.curiosities.map(({ topic, label, text }) => (
              <div key={topic}>
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </>
      )
    case 'data':
      return (
        <>
          <FactList facts={section.facts} />
          <ul className="destination-panel__sources">
            {section.sources.map(({ title, publisher, url }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">{title}</a> — {publisher}
              </li>
            ))}
          </ul>
          <p className="destination-panel__notice" role="note">{section.scaleNotice}</p>
        </>
      )
    default:
      return null
  }
}

export function DestinationPanel({ destination, panel, onExpand, onCollapse, onToggleFormula }) {
  const bodyRef = useRef(null)
  const content = buildDestinationPanel(destination)

  useEffect(() => {
    if (panel.mode !== 'expanded' || !panel.focusSectionId) return
    bodyRef.current
      ?.querySelector(`[data-section="${panel.focusSectionId}"]`)
      ?.scrollIntoView({ block: 'start' })
  }, [panel.mode, panel.focusSectionId, destination.id])

  if (panel.mode === 'card') {
    return (
      <button type="button" className="destination-surface destination-card" onClick={onExpand}>
        <span className="destination-card__name">{content.header.name}</span>
        <span className="destination-card__facts">
          {destination.facts.map(({ label, value }) => (
            <span key={label} className="destination-card__fact">
              <span>{label}</span>
              <strong>{value}</strong>
            </span>
          ))}
        </span>
        <span className="destination-card__hint">Ver painel completo</span>
      </button>
    )
  }

  return (
    <aside className="destination-surface destination-panel" aria-label={`Painel de ${content.header.name}`}>
      <header className="destination-panel__header">
        <div>
          <p className="destination-panel__meta">{content.header.type} · {content.header.region}</p>
          <h2>{content.header.name}</h2>
        </div>
        <button type="button" className="destination-panel__close" onClick={onCollapse}>
          Fechar
        </button>
      </header>
      <div ref={bodyRef} className="destination-panel__body">
        <p className="destination-panel__impact">{content.header.impact}</p>
        {content.sections.map((section) => (
          <section
            key={section.id}
            data-section={section.id}
            className="destination-panel__section"
            aria-labelledby={`panel-section-${section.id}`}
          >
            <h3 id={`panel-section-${section.id}`}>{section.title}</h3>
            <SectionBody
              section={section}
              isRevealed={isFormulaRevealed(panel, destination.id)}
              onToggleFormula={onToggleFormula}
            />
          </section>
        ))}
      </div>
    </aside>
  )
}
