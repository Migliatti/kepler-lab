import { describe, expect, it } from 'vitest'

import {
  createOnboardingState,
  isOnboardingOpen,
  nextOnboardingStep,
  previousOnboardingStep,
  reopenOnboarding,
  skipOnboarding,
} from './onboarding.js'

describe('onboarding state', () => {
  it('opens on the first step for a first visit and stays closed otherwise', () => {
    expect(createOnboardingState(true)).toEqual({ status: 'open', stepIndex: 0 })
    expect(isOnboardingOpen(createOnboardingState(false))).toBe(false)
  })

  it('advances and completes after the last step', () => {
    const second = nextOnboardingStep(createOnboardingState(true), 3)
    const third = nextOnboardingStep(second, 3)

    expect(second.stepIndex).toBe(1)
    expect(third).toEqual({ status: 'open', stepIndex: 2 })
    expect(nextOnboardingStep(third, 3).status).toBe('completed')
  })

  it('goes back without passing the first step', () => {
    const second = nextOnboardingStep(createOnboardingState(true), 3)

    expect(previousOnboardingStep(second).stepIndex).toBe(0)
    expect(previousOnboardingStep(createOnboardingState(true)).stepIndex).toBe(0)
  })

  it('can be skipped from any step and reopened from the start', () => {
    const skipped = skipOnboarding(nextOnboardingStep(createOnboardingState(true), 3))

    expect(isOnboardingOpen(skipped)).toBe(false)
    expect(reopenOnboarding()).toEqual({ status: 'open', stepIndex: 0 })
  })

  it('never mutates the previous state', () => {
    const initial = createOnboardingState(true)

    skipOnboarding(nextOnboardingStep(initial, 3))

    expect(initial).toEqual({ status: 'open', stepIndex: 0 })
  })
})
