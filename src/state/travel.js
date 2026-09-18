import { TRAVEL_MODES } from './preferences.js'

const DEFAULT_TRAVEL_MODE = 'full'

function normaliseTravelMode(travelMode) {
  return TRAVEL_MODES.includes(travelMode) ? travelMode : DEFAULT_TRAVEL_MODE
}

export function startTravel(destinationId, travelMode) {
  const mode = normaliseTravelMode(travelMode)

  return {
    destinationId,
    travelMode: mode,
    // 'instant' não anima: chega já em 'arrived', sem sobreposição de viagem.
    status: mode === 'instant' ? 'arrived' : 'travelling',
  }
}

export function completeTravel(travel) {
  return { ...travel, status: 'arrived' }
}

export function locationAfterTravelStart(currentLocationId, travel) {
  return travel.status === 'arrived' ? travel.destinationId : currentLocationId
}

export function returnToEarth(travelMode) {
  return startTravel('earth', travelMode)
}
