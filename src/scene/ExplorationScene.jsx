import { useMemo, useState } from 'react'
import { HoverLabel } from '../components/HoverLabel.jsx'
import { CelestialBodies } from './CelestialBodies.jsx'
import { SceneCanvas } from './SceneCanvas.jsx'
import { getSceneDestinations } from './layout.js'

export function ExplorationScene({
  destinations,
  selectedId,
  currentLocationId,
  onSelectDestination,
  onConfirmTravel,
  travel,
  onTravelComplete,
}) {
  const sceneDestinations = useMemo(() => getSceneDestinations(destinations), [destinations])
  const [hoveredId, setHoveredId] = useState(null)
  const hoveredDestination = travel?.status === 'travelling'
    ? undefined
    : destinations.find(({ id }) => id === hoveredId)

  return (
    <main className="exploration-scene" aria-label="Visão geral celeste navegável">
      <SceneCanvas travel={travel} sceneDestinations={sceneDestinations} onTravelComplete={onTravelComplete}>
        <CelestialBodies
          destinations={sceneDestinations}
          selectedId={selectedId}
          currentLocationId={currentLocationId}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          onSelectDestination={onSelectDestination}
          onConfirmTravel={onConfirmTravel}
        />
      </SceneCanvas>
      <HoverLabel destination={hoveredDestination} isSelected={hoveredId === selectedId} />
    </main>
  )
}
