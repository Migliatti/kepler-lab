// Nome desenhado junto do corpo, com o `Html` do drei (já instalado). É
// decoração: `pointerEvents: none` garante que o rótulo nunca roube o clique
// do corpo, e ele fica fora da árvore acessível porque o SceneReadout já
// anuncia a seleção — dois anúncios seriam ruído no leitor de tela.

import { Html } from '@react-three/drei'

export function BodyLabel({ name, radius }) {
  return (
    <Html
      position={[0, radius * 1.45, 0]}
      center
      distanceFactor={18}
      zIndexRange={[1, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <span className="body-label" aria-hidden="true">{name}</span>
    </Html>
  )
}
