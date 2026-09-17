import { SCALE_NOTICE } from '../content/notices.js'

export function buildSceneReadout(destination) {
  return {
    name: destination.name,
    kind: destination.coordinates.kind,
    entries: destination.coordinates.entries.map(({ label, value }) => ({ label, value })),
    scaleNotice: SCALE_NOTICE,
  }
}
