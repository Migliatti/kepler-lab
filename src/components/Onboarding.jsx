import { useEffect } from 'react'
import { isOnboardingOpen } from '../state/onboarding.js'

export function Onboarding({ steps, state, onNext, onPrevious, onSkip }) {
  const isOpen = isOnboardingOpen(state)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onSkip()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onSkip])

  if (!isOpen) return null

  const step = steps[state.stepIndex]
  const isLastStep = state.stepIndex === steps.length - 1

  return (
    <div className="onboarding-backdrop">
      <section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <p className="onboarding__progress">{state.stepIndex + 1} de {steps.length}</p>
        <h2 id="onboarding-title">{step.title}</h2>
        {step.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="onboarding__actions">
          <button type="button" className="onboarding__skip" onClick={onSkip}>
            Pular
          </button>
          {state.stepIndex > 0 && (
            <button type="button" onClick={onPrevious}>
              Voltar
            </button>
          )}
          <button key={step.id} type="button" autoFocus onClick={onNext}>
            {isLastStep ? 'Começar a explorar' : 'Próximo'}
          </button>
        </div>
      </section>
    </div>
  )
}
