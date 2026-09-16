function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

export function searchDestinations(destinations, query) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return destinations
  }

  return destinations.filter((destination) => {
    const searchableValues = [
      destination.name,
      destination.type,
      destination.region,
      destination.summary,
      ...destination.aliases,
    ]

    return searchableValues.some((value) => normalizeText(value).includes(normalizedQuery))
  })
}
