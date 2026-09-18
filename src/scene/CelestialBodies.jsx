// Este componente cuida de ponteiro, seleção e viagem. Aparência é delegada:
// o perfil vem de appearance.js e cada decoração tem seu próprio adaptador.

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { getBodyAppearance } from './appearance.js'
import { BlackHole } from './BlackHole.jsx'
import { BodyLabel } from './BodyLabel.jsx'
import { BodyRing } from './BodyRing.jsx'
import { BodySurface } from './BodySurface.jsx'
import { hasBodySurface } from './bodySurfaces.js'
import { CategoryEffects } from './CategoryEffects.jsx'
import { Halo } from './Halo.jsx'

function SpinningGroup({ spin, children }) {
  const ref = useRef(null)

  // `spin` já vem zerado do perfil sob movimento reduzido: aqui não há segunda
  // regra, só a consequência.
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += spin * delta
  })

  return <group ref={ref}>{children}</group>
}

export function CelestialBodies({
  destinations,
  selectedId,
  currentLocationId,
  hoveredId,
  showSceneLabels,
  reducedMotion,
  onHoverChange,
  onSelectDestination,
  onConfirmTravel,
}) {
  return destinations.map(({ id, name, category, position, radius }) => {
    const appearance = getBodyAppearance(id, category, { reducedMotion })
    const isSelected = id === selectedId
    const isHovered = id === hoveredId
    const isCurrentLocation = id === currentLocationId
    const hasSurface = hasBodySurface(id)
    const isBlackHole = category === 'black-hole'
    const usesOwnArt = hasSurface || isBlackHole

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
        <SpinningGroup spin={appearance.spin}>
          {hasSurface && <BodySurface id={id} radius={radius} highlighted={isSelected || isHovered} />}
          {isBlackHole && <BlackHole radius={radius} appearance={appearance} />}

          {/* Um corpo com superfície própria guarda uma esfera invisível para os
              eventos de ponteiro, para que a decoração nunca responda ao
              raycaster. */}
          <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
            <sphereGeometry args={[usesOwnArt ? radius * 1.05 : radius, 20, 14]} />
            {usesOwnArt ? (
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
        </SpinningGroup>

        <Halo radius={radius} halo={appearance.halo} />
        <BodyRing radius={radius} ring={appearance.ring} />
        <CategoryEffects id={id} radius={radius} particles={appearance.particles} />

        {showSceneLabels && <BodyLabel name={name} radius={radius} />}
      </group>
    )
  })
}
