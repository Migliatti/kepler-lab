# Fase 3 — Viagem e descoberta: plano de implementação

> **Para agentes de implementação:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. As etapas usam caixas de seleção (`- [ ]`) para acompanhamento.

**Objetivo:** permitir que a pessoa selecione um dos 22 destinos por marcador ou busca, viaje até ele em 3–6 segundos, pule a viagem, retorne à Terra e veja sempre seu local atual.

**Arquitetura:** estado e interpolação são módulos JavaScript puros, testados sem React ou WebGL. `App.jsx` é o proprietário da seleção, viagem e busca; a cena recebe uma instrução declarativa e notifica a chegada por callback. Componentes DOM apenas apresentam estado e disparam intenções.

**Stack:** React 19, Vite 8, Three.js, `@react-three/fiber`, `@react-three/drei`, Vitest 5 e Oxlint. Nenhuma dependência nova.

**Spec:** `specs/product-spec.md`; decisões: `specs/planning-context.yaml`; roteiro: `PLAN.md`; base: `docs/superpowers/plans/2026-09-16-phase-2-scene-navigation.md`.

## Nota informativa de revisão futura

As tarefas 3 e 4 foram implementadas provisoriamente e deverão ser revisadas
integralmente no futuro por outra IA. A revisão deve considerar especialmente
a permanência da câmera no astro de destino após a chegada, além dos fluxos de
busca, pulo, chegada e retorno à Terra.

## Informativo para averiguação futura: uso de subagente

| Tarefa | Uso de subagente | Evidência disponível |
| --- | --- | --- |
| 1 | Não informado | O plano não registra executor específico |
| 2 | Não informado | O relatório disponível descreve a execução, mas não identifica uso de subagente |
| 3 | Não | Executada nesta sessão sem subagente disponível |
| 4 | Não | Executada nesta sessão sem subagente disponível |
| 5 | Não executada | Ainda não há registro de execução |

`Não informado` significa que não há evidência suficiente para afirmar `Sim`
ou `Não`; essa distinção fica preservada para a revisão futura.

## Restrições globais

- Interface em pt-BR; identificadores em inglês e módulos ES JavaScript.
- `src/content/` e `src/utils/` não importam React, Three.js, DOM, localStorage ou APIs de navegador.
- A viagem é ilustrativa, dura entre 3 e 6 segundos e não modifica catálogo, dados científicos, posições ou escalas.
- A cena consome `travel` e callbacks; não decide busca, aliases, retorno, preferências ou conteúdo.
- Reutilizar `searchDestinations` e `getSuggestedDestinations`; não criar busca externa ou ranking paralelo.
- Viagem está ligada por padrão nesta fase; configuração/persistência são da Fase 5.
- Painel progressivo, dados completos, onboarding, ajuda e som ficam fora da Fase 3.
- Existem arquivos não rastreados candidatos em `src/scene/cameraTravel.js`, `src/scene/cameraTravel.test.js`, `src/state/travel.js` e `src/state/travel.test.js`. Preservá-los e revisá-los antes de editar; não sobrescrever trabalho do usuário.
- Antes de concluir: `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build` e `git diff --check`.

## Estrutura de arquivos

- Criar/adotar `src/state/travel.js` e teste: transições puras da jornada.
- Criar/adotar `src/scene/cameraTravel.js` e teste: duração, enquadramento e interpolação puros.
- Criar `src/scene/CameraTraveller.jsx`: consumidor R3F da instrução de viagem.
- Modificar `src/scene/SceneCanvas.jsx` e `src/scene/ExplorationScene.jsx`: integração declarativa.
- Criar `src/components/SearchOverlay.jsx`, `TravelOverlay.jsx` e `NavigationStatus.jsx`.
- Modificar `src/App.jsx`, `src/index.css` e `README.md`.

---

### Tarefa 1: consolidar o contrato puro de viagem

**Files:**
- Criar/adotar: `src/state/travel.js`, `src/state/travel.test.js`
- Criar/adotar: `src/scene/cameraTravel.js`, `src/scene/cameraTravel.test.js`

**Interfaces:**
- Consome `destinationId: string` e `isCameraTravelEnabled: boolean`.
- Produz `startTravel(destinationId, enabled)`, `completeTravel(travel)`, `returnToEarth(enabled)` e `CAMERA_TRAVEL_DURATION_MS`.
- `Travel`: `{ destinationId: string, status: 'travelling' | 'arrived' }`; sem viagem: `null`.

- [ ] **Etapa 1: preservar e revisar os arquivos não rastreados**

```powershell
git status --short
Get-Content -Raw src/state/travel.js, src/state/travel.test.js, src/scene/cameraTravel.js, src/scene/cameraTravel.test.js
```

Se algum conteúdo não for da Fase 3, parar e pedir decisão ao usuário; não apagar, mover ou substituir arquivos não rastreados.

- [ ] **Etapa 2: escrever os testes que falham**

Em `src/state/travel.test.js`:

```js
it('returns to Earth through the same travel policy', () => {
  expect(returnToEarth(true)).toEqual({ destinationId: 'earth', status: 'travelling' })
  expect(returnToEarth(false)).toEqual({ destinationId: 'earth', status: 'arrived' })
})
it('does not mutate the prior travel object when completing it', () => {
  const travel = { destinationId: 'mars', status: 'travelling' }
  expect(completeTravel(travel)).toEqual({ destinationId: 'mars', status: 'arrived' })
  expect(travel).toEqual({ destinationId: 'mars', status: 'travelling' })
})
```

Em `src/scene/cameraTravel.test.js`:

```js
it('clamps interpolation outside the journey range', () => {
  expect(getCameraPositionAt([1, 2, 3], [7, 8, 9], -0.1)).toEqual([1, 2, 3])
  expect(getCameraPositionAt([1, 2, 3], [7, 8, 9], 1.1)).toEqual([7, 8, 9])
})
```

- [ ] **Etapa 3: executar para confirmar a falha**

Run: `npm.cmd test -- src/state/travel.test.js src/scene/cameraTravel.test.js`

Expected: falha de importação de `returnToEarth`; interpolação pode passar por já existir.

- [ ] **Etapa 4: implementar a transição mínima**

```js
export function returnToEarth(isCameraTravelEnabled) {
  return startTravel('earth', isCameraTravelEnabled)
}
```

Manter `startTravel` e `completeTravel` imutáveis. Em `cameraTravel.js`, manter duração de 4500 ms e funções sem imports React/Three.

- [ ] **Etapa 5: verificar e criar commit**

```powershell
npm.cmd test -- src/state/travel.test.js src/scene/cameraTravel.test.js
git add src/state/travel.js src/state/travel.test.js src/scene/cameraTravel.js src/scene/cameraTravel.test.js
git commit -m "feat(travel): define pure journey state"
```

### Tarefa 2: adaptar a câmera à viagem declarativa

**Files:**
- Criar: `src/scene/CameraTraveller.jsx`
- Modificar: `src/scene/SceneCanvas.jsx`, `src/scene/ExplorationScene.jsx`

**Interfaces:**
- Consome `travel: Travel | null`, `sceneDestinations: Array<{ id, position, radius }>`, `onTravelComplete: () => void`.
- Produz movimento somente em `travelling` e chama conclusão uma vez.

- [ ] **Etapa 1: escrever o teste de enquadramento**

```js
it('keeps the horizontal coordinate and offsets above and behind every target', () => {
  expect(getDestinationCameraPosition({ position: [-42, -3, 24], radius: 1.1 })).toEqual([
    -42, 0.30000000000000027, 29.5,
  ])
})
```

- [ ] **Etapa 2: executar o contrato**

Run: `npm.cmd test -- src/scene/cameraTravel.test.js`

Expected: PASS; o componente visual consome a matemática pura, sem redefini-la.

- [ ] **Etapa 3: criar CameraTraveller**

Usar `useFrame`, `useThree`, `useRef` e as funções de `cameraTravel.js`:

```jsx
const destination = sceneDestinations.find(({ id }) => id === travel?.destinationId)
const target = destination && getDestinationCameraPosition(destination)
useFrame(({ camera, clock }) => {
  if (travel?.status !== 'travelling' || !target) return
  // refs são inicializadas uma vez no primeiro frame da viagem
  const progress = Math.min(1, (clock.getElapsedTime() - startedAtRef.current) * 1000 / CAMERA_TRAVEL_DURATION_MS)
  camera.position.fromArray(getCameraPositionAt(originRef.current, target, progress))
  camera.lookAt(...destination.position)
  if (progress === 1 && completedDestinationIdRef.current !== destination.id) {
    completedDestinationIdRef.current = destination.id
    onTravelComplete()
  }
})
```

Um `useEffect` dependente de ID/status reinicializa refs. ID desconhecido não move câmera e só avisa em desenvolvimento.

- [ ] **Etapa 4: conectar o adaptador**

`SceneCanvas` recebe `travel`, `sceneDestinations`, `onTravelComplete` e renderiza:

```jsx
<CameraTraveller travel={travel} sceneDestinations={sceneDestinations} onTravelComplete={onTravelComplete} />
```

`ExplorationScene` encaminha as props. Não modificar `DestinationMarkers`: clique permanece seleção.

- [ ] **Etapa 5: verificar e criar commit**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git add src/scene/CameraTraveller.jsx src/scene/SceneCanvas.jsx src/scene/ExplorationScene.jsx src/scene/cameraTravel.test.js
git commit -m "feat(scene): animate declarative camera travel"
```

Antes do commit, verificar localmente uma viagem a Marte e remover qualquer injeção temporária.

### Tarefa 3: disponibilizar busca curada como intenção de viagem

**Files:**
- Criar: `src/components/SearchOverlay.jsx`
- Modificar: `src/App.jsx`, `src/index.css`, `src/utils/search.test.js`

**Interfaces:**
- Consome `destinations`, `isOpen`, `onClose`, `onTravelTo(destinationId)`.
- Produz resultados de `searchDestinations` ou sugestões de `getSuggestedDestinations`.
- Cada resultado chama somente `onTravelTo(destination.id)`.

- [ ] **Etapa 1: escrever o teste da separação entre busca e sugestões**

```js
it('keeps featured suggestions separate from an empty search result', () => {
  expect(searchDestinations([sun, earth], '')).toEqual([])
  expect(ids(getSuggestedDestinations([sun, earth]))).toEqual(['sun'])
})
```

- [ ] **Etapa 2: executar o teste puro**

Run: `npm.cmd test -- src/utils/search.test.js`

Expected: PASS; a UI não cria regra paralela.

- [ ] **Etapa 3: criar a busca acessível**

Quando fechada, retornar `null`. Quando aberta, renderizar `role="dialog"`, `aria-modal="true"`, rótulo “Buscar destino”, botão “Fechar busca” e:

```jsx
<input autoFocus type="search" value={query}
  onChange={(event) => setQuery(event.target.value)}
  placeholder="Busque um destino" />
```

A derivação é:

```js
const visibleDestinations = query.trim()
  ? searchDestinations(destinations, query)
  : getSuggestedDestinations(destinations)
```

Cada item mostra nome, tipo, região, resumo e “Ir até lá”, que chama callback e limpa consulta. Sem itens para texto preenchido: “Nenhum destino do catálogo corresponde a esta busca.”

- [ ] **Etapa 4: adicionar gatilho e camadas responsivas**

Em `App.jsx`, criar `isSearchOpen`, botão “Buscar destinos” e passar `handleTravelTo` à sobreposição. Em CSS: gatilho no topo direito; overlay acima do aviso de escala; até 700px no rodapé, 100% de largura e máximo 75dvh; acima, flutuante até 28rem. Botões têm área mínima de 44px e foco visível.

- [ ] **Etapa 5: verificar e criar commit**

```powershell
npm.cmd test -- src/utils/search.test.js
npm.cmd run lint
npm.cmd run build
git add src/components/SearchOverlay.jsx src/utils/search.test.js src/App.jsx src/index.css
git commit -m "feat(search): expose curated destination search"
```

### Tarefa 4: orquestrar partida, pulo, chegada e retorno

**Files:**
- Criar: `src/components/TravelOverlay.jsx`, `src/components/NavigationStatus.jsx`
- Modificar: `src/App.jsx`, `src/scene/ExplorationScene.jsx`, `src/index.css`, `src/state/travel.test.js`

**Interfaces:**
- `startTravel(id, true)` inicia; `completeTravel(travel)` encerra; `returnToEarth(true)` inicia retorno.
- `TravelOverlay({ destination, travel, onSkip })` aparece em `travelling`.
- `NavigationStatus({ destination, onReturnToEarth })` mostra local e oculta retorno na Terra.

- [ ] **Etapa 1: escrever o teste da chegada imediata**

```js
it('can complete an immediate arrival without changing its destination', () => {
  const travel = startTravel('sirius', false)
  expect(completeTravel(travel)).toEqual({ destinationId: 'sirius', status: 'arrived' })
})
```

- [ ] **Etapa 2: executar o teste**

Run: `npm.cmd test -- src/state/travel.test.js`

Expected: PASS após a Tarefa 1.

- [ ] **Etapa 3: implementar a orquestração em App**

```jsx
const [selectedId, setSelectedId] = useState('earth')
const [travel, setTravel] = useState(null)
const isCameraTravelEnabled = true
const selectedDestination = destinations.find(({ id }) => id === selectedId)
  ?? destinations.find(({ id }) => id === 'earth')

function handleTravelTo(destinationId) {
  setSelectedId(destinationId)
  setTravel(startTravel(destinationId, isCameraTravelEnabled))
  setIsSearchOpen(false)
}
function handleTravelComplete() {
  setTravel((current) => current && completeTravel(current))
}
function handleReturnToEarth() {
  setSelectedId('earth')
  setTravel(returnToEarth(isCameraTravelEnabled))
}
```

Passar `travel` e callback de conclusão à cena. Marcadores chamam apenas `setSelectedId`. O resumo vira botão de ação “Ir até lá” para o destino selecionado; assim mouse/toque não iniciam viagem acidentalmente.

- [ ] **Etapa 4: criar controles visíveis**

`TravelOverlay` retorna `null` fora de `travelling`; durante a viagem mostra destino, “Distância ilustrativa na cena” e “Pular viagem”.

`NavigationStatus` mostra “Você está em: [nome]”. Fora da Terra, oferece “Voltar à Terra”; na Terra, o botão não existe.

- [ ] **Etapa 5: estilizar e verificar os fluxos**

Camadas: status no topo esquerdo, viagem no centro superior e ação de destino no inferior esquerdo, sem cobrir o aviso. Até 700px, empilhar status/ação com largura máxima `calc(100vw - 2rem)`.

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Registrar desktop e celular/emulação: Marte por marcador, pulo, busca “buraco negro”, chegada em Sagittarius A*, retorno à Terra e toque. Console sem erro.

- [ ] **Etapa 6: criar o commit**

```powershell
git add src/App.jsx src/scene/ExplorationScene.jsx src/components/TravelOverlay.jsx src/components/NavigationStatus.jsx src/state/travel.test.js src/index.css
git commit -m "feat(travel): connect discovery and return flow"
```

### Tarefa 5: registrar a fase e verificar o encerramento

**Files:**
- Modificar: `README.md`, este plano

**Interfaces:** sem interface de código; produz evidência verificável de entrega e pendências.

- [ ] **Etapa 1: atualizar o estado público**

No README, mover viagem/retorno e busca integrada para “Disponível hoje”. Manter painel, onboarding, som e preferências como planejados; não alegar persistência da configuração de viagem.

- [ ] **Etapa 2: registrar evidência no plano**

Adicionar `## Progresso de execução` após a introdução: hashes, total de testes, lint/build/diff e inspeções desktop/mobile. Caso alguma inspeção não ocorra, escrever literalmente `Pendente de levantamento`.

- [ ] **Etapa 3: executar a verificação final**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git diff --check
git status --short --branch
```

Expected: testes, lint, build e checagem passam. O aviso conhecido de bundle acima de 500 kB pelo motor 3D é aviso, não falha.

- [ ] **Etapa 4: criar o commit de encerramento**

```powershell
git add README.md docs/superpowers/plans/2026-09-16-phase-3-travel-discovery.md
git commit -m "docs(travel): record phase three verification"
```

## Critérios de conclusão

- A pessoa seleciona qualquer destino e inicia viagem explícita por marcador selecionado ou busca.
- A câmera chega em aproximadamente 4,5 segundos, pode ser pulada e nunca completa duas vezes.
- Busca usa apenas catálogo local, sugestões de destaque e aliases testados.
- Local atual e retorno funcionam sem depender do Canvas.
- Posições, duração e distância são declaradas ilustrativas; nenhum dado científico muda.
- Estado, interpolação e busca têm testes sem WebGL; testes, lint, build e diff têm evidência.
- Painel de conteúdo, dados completos, onboarding, som, configuração e persistência continuam fora da Fase 3.
