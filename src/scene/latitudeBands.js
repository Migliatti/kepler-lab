// Faixas latitudinais dos gigantes gasosos. As faixas são pontos de controle
// em graus, do sul para o norte; a cor de uma latitude é a interpolação entre
// os dois pontos vizinhos. Puro: devolve quais cores misturar e quanto, e quem
// mistura de fato é o PlanetSurface, que já tem THREE.Color em mãos.

export function bandStops(bands, latitude) {
  if (!bands || bands.length === 0) return null

  const first = bands[0]
  const last = bands[bands.length - 1]

  // Fora do intervalo declarado o valor é fixado, nunca extrapolado: uma
  // extrapolação inventaria cor onde o corpo não tem dado.
  if (bands.length === 1 || latitude <= first.latitude) {
    return { from: first.color, to: first.color, t: 0 }
  }
  if (latitude >= last.latitude) return { from: last.color, to: last.color, t: 0 }

  for (let i = 0; i < bands.length - 1; i++) {
    const low = bands[i]
    const high = bands[i + 1]
    if (latitude >= high.latitude) continue

    const span = high.latitude - low.latitude
    const t = span === 0 ? 0 : (latitude - low.latitude) / span
    return t === 0
      ? { from: low.color, to: low.color, t: 0 }
      : { from: low.color, to: high.color, t }
  }

  return { from: last.color, to: last.color, t: 0 }
}
