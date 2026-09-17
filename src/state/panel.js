export function createPanelState() {
  return { mode: 'card', focusSectionId: null, revealedFormulaIds: [] }
}

export function expandPanel(state, focusSectionId) {
  return { ...state, mode: 'expanded', focusSectionId }
}

export function collapsePanel(state) {
  return { ...state, mode: 'card', focusSectionId: null }
}

export function toggleFormula(state, destinationId) {
  const revealedFormulaIds = state.revealedFormulaIds.includes(destinationId)
    ? state.revealedFormulaIds.filter((id) => id !== destinationId)
    : [...state.revealedFormulaIds, destinationId]

  return { ...state, revealedFormulaIds }
}

export function isFormulaRevealed(state, destinationId) {
  return state.revealedFormulaIds.includes(destinationId)
}
