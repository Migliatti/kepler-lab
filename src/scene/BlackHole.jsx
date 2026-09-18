// Quatro peças, na ordem em que a imagem se lê: sombra, anel de fótons, disco
// de acreção inclinado e o arco dobrado por cima da sombra.

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { BLACK_HOLE_GEOMETRY, buildDiscBrightness } from './blackHole.js'

const NO_RAYCAST = () => null
const DISC_SEGMENTS = 96

// Frio e quente do gradiente Doppler: o lado que se aproxima puxa para o azul.
const DISC_COOL = new THREE.Color('#c0561c')
const DISC_HOT = new THREE.Color('#cfe4ff')

function useDiscGeometry(radius, inner, outer, segments) {
  return useMemo(() => {
    const geo = new THREE.RingGeometry(radius * inner, radius * outer, segments, 1)
    const position = geo.attributes.position
    const colors = new Float32Array(position.count * 3)
    const brightness = buildDiscBrightness(segments)
    const colour = new THREE.Color()

    for (let i = 0; i < position.count; i++) {
      // RingGeometry percorre o anel por ângulo; o ângulo de cada vértice sai
      // da própria posição, o que dispensa reimplementar a topologia.
      const angle = Math.atan2(position.getY(i), position.getX(i))
      const t = brightness[Math.round(((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * segments) % segments]

      colour.copy(DISC_COOL).lerp(DISC_HOT, t)
      colors[i * 3] = colour.r
      colors[i * 3 + 1] = colour.g
      colors[i * 3 + 2] = colour.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [radius, inner, outer, segments])
}

// O anel de fótons e o arco dobrado são contornos vistos de frente: giram para
// acompanhar a câmera, como o halo.
function Billboard({ children }) {
  const ref = useRef(null)

  useFrame(({ camera }) => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion)
  })

  return <group ref={ref}>{children}</group>
}

export function BlackHole({ radius, appearance }) {
  const { shadow, photonInner, photonOuter, discInner, discOuter, discTilt, foldInner, foldOuter } =
    BLACK_HOLE_GEOMETRY

  const discGeometry = useDiscGeometry(radius, discInner, discOuter, DISC_SEGMENTS)

  return (
    <group>
      {/* Sombra: preto puro, sem material emissivo. */}
      <mesh raycast={NO_RAYCAST}>
        <sphereGeometry args={[radius * shadow, 32, 24]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <Billboard>
        {/* Anel de fótons: o contorno brilhante da sombra. */}
        <mesh raycast={NO_RAYCAST}>
          <ringGeometry args={[radius * photonInner, radius * photonOuter, 96]} />
          <meshBasicMaterial
            color={appearance.halo?.color ?? '#ffc27a'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Arco dobrado: o topo do disco visto por cima da sombra. Meia volta
            só, e desenhado sem teste de profundidade para ficar por cima. */}
        <mesh raycast={NO_RAYCAST} rotation={[0, 0, Math.PI]}>
          <ringGeometry args={[radius * foldInner, radius * foldOuter, 64, 1, 0, Math.PI]} />
          <meshBasicMaterial
            color="#ffb060"
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      </Billboard>

      {/* Disco de acreção: inclinado, com a assimetria Doppler nas cores de
          vértice. */}
      <mesh geometry={discGeometry} rotation={[discTilt, 0, 0]} raycast={NO_RAYCAST}>
        <meshBasicMaterial
          vertexColors
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  )
}
