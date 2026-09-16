/**
 * Curated, static destination catalogue (pt-BR).
 *
 * Pure data: must not import React, Three.js, DOM or browser APIs.
 * Every destination follows the model checked by validateCatalogue:
 * - id: stable kebab-case identifier
 * - name, type, region, summary: pt-BR display text
 * - category: one of DESTINATION_CATEGORIES
 * - aliases: popular names accepted by search
 * - featured: suggested before the visitor types
 * - facts: 4–5 entries for the scientific data card
 * - sources: reputable references (https)
 */
export const destinations = [
  {
    id: 'earth',
    name: 'Terra',
    aliases: ['nosso planeta', 'planeta azul'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar',
    summary: 'O terceiro planeta a partir do Sol e o único mundo conhecido que abriga vida.',
    featured: true,
    facts: [
      { label: 'Raio médio', value: '6.371 km' },
      { label: 'Massa', value: '5,97 × 10²⁴ kg' },
      { label: 'Distância média do Sol', value: '149,6 milhões de km' },
      { label: 'Período orbital', value: '365,26 dias' },
      { label: 'Gravidade na superfície', value: '9,8 m/s²' },
    ],
    sources: [
      {
        title: 'Earth Fact Sheet',
        publisher: 'NASA Space Science Data Coordinated Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html',
      },
    ],
  },
  {
    id: 'sagittarius-a-star',
    name: 'Sagittarius A*',
    aliases: ['Sgr A*', 'buraco negro', 'buraco negro da Via Láctea'],
    category: 'black-hole',
    type: 'Buraco negro supermassivo',
    region: 'Centro Galáctico',
    summary: 'O buraco negro supermassivo no centro da nossa galáxia.',
    featured: true,
    facts: [
      { label: 'Massa', value: 'cerca de 4 milhões de massas solares' },
      { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      { label: 'Constelação', value: 'Sagitário' },
      { label: 'Primeira imagem', value: 'Event Horizon Telescope, 2022' },
    ],
    sources: [
      {
        title: 'Astronomers reveal first image of the black hole at the heart of our galaxy',
        publisher: 'Event Horizon Telescope Collaboration',
        url: 'https://eventhorizontelescope.org/blog/astronomers-reveal-first-image-black-hole-heart-our-galaxy',
      },
    ],
  },
]
