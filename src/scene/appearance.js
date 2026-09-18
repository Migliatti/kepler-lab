// Aparência de cada corpo: cor, giro, halo, partículas e anel. Puro e sem
// Three.js, para que as regras da fase — movimento reduzido, anel como dado —
// sejam verificáveis sem renderizar.
//
// Distâncias de halo, anel e partículas são múltiplos do raio ilustrativo do
// corpo; quem converte para unidades de cena é o adaptador R3F.

// Congela recursivamente para que nenhum consumidor (ex.: um efeito por
// quadro na cena) possa mutar halo/particles/ring e corromper o perfil
// compartilhado de uma categoria ou corpo para todas as próximas consultas.
function deepFreeze(value) {
  if (value === null || typeof value !== 'object' || Object.isFrozen(value)) return value

  for (const key of Object.keys(value)) {
    deepFreeze(value[key])
  }

  return Object.freeze(value)
}

const NEUTRAL = Object.freeze({ spin: 0, halo: null, particles: null, ring: null })

const CATEGORY_PROFILES = deepFreeze({
  planet: {
    color: '#3d9ee8', emissive: '#082744', transparent: false, opacity: 1, spin: 0.06,
  },
  moon: {
    color: '#a9c6e8', emissive: '#162331', transparent: false, opacity: 1, spin: 0.04,
  },
  'dwarf-planet': {
    color: '#8ca6d1', emissive: '#171f36', transparent: false, opacity: 1, spin: 0.04,
  },
  'star-system': {
    color: '#ffd66b', emissive: '#7a4a08', transparent: false, opacity: 1, spin: 0.02,
    halo: { scale: 2.2, opacity: 0.3, color: '#ffe9a8' },
  },
  star: {
    color: '#ffe38a', emissive: '#9d5d08', transparent: false, opacity: 1, spin: 0.02,
    halo: { scale: 2.4, opacity: 0.34, color: '#fff3c4' },
  },
  nebula: {
    color: '#b37aff', emissive: '#3a1769', transparent: true, opacity: 0.72, spin: 0.012,
    halo: { scale: 1.9, opacity: 0.22, color: '#c9a2ff' },
    particles: { count: 180, spread: 2.6, color: '#d8bcff', drift: 0.06, shape: 'cloud' },
  },
  'galactic-region': {
    color: '#6181cf', emissive: '#141c57', transparent: true, opacity: 0.68, spin: 0.008,
    halo: { scale: 1.7, opacity: 0.18, color: '#9db4ff' },
    particles: { count: 220, spread: 3.2, color: '#b9c9ff', drift: 0.04, shape: 'disc' },
  },
  'black-hole': {
    color: '#ffb04a', emissive: '#6f2800', transparent: false, opacity: 1, spin: 0.3,
    halo: { scale: 1.5, opacity: 0.26, color: '#ffc27a' },
    particles: { count: 260, spread: 2.4, color: '#ffd7a0', drift: 0.12, shape: 'disc' },
  },
})

// Exceções por corpo. Existem porque Saturno e Urano são a mesma categoria com
// anéis diferentes, e porque estrelas e nebulosas da mesma categoria têm cores
// que o visitante reconhece: Betelgeuse é vermelha, Sirius é branco-azulada.
const OVERRIDES_BY_ID = deepFreeze({
  sun: {
    color: '#ffcf5c', emissive: '#ff9a13',
    halo: { scale: 3.2, opacity: 0.42, color: '#ffd166' },
  },
  'alpha-centauri': {
    color: '#ffe0a8', emissive: '#a8720f',
    halo: { scale: 2.3, opacity: 0.32, color: '#ffe9c4' },
  },
  sirius: {
    color: '#dfe9ff', emissive: '#4a6ba8',
    halo: { scale: 2.6, opacity: 0.4, color: '#dbe9ff' },
  },
  betelgeuse: {
    color: '#ff7a4a', emissive: '#8c2b08',
    halo: { scale: 3.0, opacity: 0.32, color: '#ff8a5c' },
  },
  'orion-nebula': {
    color: '#ff9ac4', emissive: '#6d1b48',
    halo: { scale: 2.0, opacity: 0.24, color: '#ffb6d4' },
    particles: { count: 220, spread: 2.8, color: '#ffd0e4', drift: 0.05, shape: 'cloud' },
  },
  'crab-nebula': {
    color: '#8fb8ff', emissive: '#1f3a78',
    halo: { scale: 1.9, opacity: 0.24, color: '#a8c8ff' },
    particles: { count: 200, spread: 2.5, color: '#c6dcff', drift: 0.07, shape: 'cloud' },
  },
  'galactic-center': {
    color: '#ffc98f', emissive: '#7a3d0a',
    halo: { scale: 1.9, opacity: 0.24, color: '#ffd9ae' },
    particles: { count: 280, spread: 2.9, color: '#ffe3c0', drift: 0.05, shape: 'disc' },
  },
  'milky-way': {
    color: '#7f9ce0', emissive: '#1b2a63',
    halo: { scale: 1.6, opacity: 0.16, color: '#b6c8ff' },
    particles: { count: 420, spread: 4.6, color: '#c3d2ff', drift: 0.03, shape: 'disc' },
  },
  saturn: {
    ring: { inner: 1.35, outer: 2.0, color: '#d8bb75', opacity: 0.72, tilt: 0.12, gap: [1.66, 1.74] },
  },
  uranus: {
    // Quase vertical: é a inclinação que faz de Urano o planeta "deitado".
    ring: { inner: 1.5, outer: 1.66, color: '#9fd9dd', opacity: 0.5, tilt: 1.45, gap: null },
  },
})

function withoutMotion(profile) {
  return {
    ...profile,
    spin: 0,
    // O corpo continua visível: só a deriva para. Apagar a poeira de uma
    // nebulosa apagaria a nebulosa.
    particles: profile.particles ? { ...profile.particles, drift: 0 } : null,
  }
}

function build(base, { reducedMotion = false } = {}) {
  const profile = { ...NEUTRAL, ...base }
  return reducedMotion ? withoutMotion(profile) : profile
}

function resolveCategoryBase(category) {
  const base = CATEGORY_PROFILES[category]
  if (!base) throw new Error(`Missing appearance profile for category "${category}"`)

  return base
}

export function getAppearanceProfile(category, options = {}) {
  return build(resolveCategoryBase(category), options)
}

export function getBodyAppearance(id, category, options = {}) {
  const base = resolveCategoryBase(category)

  return build({ ...base, ...OVERRIDES_BY_ID[id] }, options)
}
