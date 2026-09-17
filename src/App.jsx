import { useState } from 'react'
import { DestinationPanel } from './components/DestinationPanel.jsx'
import { NavSidebar } from './components/NavSidebar.jsx'
import { Onboarding } from './components/Onboarding.jsx'
import { SceneReadout } from './components/SceneReadout.jsx'
import { TravelOverlay } from './components/TravelOverlay.jsx'
import { destinations } from './content/destinations.js'
import { getOnboardingSteps } from './content/onboardingSteps.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'
import {
  createOnboardingState,
  isOnboardingOpen,
  nextOnboardingStep,
  previousOnboardingStep,
  reopenOnboarding,
  skipOnboarding,
} from './state/onboarding.js'
import { collapsePanel, createPanelState, expandPanel, toggleFormula } from './state/panel.js'
import { loadPreferences, savePreferences } from './state/preferences.js'
import { completeTravel, returnToEarth, startTravel } from './state/travel.js'

function detectOnboardingPlatform() {
  return window.matchMedia?.('(pointer: coarse)').matches ? 'touch' : 'desktop'
}

function App() {
  const [selectedId, setSelectedId] = useState('earth')
  const [currentLocationId, setCurrentLocationId] = useState('earth')
  const [travel, setTravel] = useState(null)
  const [panel, setPanel] = useState(createPanelState)
  const [onboardingSteps] = useState(() => getOnboardingSteps(detectOnboardingPlatform()))
  const [onboarding, setOnboarding] = useState(
    () => createOnboardingState(!loadPreferences().hasSeenOnboarding),
  )
  const selectedDestination = destinations.find(({ id }) => id === selectedId)
    ?? destinations.find(({ id }) => id === 'earth')
  const currentLocation = destinations.find(({ id }) => id === currentLocationId)
    ?? destinations.find(({ id }) => id === 'earth')

  function handleTravelTo(destinationId) {
    setSelectedId(destinationId)
    setTravel(startTravel(destinationId, 'full'))
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
    setTravel(returnToEarth('full'))
  }

  function updateOnboarding(nextState) {
    setOnboarding(nextState)
    if (!isOnboardingOpen(nextState)) {
      savePreferences({ ...loadPreferences(), hasSeenOnboarding: true })
    }
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
      <button type="button" className="help-toggle" onClick={() => setOnboarding(reopenOnboarding())}>
        Ajuda
      </button>
      <Onboarding
        steps={onboardingSteps}
        state={onboarding}
        onNext={() => updateOnboarding(nextOnboardingStep(onboarding, onboardingSteps.length))}
        onPrevious={() => setOnboarding(previousOnboardingStep(onboarding))}
        onSkip={() => updateOnboarding(skipOnboarding(onboarding))}
      />
    </>
  )
}

export default App
