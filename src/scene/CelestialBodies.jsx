// Este componente cuida de ponteiro, seleção e viagem. Aparência é delegada:
// o perfil vem de appearance.js e cada decoração tem seu próprio adaptador.

import { getBodyAppearance } from './appearance.js'
import { BodyRing } from './BodyRing.jsx'
import { buildEarthPatches, EARTH_APPEARANCE } from './earthSurface.js'
import { Halo } from './Halo.jsx'
import { PlanetSurface } from './PlanetSurface.jsx'

// Construída uma vez: a geometria é determinística, então toda Terra em todo
// render compartilha os mesmos contornos.
const EARTH_PATCHES = buildEarthPatches()

const BODIES_WITH_SURFACE = new Set(['earth'])

function EarthSurface({ radius, highlighted }) {
  return (
    <PlanetSurface
      radius={radius}
      patches={EARTH_PATCHES}
      gradient="poles"
      oceanLow={EARTH_APPEARANCE.oceanDeep}
      oceanHigh={EARTH_APPEARANCE.oceanPolar}
      atmosphereColor={EARTH_APPEARANCE.atmosphere}
      atmosphereOpacity={highlighted ? 0.26 : 0.14}
    />
  )
}

export function CelestialBodies({
  destinations,
  selectedId,
  currentLocationId,
  hoveredId,
  onHoverChange,
  onSelectDestination,
  onConfirmTravel,
}) {
  return destinations.map(({ id, category, position, radius }) => {
    const appearance = getBodyAppearance(id, category)
    const isSelected = id === selectedId
    const isHovered = id === hoveredId
    const isCurrentLocation = id === currentLocationId
    const hasSurface = BODIES_WITH_SURFACE.has(id)

    function handlePointerOver(event) {
      event.stopPropagation()
      document.body.style.cursor = isCurrentLocation ? 'default' : 'pointer'
      onHoverChange(id)
    }

    function handlePointerOut(event) {
      event.stopPropagation()
      document.body.style.cursor = 'auto'
      onHoverChange((current) => (current === id ? null : current))
    }

    function handleClick(event) {
      event.stopPropagation()
      if (isCurrentLocation) return
      if (isSelected) {
        onConfirmTravel(id)
        return
      }
      onSelectDestination(id)
    }

    return (
      <group key={id} position={position} scale={isSelected ? 1.25 : 1}>
        {hasSurface && <EarthSurface radius={radius} highlighted={isSelected || isHovered} />}

        <Halo radius={radius} halo={appearance.halo} />
        <BodyRing radius={radius} ring={appearance.ring} />

        {/* Um corpo com superfície própria guarda uma esfera invisível para os
            eventos de ponteiro, para que a decoração nunca responda ao
            raycaster. */}
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
          <sphereGeometry args={[hasSurface ? radius * 1.05 : radius, 20, 14]} />
          {hasSurface ? (
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          ) : (
            <meshStandardMaterial
              color={appearance.color}
              emissive={appearance.emissive}
              transparent={appearance.transparent}
              opacity={appearance.opacity}
              emissiveIntensity={isSelected || isHovered ? 1.7 : 1}
            />
          )}
        </mesh>
      </group>
    )
  })
}
