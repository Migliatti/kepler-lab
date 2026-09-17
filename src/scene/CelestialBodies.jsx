import { buildEarthPatches, EARTH_APPEARANCE } from './earthSurface.js'
import { getCategoryAppearance } from './layout.js'
import { PlanetSurface } from './PlanetSurface.jsx'

// Built once: the geometry is deterministic, so every Earth in every render
// shares the same outlines.
const EARTH_PATCHES = buildEarthPatches()

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
    const appearance = getCategoryAppearance(category)
    const isSelected = id === selectedId
    const isHovered = id === hoveredId
    const isCurrentLocation = id === currentLocationId
    const hasSurface = id === 'earth'

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

        {/* A body with its own surface keeps an invisible sphere for pointer
            events, so the decoration never has to answer the raycaster. */}
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
          <sphereGeometry args={[hasSurface ? radius * 1.05 : radius, 20, 14]} />
          {hasSurface ? (
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          ) : (
            <meshStandardMaterial {...appearance} emissiveIntensity={isSelected || isHovered ? 1.7 : 1} />
          )}
        </mesh>

        {id === 'saturn' && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.35, radius * 2, 32]} />
            <meshStandardMaterial color="#d8bb75" side={2} transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    )
  })
}
