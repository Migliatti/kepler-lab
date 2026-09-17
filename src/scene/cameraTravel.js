export const CAMERA_TRAVEL_DURATION_MS = 3000

// Subtle elastic ease-out: a fast departure, then a single gentle bounce past the
// destination before settling. DAMPING is tuned so the measured peak overshoot (~1.4%)
// stays under CAMERA_TRAVEL_MAX_OVERSHOOT; FREQUENCY makes the curve land exactly on 1.
const DAMPING = 8
const FREQUENCY = 1.5 * Math.PI
export const CAMERA_TRAVEL_MAX_OVERSHOOT = 0.02

export function easeTravelProgress(time) {
  if (time <= 0) return 0
  if (time >= 1) return 1

  return 1 - Math.exp(-DAMPING * time) * Math.cos(FREQUENCY * time)
}

export function getDestinationCameraPosition({ position: [x, y, z], radius }) {
  return [x, y + radius * 3, z + radius * 5]
}

function lerpVector(origin, destination, amount) {
  return origin.map((coordinate, index) => coordinate + (destination[index] - coordinate) * amount)
}

export function getCameraPositionAt(origin, destination, progress) {
  if (progress <= 0) return origin
  if (progress >= 1) return destination

  return lerpVector(origin, destination, progress)
}

export function getCameraTravelFrame({ originPosition, originTarget, destination, progress }) {
  const destinationPosition = getDestinationCameraPosition(destination)

  if (progress >= 1) {
    return { position: destinationPosition, target: destination.position }
  }

  const eased = easeTravelProgress(progress)

  return {
    position: lerpVector(originPosition, destinationPosition, eased),
    target: lerpVector(originTarget, destination.position, eased),
  }
}
