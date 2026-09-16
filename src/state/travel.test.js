import { describe, expect, it } from 'vitest'
import { completeTravel, returnToEarth, startTravel } from './travel.js'

describe('travel state', () => {
  it('starts an animated journey when camera travel is enabled', () => {
    expect(startTravel('mars', true)).toEqual({ destinationId: 'mars', status: 'travelling' })
  })

  it('arrives immediately when camera travel is disabled', () => {
    expect(startTravel('mars', false)).toEqual({ destinationId: 'mars', status: 'arrived' })
  })

  it('marks the same destination as arrived when a journey is skipped', () => {
    const travel = { destinationId: 'mars', status: 'travelling' }

    expect(completeTravel(travel)).toEqual({
      destinationId: 'mars',
      status: 'arrived',
    })
    expect(travel).toEqual({ destinationId: 'mars', status: 'travelling' })
  })

  it('returns to Earth with camera travel enabled', () => {
    expect(returnToEarth(true)).toEqual({ destinationId: 'earth', status: 'travelling' })
  })

  it('returns to Earth immediately when camera travel is disabled', () => {
    expect(returnToEarth(false)).toEqual({ destinationId: 'earth', status: 'arrived' })
  })
})
