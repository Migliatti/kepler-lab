import { describe, expect, it } from 'vitest'

import { searchDestinations } from './search.js'

describe('searchDestinations', () => {
  it('finds a destination from a case- and accent-insensitive alias', () => {
    const destinations = [
      {
        id: 'sagittarius-a-star',
        name: 'Sagittarius A*',
        aliases: ['buraco negro'],
        type: 'Buraco negro supermassivo',
        region: 'Centro da Via Láctea',
        summary: 'O buraco negro supermassivo no centro da nossa galáxia.',
      },
    ]

    expect(searchDestinations(destinations, 'BURÁCO NÉGRO')).toEqual(destinations)
  })
})
