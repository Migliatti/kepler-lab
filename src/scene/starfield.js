import { createRandom } from './random.js'

export const STARFIELD_SEED = 20260917

// Orçamento único de pontos do fundo, dimensionado para celular. Qualquer
// ajuste de desempenho acontece aqui, e em nenhum outro lugar.
export const STARFIELD_COUNT = 1400

// Bem além do destino mais distante do catálogo (Via Láctea, em z = -52), para
// que o fundo nunca colida com um corpo navegável.
export const STARFIELD_RADIUS = 160

export function buildStarfield({
  count = STARFIELD_COUNT,
  radius = STARFIELD_RADIUS,
  seed = STARFIELD_SEED,
} = {}) {
  const random = createRandom(seed)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Amostragem uniforme na esfera: sortear a altura, e não o ângulo polar,
    // é o que evita o acúmulo de estrelas nos polos.
    const height = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const ring = Math.sqrt(1 - height * height)
    // Uma casca com alguma espessura dá profundidade sem custo nenhum.
    const distance = radius * (0.85 + random() * 0.15)

    positions[i * 3] = distance * ring * Math.cos(angle)
    positions[i * 3 + 1] = distance * height
    positions[i * 3 + 2] = distance * ring * Math.sin(angle)
    sizes[i] = 0.4 + random() * 1.1
  }

  return { count, positions, sizes }
}
