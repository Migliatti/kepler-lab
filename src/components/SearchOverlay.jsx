import { useState } from 'react'
import { getSuggestedDestinations, searchDestinations } from '../utils/search.js'

export function SearchOverlay({ destinations, isOpen, onClose, onTravelTo }) {
  const [query, setQuery] = useState('')

  if (!isOpen) return null

  const visibleDestinations = query.trim()
    ? searchDestinations(destinations, query)
    : getSuggestedDestinations(destinations)

  function handleTravelTo(destinationId) {
    setQuery('')
    onTravelTo(destinationId)
  }

  function handleClose() {
    setQuery('')
    onClose()
  }

  return (
    <section className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div className="search-overlay__header">
        <h2 id="search-title">Buscar destino</h2>
        <button type="button" className="icon-button" onClick={handleClose} aria-label="Fechar busca">
          Fechar
        </button>
      </div>
      <input
        autoFocus
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busque um destino"
        aria-label="Buscar destino"
      />
      <div className="search-results" aria-live="polite">
        {visibleDestinations.length > 0 ? visibleDestinations.map((destination) => (
          <article className="search-result" key={destination.id}>
            <div>
              <h3>{destination.name}</h3>
              <p>{destination.type} · {destination.region}</p>
              <p>{destination.summary}</p>
            </div>
            <button type="button" onClick={() => handleTravelTo(destination.id)}>
              Ir até lá
            </button>
          </article>
        )) : (
          <p className="search-empty">Nenhum destino do catálogo corresponde a esta busca.</p>
        )}
      </div>
    </section>
  )
}
