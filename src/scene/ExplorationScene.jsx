import { useMemo } from 'react'
import { CelestialBodies } from './CelestialBodies.jsx'
import { SceneCanvas } from './SceneCanvas.jsx'
import { getSceneDestinations } from './layout.js'

export function ExplorationScene({ destinations, selectedId, onSelectDestination }) {
  const sceneDestinations = useMemo(() => getSceneDestinations(destinations), [destinations])

  void onSelectDestination

  return (
    <main className="exploration-scene" aria-label="Visão geral celeste navegável">
      <SceneCanvas>
        <CelestialBodies destinations={sceneDestinations} selectedId={selectedId} />
      </SceneCanvas>
    </main>
  )
}
