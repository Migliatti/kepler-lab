export function NavigationStatus({ destination, onReturnToEarth }) {
  if (!destination) return null

  return (
    <aside className="navigation-status" aria-label="Localização atual">
      <p>Você está em: <strong>{destination.name}</strong></p>
      {destination.id !== 'earth' && (
        <button type="button" onClick={onReturnToEarth}>Voltar à Terra</button>
      )}
    </aside>
  )
}
