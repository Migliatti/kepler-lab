/** Normalizes text for accent- and case-insensitive comparison in pt-BR. */
export function normalizeText(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/\s+/g, ' ')
    .trim()
}
