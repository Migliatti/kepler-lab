import { useState } from 'react'
import { getSuggestedDestinations, searchDestinations } from '../utils/search.js'

export function NavSidebar({
  destinations,
  currentLocation,
  selectedId,
  currentLocationId,
  onSelectDestination,
  onConfirmTravel,
  onReturnToEarth,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const visibleDestinations = query.trim()
    ? searchDestinations(destinations, query)
    : getSuggestedDestinations(destinations)

  function handleRowClick(destinationId) {
    if (destinationId === selectedId) {
      setQuery('')
      setIsOpen(false)
      onConfirmTravel(destinationId)
      return
    }

    onSelectDestination(destinationId)
  }

  function handleReturnToEarth() {
    setIsOpen(false)
    onReturnToEarth()
  }

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="nav-sidebar"
        onClick={() => setIsOpen((open) => !open)}
      >
        Navegação
      </button>
      {isOpen && (
        <aside id="nav-sidebar" className="nav-sidebar" aria-label="Navegação de destinos">
          <p className="nav-sidebar__location">
            Você está em: <strong>{currentLocation?.name}</strong>
          </p>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque um destino"
            aria-label="Buscar destino"
          />
          <div className="nav-sidebar__results" aria-live="polite">
            {visibleDestinations.length > 0 ? visibleDestinations.map((destination) => {
              const isSelected = destination.id === selectedId

              return (
                <button
                  type="button"
                  key={destination.id}
                  className="nav-sidebar__row"
                  aria-pressed={isSelected}
                  onClick={() => handleRowClick(destination.id)}
                >
                  <span>{destination.name}</span>
                  <small>{isSelected ? 'Toque de novo para viajar' : destination.type}</small>
                </button>
              )
            }) : (
              <p className="search-empty">Nenhum destino do catálogo corresponde a esta busca.</p>
            )}
          </div>
          {currentLocationId !== 'earth' && (
            <button type="button" className="nav-sidebar__return" onClick={handleReturnToEarth}>
              Voltar à Terra
            </button>
          )}
        </aside>
      )}
    </>
  )
}
