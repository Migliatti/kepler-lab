export function TravelOverlay({ destination, travel, onSkip }) {
  if (travel?.status !== 'travelling') return null

  return (
    <aside className="travel-overlay" role="status" aria-live="polite">
      <p className="eyebrow">Em viagem</p>
      <h2>{destination?.name ?? 'Destino desconhecido'}</h2>
      <p>Distância ilustrativa na cena</p>
      <button type="button" onClick={onSkip}>Pular viagem</button>
    </aside>
  )
}
