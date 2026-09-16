import { normalizeText } from '../utils/text.js'
import { DESTINATION_CATEGORIES } from './categories.js'

const REQUIRED_TEXT_FIELDS = ['id', 'name', 'category', 'type', 'region', 'summary']
const MIN_FACTS = 4
const MAX_FACTS = 5

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== ''

function validateDestination(destination) {
  const errors = []

  for (const field of REQUIRED_TEXT_FIELDS) {
    if (!isNonEmptyString(destination[field])) {
      errors.push(`"${field}" must be a non-empty string`)
    }
  }

  if (
    isNonEmptyString(destination.category) &&
    !DESTINATION_CATEGORIES.includes(destination.category)
  ) {
    errors.push(`"category" must be one of ${DESTINATION_CATEGORIES.join(', ')}`)
  }

  if (!Array.isArray(destination.aliases) || !destination.aliases.every(isNonEmptyString)) {
    errors.push('"aliases" must be an array of non-empty strings')
  }

  if (typeof destination.featured !== 'boolean') {
    errors.push('"featured" must be a boolean')
  }

  const facts = Array.isArray(destination.facts) ? destination.facts : []
  if (facts.length < MIN_FACTS || facts.length > MAX_FACTS) {
    errors.push(`"facts" must have between ${MIN_FACTS} and ${MAX_FACTS} items`)
  }
  facts.forEach((fact, index) => {
    if (!isNonEmptyString(fact?.label) || !isNonEmptyString(fact?.value)) {
      errors.push(`facts[${index}] must have a non-empty label and value`)
    }
  })

  const sources = Array.isArray(destination.sources) ? destination.sources : []
  if (sources.length === 0) {
    errors.push('"sources" must have at least one item')
  }
  sources.forEach((source, index) => {
    if (!isNonEmptyString(source?.title) || !isNonEmptyString(source?.publisher)) {
      errors.push(`sources[${index}] must have a non-empty title and publisher`)
    }
    if (!isNonEmptyString(source?.url) || !source.url.startsWith('https://')) {
      errors.push(`sources[${index}].url must be an https URL`)
    }
  })

  return errors
}

/**
 * Checks the curated catalogue against the content model.
 * Returns readable error messages; an empty list means the catalogue is valid.
 */
export function validateCatalogue(destinations) {
  const errors = []
  const seenIds = new Set()
  const termOwners = new Map()

  for (const destination of destinations) {
    const label = isNonEmptyString(destination?.id) ? destination.id : '(missing id)'

    for (const error of validateDestination(destination ?? {})) {
      errors.push(`${label}: ${error}`)
    }

    if (seenIds.has(destination?.id)) {
      errors.push(`${label}: duplicate id`)
      continue
    }
    seenIds.add(destination?.id)

    // Names and aliases must lead search to a single destination.
    const aliases = Array.isArray(destination?.aliases) ? destination.aliases : []
    const terms = new Set([destination?.name, ...aliases].map(normalizeText).filter(Boolean))
    for (const term of terms) {
      const owner = termOwners.get(term)
      if (owner) {
        errors.push(`${label}: search term "${term}" is already used by ${owner}`)
      } else {
        termOwners.set(term, label)
      }
    }
  }

  return errors
}
