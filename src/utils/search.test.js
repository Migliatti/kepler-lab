import { describe, expect, it } from 'vitest'

import { getSuggestedDestinations, searchDestinations } from './search.js'

const sagittariusA = {
  id: 'sagittarius-a-star',
  name: 'Sagittarius A*',
  aliases: ['buraco negro', 'Sgr A*'],
  type: 'Buraco negro supermassivo',
  region: 'Centro da Via Láctea',
  summary: 'O buraco negro supermassivo no centro da nossa galáxia.',
  featured: true,
}

const sun = {
  id: 'sun',
  name: 'Sol',
  aliases: [],
  type: 'Estrela',
  region: 'Sistema Solar',
  summary: 'A estrela que ilumina a Terra.',
  featured: true,
}

const earth = {
  id: 'earth',
  name: 'Terra',
  aliases: ['nosso planeta'],
  type: 'Planeta rochoso',
  region: 'Sistema Solar',
  summary: 'O terceiro planeta a partir do Sol.',
  featured: false,
}

const ids = (destinations) => destinations.map((destination) => destination.id)

describe('searchDestinations', () => {
  it('finds a destination from a case- and accent-insensitive alias', () => {
    expect(ids(searchDestinations([sagittariusA], 'BURÁCO NÉGRO'))).toEqual(['sagittarius-a-star'])
  })

  it('returns no results for an empty query', () => {
    expect(searchDestinations([sun, earth], '   ')).toEqual([])
  })

  it('returns no results when nothing matches', () => {
    expect(searchDestinations([sun, earth], 'quasar')).toEqual([])
  })

  it('ranks name matches before region and summary matches', () => {
    // "sol" matches Sol by name, and Terra by region ("Sistema Solar") and summary.
    expect(ids(searchDestinations([earth, sun], 'sol'))).toEqual(['sun', 'earth'])
  })

  it('ranks exact, then prefix, then partial name matches, then other fields', () => {
    const exact = { ...sun, id: 'exact', name: 'Saturno' }
    const prefix = { ...sun, id: 'prefix', name: 'Saturno e seus anéis' }
    const partial = { ...sun, id: 'partial', name: 'Luas de Saturno' }
    const region = { ...sun, id: 'region', name: 'Titã', region: 'Órbita de Saturno' }

    expect(ids(searchDestinations([region, partial, prefix, exact], 'saturno'))).toEqual([
      'exact',
      'prefix',
      'partial',
      'region',
    ])
  })

  it('keeps catalogue order for equally ranked results', () => {
    expect(ids(searchDestinations([sun, earth], 'sistema solar'))).toEqual(['sun', 'earth'])
  })

  it('tolerates destinations with missing optional fields', () => {
    const partial = { id: 'moon', name: 'Lua' }

    expect(ids(searchDestinations([partial], 'lua'))).toEqual(['moon'])
  })

  it('treats a non-string query as empty', () => {
    expect(searchDestinations([sun], undefined)).toEqual([])
  })

  it('does not mutate the catalogue', () => {
    const catalogue = [earth, sun]
    searchDestinations(catalogue, 'sol')

    expect(ids(catalogue)).toEqual(['earth', 'sun'])
  })
})

describe('getSuggestedDestinations', () => {
  it('returns featured destinations in catalogue order', () => {
    expect(ids(getSuggestedDestinations([sun, earth, sagittariusA]))).toEqual([
      'sun',
      'sagittarius-a-star',
    ])
  })
})
