import { useState } from 'react'
import { NavigationStatus } from './components/NavigationStatus.jsx'
import { SearchOverlay } from './components/SearchOverlay.jsx'
import { TravelOverlay } from './components/TravelOverlay.jsx'
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'
import { completeTravel, returnToEarth, startTravel } from './state/travel.js'

function App() {
  const [selectedId, setSelectedId] = useState('earth')
  const [travel, setTravel] = useState(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const selectedDestination = destinations.find(({ id }) => id === selectedId)
    ?? destinations.find(({ id }) => id === 'earth')

  function handleTravelTo(destinationId) {
    setSelectedId(destinationId)
    setTravel(startTravel(destinationId, true))
    setIsSearchOpen(false)
  }

  function handleTravelComplete() {
    setTravel((current) => current && completeTravel(current))
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
      <NavigationStatus destination={selectedDestination} onReturnToEarth={handleReturnToEarth} />
      <TravelOverlay destination={selectedDestination} travel={travel} onSkip={handleSkipTravel} />
      {selectedDestination && selectedDestination.id !== 'earth' && (
        <button type="button" className="selection-summary" onClick={() => handleTravelTo(selectedDestination.id)}>
          Ir até {selectedDestination.name}
        </button>
      )}
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
