import { useState } from 'react'
import { NavigationStatus } from './components/NavigationStatus.jsx'
import { SearchOverlay } from './components/SearchOverlay.jsx'
import { SelectionCard } from './components/SelectionCard.jsx'
import { TravelOverlay } from './components/TravelOverlay.jsx'
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'
import { completeTravel, returnToEarth, startTravel } from './state/travel.js'

function App() {
  const [selectedId, setSelectedId] = useState('earth')
  const [currentLocationId, setCurrentLocationId] = useState('earth')
  const [travel, setTravel] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const selectedDestination = destinations.find(({ id }) => id === selectedId)
    ?? destinations.find(({ id }) => id === 'earth')
  const currentLocation = destinations.find(({ id }) => id === currentLocationId)
    ?? destinations.find(({ id }) => id === 'earth')

  function handleTravelTo(destinationId) {
    setSelectedId(destinationId)
    setTravel(startTravel(destinationId, true))
    setIsSearchOpen(false)
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
        onSelectDestination={setSelectedId}
        travel={travel}
        onTravelComplete={handleTravelComplete}
      />
      <NavigationStatus destination={currentLocation} onReturnToEarth={handleReturnToEarth} />
      <TravelOverlay destination={selectedDestination} travel={travel} onSkip={handleSkipTravel} />
      <SelectionCard
        destination={selectedDestination}
        currentLocationId={currentLocationId}
        travel={travel}
        onTravelTo={handleTravelTo}
      />
      <button type="button" className="search-trigger" onClick={() => setIsSearchOpen(true)}>
        Buscar destinos
      </button>
      <SearchOverlay
        destinations={destinations}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onTravelTo={handleTravelTo}
      />
    </>
  )
}

export default App
