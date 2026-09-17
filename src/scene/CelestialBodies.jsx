import { getCategoryAppearance } from './layout.js'

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
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
          <sphereGeometry args={[radius, 20, 14]} />
          <meshStandardMaterial {...appearance} emissiveIntensity={isSelected || isHovered ? 1.7 : 1} />
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
