import { normalizeText } from '../utils/text.js'
import { DESTINATION_CATEGORIES } from './categories.js'
import { CURIOSITY_TOPIC_IDS } from './curiosityTopics.js'
import { SOLAR_SYSTEM_IDS } from './regions.js'

const REQUIRED_TEXT_FIELDS = ['id', 'name', 'category', 'type', 'region', 'summary']
const PROGRESSIVE_TEXT_FIELDS = ['impact', 'overview', 'history']
const MIN_FACTS = 4
const MAX_FACTS = 5
const KEBAB_CASE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const COORDINATE_KINDS = ['equatorial', 'orbital']
const MIN_COORDINATE_ENTRIES = 2
const MAX_COORDINATE_ENTRIES = 3
const MIN_CURIOSITIES = 2
const MAX_CURIOSITIES = 4

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== ''

function validateCuriosities(curiosities) {
  const errors = []
  const items = Array.isArray(curiosities) ? curiosities : []

  if (items.length < MIN_CURIOSITIES || items.length > MAX_CURIOSITIES) {
    errors.push(`"curiosities" must have between ${MIN_CURIOSITIES} and ${MAX_CURIOSITIES} items`)
  }

  const seenTopics = new Set()
  items.forEach((curiosity, index) => {
    if (!CURIOSITY_TOPIC_IDS.includes(curiosity?.topic)) {
      errors.push(`curiosities[${index}].topic must be one of ${CURIOSITY_TOPIC_IDS.join(', ')}`)
    } else if (seenTopics.has(curiosity.topic)) {
      errors.push(`curiosities[${index}].topic "${curiosity.topic}" is repeated`)
    } else {
      seenTopics.add(curiosity.topic)
    }

    if (!isNonEmptyString(curiosity?.text)) {
      errors.push(`curiosities[${index}] must have a non-empty text`)
    }
  })

  return errors
}

function validateDestination(destination) {
  const errors = []

  for (const field of REQUIRED_TEXT_FIELDS) {
    if (!isNonEmptyString(destination[field])) {
      errors.push(`"${field}" must be a non-empty string`)
    }
  }

  if (isNonEmptyString(destination.id) && !KEBAB_CASE_ID.test(destination.id)) {
    errors.push('"id" must use kebab-case')
  }

  for (const field of PROGRESSIVE_TEXT_FIELDS) {
    if (!isNonEmptyString(destination[field])) {
      errors.push(`"${field}" must be a non-empty string`)
    }
  }

  if (!isNonEmptyString(destination.physics?.explanation)) {
    errors.push('physics.explanation must be a non-empty string')
  }

  const formula = destination.physics?.formula
  if (formula !== undefined) {
    if (!isNonEmptyString(formula?.expression)) {
      errors.push('physics.formula.expression must be a non-empty string')
    }

    const variables = Array.isArray(formula?.variables) ? formula.variables : []
    if (variables.length === 0) {
      errors.push('physics.formula.variables must have at least one item')
    }
    variables.forEach((variable, index) => {
      if (
        !isNonEmptyString(variable?.symbol) ||
        !isNonEmptyString(variable?.meaning) ||
        !isNonEmptyString(variable?.value)
      ) {
        errors.push(
          `physics.formula.variables[${index}] must have a non-empty symbol, meaning and value`,
        )
      }
    })

    if (!isNonEmptyString(formula?.interpretation)) {
      errors.push('physics.formula.interpretation must be a non-empty string')
    }
  }

  errors.push(...validateCuriosities(destination.curiosities))

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

  const coordinates = destination.coordinates
  if (!COORDINATE_KINDS.includes(coordinates?.kind)) {
    errors.push(`coordinates.kind must be one of ${COORDINATE_KINDS.join(', ')}`)
  } else {
    const expectedKind = SOLAR_SYSTEM_IDS.includes(destination.id) ? 'orbital' : 'equatorial'
    if (coordinates.kind !== expectedKind) {
      errors.push(`coordinates.kind must be "${expectedKind}" for this destination`)
    }
  }

  const coordinateEntries = Array.isArray(coordinates?.entries) ? coordinates.entries : []
  if (
    coordinateEntries.length < MIN_COORDINATE_ENTRIES ||
    coordinateEntries.length > MAX_COORDINATE_ENTRIES
  ) {
    errors.push(
      `coordinates.entries must have between ${MIN_COORDINATE_ENTRIES} and ${MAX_COORDINATE_ENTRIES} items`,
    )
  }
  coordinateEntries.forEach((entry, index) => {
    if (!isNonEmptyString(entry?.label) || !isNonEmptyString(entry?.value)) {
      errors.push(`coordinates.entries[${index}] must have a non-empty label and value`)
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
