import { useState } from 'react'
import { NavSidebar } from './components/NavSidebar.jsx'
import { TravelOverlay } from './components/TravelOverlay.jsx'
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'
import { completeTravel, returnToEarth, startTravel } from './state/travel.js'

function App() {
  const [selectedId, setSelectedId] = useState('earth')
  const [currentLocationId, setCurrentLocationId] = useState('earth')
  const [travel, setTravel] = useState(null)
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
