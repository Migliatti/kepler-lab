import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'

function App() {
  return (
    <ExplorationScene
      destinations={destinations}
      selectedId={null}
      onSelectDestination={() => {}}
    />
  )
}

export default App
