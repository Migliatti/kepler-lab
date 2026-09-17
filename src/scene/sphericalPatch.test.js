import { describe, expect, it } from 'vitest'
import {
  averageDirection,
  buildOutlineSegments,
  buildPatchGeometry,
  circleOutline,
  ellipseOutline,
  latLonToVector3,
  maxAngularRadius,
  outlineToVectors,
} from './sphericalPatch.js'

const TRIANGLE = [
  [0, 0],
  [10, 0],
  [5, 10],
]

describe('latLonToVector3', () => {
  it('puts the north pole on +Y and the prime meridian on +Z', () => {
    const pole = latLonToVector3(0, 90)
    expect(pole.y).toBeCloseTo(1)

    const greenwich = latLonToVector3(0, 0)
    expect(greenwich.z).toBeCloseTo(1)

    const east = latLonToVector3(90, 0)
    expect(east.x).toBeCloseTo(1)
  })

  it('returns unit vectors', () => {
    expect(latLonToVector3(137, -42).length()).toBeCloseTo(1)
  })
})

describe('maxAngularRadius', () => {
  it('measures the farthest vertex from the centre of the outline', () => {
    const vectors = outlineToVectors(circleOutline(20, -30, 15))
    const centre = averageDirection(vectors)

    expect(centre.angleTo(latLonToVector3(20, -30))).toBeCloseTo(0, 5)
    expect(maxAngularRadius(vectors, centre)).toBeCloseTo((15 * Math.PI) / 180, 2)
  })
})

describe('buildPatchGeometry', () => {
  it('keeps every vertex on the lifted sphere', () => {
    const geometry = buildPatchGeometry(2, TRIANGLE, { lift: 0.1 })
    const position = geometry.attributes.position

    expect(position.count).toBeGreaterThan(0)
    for (let index = 0; index < position.count; index++) {
      const distance = Math.hypot(position.getX(index), position.getY(index), position.getZ(index))
      expect(distance).toBeCloseTo(2.1, 5)
    }
  })

  it('subdivides long edges so the patch follows the curvature', () => {
    const coarse = buildPatchGeometry(1, TRIANGLE, { maxEdgeAngle: 1 })
    const fine = buildPatchGeometry(1, TRIANGLE, { maxEdgeAngle: 0.02 })

    expect(coarse.attributes.position.count).toBe(3)
    expect(fine.attributes.position.count).toBeGreaterThan(coarse.attributes.position.count)
  })

  it('refuses an outline wider than a single patch can hold', () => {
    const halfWorld = [
      [-90, 0],
      [90, 0],
      [0, 80],
    ]

    expect(() => buildPatchGeometry(1, halfWorld)).toThrow(/MAX_PATCH_ANGLE/)
  })
})

describe('buildOutlineSegments', () => {
  it('closes the loop when nothing is broken', () => {
    const segments = buildOutlineSegments(1, TRIANGLE, { maxEdgeAngle: 10 })

    expect(segments).toHaveLength(1)
    expect(segments[0].attributes.position.count).toBe(4)
  })

  it('splits the line where a seam hides an edge', () => {
    const segments = buildOutlineSegments(1, TRIANGLE, { maxEdgeAngle: 10, breaks: [1] })

    expect(segments).toHaveLength(2)
    expect(segments.map((geometry) => geometry.attributes.position.count)).toEqual([2, 2])
  })

  it('drops every edge marked as a seam', () => {
    const segments = buildOutlineSegments(1, TRIANGLE, { maxEdgeAngle: 10, breaks: [0, 1, 2] })

    expect(segments).toHaveLength(0)
  })
})

describe('ellipseOutline', () => {
  it('spans the requested extent around its centre', () => {
    const outline = ellipseOutline(30, 10, 20, 6, 0, 32)
    const vectors = outlineToVectors(outline)
    const centre = latLonToVector3(30, 10)

    expect(maxAngularRadius(vectors, centre)).toBeCloseTo((10 * Math.PI) / 180, 2)
  })

  it('is deterministic', () => {
    expect(ellipseOutline(12, -4, 9, 3, 25)).toEqual(ellipseOutline(12, -4, 9, 3, 25))
  })
})
