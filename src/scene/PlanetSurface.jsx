// Reusable r3f body surface in the "flat illustrated" art direction: a graded
// sphere, flat filled land with a darker outline, and a thin atmosphere rim.
//
// It draws two kinds of land. `patches` are outlines in geographic coordinates
// ([longitude, latitude] degrees) — that is how the Earth gets real continents,
// via buildEarthPatches() in earthSurface.js. `continents` are the procedural
// blobs, for bodies whose surface only needs to read as texture.
//
// Usage:
//   <PlanetSurface radius={radius} patches={buildEarthPatches()} gradient="poles" />
//   <PlanetSurface radius={radius} craters={[{ center: [-0.75, -0.2, 0.4], r: 0.045 }]} />
//
// The component is decoration only: nothing here answers the raycaster, so the
// caller keeps a single interaction mesh and pointer handling stays in one place.

import { useMemo } from 'react'
import * as THREE from 'three'
import { buildOutlineSegments, buildPatchGeometry } from './sphericalPatch.js'

const NO_RAYCAST = () => null

function tangentBasis(normal) {
  const up = Math.abs(normal.y) > 0.95 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
  const u = up.clone().cross(normal).normalize()
  const v = normal.clone().cross(u).normalize()
  return { u, v }
}

function blobPoints(count, baseR, jitter, seed) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const r = baseR * (1 - jitter + jitter * Math.abs(Math.sin(a * 2.3 + seed) + Math.cos(a * 1.7 + seed * 1.3)) * 0.5)
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r })
  }
  return pts
}

function buildBlob(radius, centerDir, points2D, lift) {
  const normal = centerDir.clone().normalize()
  const { u, v } = tangentBasis(normal)
  const dir = new THREE.Vector3()
  const verts = points2D.map((p) => {
    dir.copy(normal).addScaledVector(u, p.x).addScaledVector(v, p.y).normalize()
    return dir.clone().multiplyScalar(radius + lift)
  })

  const centroid = new THREE.Vector3()
  verts.forEach((p) => centroid.add(p))
  centroid.divideScalar(verts.length).normalize().multiplyScalar(radius + lift)

  const positions = []
  for (let i = 0; i < verts.length; i++) {
    const a = verts[i]
    const b = verts[(i + 1) % verts.length]
    positions.push(centroid.x, centroid.y, centroid.z, a.x, a.y, a.z, b.x, b.y, b.z)
  }
  const fillGeo = new THREE.BufferGeometry()
  fillGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  fillGeo.computeVertexNormals()

  const linePositions = []
  verts.forEach((p) => linePositions.push(p.x, p.y, p.z))
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

  return { fillGeo, lineGeo }
}

function buildCraterRing(radius, centerDir, r) {
  const normal = centerDir.clone().normalize()
  const { u, v } = tangentBasis(normal)
  const dir = new THREE.Vector3()
  const positions = []
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2
    dir.copy(normal).addScaledVector(u, Math.cos(a) * r).addScaledVector(v, Math.sin(a) * r).normalize()
    const p = dir.clone().multiplyScalar(radius + 0.004 * radius)
    positions.push(p.x, p.y, p.z)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  return geo
}

const DEFAULT_CONTINENTS = [
  { center: [0.55, 0.35, 0.6], points: 11, baseR: 0.42, jitter: 0.35, seed: 1.1 },
  { center: [0.15, -0.15, 0.75], points: 9, baseR: 0.28, jitter: 0.4, seed: 3.4 },
  { center: [0.75, -0.55, -0.05], points: 8, baseR: 0.2, jitter: 0.4, seed: 5.7 },
]

export function PlanetSurface({
  radius = 1,
  oceanLow = '#0d2e3f',
  oceanHigh = '#2f7a8c',
  gradient = 'latitude',
  landFill = '#7fa563',
  landLine = '#2c4321',
  craterLine = '#0a1a22',
  orbitLine = '#bcd7e6',
  patches = [],
  continents,
  craters = [],
  orbitRings = [],
  showAtmosphere = true,
  atmosphereColor,
  atmosphereOpacity = 0.08,
}) {
  // Procedural blobs are the fallback surface: a body that brings its own
  // patches does not get them unless it asks.
  const blobs = useMemo(
    () => continents ?? (patches.length > 0 ? [] : DEFAULT_CONTINENTS),
    [continents, patches]
  )

  const sphereGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(radius, 96, 64)
    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const low = new THREE.Color(oceanLow)
    const high = new THREE.Color(oceanHigh)
    const tmp = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const height = pos.getY(i) / radius
      // 'poles' grades from the equator outwards, which is how an illustrated
      // globe reads; 'latitude' grades south to north.
      const t = gradient === 'poles' ? Math.pow(Math.abs(height), 0.9) : Math.pow((height + 1) / 2, 0.85)
      tmp.copy(low).lerp(high, t)
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [radius, oceanLow, oceanHigh, gradient])

  const surfacePatches = useMemo(
    () =>
      patches.map((patch) => {
        const lift = radius * (patch.liftFactor ?? 0.02)
        return {
          ...patch,
          fillGeo: buildPatchGeometry(radius, patch.outline, { lift }),
          lineGeos: patch.line
            ? buildOutlineSegments(radius, patch.outline, { lift: lift + radius * 0.002, breaks: patch.breaks })
            : [],
        }
      }),
    [radius, patches]
  )

  const blobGeos = useMemo(
    () =>
      blobs.map((c) =>
        buildBlob(radius, new THREE.Vector3(...c.center), blobPoints(c.points, c.baseR, c.jitter, c.seed), radius * 0.025)
      ),
    [radius, blobs]
  )

  const craterRings = useMemo(
    () => craters.map((c) => buildCraterRing(radius, new THREE.Vector3(...c.center), c.r)),
    [radius, craters]
  )

  return (
    <group>
      <mesh castShadow receiveShadow geometry={sphereGeo} raycast={NO_RAYCAST}>
        <meshStandardMaterial vertexColors roughness={0.85} metalness={0.02} />
      </mesh>

      {showAtmosphere && (
        <mesh scale={1.035} raycast={NO_RAYCAST}>
          <sphereGeometry args={[radius, 48, 32]} />
          <meshBasicMaterial
            color={atmosphereColor ?? oceanHigh}
            transparent
            opacity={atmosphereOpacity}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {surfacePatches.map((patch) => (
        <group key={patch.id}>
          <mesh geometry={patch.fillGeo} raycast={NO_RAYCAST}>
            <meshStandardMaterial
              color={patch.fill ?? landFill}
              roughness={0.95}
              metalness={0}
              side={THREE.DoubleSide}
              transparent={(patch.opacity ?? 1) < 1}
              opacity={patch.opacity ?? 1}
            />
          </mesh>
          {patch.lineGeos.map((geometry, index) => (
            <line key={index} geometry={geometry} raycast={NO_RAYCAST}>
              <lineBasicMaterial color={patch.line} transparent opacity={0.85} />
            </line>
          ))}
        </group>
      ))}

      {blobGeos.map((p, i) => (
        <group key={i}>
          <mesh geometry={p.fillGeo} raycast={NO_RAYCAST}>
            <meshStandardMaterial color={landFill} roughness={0.95} metalness={0} side={THREE.DoubleSide} />
          </mesh>
          <lineLoop geometry={p.lineGeo} raycast={NO_RAYCAST}>
            <lineBasicMaterial color={landLine} />
          </lineLoop>
        </group>
      ))}

      {craterRings.map((geo, i) => (
        <line key={i} geometry={geo} raycast={NO_RAYCAST}>
          <lineBasicMaterial color={craterLine} transparent opacity={0.4} />
        </line>
      ))}

      {orbitRings.map((r, i) => (
        <mesh key={i} rotation-x={Math.PI / 2 + r.tilt} raycast={NO_RAYCAST}>
          <ringGeometry args={[radius * r.scale - radius * 0.002, radius * r.scale, 128, 1]} />
          <meshBasicMaterial color={orbitLine} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
