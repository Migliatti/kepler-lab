import { useMemo, useState } from 'react'
import { HoverLabel } from '../components/HoverLabel.jsx'
import { resolveLabelVisibility } from '../utils/labels.js'
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
  labels,
  reducedMotion,
}) {
  const sceneDestinations = useMemo(() => getSceneDestinations(destinations), [destinations])
  const [hoveredId, setHoveredId] = useState(null)
  const labelVisibility = resolveLabelVisibility(labels)
  const hoveredDestination = travel?.status === 'travelling' || !labelVisibility.hover
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
          showSceneLabels={labelVisibility.scene}
          reducedMotion={reducedMotion}
          onHoverChange={setHoveredId}
          onSelectDestination={onSelectDestination}
          onConfirmTravel={onConfirmTravel}
        />
      </SceneCanvas>
      <HoverLabel destination={hoveredDestination} isSelected={hoveredId === selectedId} />
    </main>
  )
}
