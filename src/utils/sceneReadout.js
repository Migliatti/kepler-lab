import { BLACK_HOLE_NOTICE, SCALE_NOTICE } from '../content/notices.js'

// Corpos cuja aparência precisa de um aviso próprio, além do de escala.
const APPEARANCE_NOTICES = Object.freeze({
  'sagittarius-a-star': BLACK_HOLE_NOTICE,
})

export function buildSceneReadout(destination) {
  return {
    name: destination.name,
    kind: destination.coordinates.kind,
    entries: destination.coordinates.entries.map(({ label, value }) => ({ label, value })),
    scaleNotice: SCALE_NOTICE,
    appearanceNotice: APPEARANCE_NOTICES[destination.id] ?? null,
  }
}
