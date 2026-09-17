import { describe, expect, it } from 'vitest'
import {
  CAMERA_TRAVEL_DURATION_MS,
  CAMERA_TRAVEL_MAX_OVERSHOOT,
  easeTravelProgress,
  getCameraPositionAt,
  getCameraTravelFrame,
  getDestinationCameraPosition,
} from './cameraTravel.js'

describe('camera travel', () => {
  it('uses a short, stable illustrative duration', () => {
    expect(CAMERA_TRAVEL_DURATION_MS).toBe(3000)
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
    const eased = easeTravelProgress(0.5)

    expect(frame.target).toEqual(originTarget.map((c, i) => c + (destination.position[i] - c) * eased))
    expect(frame.position).toEqual(originPosition.map((c, i) => c + ([5, 1.3, 4.5][i] - c) * eased))
  })

  it('lets the camera overshoot slightly past the destination before settling', () => {
    const peak = Math.max(
      ...Array.from({ length: 300 }, (_, i) => easeTravelProgress(i / 300)),
    )
    const frame = getCameraTravelFrame({ originPosition, originTarget, destination, progress: 2 / 3 })

    expect(peak).toBeGreaterThan(1)
    expect(frame.target[0]).toBeGreaterThan(destination.position[0])
  })
})

describe('easeTravelProgress', () => {
  it('starts at the origin and ends exactly at the destination', () => {
    expect(easeTravelProgress(0)).toBe(0)
    expect(easeTravelProgress(1)).toBe(1)
  })

  it('clamps time outside the journey', () => {
    expect(easeTravelProgress(-0.5)).toBe(0)
    expect(easeTravelProgress(1.5)).toBe(1)
  })

  it('accelerates quickly and never moves backwards before first reaching the destination', () => {
    let previous = 0
    for (let i = 1; i <= 100; i += 1) {
      const value = easeTravelProgress(i / 300)
      expect(value).toBeGreaterThanOrEqual(previous)
      previous = value
    }
    expect(easeTravelProgress(0.1)).toBeGreaterThan(0.1)
  })

  it('keeps the elastic overshoot subtle', () => {
    const peak = Math.max(
      ...Array.from({ length: 1000 }, (_, i) => easeTravelProgress(i / 1000)),
    )

    expect(peak).toBeGreaterThan(1)
    expect(peak).toBeLessThanOrEqual(1 + CAMERA_TRAVEL_MAX_OVERSHOOT)
    expect(CAMERA_TRAVEL_MAX_OVERSHOOT).toBeLessThanOrEqual(0.03)
  })
})
