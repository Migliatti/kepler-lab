import { describe, expect, it } from 'vitest'

import { destinations } from './destinations.js'
import { validateCatalogue } from './validateCatalogue.js'

function makeDestination(overrides = {}) {
  return {
    id: 'earth',
    name: 'Terra',
    aliases: ['nosso planeta'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar',
    summary: 'O terceiro planeta a partir do Sol.',
    featured: true,
    facts: [
      { label: 'Raio médio', value: '6.371 km' },
      { label: 'Massa', value: '5,97 × 10²⁴ kg' },
      { label: 'Distância média do Sol', value: '149,6 milhões de km' },
      { label: 'Período orbital', value: '365,26 dias' },
    ],
    sources: [{ title: 'Earth Fact Sheet', publisher: 'NASA', url: 'https://nssdc.gsfc.nasa.gov/' }],
    ...overrides,
  }
}

describe('validateCatalogue', () => {
  it('accepts the curated catalogue', () => {
    expect(validateCatalogue(destinations)).toEqual([])
  })

  it('accepts a valid destination', () => {
    expect(validateCatalogue([makeDestination()])).toEqual([])
  })

  it('reports missing required text fields', () => {
    const errors = validateCatalogue([makeDestination({ name: '', summary: undefined })])

    expect(errors).toContain('earth: "name" must be a non-empty string')
    expect(errors).toContain('earth: "summary" must be a non-empty string')
  })

  it('reports an unknown category', () => {
    expect(validateCatalogue([makeDestination({ category: 'comet' })])).toContain(
      'earth: "category" must be one of planet, dwarf-planet, moon, star, star-system, nebula, black-hole, galactic-region',
    )
  })

  it('requires between 4 and 5 facts for the data card', () => {
    const facts = makeDestination().facts.slice(0, 3)

    expect(validateCatalogue([makeDestination({ facts })])).toContain(
      'earth: "facts" must have between 4 and 5 items',
    )
  })

  it('requires at least one https source', () => {
    expect(validateCatalogue([makeDestination({ sources: [] })])).toContain(
      'earth: "sources" must have at least one item',
    )
    expect(
      validateCatalogue([
        makeDestination({ sources: [{ title: 'X', publisher: 'Y', url: 'http://example.com' }] }),
      ]),
    ).toContain('earth: sources[0].url must be an https URL')
  })

  it('reports duplicate ids', () => {
    expect(validateCatalogue([makeDestination(), makeDestination()])).toContain(
      'earth: duplicate id',
    )
  })

  it('reports search terms shared by different destinations', () => {
    const moon = makeDestination({ id: 'moon', name: 'Lua', aliases: ['Nosso Planeta'] })

    expect(validateCatalogue([makeDestination(), moon])).toContain(
      'moon: search term "nosso planeta" is already used by earth',
    )
  })
})
