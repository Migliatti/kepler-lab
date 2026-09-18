// Plataforma de entrada da sessão. É o navegador quem responde, mas a leitura
// é pura: recebe o objeto global e devolve um valor, sem tocar em window por
// conta própria.

export const PLATFORMS = Object.freeze({ touch: 'touch', desktop: 'desktop' })

const COARSE_POINTER_QUERY = '(pointer: coarse)'

export function readPlatform(globalObject) {
  return globalObject?.matchMedia?.(COARSE_POINTER_QUERY).matches === true
    ? PLATFORMS.touch
    : PLATFORMS.desktop
}

/**
 * A telemetria da cena só aparece no desktop. No celular ela cobre a cena e
 * atrapalha a navegação por toque; os mesmos dados e os avisos de escala e de
 * aparência estão na seção "Dados e fontes" do painel do destino.
 */
export function showsSceneReadout(platform) {
  return platform !== PLATFORMS.touch
}
