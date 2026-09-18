import { createRandom } from './random.js'

// Achatamento do disco. É o que separa visualmente um disco de acreção de uma
// nuvem de poeira sem precisar de material diferente.
const DISC_THICKNESS = 0.08

export function buildParticleField({ count, spread, shape = 'cloud', seed = 1 }) {
  const total = Math.max(0, count)
  const positions = new Float32Array(total * 3)

  const random = createRandom(seed)

  for (let i = 0; i < total; i++) {
    if (shape === 'disc') {
      // A raiz quadrada distribui a densidade por área; sortear o raio direto
      // satura o centro e esvazia a borda.
      const distance = spread * Math.sqrt(0.15 + random() * 0.85)
      const angle = random() * Math.PI * 2

      positions[i * 3] = distance * Math.cos(angle)
      positions[i * 3 + 1] = (random() * 2 - 1) * spread * DISC_THICKNESS
      positions[i * 3 + 2] = distance * Math.sin(angle)
      continue
    }

    const height = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const ring = Math.sqrt(1 - height * height)
    // A raiz cúbica faz o mesmo por volume, para a nuvem.
    const distance = spread * Math.cbrt(random())

    positions[i * 3] = distance * ring * Math.cos(angle)
    positions[i * 3 + 1] = distance * height
    positions[i * 3 + 2] = distance * ring * Math.sin(angle)
  }

  return { count: total, positions }
}
