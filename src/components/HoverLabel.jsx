export function HoverLabel({ destination, isSelected }) {
  if (!destination) return null

  return (
    <p className="hover-label" role="status" aria-live="polite">
      <strong>{destination.name}</strong>
      <span>{isSelected ? 'Toque de novo para viajar' : destination.type}</span>
    </p>
  )
}
