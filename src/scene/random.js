// Gerador determinístico por semente (mulberry32). Existe para que o
// acabamento procedural — campo de estrelas, poeira de nebulosa, disco do
// buraco negro — seja o mesmo entre recargas e entre execuções de teste.
// Math.random não serve: a cena mudaria a cada abertura.

export function createRandom(seed) {
  let state = seed >>> 0

  return function random() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
