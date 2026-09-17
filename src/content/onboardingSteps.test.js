import { describe, expect, it } from 'vitest'

import { getOnboardingSteps } from './onboardingSteps.js'

describe('onboarding steps', () => {
  it('has welcome, navigation and discovery steps', () => {
    expect(getOnboardingSteps('desktop').map(({ id }) => id)).toEqual([
      'welcome', 'navigation', 'discovery',
    ])
  })

  it('opens with the welcome text from the product spec', () => {
    const [welcome] = getOnboardingSteps('desktop')

    expect(welcome.title).toBe('Você está aqui.')
    expect(welcome.paragraphs).toEqual([
      'Em um pequeno mundo azul, na borda de uma galáxia repleta de estrelas, mundos e mistérios.',
      'Aproxime-se. Observe. Viaje.',
    ])
  })

  it('adapts navigation guidance to the platform', () => {
    const desktop = getOnboardingSteps('desktop')[1].paragraphs.join(' ')
    const touch = getOnboardingSteps('touch')[1].paragraphs.join(' ')

    expect(desktop).toMatch(/mouse/)
    expect(touch).toMatch(/pinça/)
    expect(touch).not.toMatch(/mouse/)
  })

  it('treats an unknown platform as desktop', () => {
    expect(getOnboardingSteps('console')).toEqual(getOnboardingSteps('desktop'))
  })
})
