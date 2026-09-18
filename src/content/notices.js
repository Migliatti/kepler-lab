export const SCALE_NOTICE = 'Posições e tamanhos são ilustrativos para permitir a exploração.'

export const BLACK_HOLE_NOTICE =
  'O disco dobrado sobre a sombra é uma representação ilustrativa do efeito de lente gravitacional, desenhada por geometria.'

// Corpos cuja aparência precisa de um aviso próprio, além do de escala.
export const APPEARANCE_NOTICES = Object.freeze({
  'sagittarius-a-star': BLACK_HOLE_NOTICE,
})

export function getAppearanceNotice(id) {
  return APPEARANCE_NOTICES[id] ?? null
}
