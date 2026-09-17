import { useMemo, useState } from 'react'
import { CelestialBodies } from './CelestialBodies.jsx'
import { DestinationMarkers } from './DestinationMarkers.jsx'
import { SceneCanvas } from './SceneCanvas.jsx'
import { EARTH_CAMERA_POSITION, getSceneDestinations, getVisibleMarkerItems, SCALE_NOTICE } from './layout.js'

export function ExplorationScene({
  destinations,
  selectedId,
  currentLocationId,
  onSelectDestination,
  travel,
  onTravelComplete,
}) {
  const sceneDestinations = useMemo(() => getSceneDestinations(destinations), [destinations])
  const destinationById = useMemo(
    () => new Map(destinations.map((destination) => [destination.id, destination])),
    [destinations],
  )
  const [cameraPosition, setCameraPosition] = useState(EARTH_CAMERA_POSITION)
  const markerItems = useMemo(
    () => getVisibleMarkerItems(sceneDestinations, cameraPosition),
    [cameraPosition, sceneDestinations],
  )

  function handleControlsChange(event) {
    setCameraPosition(event.target.object.position.toArray())
  }

  return (
    <main className="exploration-scene" aria-label="Visão geral celeste navegável">
      <SceneCanvas
        onControlsChange={handleControlsChange}
        travel={travel}
        sceneDestinations={sceneDestinations}
        onTravelComplete={onTravelComplete}
      >
        <CelestialBodies destinations={sceneDestinations} selectedId={selectedId} />
        <DestinationMarkers
          items={markerItems}
          destinationById={destinationById}
          selectedId={selectedId}
          currentLocationId={currentLocationId}
          onSelectDestination={onSelectDestination}
        />
      </SceneCanvas>
      <p className="scale-notice" role="note">{SCALE_NOTICE}</p>
    </main>
  )
}
