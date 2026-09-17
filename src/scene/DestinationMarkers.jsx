import { Billboard, Html } from '@react-three/drei'

function stopSceneInteraction(event) {
  event.stopPropagation()
}

function DestinationMarker({ destination, isSelected, isCurrentLocation, onSelectDestination }) {
  if (isCurrentLocation) return null

  return (
    <Billboard position={destination.position}>
      <Html center distanceFactor={12}>
        <button
          className="destination-marker"
          type="button"
          aria-pressed={isSelected}
          onClick={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(destination.id)
          }}
          onPointerDown={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(destination.id)
          }}
        >
          <span>{destination.name}</span>
          <small>{destination.type}</small>
        </button>
      </Html>
    </Billboard>
  )
}

function ClusterMarker({ item, destinationById, onSelectDestination }) {
  const firstDestination = destinationById.get(item.destinations[0])

  return (
    <Billboard position={item.position}>
      <Html center distanceFactor={12}>
        <button
          className="destination-marker destination-marker--cluster"
          type="button"
          onClick={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(firstDestination.id)
          }}
          onPointerDown={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(firstDestination.id)
          }}
        >
          {item.destinations.length} destinos nesta região
        </button>
      </Html>
    </Billboard>
  )
}

export function DestinationMarkers({ items, destinationById, selectedId, currentLocationId, onSelectDestination }) {
  return items.map((item) => {
    if (item.kind === 'cluster') {
      return (
        <ClusterMarker
          key={item.id}
          item={item}
          destinationById={destinationById}
          onSelectDestination={onSelectDestination}
        />
      )
    }

    const destination = destinationById.get(item.destination.id)

    return (
      <DestinationMarker
        key={destination.id}
        destination={{ ...item.destination, ...destination }}
        isSelected={destination.id === selectedId}
        isCurrentLocation={destination.id === currentLocationId}
        onSelectDestination={onSelectDestination}
      />
    )
  })
}
