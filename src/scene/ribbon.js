// Fita fina assentada sobre a esfera, para traços que são compridos e estreitos
// — as lineae de Europa, antes de tudo.
//
// A alternativa óbvia, uma `line` do three.js, não serve: no WebGL a espessura
// de linha é sempre um pixel, então o traço não engrossa com a aproximação da
// câmera e some justamente quando o corpo enche a tela. A fita tem largura
// angular de verdade, em graus, e escala com o resto da cena.
//
// Diferente de buildPatchGeometry, não há limite de extensão: a fita é uma
// tira de triângulos ao longo do caminho, então pode dar a volta no corpo.

import * as THREE from 'three'

import { outlineToVectors } from './sphericalPatch.js'

const DEG = Math.PI / 180

/** Pontos ao longo do caminho, com passos curtos o bastante para curvar. */
function walk(vectors, maxStepAngle) {
  const path = [vectors[0]]

  for (let index = 0; index < vectors.length - 1; index++) {
    const from = vectors[index]
    const to = vectors[index + 1]
    const steps = Math.max(1, Math.ceil(from.angleTo(to) / maxStepAngle))

    for (let step = 1; step <= steps; step++) {
      path.push(from.clone().lerp(to, step / steps).normalize())
    }
  }

  return path
}

/**
 * Direção perpendicular ao caminho, tangente à esfera no ponto: o eixo do
 * grande círculo entre os vizinhos, reprojetado no plano tangente porque numa
 * dobra esse eixo não é exatamente perpendicular ao ponto do meio — e é essa
 * componente radial que tiraria os vértices da esfera.
 */
function sideDirection(path, index) {
  const point = path[index]
  const before = path[Math.max(0, index - 1)]
  const after = path[Math.min(path.length - 1, index + 1)]
  const side = new THREE.Vector3().crossVectors(before, after)
  side.addScaledVector(point, -side.dot(point))

  if (side.lengthSq() === 0) {
    // Caminho degenerado (pontos coincidentes ou opostos): qualquer tangente
    // serve, contanto que seja perpendicular ao ponto.
    const reference = Math.abs(path[index].y) > 0.95
      ? new THREE.Vector3(1, 0, 0)
      : new THREE.Vector3(0, 1, 0)
    return side.crossVectors(reference, point).normalize()
  }

  return side.normalize()
}

/**
 * Tira de triângulos ao longo de `outline` ([longitude, latitude] em graus),
 * com `widthDegrees` de largura angular, assentada em `radius + lift`.
 */
export function buildRibbonGeometry(radius, outline, { widthDegrees = 1, lift = 0, maxStepAngle = 0.08 } = {}) {
  const path = walk(outlineToVectors(outline), maxStepAngle)
  const half = (widthDegrees / 2) * DEG
  const surface = radius + lift
  const edges = []

  path.forEach((point, index) => {
    const side = sideDirection(path, index)
    // Rotação exata em torno do ponto: `side` já é perpendicular a ele, então
    // a fita mantém a mesma largura angular em qualquer latitude.
    const left = point.clone().multiplyScalar(Math.cos(half)).addScaledVector(side, Math.sin(half))
    const right = point.clone().multiplyScalar(Math.cos(half)).addScaledVector(side, -Math.sin(half))
    edges.push([left.multiplyScalar(surface), right.multiplyScalar(surface)])
  })

  const positions = []
  for (let index = 0; index < edges.length - 1; index++) {
    const [leftFrom, rightFrom] = edges[index]
    const [leftTo, rightTo] = edges[index + 1]

    ;[leftFrom, rightFrom, leftTo, rightFrom, rightTo, leftTo].forEach((vertex) => {
      positions.push(vertex.x, vertex.y, vertex.z)
    })
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeVertexNormals()
  return geometry
}
