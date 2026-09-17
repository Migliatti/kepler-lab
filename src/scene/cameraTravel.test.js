import { describe, expect, it } from 'vitest'
import {
  CAMERA_TRAVEL_DURATION_MS,
  getCameraPositionAt,
  getCameraTravelFrame,
  getDestinationCameraPosition,
} from './cameraTravel.js'

describe('camera travel', () => {
  it('uses a short, stable illustrative duration', () => {
    expect(CAMERA_TRAVEL_DURATION_MS).toBe(4500)
  })

  it('frames a destination from an offset based on its illustrative radius', () => {
    expect(getDestinationCameraPosition({ position: [5, -0.2, 2], radius: 0.5 })).toEqual([
      5,
      1.3,
      4.5,
    ])
  })

  it('frames Sagittarius A* using its illustrative radius', () => {
    expect(getDestinationCameraPosition({ position: [-42, -3, 24], radius: 1.1 })).toEqual([
      -42,
      0.30000000000000027,
      29.5,
    ])
  })

  it('keeps the camera at its origin before travel and at its target after travel', () => {
    const origin = [0, 9, 24]
    const destination = [5, 1.3, 4.5]

    expect(getCameraPositionAt(origin, destination, 0)).toEqual(origin)
    expect(getCameraPositionAt(origin, destination, 1)).toEqual(destination)
  })

  it('clamps progress below zero to the origin and above one to the target', () => {
    const origin = [0, 9, 24]
    const destination = [5, 1.3, 4.5]

    expect(getCameraPositionAt(origin, destination, -0.1)).toEqual(origin)
    expect(getCameraPositionAt(origin, destination, 1.1)).toEqual(destination)
  })

  it('moves through the midpoint halfway through the journey', () => {
    expect(getCameraPositionAt([0, 0, 0], [8, 4, -2], 0.5)).toEqual([4, 2, -1])
  })
})

describe('camera travel frame', () => {
  const destination = { position: [5, -0.2, 2], radius: 0.5 }
  const originPosition = [0, 9, 24]
  const originTarget = [0, 0, 0]

  it('starts at the origin position looking at the origin target', () => {
    expect(getCameraTravelFrame({ originPosition, originTarget, destination, progress: 0 })).toEqual({
      position: originPosition,
      target: originTarget,
    })
  })

  it('ends framed on the destination and looking at its centre', () => {
    expect(getCameraTravelFrame({ originPosition, originTarget, destination, progress: 1 })).toEqual({
      position: [5, 1.3, 4.5],
      target: [5, -0.2, 2],
    })
  })

  it('moves the orbit target along with the camera so orientation never snaps', () => {
    const frame = getCameraTravelFrame({ originPosition, originTarget, destination, progress: 0.5 })

    expect(frame.target).toEqual([2.5, -0.1, 1])
    expect(frame.position).toEqual([2.5, 5.15, 14.25])
  })
})
