// Superfícies dos corpos rochosos e gelados, na mesma direção de arte da
// Terra: esfera graduada, relevo chapado com contorno mais escuro, atmosfera
// como casca de baixa opacidade. Contornos em [longitude, latitude] em graus.
//
// Placement é fiel ao mapa conhecido de cada corpo; o detalhe não é — na
// escala da cena nunca aparece mais que a silhueta.

import { circleOutline, ellipseOutline, latLonToVector3 } from '../sphericalPatch.js'

function craterAt(longitude, latitude, r) {
  return { center: latLonToVector3(longitude, latitude).toArray(), r }
}

function blotch(id, longitude, latitude, length, width, fill, rotation = 0) {
  // Mancha sem contorno: mares lunares, manchas de enxofre, Tombaugh. O que as
  // distingue de um continente é justamente não terem borda desenhada.
  return { id, outline: ellipseOutline(longitude, latitude, length, width, rotation), fill }
}

// `angularRadius` em graus, como em circleOutline: a calota de Marte tem uns
// 14° de raio angular, não 0,14 radianos.
function cap(id, latitude, angularRadius, fill) {
  return { id, outline: circleOutline(0, latitude, angularRadius), fill }
}

function lineae(id, outline, widthDegrees, fill) {
  // `ribbon` é a largura angular do traço, em graus: uma fita de verdade sobre
  // a esfera, não uma `line`, cuja espessura o WebGL trava em um pixel e que
  // por isso desaparece justamente quando a câmera chega perto.
  return { id, outline, fill, ribbon: widthDegrees, liftFactor: 0.004 }
}

const MERCURY_CRATERS = [
  craterAt(-160, 30, 0.12), craterAt(-120, 10, 0.08), craterAt(-95, -25, 0.1),
  craterAt(-60, 45, 0.07), craterAt(-30, -10, 0.09), craterAt(0, 25, 0.06),
  craterAt(25, -40, 0.08), craterAt(55, 15, 0.11), craterAt(90, -20, 0.07),
  craterAt(120, 35, 0.09), craterAt(150, -5, 0.06), craterAt(175, 50, 0.08),
  craterAt(-140, -55, 0.07), craterAt(70, 60, 0.06), craterAt(-45, -60, 0.05),
]

const MOON_CRATERS = [
  craterAt(-20, -43, 0.14), craterAt(15, 30, 0.09), craterAt(-60, 12, 0.08),
  craterAt(40, -15, 0.07), craterAt(-100, 50, 0.1), craterAt(120, -35, 0.11),
  craterAt(160, 20, 0.08), craterAt(-150, -20, 0.09),
]

export const ROCKY_SURFACES = Object.freeze({
  mercury: {
    oceanLow: '#6f6a63', oceanHigh: '#8d8880', gradient: 'latitude',
    craterLine: '#4a453f', showAtmosphere: false,
    patches: [], craters: MERCURY_CRATERS,
  },

  // Nenhum relevo visível, e é esse o fato: a atmosfera opaca esconde a
  // superfície inteira.
  venus: {
    oceanLow: '#cdaf74', oceanHigh: '#e3c98d', gradient: 'poles',
    showAtmosphere: true, atmosphereColor: '#f0dda8', atmosphereOpacity: 0.55,
    patches: [], craters: [],
  },

  moon: {
    oceanLow: '#9d9a95', oceanHigh: '#b9b6b0', gradient: 'latitude',
    craterLine: '#5c5952', showAtmosphere: false,
    patches: [
      blotch('mare-imbrium', -16, 33, 22, 18, '#8e8b86'),
      blotch('mare-serenitatis', 18, 28, 15, 13, '#8a8782'),
      blotch('mare-tranquillitatis', 31, 8, 17, 14, '#8a8782'),
      blotch('oceanus-procellarum', -57, 19, 26, 34, '#93908b'),
      blotch('mare-crisium', 59, 17, 12, 10, '#88857f'),
    ],
    craters: MOON_CRATERS,
  },

  mars: {
    oceanLow: '#a44e2d', oceanHigh: '#c1613a', gradient: 'poles',
    craterLine: '#6d3320', showAtmosphere: true,
    atmosphereColor: '#e3a183', atmosphereOpacity: 0.09,
    patches: [
      blotch('syrtis-major', 70, 10, 18, 22, '#7d4a2f'),
      blotch('valles-marineris', -60, -10, 46, 6, '#8a4326', 8),
      blotch('hellas', 70, -42, 24, 20, '#cf7a4d'),
      cap('north-cap', 90, 14, '#f2f7fa'),
      cap('south-cap', -90, 12, '#eef4f8'),
    ],
    craters: [craterAt(-30, 20, 0.06), craterAt(140, -25, 0.07)],
  },

  europa: {
    // Gelo quase branco, e a lua mais lisa do catálogo: nenhuma cratera, nenhum
    // relevo. O que se vê é a rede de lineae, fraturas de milhares de
    // quilômetros tingidas pelos sais que sobem do oceano abaixo da crosta.
    oceanLow: '#ccd8dd', oceanHigh: '#f0f4f5', gradient: 'poles',
    showAtmosphere: false,
    patches: [
      lineae('agenor', [[-150, 30], [-90, 14], [-20, -2], [50, -16], [130, -28]], 1.6, '#a3705a'),
      lineae('thera', [[-170, -32], [-100, -18], [-10, 6], [70, 24], [150, 34]], 1.8, '#9d6a55'),
      lineae('belus', [[-60, 72], [-44, 26], [-24, -22], [-8, -68]], 1.4, '#ab7962'),
      lineae('cadmus', [[40, 70], [68, 24], [94, -24], [120, -64]], 1.4, '#ab7962'),
      lineae('minos', [[-120, -58], [-30, -50], [60, -44], [150, -38]], 1.2, '#b5836b'),
      lineae('rhadamanthys', [[-160, 58], [-70, 50], [20, 44], [110, 40]], 1.2, '#b5836b'),
      lineae('phineus', [[-130, -8], [-70, -34], [0, -56], [70, -70]], 1, '#b98a6e'),
      lineae('asterius', [[150, 8], [-160, 34], [-110, 56], [-50, 70]], 1, '#b98a6e'),
      lineae('katreus', [[100, 62], [104, 18], [108, -26], [112, -68]], 0.8, '#c0937a'),
      lineae('androgeos', [[-20, 64], [-16, 20], [-12, -24], [-8, -66]], 0.8, '#c0937a'),
      lineae('libya', [[-90, -70], [-20, -44], [40, -14], [100, 16], [160, 44]], 0.9, '#b07d64'),
      lineae('argadnel', [[-40, 44], [30, 36], [100, 26], [170, 14]], 0.9, '#b07d64'),
    ],
    craters: [],
  },

  io: {
    oceanLow: '#d4b448', oceanHigh: '#e8c95a', gradient: 'latitude',
    showAtmosphere: false,
    patches: [
      blotch('pele', -105, -19, 20, 16, '#b5402f'),
      blotch('loki', -50, 13, 16, 14, '#8c3a2c'),
      blotch('prometheus', 25, -2, 12, 10, '#c05038'),
      blotch('tvashtar', 120, 60, 14, 12, '#a8402e'),
      blotch('masubi', -150, -45, 11, 9, '#b8543a'),
      blotch('amirani', 60, 25, 13, 10, '#933c2d'),
    ],
    craters: [],
  },

  titan: {
    oceanLow: '#c08a46', oceanHigh: '#d9a25c', gradient: 'poles',
    showAtmosphere: true, atmosphereColor: '#e8b978', atmosphereOpacity: 0.48,
    patches: [
      blotch('kraken-mare', -50, 68, 26, 18, '#7d5c3a'),
      blotch('shangri-la', -160, -8, 40, 22, '#a87a44'),
    ],
    craters: [],
  },

  pluto: {
    oceanLow: '#a8937c', oceanHigh: '#c8b49c', gradient: 'latitude',
    showAtmosphere: false,
    patches: [
      blotch('tombaugh-regio', 175, 18, 42, 36, '#eadfc8'),
      blotch('cthulhu-macula', 130, 2, 60, 16, '#6f5b48'),
      cap('north-cap', 90, 10, '#e4dcd0'),
    ],
    craters: [],
  },
})
