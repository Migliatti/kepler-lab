# Fase 2 — Cena e navegação: plano de implementação

> **Para agentes de implementação:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. As etapas usam caixas de seleção (`- [ ]`) para acompanhamento.

**Objetivo:** substituir a tela provisória por uma cena 3D navegável que começa na Terra, representa os 22 destinos em escala exploratória declaradamente ilustrativa e permite selecioná-los por marcadores em desktop e celular.

**Arquitetura:** `src/scene/layout.js` concentra somente posições, aparências, visibilidade e agrupamento como regras puras. `src/scene/` consome essas regras para renderizar Three.js. `App.jsx` guarda apenas a seleção temporária; o catálogo científico permanece independente da cena.

**Stack:** React 19, Vite 8, Three.js, `@react-three/fiber`, `@react-three/drei`, Vitest 5 e Oxlint.

**Spec:** `specs/product-spec.md`; decisões: `specs/planning-context.yaml`; roteiro: `PLAN.md`.

**Dependências instaladas (Tarefa 1, 16/09/2026):** `three` `^0.186.0`, `@react-three/fiber` `^9.7.0` e `@react-three/drei` `^10.7.8`. React e React DOM foram mantidos em `^19.2.8`, compatível com o intervalo exigido por `@react-three/fiber` (`>=19 <19.3`).

## Progresso de execução

- **Informativo para averiguação futura — uso de subagente:** conforme confirmado pelo usuário, nenhuma tarefa desta fase usou subagente.

| Tarefa | Uso de subagente | Evidência disponível |
| --- | --- | --- |
| 1 | Não | Confirmação do usuário |
| 2 | Não | Confirmação do usuário |
| 3 | Não | Confirmação do usuário |
| 4 | Não | Confirmação do usuário |
| 5 | Não | Confirmação do usuário |

- **Tarefa 2 concluída:** `e533fb7 feat(scene): add marker visibility rules`.
- **Tarefa 3 concluída, exceto inspeção manual:** `8b62000 feat(scene): render navigable celestial overview`.
- **Tarefa 4 implementada:** `caa701b feat(scene): select destinations from markers`.
- **Tarefa 5 concluída:** aviso de escala e documentação foram atualizados.
- **Verificações executadas após as tarefas 4 e 5 em 16/09/2026:** `npm.cmd test` (43 testes), `npm.cmd run lint`, `npm.cmd run build` e `git diff --check` concluídos sem falhas. O build emite apenas o aviso de bundle acima de 500 kB após a inclusão do motor 3D.
- **Verificações executadas em 16/09/2026:** `npm.cmd test` (41 testes), `npm.cmd run lint`, `npm.cmd run build` e `git diff --check` concluídos sem falhas. O build emite apenas o aviso de bundle acima de 500 kB após a inclusão do motor 3D.
- **Inspeção manual confirmada pelo usuário:** a câmera orbita com a Terra como foco, e seleção, aviso de escala e resumo funcionam. A validação em celular/emulação não foi registrada separadamente.

## Restrições globais

- Interface em pt-BR; identificadores em inglês e módulos ES JavaScript.
- Instalar somente `three`, `@react-three/fiber` e `@react-three/drei`: motor, integração React e controles/rótulos declarativos da cena.
- `src/content/` não pode importar React, Three.js, DOM nem APIs de navegador; coordenadas e tamanhos adaptados pertencem a `src/scene/`.
- Posições, tamanhos, distâncias, velocidade e agrupamento são ilustrativos. Exibir aviso textual permanente.
- A cena recebe catálogo e seleção; não recria busca, aliases, conteúdo, persistência ou preferências.
- Não implementar viagem, pulo, retorno à Terra, busca visual, painel, onboarding, som ou configurações: pertencem às Fases 3–5.
- Não baixar texturas/modelos ou adicionar outras bibliotecas.
- Antes de concluir: `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build` e `git diff --check`.

## Estrutura de arquivos

- Criar `src/scene/layout.js`: apresentação visual pura dos 22 IDs, cores de categoria, visibilidade e clusters.
- Criar `src/scene/layout.test.js`: Vitest sem React, Canvas ou WebGL.
- Criar `src/scene/SceneCanvas.jsx`: Canvas, iluminação e controles de órbita.
- Criar `src/scene/CelestialBodies.jsx`: geometrias simplificadas por categoria.
- Criar `src/scene/DestinationMarkers.jsx`: rótulos, seleção e clusters.
- Criar `src/scene/ExplorationScene.jsx`: composição da cena.
- Modificar `src/App.jsx`, `src/index.css`, `README.md`, `package.json` e `package-lock.json`.

---

### Tarefa 1: dependências e contrato de apresentação ilustrativa

**Arquivos:**
- Modificar: `package.json`, `package-lock.json`
- Criar: `src/scene/layout.js`, `src/scene/layout.test.js`

**Interfaces:**
- Consome destinos com `id`, `category` e `featured`.
- Produz `getSceneDestination(destination)`, `getSceneDestinations(destinations)`, `getCategoryAppearance(category)`, `SCALE_NOTICE` e `EARTH_CAMERA_POSITION`.

- [x] **Etapa 1: instalar as dependências aprovadas**

```powershell
npm.cmd install three @react-three/fiber @react-three/drei
```

Confirmar que somente esses três pacotes entram em `dependencies`.

- [x] **Etapa 2: escrever o teste que falha**

Criar `src/scene/layout.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { destinations } from '../content/destinations.js'
import {
  EARTH_CAMERA_POSITION,
  getCategoryAppearance,
  getSceneDestination,
  getSceneDestinations,
} from './layout.js'

describe('scene layout', () => {
  it('gives Earth the illustrative origin and stable camera position', () => {
    expect(getSceneDestination(destinations.find(({ id }) => id === 'earth'))).toMatchObject({
      id: 'earth', position: [0, 0, 0], radius: 1,
    })
    expect(EARTH_CAMERA_POSITION).toEqual([0, 9, 24])
  })

  it('maps every catalogue destination without mutating its scientific content', () => {
    const original = structuredClone(destinations)
    expect(getSceneDestinations(destinations)).toHaveLength(22)
    expect(destinations).toEqual(original)
  })

  it('provides a visible appearance for every rendered category', () => {
    expect(getCategoryAppearance('planet')).toMatchObject({ color: expect.stringMatching(/^#/) })
    expect(getCategoryAppearance('nebula')).toMatchObject({ transparent: true, opacity: expect.any(Number) })
  })
})
```

- [x] **Etapa 3: executar e confirmar a falha**

```powershell
npm.cmd test -- src/scene/layout.test.js
```

Esperado: falha de resolução de `layout.js`.

- [x] **Etapa 4: implementar somente o contrato necessário**

Criar `layout.js` com `SCALE_NOTICE = 'Posições e tamanhos são ilustrativos para permitir a exploração.'`, `EARTH_CAMERA_POSITION = [0, 9, 24]` e tabela imutável de todos os IDs abaixo. Estes valores não são dados científicos:

```js
const PRESENTATION_BY_ID = Object.freeze({
  sun: { position: [-14, 0, -7], radius: 2.6 }, mercury: { position: [-10, .2, -5], radius: .35 },
  venus: { position: [-7, -.4, -3], radius: .65 }, earth: { position: [0, 0, 0], radius: 1 },
  moon: { position: [2.2, .5, -.8], radius: .28 }, mars: { position: [5, -.2, 2], radius: .55 },
  jupiter: { position: [11, .4, 5], radius: 1.65 }, europa: { position: [13, 1.1, 4], radius: .25 },
  io: { position: [12.5, -1, 6.4], radius: .24 }, saturn: { position: [18, -.4, 9], radius: 1.45 },
  titan: { position: [20, .8, 8], radius: .3 }, uranus: { position: [25, .2, 12], radius: .9 },
  neptune: { position: [31, -.4, 15], radius: .88 }, pluto: { position: [35, .5, 18], radius: .22 },
  'alpha-centauri': { position: [-32, 6, -26], radius: 1.15 }, sirius: { position: [-18, 9, -35], radius: 1.05 },
  betelgeuse: { position: [10, 8, -38], radius: 1.5 }, 'orion-nebula': { position: [28, 5, -34], radius: 2.1 },
  'crab-nebula': { position: [39, -4, -27], radius: 1.8 }, 'sagittarius-a-star': { position: [-42, -3, 24], radius: 1.1 },
  'galactic-center': { position: [-39, -2, 21], radius: 2.5 }, 'milky-way': { position: [0, -9, -52], radius: 5 },
})
export function getSceneDestination(destination) {
  const presentation = PRESENTATION_BY_ID[destination.id]
  if (!presentation) throw new Error(`Missing scene presentation for "${destination.id}"`)
  return { id: destination.id, category: destination.category, featured: destination.featured, ...presentation }
}
export function getSceneDestinations(destinations) { return destinations.map(getSceneDestination) }
```

Adicionar tabela imutável de aparência para as oito categorias; planetas/luas azuis, estrelas amarelas, nebulosas violetas e buraco negro âmbar. Cada objeto contém `color`, `emissive`, `transparent` e `opacity`; `getCategoryAppearance(category)` retorna essa tabela.

- [x] **Etapa 5: verificar e criar commit**

```powershell
npm.cmd test -- src/scene/layout.test.js
git add package.json package-lock.json src/scene/layout.js src/scene/layout.test.js
git commit -m "feat(scene): add illustrative destination layout"
```

### Tarefa 2: regras puras de proximidade e agrupamento

**Arquivos:**
- Modificar: `src/scene/layout.js`, `src/scene/layout.test.js`

**Interfaces:**
- Consome nós da cena e `cameraPosition: [number, number, number]`.
- Produz `getVisibleMarkerItems(nodes, cameraPosition)`: itens `{ kind: 'destination', destination }` ou `{ kind: 'cluster', id, position, destinations }`.
- Regra: destacados sempre individuais; não destacados são visíveis a até 42 unidades; dois ou mais não destacados separados por até 5 unidades formam cluster.

- [x] **Etapa 1: escrever os testes que falham**

```js
import { getVisibleMarkerItems } from './layout.js'

it('keeps featured markers discoverable while hiding distant non-featured markers', () => {
  const items = getVisibleMarkerItems([
    { id: 'earth', featured: true, position: [0, 0, 0] },
    { id: 'mercury', featured: false, position: [100, 0, 0] },
  ], [0, 0, 0])
  expect(items.map((item) => item.destination?.id)).toContain('earth')
  expect(items.map((item) => item.destination?.id)).not.toContain('mercury')
})

it('clusters nearby non-featured markers but keeps featured markers individual', () => {
  const items = getVisibleMarkerItems([
    { id: 'io', featured: false, position: [10, 0, 0] },
    { id: 'europa', featured: false, position: [12, 0, 0] },
    { id: 'jupiter', featured: true, position: [11, 0, 0] },
  ], [0, 0, 0])
  expect(items).toEqual(expect.arrayContaining([
    expect.objectContaining({ kind: 'cluster', destinations: ['europa', 'io'] }),
    expect.objectContaining({ kind: 'destination', destination: expect.objectContaining({ id: 'jupiter' }) }),
  ]))
})
```

- [x] **Etapa 2: executar e confirmar a falha**

```powershell
npm.cmd test -- src/scene/layout.test.js
```

- [x] **Etapa 3: implementar sem APIs Three.js**

Usar `Math.hypot` para distância. Filtrar primeiro por destaque ou 42 unidades. Separar destacados em itens individuais. Para os demais, formar componentes conectados pela distância de 5 unidades; um cluster tem ID estável `cluster:` mais IDs ordenados, posição igual à média e `destinations` ordenados. Um grupo de um item volta como `kind: 'destination'`.

- [x] **Etapa 4: verificar e criar commit**

```powershell
npm.cmd test -- src/scene/layout.test.js
git add src/scene/layout.js src/scene/layout.test.js
git commit -m "feat(scene): add marker visibility rules"
```

### Tarefa 3: canvas navegável e corpos celestes simplificados

**Arquivos:**
- Criar: `src/scene/SceneCanvas.jsx`, `src/scene/CelestialBodies.jsx`, `src/scene/ExplorationScene.jsx`
- Modificar: `src/App.jsx`, `src/index.css`

**Interfaces:**
- `SceneCanvas({ children })` fornece Canvas com câmera e `OrbitControls`.
- `CelestialBodies({ destinations, selectedId })` recebe somente nós do layout.
- `ExplorationScene({ destinations, selectedId, onSelectDestination })` será o único ponto React Three Fiber.

- [x] **Etapa 1: preparar teste de cobertura de apresentação**

Acrescentar:

```js
it('has one visual presentation for each catalogue id', () => {
  expect(getSceneDestinations(destinations).map(({ id }) => id).sort()).toEqual(
    destinations.map(({ id }) => id).sort(),
  )
})
```

- [x] **Etapa 2: executar e confirmar a falha se algum ID estiver ausente**

```powershell
npm.cmd test -- src/scene/layout.test.js
```

- [x] **Etapa 3: implementar os componentes**

`SceneCanvas.jsx` usa:

```jsx
<Canvas camera={{ position: EARTH_CAMERA_POSITION, fov: 48 }} dpr={[1, 1.5]}>
  <color attach="background" args={['#03050c']} />
  <ambientLight intensity={0.45} />
  <directionalLight position={[8, 12, 10]} intensity={1.2} />
  {children}
  <OrbitControls enablePan minDistance={5} maxDistance={90} />
</Canvas>
```

`CelestialBodies.jsx` mapeia os nós a `<mesh position={position}>` com esfera de baixa segmentação e `meshStandardMaterial` da aparência. Quando `id === selectedId`, aplica escala `1.25`. Saturno recebe exclusivamente um `ringGeometry` ilustrativo. Não usar texturas ou órbitas físicas.

`ExplorationScene.jsx` usa `useMemo(() => getSceneDestinations(destinations), [destinations])`, monta `SceneCanvas` e `CelestialBodies`. Por enquanto, não renderiza marcadores.

`App.jsx` fica assim:

```jsx
import { destinations } from './content/destinations.js'
import { ExplorationScene } from './scene/ExplorationScene.jsx'

function App() {
  return <ExplorationScene destinations={destinations} selectedId={null} onSelectDestination={() => {}} />
}
export default App
```

Em `index.css`, definir `body, #root { min-height: 100dvh; margin: 0; overflow: hidden; }`; remover regras de `.welcome`.

- [x] **Etapa 4: verificar build e inspeção manual**

```powershell
npm.cmd test -- src/scene/layout.test.js
npm.cmd run build
npm.cmd run dev
```

Inspecionar: fundo escuro, Terra na origem, órbita com mouse e gesto de toque, sem erros de console. Encerrar o servidor.

**Registro parcial (16/09/2026):** o teste de layout, lint e build foram executados com sucesso. A inspeção manual permanece pendente porque não havia navegador conectado.

- [x] **Etapa 5: criar commit**

```powershell
git add src/scene src/App.jsx src/index.css
git commit -m "feat(scene): render navigable celestial overview"
```

### Tarefa 4: marcadores acessíveis e seleção por mouse ou toque

**Arquivos:**
- Criar: `src/scene/DestinationMarkers.jsx`
- Modificar: `src/scene/ExplorationScene.jsx`, `src/App.jsx`, `src/index.css`, `src/scene/layout.test.js`

**Interfaces:**
- `DestinationMarkers({ items, destinationById, selectedId, onSelectDestination })`.
- Um destino ativa `onSelectDestination(id)`; cluster ativa o primeiro ID ordenado.
- Rótulos exibem nome e tipo; botão usa `aria-pressed`.

- [x] **Etapa 1: escrever teste de derivação**

```js
it('returns an individual selectable marker for every featured catalogue destination from Earth', () => {
  const ids = getVisibleMarkerItems(getSceneDestinations(destinations), [0, 0, 0])
    .filter(({ kind }) => kind === 'destination')
    .map(({ destination }) => destination.id)
  expect(ids).toEqual(expect.arrayContaining(
    destinations.filter(({ featured }) => featured).map(({ id }) => id),
  ))
})
```

- [x] **Etapa 2: executar e confirmar a regra existente**

```powershell
npm.cmd test -- src/scene/layout.test.js
```

Se já aprovar, confirmar que a regra testada é realmente a de destacados individuais; não testar detalhe incidental.

- [x] **Etapa 3: implementar os marcadores**

`DestinationMarkers.jsx` usa `Billboard` e `Html` de Drei. Para destino, renderiza botão `type="button"` com `aria-pressed={id === selectedId}`, texto de `name` e `type`; `onClick` e `onPointerDown` devem parar propagação e chamar o callback. Para cluster: `“N destinos nesta região”` e callback com o primeiro ID. Não depender de hover ou cor.

Em `ExplorationScene.jsx`, obter a posição da câmera com `useThree` dentro de filho do Canvas e recalcular itens somente no evento `change` de `OrbitControls`, nunca por frame. Criar `destinationById` com `new Map(destinations.map(...))`.

Em `App.jsx`, usar:

```jsx
const [selectedId, setSelectedId] = useState(null)
const selectedDestination = destinations.find(({ id }) => id === selectedId) ?? null
<ExplorationScene destinations={destinations} selectedId={selectedId} onSelectDestination={setSelectedId} />
{selectedDestination && <p className="selection-summary">Selecionado: {selectedDestination.name}</p>}
```

O resumo só confirma a seleção; não incluir viagem, dados ou painel da Fase 4.

- [x] **Etapa 4: verificar interação manual**

```powershell
npm.cmd test -- src/scene/layout.test.js
npm.cmd run build
npm.cmd run dev
```

No desktop, orbitar e clicar em marcador. Em emulação móvel ou aparelho, arrastar a cena e tocar o marcador. Ambos devem atualizar o resumo; botões devem ser legíveis.

- [ ] **Etapa 5: criar commit**

```powershell
git add src/scene src/App.jsx src/index.css
git commit -m "feat(scene): select destinations from markers"
```

### Tarefa 5: aviso de escala, documentação e encerramento

**Arquivos:**
- Modificar: `src/scene/ExplorationScene.jsx`, `src/scene/layout.test.js`, `src/index.css`, `README.md`, este plano.

**Interfaces:**
- Consome `SCALE_NOTICE`.
- Produz aviso fora do Canvas com `role="note"`, legível sem WebGL.

- [x] **Etapa 1: escrever o teste de regressão**

```js
import { SCALE_NOTICE } from './layout.js'

it('states explicitly that visual positions and sizes are illustrative', () => {
  expect(SCALE_NOTICE).toMatch(/posições e tamanhos/i)
  expect(SCALE_NOTICE).toMatch(/ilustrativ/i)
})
```

- [x] **Etapa 2: executar e confirmar o contrato existente**

```powershell
npm.cmd test -- src/scene/layout.test.js
```

- [x] **Etapa 3: exibir e registrar**

Em `ExplorationScene.jsx`, sobrepor, fora do Canvas:

```jsx
<p className="scale-notice" role="note">{SCALE_NOTICE}</p>
```

Estilizar com fundo translúcido e alto contraste, sem cobrir marcadores. Atualizar README: cena 3D, Terra e marcadores passam para “Disponível hoje”; viagem, retorno, painel e preferências seguem planejados. No topo deste plano, após as verificações, acrescentar **Progresso de execução** com hashes, total de testes e resultado das inspeções desktop/mobile.

- [x] **Etapa 4: executar a verificação final**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git diff --check
npm.cmd run dev
```

Registrar inspeção manual: inicia na Terra; órbita por mouse/toque; destinos destacados visíveis; não destacados aparecem por aproximação; áreas densas agrupam; seleção funciona; aviso permanece legível. Encerrar o servidor.

- [x] **Etapa 5: criar commit de encerramento**

```powershell
git add src/scene/ExplorationScene.jsx src/scene/layout.test.js src/index.css README.md docs/superpowers/plans/2026-09-16-phase-2-scene-navigation.md
git commit -m "chore(scene): verify phase two navigation"
```

## Critérios de conclusão

- As três dependências aprovadas são as únicas novas dependências.
- A cena abre na Terra e pode ser orbitada por mouse e toque.
- Os 22 destinos têm apresentação visual somente em `src/scene/layout.js`; o catálogo permanece puro.
- Marcadores textuais são selecionáveis, usam proximidade e agrupam itens não destacados.
- O aviso de escala ilustrativa permanece visível.
- Viagem, busca integrada, retorno, dados completos e preferências continuam fora da fase.
- Testes, lint, build, diff e inspeção desktop/mobile têm evidência registrada.
