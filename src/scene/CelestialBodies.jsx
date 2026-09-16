import { getCategoryAppearance } from './layout.js'

export function CelestialBodies({ destinations, selectedId }) {
  return destinations.map(({ id, category, position, radius }) => {
    const appearance = getCategoryAppearance(category)
    const isSelected = id === selectedId

    return (
      <group key={id} position={position} scale={isSelected ? 1.25 : 1}>
        <mesh>
          <sphereGeometry args={[radius, 20, 14]} />
          <meshStandardMaterial {...appearance} />
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
