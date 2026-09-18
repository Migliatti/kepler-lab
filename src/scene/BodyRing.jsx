// Anel a partir do perfil de aparência. `inner`, `outer` e `gap` são múltiplos
// do raio do corpo; `gap` desenha duas faixas em vez de uma — é a divisão de
// Cassini em Saturno.

import * as THREE from 'three'

const NO_RAYCAST = () => null

function ringSpans(ring) {
  if (!ring.gap) return [[ring.inner, ring.outer]]
  return [[ring.inner, ring.gap[0]], [ring.gap[1], ring.outer]]
}

export function BodyRing({ radius, ring }) {
  if (!ring) return null

  return (
    <group rotation={[Math.PI / 2 + (ring.tilt ?? 0), 0, 0]}>
      {ringSpans(ring).map(([inner, outer]) => (
        <mesh key={`${inner}-${outer}`} raycast={NO_RAYCAST}>
          <ringGeometry args={[radius * inner, radius * outer, 64]} />
          <meshStandardMaterial
            color={ring.color}
            side={THREE.DoubleSide}
            transparent
            opacity={ring.opacity ?? 0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
