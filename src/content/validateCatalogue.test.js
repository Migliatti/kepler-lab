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
    impact: 'Um pequeno mundo azul que abriga toda a vida conhecida.',
    overview: 'A Terra é um planeta rochoso com água líquida em sua superfície.',
    physics: {
      explanation: 'A gravidade mantém a atmosfera e tudo o que vive sobre a superfície.',
    },
    history: 'A exploração espacial permitiu observar a Terra como um mundo inteiro.',
    facts: [
      { label: 'Raio médio', value: '6.371 km' },
      { label: 'Massa', value: '5,97 × 10²⁴ kg' },
      { label: 'Distância média do Sol', value: '149,6 milhões de km' },
      { label: 'Período orbital', value: '365,26 dias' },
    ],
    sources: [{ title: 'Earth Fact Sheet', publisher: 'NASA', url: 'https://nssdc.gsfc.nasa.gov/' }],
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 1 UA' },
        { label: 'Período orbital', value: 'cerca de 365,25 dias terrestres' },
      ],
    },
    ...overrides,
  }
}

describe('validateCatalogue', () => {
  it('accepts the curated catalogue', () => {
    expect(validateCatalogue(destinations)).toEqual([])
  })

  it('validates the inner Solar System content batch', () => {
    const ids = ['sun', 'mercury', 'venus', 'moon', 'mars']
    const batch = destinations.filter(({ id }) => ids.includes(id))

    expect(batch).toHaveLength(ids.length)
    expect(validateCatalogue(batch)).toEqual([])
  })

  it('validates the outer Solar System content batch', () => {
    const ids = ['jupiter', 'europa', 'io', 'saturn', 'titan', 'uranus', 'neptune', 'pluto']
    const batch = destinations.filter(({ id }) => ids.includes(id))

    expect(batch).toHaveLength(ids.length)
    expect(validateCatalogue(batch)).toEqual([])
  })

  it('validates the stellar and galactic content batch', () => {
    const ids = [
      'alpha-centauri',
      'sirius',
      'betelgeuse',
      'orion-nebula',
      'crab-nebula',
      'galactic-center',
      'milky-way',
    ]
    const batch = destinations.filter(({ id }) => ids.includes(id))

    expect(batch).toHaveLength(ids.length)
    expect(validateCatalogue(batch)).toEqual([])
  })

  it('accepts a valid destination', () => {
    expect(validateCatalogue([makeDestination()])).toEqual([])
  })

  it('reports missing required text fields', () => {
    const errors = validateCatalogue([makeDestination({ name: '', summary: undefined })])

    expect(errors).toContain('earth: "name" must be a non-empty string')
    expect(errors).toContain('earth: "summary" must be a non-empty string')
  })

  it('requires the progressive content fields', () => {
    const destination = makeDestination({
      impact: '',
      overview: undefined,
      physics: { explanation: '' },
      history: '',
    })

    expect(validateCatalogue([destination])).toEqual(
      expect.arrayContaining([
        'earth: "impact" must be a non-empty string',
        'earth: "overview" must be a non-empty string',
        'earth: physics.explanation must be a non-empty string',
        'earth: "history" must be a non-empty string',
      ]),
    )
  })

  it('requires kebab-case ids', () => {
    expect(validateCatalogue([makeDestination({ id: 'Earth Planet' })])).toContain(
      'Earth Planet: "id" must use kebab-case',
    )
  })

  it('validates an optional contextualized formula', () => {
    const physics = {
      explanation: 'A gravidade depende da massa e do raio.',
      formula: { expression: '', variables: [], interpretation: '' },
    }

    expect(validateCatalogue([makeDestination({ physics })])).toEqual(
      expect.arrayContaining([
        'earth: physics.formula.expression must be a non-empty string',
        'earth: physics.formula.variables must have at least one item',
        'earth: physics.formula.interpretation must be a non-empty string',
      ]),
    )
  })

  it('requires complete descriptions for each formula variable', () => {
    const physics = {
      explanation: 'A gravidade depende da massa e do raio.',
      formula: {
        expression: 'g = GM / r²',
        variables: [{ symbol: '', meaning: 'massa', value: '' }],
        interpretation: 'A aceleração aumenta com a massa e diminui com a distância.',
      },
    }

    expect(validateCatalogue([makeDestination({ physics })])).toContain(
      'earth: physics.formula.variables[0] must have a non-empty symbol, meaning and value',
    )
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

  it('requires coordinates with a known kind', () => {
    expect(validateCatalogue([makeDestination({ coordinates: undefined })])).toContain(
      'earth: coordinates.kind must be one of equatorial, orbital',
    )
    expect(
      validateCatalogue([makeDestination({ coordinates: { kind: 'galactic', entries: [] } })]),
    ).toContain('earth: coordinates.kind must be one of equatorial, orbital')
  })

  it('never gives a Solar System body a fixed sky position', () => {
    const coordinates = {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '12h 00m 00s' },
        { label: 'Declinação', value: '+00° 00′' },
      ],
    }

    expect(validateCatalogue([makeDestination({ coordinates })])).toContain(
      'earth: coordinates.kind must be "orbital" for this destination',
    )
  })

  it('requires equatorial coordinates beyond the Solar System', () => {
    const betelgeuse = makeDestination({ id: 'betelgeuse', name: 'Betelgeuse', aliases: [] })

    expect(validateCatalogue([betelgeuse])).toContain(
      'betelgeuse: coordinates.kind must be "equatorial" for this destination',
    )
  })

  it('requires between 2 and 3 complete coordinate entries', () => {
    const [first] = makeDestination().coordinates.entries

    expect(
      validateCatalogue([makeDestination({ coordinates: { kind: 'orbital', entries: [first] } })]),
    ).toContain('earth: coordinates.entries must have between 2 and 3 items')
    expect(
      validateCatalogue([
        makeDestination({
          coordinates: { kind: 'orbital', entries: [first, { label: '', value: '1' }] },
        }),
      ]),
    ).toContain('earth: coordinates.entries[1] must have a non-empty label and value')
  })
})
