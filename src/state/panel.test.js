import { describe, expect, it } from 'vitest'

import {
  collapsePanel,
  createPanelState,
  expandPanel,
  isFormulaRevealed,
  toggleFormula,
} from './panel.js'

describe('panel state', () => {
  it('starts as the facts card with every formula hidden', () => {
    expect(createPanelState()).toEqual({
      mode: 'card', focusSectionId: null, revealedFormulaIds: [],
    })
  })

  it('expands focusing the requested section', () => {
    expect(expandPanel(createPanelState(), 'data')).toMatchObject({
      mode: 'expanded', focusSectionId: 'data',
    })
  })

  it('collapses back to the card without forgetting revealed formulas', () => {
    const revealed = toggleFormula(expandPanel(createPanelState(), 'overview'), 'sun')
    const collapsed = collapsePanel(revealed)

    expect(collapsed).toMatchObject({ mode: 'card', focusSectionId: null })
    expect(isFormulaRevealed(collapsed, 'sun')).toBe(true)
  })

  it('toggles a formula per destination', () => {
    const shown = toggleFormula(createPanelState(), 'sun')

    expect(isFormulaRevealed(shown, 'sun')).toBe(true)
    expect(isFormulaRevealed(shown, 'earth')).toBe(false)
    expect(isFormulaRevealed(toggleFormula(shown, 'sun'), 'sun')).toBe(false)
  })

  it('never mutates the previous state', () => {
    const initial = createPanelState()
    const snapshot = structuredClone(initial)

    collapsePanel(toggleFormula(expandPanel(initial, 'data'), 'sun'))

    expect(initial).toEqual(snapshot)
  })
})
