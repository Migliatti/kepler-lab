// Pure geometry helpers to draw outlines given in geographic coordinates onto a
// sphere. No React, no WebGL: everything here is math over three.js buffers and
// is exercised by sphericalPatch.test.js in plain Node.
//
// Outlines are arrays of [longitude, latitude] pairs in degrees, longitude
// growing east and latitude growing north, so the data reads like an atlas.

import * as THREE from 'three'

const DEG = Math.PI / 180

/** Largest angular radius a single patch may span, in radians (~75°). */
export const MAX_PATCH_ANGLE = 1.31

/** Unit vector for a geographic coordinate. +Y is north, +Z is longitude 0. */
export function latLonToVector3(longitude, latitude) {
  const lat = latitude * DEG
  const lon = longitude * DEG
  const cosLat = Math.cos(lat)
  return new THREE.Vector3(cosLat * Math.sin(lon), Math.sin(lat), cosLat * Math.cos(lon))
}

export function outlineToVectors(outline) {
  return outline.map(([longitude, latitude]) => latLonToVector3(longitude, latitude))
}

/** Normalized average of unit vectors — the visual centre of a patch. */
export function averageDirection(vectors) {
  const centre = new THREE.Vector3()
  vectors.forEach((vector) => centre.add(vector))
  if (centre.lengthSq() === 0) {
    throw new Error('Cannot average opposing directions')
  }
  return centre.normalize()
}

/** Angle, in radians, between the centre and the farthest vertex. */
export function maxAngularRadius(vectors, centre = averageDirection(vectors)) {
  return vectors.reduce((largest, vector) => Math.max(largest, centre.angleTo(vector)), 0)
}

function tangentBasis(normal) {
  const reference = Math.abs(normal.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
  const u = reference.clone().cross(normal).normalize()
  const v = normal.clone().cross(u).normalize()
  return { u, v }
}

/**
 * Gnomonic projection around `centre`. Great circles become straight lines, so
 * triangulating in this plane gives triangles that are still correct once the
 * vertices go back onto the sphere.
 */
function projectGnomonic(vectors, centre) {
  const { u, v } = tangentBasis(centre)
  return vectors.map((vector) => {
    const depth = vector.dot(centre)
    if (depth <= Math.cos(MAX_PATCH_ANGLE)) {
      throw new Error('Outline spans more than MAX_PATCH_ANGLE; split it into separate patches')
    }
    return new THREE.Vector2(vector.dot(u) / depth, vector.dot(v) / depth)
  })
}

function pushCurvedTriangle(positions, a, b, c, radius, maxEdgeAngle) {
  const longest = Math.max(a.angleTo(b), b.angleTo(c), c.angleTo(a))

  if (longest <= maxEdgeAngle) {
    ;[a, b, c].forEach((vector) => {
      positions.push(vector.x * radius, vector.y * radius, vector.z * radius)
    })
    return
  }

  const ab = a.clone().add(b).normalize()
  const bc = b.clone().add(c).normalize()
  const ca = c.clone().add(a).normalize()
  pushCurvedTriangle(positions, a, ab, ca, radius, maxEdgeAngle)
  pushCurvedTriangle(positions, ab, b, bc, radius, maxEdgeAngle)
  pushCurvedTriangle(positions, ca, bc, c, radius, maxEdgeAngle)
  pushCurvedTriangle(positions, ab, bc, ca, radius, maxEdgeAngle)
}

/**
 * Filled patch that hugs the sphere: the outline is triangulated in the
 * gnomonic plane and every triangle is subdivided until its edges are short
 * enough to sit on the surface instead of cutting through it.
 */
export function buildPatchGeometry(radius, outline, { lift = 0, maxEdgeAngle = 0.12 } = {}) {
  const vectors = outlineToVectors(outline)
  const centre = averageDirection(vectors)
  const flat = projectGnomonic(vectors, centre)
  const faces = THREE.ShapeUtils.triangulateShape(flat, [])
  const surface = radius + lift

  const positions = []
  faces.forEach(([i, j, k]) => {
    pushCurvedTriangle(positions, vectors[i], vectors[j], vectors[k], surface, maxEdgeAngle)
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}

function densifyArc(from, to, maxEdgeAngle) {
  const steps = Math.max(1, Math.ceil(from.angleTo(to) / maxEdgeAngle))
  const points = []
  for (let step = 0; step < steps; step++) {
    points.push(from.clone().lerp(to, step / steps).normalize())
  }
  return points
}

/**
 * Coast line for an outline. `breaks` holds vertex indices whose following edge
 * is not drawn, which is how a landmass split across two patches hides the seam
 * where the split happens.
 */
export function buildOutlineSegments(radius, outline, { lift = 0, maxEdgeAngle = 0.08, breaks = [] } = {}) {
  const vectors = outlineToVectors(outline)
  const skipped = new Set(breaks)
  const surface = radius + lift
  const segments = []
  let current = []

  for (let index = 0; index < vectors.length; index++) {
    const from = vectors[index]
    const to = vectors[(index + 1) % vectors.length]

    if (skipped.has(index)) {
      // `current` already ends at `from`: the segment simply stops here.
      if (current.length > 1) segments.push(current)
      current = []
      continue
    }

    if (current.length === 0) current.push(from)
    densifyArc(from, to, maxEdgeAngle)
      .slice(1)
      .forEach((point) => current.push(point))
    current.push(to)
  }

  if (current.length > 0) segments.push(current)

  return segments.map((points) => {
    const positions = []
    points.forEach((point) => {
      positions.push(point.x * surface, point.y * surface, point.z * surface)
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geometry
  })
}

/** Circular outline around a point — polar caps and round islands. */
export function circleOutline(longitude, latitude, angularRadius, segments = 48) {
  return ellipseOutline(longitude, latitude, angularRadius * 2, angularRadius * 2, 0, segments)
}

/**
 * Elliptical outline around a point, sized by its extent in degrees and turned
 * by `rotation` degrees (0 points north). Good enough for islands, which read
 * as shape and placement long before they read as coastline.
 */
export function ellipseOutline(longitude, latitude, length, width, rotation = 0, segments = 24) {
  const centre = latLonToVector3(longitude, latitude)
  const { u, v } = tangentBasis(centre)
  const halfLength = Math.tan((length / 2) * DEG)
  const halfWidth = Math.tan((width / 2) * DEG)
  const angle = rotation * DEG
  const outline = []

  for (let step = 0; step < segments; step++) {
    const t = (step / segments) * Math.PI * 2
    const along = Math.cos(t) * halfLength
    const across = Math.sin(t) * halfWidth
    const x = across * Math.cos(angle) + along * Math.sin(angle)
    const y = along * Math.cos(angle) - across * Math.sin(angle)
    const point = centre.clone().addScaledVector(u, x).addScaledVector(v, y).normalize()
    const lat = Math.asin(point.y) / DEG
    const lon = Math.atan2(point.x, point.z) / DEG
    outline.push([lon, lat])
  }

  return outline
}
