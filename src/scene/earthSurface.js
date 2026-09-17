// Geography of the Earth for the scene, in the "flat illustrated" art
// direction: simplified coastlines drawn as filled patches with a darker coast
// line. Pure data plus pure helpers — no React, no WebGL.
//
// Outlines are [longitude, latitude] in degrees. They are hand-simplified from
// the familiar world map (Natural Earth 1:110m shapes, reduced to a few dozen
// vertices each): faithful in placement and silhouette, not in detail. The
// scale of the scene never shows more than that.
//
// A third element `SEAM` on a point means "do not draw the coast line leaving
// this point". Eurasia is too wide for a single patch, so it is split along the
// 80° meridian and both halves hide that shared edge.

import { circleOutline, ellipseOutline } from './sphericalPatch.js'

const SEAM = 'seam'

export const OCEAN_DEEP = '#0b3358'
export const OCEAN_POLAR = '#2b7ea6'
export const LAND_FILL = '#6f9d57'
export const LAND_LINE = '#2c4a23'
export const ICE_FILL = '#e6f0f5'
export const ICE_LINE = '#a8c6d4'
export const DESERT_FILL = '#c9a86c'
export const FOREST_FILL = '#4e8146'
export const ATMOSPHERE = '#7fc4e8'

const AFRICA = [
  [-5.5, 36],
  [10, 37],
  [20, 32],
  [32, 31],
  [34, 28],
  [38, 22],
  [43, 12],
  [51, 12],
  [45, 5],
  [40, -3],
  [40, -16],
  [35, -24],
  [32, -29],
  [25, -34],
  [18, -34],
  [12, -17],
  [13, -8],
  [9, -1],
  [9, 4],
  [3, 6],
  [-7, 4.5],
  [-13, 9],
  [-17, 14.7],
  [-16, 21],
  [-10, 27],
  [-9, 32],
]

const EURASIA_WEST = [
  [-9.5, 38.7],
  [-9, 43],
  [-1.5, 46],
  [-4.5, 48.5],
  [2, 51],
  [4, 53],
  [8, 54],
  [5, 60],
  [11, 64],
  [16, 69],
  [28, 71],
  [40, 68],
  [55, 70],
  [68, 73],
  [80, 75, SEAM],
  [80, 55, SEAM],
  [80, 40, SEAM],
  [80, 30, SEAM],
  [80, 20, SEAM],
  [80, 13],
  [77, 8],
  [73, 15],
  [70, 23],
  [66, 25],
  [57, 25],
  [59, 22],
  [55, 17],
  [45, 13],
  [43, 16],
  [39, 21],
  [35, 28],
  [35, 33],
  [36, 36],
  [30, 36],
  [26, 38],
  [23, 37],
  [19, 40],
  [16, 43],
  [13, 45],
  [18, 40],
  [16, 38],
  [12, 42],
  [9, 44],
  [4, 43],
  [2, 41],
  [0, 39],
  [-6, 36],
  [-9, 37],
]

const EURASIA_EAST = [
  [80, 13],
  [87, 21],
  [92, 21],
  [98, 8],
  [104, 1],
  [105, 10],
  [109, 13],
  [108, 21],
  [113, 22],
  [122, 30],
  [122, 39],
  [126, 37],
  [129, 35],
  [130, 43],
  [135, 48],
  [141, 53],
  [150, 59],
  [159, 62],
  [162, 57],
  [166, 60],
  [172, 62],
  [180, 65],
  [178, 69],
  [160, 70],
  [140, 73],
  [128, 73],
  [110, 76],
  [90, 75],
  [80, 75, SEAM],
  [80, 55, SEAM],
  [80, 30, SEAM],
]

const NORTH_AMERICA = [
  [-83, 9],
  [-87, 13],
  [-95, 16],
  [-105, 20],
  [-109, 26],
  [-113, 31],
  [-110, 25],
  [-110, 23],
  [-114, 28],
  [-117, 32],
  [-122, 37],
  [-124, 43],
  [-125, 49],
  [-135, 57],
  [-150, 60],
  [-165, 55],
  [-168, 65],
  [-160, 71],
  [-130, 70],
  [-115, 68],
  [-95, 68],
  [-92, 62],
  [-88, 57],
  [-80, 52],
  [-78, 60],
  [-72, 62],
  [-64, 60],
  [-56, 52],
  [-53, 47],
  [-66, 45],
  [-70, 42],
  [-75, 37],
  [-81, 26],
  [-84, 30],
  [-94, 29],
  [-97, 26],
  [-91, 19],
  [-87, 21],
  [-88, 16],
]

const SOUTH_AMERICA = [
  [-80, -2],
  [-75, 10],
  [-71, 12],
  [-62, 10],
  [-52, 4],
  [-48, -1],
  [-38, -5],
  [-35, -8],
  [-39, -16],
  [-48, -25],
  [-57, -38],
  [-65, -45],
  [-68, -55],
  [-75, -52],
  [-73, -42],
  [-71, -33],
  [-70, -18],
  [-81, -6],
]

const AUSTRALIA = [
  [114, -22],
  [114, -33],
  [123, -34],
  [131, -32],
  [138, -35],
  [141, -38],
  [147, -38],
  [150, -37],
  [153, -28],
  [146, -19],
  [142, -11],
  [137, -12],
  [130, -12],
  [125, -14],
  [121, -20],
]

const GREENLAND = [
  [-42, 60],
  [-50, 67],
  [-55, 72],
  [-62, 76],
  [-68, 78],
  [-58, 82],
  [-45, 83],
  [-25, 82],
  [-22, 75],
  [-32, 68],
]

const SAHARA = [
  [-16, 21],
  [-10, 27],
  [-5, 31],
  [10, 31],
  [25, 30],
  [33, 28],
  [37, 22],
  [34, 16],
  [22, 15],
  [10, 14],
  [-5, 15],
  [-16, 17],
]

const ARABIA = [
  [35, 28],
  [41, 30],
  [48, 29],
  [56, 24],
  [52, 18],
  [44, 13],
  [39, 17],
  [35, 24],
]

const OUTBACK = [
  [118, -24],
  [128, -21],
  [138, -24],
  [142, -28],
  [138, -31],
  [128, -30],
  [120, -29],
]

const AMAZON = [
  [-72, -4],
  [-60, 2],
  [-50, -1],
  [-45, -8],
  [-55, -12],
  [-68, -11],
]

/** Islands read as shape and placement at this scale, so they are ellipses. */
const ISLANDS = [
  { id: 'britain', longitude: -2.5, latitude: 54, length: 10, width: 5, rotation: 20 },
  { id: 'ireland', longitude: -8, latitude: 53.2, length: 4.5, width: 3, rotation: 10 },
  { id: 'iceland', longitude: -19, latitude: 65, length: 6, width: 3, rotation: 80 },
  { id: 'madagascar', longitude: 46.8, latitude: -19, length: 14, width: 4.5, rotation: 15 },
  { id: 'sri-lanka', longitude: 80.7, latitude: 7.8, length: 4, width: 2.5, rotation: 0 },
  { id: 'japan', longitude: 137.5, latitude: 37, length: 17, width: 4, rotation: 40 },
  { id: 'sumatra', longitude: 101.5, latitude: -0.5, length: 16, width: 4, rotation: 55 },
  { id: 'java', longitude: 110, latitude: -7.4, length: 11, width: 2.5, rotation: 95 },
  { id: 'borneo', longitude: 114, latitude: 0.5, length: 12, width: 9, rotation: 30 },
  { id: 'sulawesi', longitude: 121, latitude: -2, length: 9, width: 4, rotation: 20 },
  { id: 'new-guinea', longitude: 141, latitude: -5.5, length: 18, width: 5, rotation: 105 },
  { id: 'philippines', longitude: 122, latitude: 12, length: 12, width: 5, rotation: 15 },
  { id: 'new-zealand-north', longitude: 175.5, latitude: -38.5, length: 6, width: 3, rotation: 30 },
  { id: 'new-zealand-south', longitude: 170.5, latitude: -44.5, length: 8, width: 3, rotation: 40 },
  { id: 'cuba', longitude: -79, latitude: 21.7, length: 10, width: 1.6, rotation: 75 },
  { id: 'hispaniola', longitude: -71, latitude: 19, length: 6, width: 2, rotation: 85 },
  { id: 'tasmania', longitude: 146.7, latitude: -42, length: 3.5, width: 3, rotation: 0 },
  { id: 'newfoundland', longitude: -56, latitude: 48.7, length: 5, width: 4, rotation: 0 },
]

/** Antarctica, plus the peninsula that makes it recognizable. */
const POLAR_CAPS = [
  { id: 'antarctica', longitude: 0, latitude: -90, angularRadius: 23 },
  { id: 'antarctic-peninsula', longitude: -63, latitude: -70, length: 16, width: 6, rotation: 160 },
  { id: 'arctic-ice', longitude: 0, latitude: 90, angularRadius: 13, opacity: 0.85 },
]

function splitSeams(points) {
  const outline = points.map(([longitude, latitude]) => [longitude, latitude])
  const breaks = []
  points.forEach(([, , flag], index) => {
    if (flag === SEAM) breaks.push(index)
  })
  return { outline, breaks }
}

function landPatch(id, points) {
  const { outline, breaks } = splitSeams(points)
  return { id, outline, breaks, fill: LAND_FILL, line: LAND_LINE }
}

function biomePatch(id, outline, fill) {
  return { id, outline, fill, line: null, liftFactor: 0.03 }
}

function icePatch(id, outline, opacity = 1) {
  return { id, outline, fill: ICE_FILL, line: ICE_LINE, opacity }
}

/**
 * Every patch of the Earth's surface, back to front: continents, then the
 * biomes painted over them, then ice. `island` and `cap` entries are expanded
 * into outlines by the caller-facing builders in sphericalPatch.js.
 */
export const EARTH_LANDMASSES = Object.freeze([
  landPatch('africa', AFRICA),
  landPatch('eurasia-west', EURASIA_WEST),
  landPatch('eurasia-east', EURASIA_EAST),
  landPatch('north-america', NORTH_AMERICA),
  landPatch('south-america', SOUTH_AMERICA),
  landPatch('australia', AUSTRALIA),
])

export const EARTH_BIOMES = Object.freeze([
  biomePatch('sahara', SAHARA, DESERT_FILL),
  biomePatch('arabia', ARABIA, DESERT_FILL),
  biomePatch('outback', OUTBACK, DESERT_FILL),
  biomePatch('amazon', AMAZON, FOREST_FILL),
])

export const EARTH_ISLANDS = Object.freeze(ISLANDS)
export const EARTH_ICE = Object.freeze([
  { id: 'greenland', outline: GREENLAND },
  ...POLAR_CAPS,
])

export const EARTH_APPEARANCE = Object.freeze({
  oceanDeep: OCEAN_DEEP,
  oceanPolar: OCEAN_POLAR,
  atmosphere: ATMOSPHERE,
})

function ellipsePatch(entry, fill, line, opacity = 1) {
  const { id, longitude, latitude, length, width, rotation } = entry
  return { id, outline: ellipseOutline(longitude, latitude, length, width, rotation), fill, line, opacity }
}

/**
 * The full surface, back to front: continents, islands, the biomes painted over
 * them and finally the ice. Pure: same input, same outlines, every run.
 */
export function buildEarthPatches() {
  const islands = EARTH_ISLANDS.map((island) => ellipsePatch(island, LAND_FILL, LAND_LINE))

  const ice = EARTH_ICE.map((entry) => {
    if (entry.outline) return icePatch(entry.id, entry.outline)
    if (entry.angularRadius) {
      return icePatch(entry.id, circleOutline(entry.longitude, entry.latitude, entry.angularRadius), entry.opacity)
    }
    return ellipsePatch(entry, ICE_FILL, ICE_LINE)
  })

  return [...EARTH_LANDMASSES, ...islands, ...EARTH_BIOMES, ...ice]
}

export { icePatch, landPatch, biomePatch, SEAM }
