// Gigantes gasosos: nenhum relevo, só faixas de latitude e algumas tempestades
// como elipses. As faixas são pontos de controle do polo sul ao polo norte,
// interpolados por latitudeBands.js.

import { ellipseOutline } from '../sphericalPatch.js'

function storm(id, longitude, latitude, length, width, fill, rotation = 0) {
  return { id, outline: ellipseOutline(longitude, latitude, length, width, rotation), fill }
}

export const GIANT_SURFACES = Object.freeze({
  jupiter: {
    oceanLow: '#c9a26a', oceanHigh: '#e8d2a8', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#f0dcb4', atmosphereOpacity: 0.12,
    bands: [
      { latitude: -90, color: '#b08a5c' },
      { latitude: -60, color: '#d8c09a' },
      { latitude: -42, color: '#9c7346' },
      { latitude: -28, color: '#e8d2a8' },
      { latitude: -16, color: '#a87a4c' },
      { latitude: -6, color: '#f0e0c0' },
      { latitude: 8, color: '#b98a54' },
      { latitude: 20, color: '#eddaae' },
      { latitude: 34, color: '#a37848' },
      { latitude: 52, color: '#d6be98' },
      { latitude: 90, color: '#ad875c' },
    ],
    patches: [storm('great-red-spot', -60, -22, 26, 14, '#b4533a')],
    craters: [],
  },

  saturn: {
    oceanLow: '#c4a978', oceanHigh: '#e6d6b0', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#f0e4c4', atmosphereOpacity: 0.1,
    // Faixas mais suaves que as de Júpiter: é a diferença que se vê a olho nu.
    bands: [
      { latitude: -90, color: '#b99d70' },
      { latitude: -50, color: '#dccba4' },
      { latitude: -20, color: '#c7ae80' },
      { latitude: 5, color: '#e6d6b0' },
      { latitude: 30, color: '#cdb488' },
      { latitude: 60, color: '#dfcfa8' },
      { latitude: 90, color: '#b99d70' },
    ],
    patches: [],
    craters: [],
  },

  uranus: {
    oceanLow: '#74c2c6', oceanHigh: '#8fd6d9', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#a6e2e4', atmosphereOpacity: 0.14,
    // Faixas fracas: o contraste entre elas é quase nulo, como nas imagens da
    // Voyager 2.
    bands: [
      { latitude: -90, color: '#7cc8cc' },
      { latitude: -40, color: '#8fd6d9' },
      { latitude: 0, color: '#86ced1' },
      { latitude: 40, color: '#8fd6d9' },
      { latitude: 90, color: '#7cc8cc' },
    ],
    patches: [],
    craters: [],
  },

  neptune: {
    oceanLow: '#2f4fa8', oceanHigh: '#3b63c4', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#6f93e0', atmosphereOpacity: 0.14,
    bands: [
      { latitude: -90, color: '#2c4a9e' },
      { latitude: -45, color: '#3b63c4' },
      { latitude: -10, color: '#4a74d4' },
      { latitude: 25, color: '#3b63c4' },
      { latitude: 60, color: '#33569f' },
      { latitude: 90, color: '#2c4a9e' },
    ],
    patches: [storm('great-dark-spot', 20, -22, 24, 13, '#20356f')],
    craters: [],
  },
})
