export const CAMERA_TRAVEL_DURATION_MS = 4500

export function getDestinationCameraPosition({ position: [x, y, z], radius }) {
  return [x, y + radius * 3, z + radius * 5]
}

export function getCameraPositionAt(origin, destination, progress) {
  if (progress <= 0) return origin
  if (progress >= 1) return destination

  return origin.map((coordinate, index) => coordinate + (destination[index] - coordinate) * progress)
}

export function getCameraTravelFrame({ originPosition, originTarget, destination, progress }) {
  return {
    position: getCameraPositionAt(originPosition, getDestinationCameraPosition(destination), progress),
    target: getCameraPositionAt(originTarget, destination.position, progress),
  }
}
