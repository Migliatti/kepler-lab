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
    impact:
      'A Terra é a referência para comparar outros mundos porque concentra toda a vida conhecida e a única civilização capaz de estudá-los.',
    overview:
      'Seu interior rochoso, oceanos de água líquida, atmosfera e campo magnético formam um sistema que sustenta condições habitáveis na superfície.',
    physics: {
      explanation:
        'A gravidade da Terra mantém o ar e a água próximos ao planeta; sua rotação e a energia recebida do Sol também influenciam o clima.',
    },
    history:
      'Observações feitas por satélites e missões espaciais transformaram a Terra de um horizonte local em um planeta medido como um sistema inteiro.',
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
    impact:
      'Sagittarius A* torna visível que o centro da Via Láctea é dominado por um objeto compacto com milhões de vezes a massa do Sol.',
    overview:
      'Ele está a cerca de 27 mil anos-luz da Terra e é cercado por estrelas que orbitam uma região muito pequena do Centro Galáctico.',
    physics: {
      explanation:
        'A gravidade de um buraco negro curva intensamente o espaço-tempo; as órbitas das estrelas próximas revelam a massa concentrada em Sagittarius A*.',
    },
    history:
      'Medições de décadas das órbitas estelares no Centro Galáctico sustentaram sua identificação, e o Event Horizon Telescope divulgou sua primeira imagem em 2022.',
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
