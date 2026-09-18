// Uma superfície por corpo, nas props que o PlanetSurface consome. Puro e
// determinístico: mesma entrada, mesmos contornos, toda execução.

import { buildEarthPatches, EARTH_APPEARANCE } from './earthSurface.js'
import { GIANT_SURFACES } from './surfaces/giants.js'
import { ROCKY_SURFACES } from './surfaces/rocky.js'

const EARTH_SURFACE = Object.freeze({
  oceanLow: EARTH_APPEARANCE.oceanDeep,
  oceanHigh: EARTH_APPEARANCE.oceanPolar,
  gradient: 'poles',
  showAtmosphere: true,
  atmosphereColor: EARTH_APPEARANCE.atmosphere,
  atmosphereOpacity: 0.14,
  patches: buildEarthPatches(),
  craters: [],
})

const SURFACES = Object.freeze({
  earth: EARTH_SURFACE,
  ...ROCKY_SURFACES,
  ...GIANT_SURFACES,
})

export const SURFACE_IDS = Object.freeze(Object.keys(SURFACES))

export function hasBodySurface(id) {
  return Object.hasOwn(SURFACES, id)
}

export function getBodySurface(id) {
  return hasBodySurface(id) ? SURFACES[id] : null
}
