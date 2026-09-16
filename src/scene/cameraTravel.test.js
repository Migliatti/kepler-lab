import { describe, expect, it } from 'vitest'
import {
  CAMERA_TRAVEL_DURATION_MS,
  getCameraPositionAt,
  getDestinationCameraPosition,
} from './cameraTravel.js'

describe('camera travel', () => {
  it('uses a short, stable illustrative duration', () => {
    expect(CAMERA_TRAVEL_DURATION_MS).toBeGreaterThanOrEqual(3000)
    expect(CAMERA_TRAVEL_DURATION_MS).toBeLessThanOrEqual(6000)
  })

  it('frames a destination from an offset based on its illustrative radius', () => {
    expect(getDestinationCameraPosition({ position: [5, -0.2, 2], radius: 0.5 })).toEqual([
      5,
      1.3,
      4.5,
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
