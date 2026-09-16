import { useState } from 'react'
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'

function App() {
  const [selectedId, setSelectedId] = useState(null)
  const selectedDestination = destinations.find(({ id }) => id === selectedId) ?? null

  return (
    <>
      <ExplorationScene
        destinations={destinations}
        selectedId={selectedId}
        onSelectDestination={setSelectedId}
      />
      {selectedDestination && <p className="selection-summary">Selecionado: {selectedDestination.name}</p>}
    </>
  )
}

export default App
