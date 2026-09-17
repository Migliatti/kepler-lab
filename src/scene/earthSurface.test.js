import { describe, expect, it } from 'vitest'
import { buildEarthPatches, EARTH_LANDMASSES } from './earthSurface.js'
import {
  averageDirection,
  buildOutlineSegments,
  buildPatchGeometry,
  latLonToVector3,
  MAX_PATCH_ANGLE,
  maxAngularRadius,
  outlineToVectors,
} from './sphericalPatch.js'

const patches = buildEarthPatches()

function patchById(id) {
  const patch = patches.find((entry) => entry.id === id)
  if (!patch) throw new Error(`Missing patch "${id}"`)
  return patch
}

describe('buildEarthPatches', () => {
  it('draws the six landmasses, the islands, the biomes and the ice', () => {
    const ids = patches.map((patch) => patch.id)

    expect(ids).toEqual(expect.arrayContaining(['africa', 'eurasia-west', 'eurasia-east', 'north-america']))
    expect(ids).toEqual(expect.arrayContaining(['japan', 'madagascar', 'britain']))
    expect(ids).toEqual(expect.arrayContaining(['sahara', 'amazon']))
    expect(ids).toEqual(expect.arrayContaining(['greenland', 'antarctica', 'arctic-ice']))
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('is deterministic', () => {
    expect(buildEarthPatches().map((patch) => patch.outline)).toEqual(patches.map((patch) => patch.outline))
  })

  it('keeps every outline inside the geographic range', () => {
    patches.forEach(({ id, outline }) => {
      outline.forEach(([longitude, latitude]) => {
        expect(Number.isFinite(longitude), id).toBe(true)
        expect(latitude, id).toBeGreaterThanOrEqual(-90)
        expect(latitude, id).toBeLessThanOrEqual(90)
      })
    })
  })

  it('keeps every patch narrow enough to project without distortion', () => {
    patches.forEach(({ id, outline }) => {
      const vectors = outlineToVectors(outline)
      expect(maxAngularRadius(vectors, averageDirection(vectors)), id).toBeLessThan(MAX_PATCH_ANGLE)
    })
  })

  it('builds a filled geometry for every patch', () => {
    patches.forEach(({ id, outline }) => {
      const geometry = buildPatchGeometry(1, outline, { lift: 0.02 })
      expect(geometry.attributes.position.count, id).toBeGreaterThan(0)
    })
  })
})

describe('placement', () => {
  it('puts each landmass on the right side of the globe', () => {
    const centres = {
      africa: [20, 2],
      'north-america': [-100, 45],
      'south-america': [-60, -18],
      australia: [134, -26],
    }

    Object.entries(centres).forEach(([id, [longitude, latitude]]) => {
      const centre = averageDirection(outlineToVectors(patchById(id).outline))
      const expected = latLonToVector3(longitude, latitude)
      expect(centre.angleTo(expected), id).toBeLessThan(0.25)
    })
  })

  it('caps both poles with ice', () => {
    const north = averageDirection(outlineToVectors(patchById('arctic-ice').outline))
    const south = averageDirection(outlineToVectors(patchById('antarctica').outline))

    expect(north.y).toBeGreaterThan(0.95)
    expect(south.y).toBeLessThan(-0.95)
  })
})

describe('the Eurasian seam', () => {
  it('splits Eurasia in two halves that meet on the 80th meridian', () => {
    const west = patchById('eurasia-west')
    const east = patchById('eurasia-east')

    expect(west.breaks.length).toBeGreaterThan(0)
    expect(east.breaks.length).toBeGreaterThan(0)
    west.breaks.forEach((index) => expect(west.outline[index][0]).toBe(80))
    east.breaks.forEach((index) => expect(east.outline[index][0]).toBe(80))
  })

  it('leaves the shared edge unstroked so no line crosses the continent', () => {
    const east = patchById('eurasia-east')
    const closed = buildOutlineSegments(1, east.outline, { maxEdgeAngle: 10 })
    const seamed = buildOutlineSegments(1, east.outline, { maxEdgeAngle: 10, breaks: east.breaks })

    expect(closed).toHaveLength(1)
    expect(seamed.length).toBeGreaterThanOrEqual(1)
    const drawn = seamed.reduce((total, geometry) => total + geometry.attributes.position.count, 0)
    expect(drawn).toBeLessThan(closed[0].attributes.position.count)
  })
})

describe('coast lines', () => {
  it('strokes every landmass and leaves the biomes unstroked', () => {
    EARTH_LANDMASSES.forEach(({ id, line }) => expect(line, id).toBeTruthy())
    expect(patchById('sahara').line).toBeNull()
    expect(patchById('amazon').line).toBeNull()
  })
})
