export function startTravel(destinationId, isCameraTravelEnabled) {
  return {
    destinationId,
    status: isCameraTravelEnabled ? 'travelling' : 'arrived',
  }
}

export function completeTravel(travel) {
  return { ...travel, status: 'arrived' }
}

export function returnToEarth(isCameraTravelEnabled) {
  return startTravel('earth', isCameraTravelEnabled)
}
