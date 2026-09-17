export const SCALE_NOTICE = 'Posições e tamanhos são ilustrativos para permitir a exploração.'

export const EARTH_CAMERA_POSITION = Object.freeze([0, 9, 24])

const PRESENTATION_BY_ID = Object.freeze({
  sun: Object.freeze({ position: [-14, 0, -7], radius: 2.6 }),
  mercury: Object.freeze({ position: [-10, 0.2, -5], radius: 0.35 }),
  venus: Object.freeze({ position: [-7, -0.4, -3], radius: 0.65 }),
  earth: Object.freeze({ position: [0, 0, 0], radius: 1 }),
  moon: Object.freeze({ position: [2.2, 0.5, -0.8], radius: 0.28 }),
  mars: Object.freeze({ position: [5, -0.2, 2], radius: 0.55 }),
  jupiter: Object.freeze({ position: [11, 0.4, 5], radius: 1.65 }),
  europa: Object.freeze({ position: [13, 1.1, 4], radius: 0.25 }),
  io: Object.freeze({ position: [12.5, -1, 6.4], radius: 0.24 }),
  saturn: Object.freeze({ position: [18, -0.4, 9], radius: 1.45 }),
  titan: Object.freeze({ position: [20, 0.8, 8], radius: 0.3 }),
  uranus: Object.freeze({ position: [25, 0.2, 12], radius: 0.9 }),
  neptune: Object.freeze({ position: [31, -0.4, 15], radius: 0.88 }),
  pluto: Object.freeze({ position: [35, 0.5, 18], radius: 0.22 }),
  'alpha-centauri': Object.freeze({ position: [-32, 6, -26], radius: 1.15 }),
  sirius: Object.freeze({ position: [-18, 9, -35], radius: 1.05 }),
  betelgeuse: Object.freeze({ position: [10, 8, -38], radius: 1.5 }),
  'orion-nebula': Object.freeze({ position: [28, 5, -34], radius: 2.1 }),
  'crab-nebula': Object.freeze({ position: [39, -4, -27], radius: 1.8 }),
  'sagittarius-a-star': Object.freeze({ position: [-42, -3, 24], radius: 1.1 }),
  'galactic-center': Object.freeze({ position: [-39, -2, 21], radius: 2.5 }),
  'milky-way': Object.freeze({ position: [0, -9, -52], radius: 5 }),
})

const CATEGORY_APPEARANCE = Object.freeze({
  planet: Object.freeze({ color: '#3d9ee8', emissive: '#082744', transparent: false, opacity: 1 }),
  moon: Object.freeze({ color: '#a9c6e8', emissive: '#162331', transparent: false, opacity: 1 }),
  'dwarf-planet': Object.freeze({ color: '#8ca6d1', emissive: '#171f36', transparent: false, opacity: 1 }),
  'star-system': Object.freeze({ color: '#ffd66b', emissive: '#7a4a08', transparent: false, opacity: 1 }),
  star: Object.freeze({ color: '#ffe38a', emissive: '#9d5d08', transparent: false, opacity: 1 }),
  nebula: Object.freeze({ color: '#b37aff', emissive: '#3a1769', transparent: true, opacity: 0.72 }),
  'galactic-region': Object.freeze({ color: '#6181cf', emissive: '#141c57', transparent: true, opacity: 0.68 }),
  'black-hole': Object.freeze({ color: '#ffb04a', emissive: '#6f2800', transparent: false, opacity: 1 }),
})

export function getSceneDestination(destination) {
  const presentation = PRESENTATION_BY_ID[destination.id]

  if (!presentation) {
    throw new Error(`Missing scene presentation for "${destination.id}"`)
  }

  return {
    id: destination.id,
    category: destination.category,
    featured: destination.featured,
    ...presentation,
  }
}

export function getSceneDestinations(destinations) {
  return destinations.map(getSceneDestination)
}

export function getCategoryAppearance(category) {
  return CATEGORY_APPEARANCE[category]
}
