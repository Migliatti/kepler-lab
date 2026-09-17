import { useState } from 'react'
import { DestinationPanel } from './components/DestinationPanel.jsx'
import { NavSidebar } from './components/NavSidebar.jsx'
import { SceneReadout } from './components/SceneReadout.jsx'
import { TravelOverlay } from './components/TravelOverlay.jsx'
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'
import { collapsePanel, createPanelState, expandPanel, toggleFormula } from './state/panel.js'
import { completeTravel, returnToEarth, startTravel } from './state/travel.js'

function App() {
  const [selectedId, setSelectedId] = useState('earth')
  const [currentLocationId, setCurrentLocationId] = useState('earth')
  const [travel, setTravel] = useState(null)
  const [panel, setPanel] = useState(createPanelState)
  const selectedDestination = destinations.find(({ id }) => id === selectedId)
    ?? destinations.find(({ id }) => id === 'earth')
  const currentLocation = destinations.find(({ id }) => id === currentLocationId)
    ?? destinations.find(({ id }) => id === 'earth')

  function handleTravelTo(destinationId) {
    setSelectedId(destinationId)
    setTravel(startTravel(destinationId, true))
  }

  function handleTravelComplete() {
    setTravel((current) => {
      if (!current) return current
      setCurrentLocationId(current.destinationId)
      return completeTravel(current)
    })
    setPanel((current) => expandPanel(current, 'overview'))
  }

  function handleSkipTravel() {
    handleTravelComplete()
  }

  function handleReturnToEarth() {
    setSelectedId('earth')
    setTravel(returnToEarth(true))
  }

  return (
    <>
      <ExplorationScene
        destinations={destinations}
        selectedId={selectedId}
        currentLocationId={currentLocationId}
        onSelectDestination={setSelectedId}
        onConfirmTravel={handleTravelTo}
        travel={travel}
        onTravelComplete={handleTravelComplete}
      />
      <SceneReadout destination={selectedDestination} />
      <DestinationPanel
        destination={selectedDestination}
        panel={panel}
        onExpand={() => setPanel((current) => expandPanel(current, 'data'))}
        onCollapse={() => setPanel(collapsePanel)}
        onToggleFormula={() => setPanel((current) => toggleFormula(current, selectedDestination.id))}
      />
      <TravelOverlay destination={selectedDestination} travel={travel} onSkip={handleSkipTravel} />
      <NavSidebar
        destinations={destinations}
        currentLocation={currentLocation}
        selectedId={selectedId}
        currentLocationId={currentLocationId}
        onSelectDestination={setSelectedId}
        onConfirmTravel={handleTravelTo}
        onReturnToEarth={handleReturnToEarth}
      />
    </>
  )
}

export default App
