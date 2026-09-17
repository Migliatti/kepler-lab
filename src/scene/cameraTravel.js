export const CAMERA_TRAVEL_DURATION_MS = 3000

// Um mapa único por modo, para que não haja número mágico de duração espalhado
// pela cena. 'instant' é zero porque a viagem nunca chega a animar.
export const TRAVEL_DURATIONS_MS = Object.freeze({
  full: CAMERA_TRAVEL_DURATION_MS,
  short: 1200,
  instant: 0,
})

export function getTravelDurationMs(travelMode) {
  return Object.hasOwn(TRAVEL_DURATIONS_MS, travelMode)
    ? TRAVEL_DURATIONS_MS[travelMode]
    : TRAVEL_DURATIONS_MS.full
}

// Must match OrbitControls' minDistance in SceneCanvas. Framing offsets scaled purely by a
// destination's illustrative radius can land closer than that limit for small bodies, which makes
// OrbitControls clamp the camera outward the instant the trip ends — a visible flick unrelated to
// the destination itself. Flooring the offset at this distance keeps the arrival frame stable.
export const CAMERA_TRAVEL_MIN_DISTANCE = 5

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
  const offset = [0, radius * 3, radius * 5]
  const length = Math.hypot(...offset)
  const scale = length > 0 ? Math.max(1, CAMERA_TRAVEL_MIN_DISTANCE / length) : 1

  return [x + offset[0] * scale, y + offset[1] * scale, z + offset[2] * scale]
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
