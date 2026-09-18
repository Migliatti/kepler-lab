// Traduz a preferência de rótulos nas duas superfícies que a desenham: o
// rótulo de ponteiro, fora da cena, e o nome desenhado junto do corpo.
//
// Nenhum dos dois é o canal de acessibilidade: com 'none' o SceneReadout
// continua anunciando a seleção.
export function resolveLabelVisibility(labels) {
  if (labels === 'always') return { hover: false, scene: true }
  if (labels === 'none') return { hover: false, scene: false }
  return { hover: true, scene: false }
}
