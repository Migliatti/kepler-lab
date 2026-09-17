export function ReturnToEarthButton({ currentLocationId, onReturnToEarth }) {
  if (currentLocationId === 'earth') return null

  return (
    <button type="button" className="return-to-earth" onClick={onReturnToEarth}>
      Voltar à Terra
    </button>
  )
}
