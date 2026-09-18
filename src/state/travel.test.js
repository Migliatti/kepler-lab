import { describe, expect, it } from 'vitest'
import { completeTravel, locationAfterTravelStart, returnToEarth, startTravel } from './travel.js'

describe('travel state', () => {
  it('animates the full trip by default', () => {
    expect(startTravel('mars')).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'travelling',
    })
  })

  it('animates the short trip too', () => {
    expect(startTravel('mars', 'short')).toEqual({
      destinationId: 'mars', travelMode: 'short', status: 'travelling',
    })
  })

  it('arrives immediately in instant mode', () => {
    expect(startTravel('mars', 'instant')).toEqual({
      destinationId: 'mars', travelMode: 'instant', status: 'arrived',
    })
  })

  it('treats an unknown mode as the full trip', () => {
    expect(startTravel('mars', 'warp')).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'travelling',
    })
  })

  it('marks the same destination as arrived when a journey is skipped', () => {
    const travel = { destinationId: 'mars', travelMode: 'full', status: 'travelling' }

    expect(completeTravel(travel)).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'arrived',
    })
    expect(travel.status).toBe('travelling')
  })

  it('returns to Earth in the chosen mode', () => {
    expect(returnToEarth('short')).toEqual({
      destinationId: 'earth', travelMode: 'short', status: 'travelling',
    })
    expect(returnToEarth('instant')).toEqual({
      destinationId: 'earth', travelMode: 'instant', status: 'arrived',
    })
  })

  it('updates the current location when an instant journey starts', () => {
    expect(locationAfterTravelStart('earth', startTravel('mars', 'instant'))).toBe('mars')
    expect(locationAfterTravelStart('mars', returnToEarth('instant'))).toBe('earth')
  })

  it('keeps the current location while an animated journey is in progress', () => {
    expect(locationAfterTravelStart('earth', startTravel('mars', 'short'))).toBe('earth')
  })
})
