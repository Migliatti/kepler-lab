export function createOnboardingState(isOpen) {
  return { status: isOpen ? 'open' : 'closed', stepIndex: 0 }
}

export function nextOnboardingStep(state, stepCount) {
  if (state.stepIndex >= stepCount - 1) {
    return { ...state, status: 'completed' }
  }

  return { ...state, stepIndex: state.stepIndex + 1 }
}

export function previousOnboardingStep(state) {
  return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) }
}

export function skipOnboarding(state) {
  return { ...state, status: 'skipped' }
}

export function reopenOnboarding() {
  return { status: 'open', stepIndex: 0 }
}

export function isOnboardingOpen(state) {
  return state.status === 'open'
}
