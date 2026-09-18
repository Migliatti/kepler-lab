// Liga o dado de superfície ao PlanetSurface. É decoração pura: quem responde
// ao ponteiro é sempre a esfera invisível de CelestialBodies.

import { getBodySurface } from './bodySurfaces.js'
import { PlanetSurface } from './PlanetSurface.jsx'

export function BodySurface({ id, radius, highlighted }) {
  const surface = getBodySurface(id)
  if (!surface) return null

  return (
    <PlanetSurface
      radius={radius}
      {...surface}
      atmosphereOpacity={
        surface.showAtmosphere === false
          ? 0
          : (surface.atmosphereOpacity ?? 0.08) * (highlighted ? 1.8 : 1)
      }
    />
  )
}
