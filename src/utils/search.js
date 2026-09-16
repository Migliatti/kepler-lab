import { normalizeText } from './text.js'

const RANK = {
  exactTerm: 0,
  termPrefix: 1,
  termPartial: 2,
  typeOrRegion: 3,
  summary: 4,
}

function rankDestination(destination, query) {
  const terms = [destination.name, ...(destination.aliases ?? [])].map(normalizeText)

  if (terms.includes(query)) return RANK.exactTerm
  if (terms.some((term) => term.startsWith(query))) return RANK.termPrefix
  if (terms.some((term) => term.includes(query))) return RANK.termPartial

  const details = [destination.type, destination.region].map(normalizeText)
  if (details.some((detail) => detail.includes(query))) return RANK.typeOrRegion

  if (normalizeText(destination.summary).includes(query)) return RANK.summary

  return null
}

/**
 * Filters the curated catalogue by name, alias, type, region and summary.
 * Results are ordered by match relevance, keeping catalogue order for ties.
 * An empty query returns no results; use getSuggestedDestinations instead.
 */
export function searchDestinations(destinations, query) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return []
  }

  return destinations
    .map((destination, index) => ({
      destination,
      index,
      rank: rankDestination(destination, normalizedQuery),
    }))
    .filter((result) => result.rank !== null)
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((result) => result.destination)
}

/** Destinations suggested before the visitor types, in catalogue order. */
export function getSuggestedDestinations(destinations) {
  return destinations.filter((destination) => destination.featured === true)
}
