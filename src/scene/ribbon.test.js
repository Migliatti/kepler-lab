import { describe, expect, it } from 'vitest'
import * as THREE from 'three'

import { buildRibbonGeometry } from './ribbon.js'
import { latLonToVector3 } from './sphericalPatch.js'

const LINE = [[-150, 30], [-90, 12], [-20, -4], [50, -18], [130, -30]]

function vertices(geometry) {
  const position = geometry.attributes.position
  const points = []
  for (let i = 0; i < position.count; i++) {
    points.push(new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i)))
  }
  return points
}

describe('buildRibbonGeometry', () => {
  it('lays every vertex on the sphere it was given', () => {
    const geometry = buildRibbonGeometry(2, LINE, { widthDegrees: 1.5 })

    for (const point of vertices(geometry)) expect(point.length()).toBeCloseTo(2, 5)
  })

  it('lifts the ribbon above the surface when asked', () => {
    const geometry = buildRibbonGeometry(2, LINE, { widthDegrees: 1.5, lift: 0.1 })

    for (const point of vertices(geometry)) expect(point.length()).toBeCloseTo(2.1, 5)
  })

  it('keeps the ribbon as wide as it was asked to be', () => {
    const widthDegrees = 2
    const geometry = buildRibbonGeometry(1, [[0, 0], [40, 0]], { widthDegrees })
    const points = vertices(geometry)

    // Os dois primeiros vértices são as bordas opostas da mesma seção.
    const angle = (points[0].angleTo(points[1]) * 180) / Math.PI
    expect(angle).toBeCloseTo(widthDegrees, 4)
  })

  it('follows the line it was given, not the chord between its ends', () => {
    const geometry = buildRibbonGeometry(1, LINE, { widthDegrees: 1 })
    const points = vertices(geometry)
    const onLine = LINE.map(([longitude, latitude]) => latLonToVector3(longitude, latitude))

    // Cada ponto de controle tem vértices da fita a menos de meia largura dele.
    for (const control of onLine) {
      const nearest = points.reduce((best, p) => Math.min(best, control.angleTo(p)), Infinity)
      expect((nearest * 180) / Math.PI).toBeLessThan(0.51)
    }
  })

  it('spans a line longer than a single patch could ever be', () => {
    // Uma lineae cruza mais de 180°: buildPatchGeometry recusaria isso.
    const geometry = buildRibbonGeometry(1, LINE, { widthDegrees: 1 })

    expect(geometry.attributes.position.count).toBeGreaterThan(20)
  })
})
