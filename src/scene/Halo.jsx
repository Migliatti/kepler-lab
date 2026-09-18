// Halo aditivo sempre voltado à câmera. É o que dá presença luminosa a
// estrelas, nebulosas e ao buraco negro sem depender de bloom ou de qualquer
// passe de pós-processamento — que esta fase excluiu de propósito.
//
// Dois sprites concêntricos: o interno concentra o brilho junto do corpo, o
// externo espalha a queda. O material aditivo faz a soma parecer luz.

import * as THREE from 'three'

const NO_RAYCAST = () => null

export function Halo({ radius, halo }) {
  if (!halo) return null

  const inner = radius * halo.scale
  const outer = inner * 1.8

  return (
    <>
      <sprite scale={[inner, inner, 1]} raycast={NO_RAYCAST}>
        <spriteMaterial
          color={halo.color}
          transparent
          opacity={halo.opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite scale={[outer, outer, 1]} raycast={NO_RAYCAST}>
        <spriteMaterial
          color={halo.color}
          transparent
          opacity={halo.opacity * 0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  )
}
