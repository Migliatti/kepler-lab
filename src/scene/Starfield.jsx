// Fundo de estrelas: um único `points`, nunca meshes soltas. Não gira e não
// responde ao ponteiro, então movimento reduzido não tem o que desligar aqui.

import { useMemo } from 'react'
import * as THREE from 'three'

import { buildStarfield } from './starfield.js'

const NO_RAYCAST = () => null

export function Starfield() {
  const geometry = useMemo(() => {
    const { positions, sizes } = buildStarfield()
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  return (
    <points geometry={geometry} raycast={NO_RAYCAST} frustumCulled={false}>
      <pointsMaterial
        color="#d6e2ff"
        size={0.55}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}
