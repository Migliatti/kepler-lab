// Partículas por categoria: poeira nas nebulosas, disco no buraco negro e na
// região galáctica. Um único `points` por corpo — nunca meshes soltas.

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { buildParticleField } from './particleField.js'

const NO_RAYCAST = () => null

function seedFromId(id) {
  let seed = 0
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0
  return seed
}

export function CategoryEffects({ id, radius, particles }) {
  const groupRef = useRef(null)

  const geometry = useMemo(() => {
    if (!particles) return null

    const { positions } = buildParticleField({
      count: particles.count,
      spread: radius * particles.spread,
      shape: particles.shape,
      seed: seedFromId(id),
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [id, radius, particles])

  useEffect(() => () => geometry?.dispose(), [geometry])

  // `drift` já vem zerado do perfil sob movimento reduzido: não há segunda
  // regra aqui, só a consequência.
  useFrame((_, delta) => {
    if (groupRef.current && particles?.drift) {
      groupRef.current.rotation.y += particles.drift * delta
    }
  })

  if (!particles || !geometry) return null

  return (
    <group ref={groupRef}>
      <points geometry={geometry} raycast={NO_RAYCAST}>
        <pointsMaterial
          color={particles.color}
          size={radius * 0.06}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
