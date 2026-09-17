export function TravelOverlay({ destination, travel, onSkip }) {
  if (travel?.status !== 'travelling') return null

  return (
    <p className="travel-status" role="status" aria-live="polite">
      Viajando para <strong>{destination?.name ?? 'destino desconhecido'}</strong>
      <button type="button" onClick={onSkip}>Pular</button>
    </p>
  )
}
