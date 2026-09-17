export function SelectionCard({ destination, currentLocationId, travel, onTravelTo }) {
  if (!destination || destination.id === currentLocationId || travel?.status === 'travelling') {
    return null
  }

  return (
    <aside className="selection-card" role="dialog" aria-label="Destino selecionado">
      <p className="eyebrow">{destination.type}</p>
      <h2>{destination.name}</h2>
      <button type="button" onClick={() => onTravelTo(destination.id)}>
        Ir até {destination.name}
      </button>
    </aside>
  )
}
