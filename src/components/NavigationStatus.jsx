export function NavigationStatus({ destination }) {
  if (!destination) return null

  return (
    <aside className="navigation-status" aria-label="Localização atual">
      <p>Você está em: <strong>{destination.name}</strong></p>
      <p className="navigation-status__type">{destination.type}</p>
    </aside>
  )
}
