// Sgr A* montado por geometria. A lente gravitacional de verdade — o fundo
// deformado ao redor da sombra — exige deslocar a imagem já renderizada, isto
// é, um segundo passe com render target e shader próprio. Esta fase excluiu
// esse passe junto com bloom, e ele é o mais caro em celular.
//
// O que fica é a leitura que as imagens do Event Horizon Telescope mostram,
// desenhada à mão: sombra, anel de fótons, disco inclinado e um arco por cima
// da sombra imitando o topo do disco "dobrado". É geometria imitando o efeito,
// e a interface diz isso — ver BLACK_HOLE_NOTICE.

// Múltiplos do raio ilustrativo do corpo.
export const BLACK_HOLE_GEOMETRY = Object.freeze({
  shadow: 0.72,
  photonInner: 0.76,
  photonOuter: 0.84,
  discInner: 1.05,
  discOuter: 2.4,
  discTilt: 1.15,
  foldInner: 0.86,
  foldOuter: 1.15,
})

/**
 * Assimetria Doppler: o lado que se aproxima é mais claro e mais azul.
 * 1 no lado que vem em direção à câmera, 0 no que se afasta, 0,5 nos flancos.
 */
export function dopplerBrightness(angle) {
  return (1 - Math.sin(angle)) / 2
}

export function buildDiscBrightness(segments) {
  const brightness = new Float32Array(segments + 1)

  for (let i = 0; i <= segments; i++) {
    brightness[i] = dopplerBrightness((i / segments) * Math.PI * 2)
  }

  return brightness
}
