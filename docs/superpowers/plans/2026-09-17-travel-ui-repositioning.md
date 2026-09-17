# Reposicionamento da UI de seleção/viagem/retorno — Plano de implementação

> **Para agentes de implementação:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. As etapas usam caixas de seleção (`- [ ]`) para acompanhamento.

**Goal:** reorganizar a apresentação do fluxo de seleção → viagem → retorno da Fase 3, sem alterar a lógica pura de viagem: um card central mostra o destino selecionado (ainda não visitado) com o botão "Ir até lá"; o painel "Você está em" no topo esquerdo só reflete o local onde a câmera realmente chegou; o botão "Voltar à Terra" vira um elemento discreto no canto inferior esquerdo.

**Architecture:** `App.jsx` passa a distinguir `selectedId` (destino escolhido pela pessoa, ainda não confirmado) de `currentLocationId` (destino onde a câmera efetivamente está, atualizado apenas quando a viagem chega ao fim). Os componentes de apresentação (`NavigationStatus`, novo `SelectionCard`, novo `ReturnToEarthButton`, `DestinationMarkers`) passam a consumir o estado correto para cada finalidade. Nenhuma função pura de `src/state/travel.js` ou `src/scene/cameraTravel.js` muda.

**Tech Stack:** React 19, Vite 8, Three.js, `@react-three/fiber`, `@react-three/drei`, Vitest 5, Oxlint. Nenhuma dependência nova.

**Spec:** decisão de design aprovada em conversa (sem arquivo de spec separado — mudança bounded, confirmada em chat em 17/09/2026); base: `docs/superpowers/plans/2026-09-16-phase-3-travel-discovery.md`.

## Global Constraints

- Interface em pt-BR; identificadores em inglês e módulos ES JavaScript.
- `src/state/` e `src/scene/*.js` (lógica pura) não podem ganhar novas dependências de React/DOM; este plano só toca componentes de apresentação (`.jsx`) e CSS.
- Não alterar `src/state/travel.js`, `src/scene/cameraTravel.js` nem `src/utils/search.js` — nenhuma regra de viagem, busca ou catálogo muda.
- Botões mantêm área mínima de 44px e foco visível (convenção já usada no projeto).
- Nenhuma lógica pura nova é introduzida; portanto não há testes Vitest novos a escrever. A verificação é `npm test` (regressão), `npm run build`, `npm run lint` e checagem visual manual, como já é praxe no projeto.
- Antes de concluir: `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build` e `git diff --check`.

## Estrutura de arquivos

- Modificar `src/App.jsx`: introduz `currentLocationId`, deriva `currentLocation`, ajusta `handleTravelComplete`, passa as novas props aos componentes.
- Modificar `src/components/NavigationStatus.jsx`: remove o botão "Voltar à Terra"; continua só apresentando o local atual.
- Criar `src/components/SelectionCard.jsx`: card central com nome, tipo e botão "Ir até lá" do destino selecionado (ainda não visitado).
- Criar `src/components/ReturnToEarthButton.jsx`: botão discreto, canto inferior esquerdo, visível quando o local atual não é a Terra.
- Modificar `src/scene/DestinationMarkers.jsx` e `src/scene/ExplorationScene.jsx`: o marcador 3D do local atual (não do selecionado) some; a prop `travel` deixa de ser repassada aos marcadores.
- Modificar `src/index.css`: novas classes `.selection-card` e `.return-to-earth`; remove `.selection-summary`.

---

### Tarefa 1: separar local atual da seleção em `App.jsx`

**Files:**
- Modify: `src/App.jsx:9-33`

**Interfaces:**
- Produz `currentLocationId: string` (estado) e `currentLocation: Destination | undefined` (derivado, mesmo padrão de `selectedDestination`).
- `handleTravelComplete` passa a atualizar `currentLocationId` para o destino da viagem concluída, além de marcar a viagem como `arrived`.

- [ ] **Etapa 1: adicionar o estado e a derivação**

Em `src/App.jsx`, junto aos demais `useState`:

```jsx
const [currentLocationId, setCurrentLocationId] = useState('earth')
```

Junto a `selectedDestination`:

```jsx
const currentLocation = destinations.find(({ id }) => id === currentLocationId)
  ?? destinations.find(({ id }) => id === 'earth')
```

- [ ] **Etapa 2: atualizar `handleTravelComplete` para gravar a chegada**

Substituir:

```jsx
function handleTravelComplete() {
  setTravel((current) => current && completeTravel(current))
}
```

por:

```jsx
function handleTravelComplete() {
  setTravel((current) => {
    if (!current) return current
    setCurrentLocationId(current.destinationId)
    return completeTravel(current)
  })
}
```

`handleTravelTo` e `handleReturnToEarth` continuam inalterados: eles só mexem em `selectedId` e `travel`; `currentLocationId` só muda quando a viagem termina.

- [ ] **Etapa 3: rodar a suíte de regressão**

Run: `npm.cmd test`
Expected: PASS (63 testes existentes; nenhum teste novo é necessário porque não há lógica pura nova).

- [ ] **Etapa 4: commit**

```powershell
git add src/App.jsx
git commit -m "feat(travel): track arrived location separately from selection"
```

### Tarefa 2: card central de seleção

**Files:**
- Create: `src/components/SelectionCard.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consome `destination: Destination | undefined`, `currentLocationId: string`, `travel: Travel | null`, `onTravelTo: (destinationId: string) => void`.
- Renderiza `null` quando `!destination`, `destination.id === currentLocationId` ou `travel?.status === 'travelling'` (nesse caso o `TravelOverlay` já ocupa a tela).

- [ ] **Etapa 1: criar o componente**

`src/components/SelectionCard.jsx`:

```jsx
export function SelectionCard({ destination, currentLocationId, travel, onTravelTo }) {
  if (!destination || destination.id === currentLocationId || travel?.status === 'travelling') {
    return null
  }

  return (
    <aside className="selection-card" role="dialog" aria-label="Destino selecionado">
      <p className="eyebrow">{destination.type}</p>
      <h2>{destination.name}</h2>
      <button type="button" onClick={() => onTravelTo(destination.id)}>
        Ir até {destination.name}
      </button>
    </aside>
  )
}
```

- [ ] **Etapa 2: substituir o antigo botão em `App.jsx`**

Adicionar o import:

```jsx
import { SelectionCard } from './components/SelectionCard.jsx'
```

Substituir o bloco:

```jsx
{selectedDestination && selectedDestination.id !== 'earth' && (
  <button type="button" className="selection-summary" onClick={() => handleTravelTo(selectedDestination.id)}>
    Ir até {selectedDestination.name}
  </button>
)}
```

por:

```jsx
<SelectionCard
  destination={selectedDestination}
  currentLocationId={currentLocationId}
  travel={travel}
  onTravelTo={handleTravelTo}
/>
```

E atualizar o `NavigationStatus` para usar o local atual em vez da seleção (adiantando a Tarefa 3, já que ambos os componentes leem `App.jsx` na mesma região):

```jsx
<NavigationStatus destination={currentLocation} onReturnToEarth={handleReturnToEarth} />
```

- [ ] **Etapa 3: CSS do card central**

Em `src/index.css`, adicionar `.selection-card` ao grupo de painéis fixos:

```css
.scale-notice,
.navigation-status,
.travel-overlay,
.search-overlay,
.selection-card {
  position: fixed;
  z-index: 2;
  margin: 0;
  padding: 0.4rem 0.7rem;
  border: 1px solid #7183a9;
  border-radius: 0.4rem;
  color: #f1f5ff;
  background: rgb(3 9 23 / 88%);
  font-size: 0.78rem;
}
```

(Substituir `.selection-summary` por `.selection-card` nesse seletor; `.selection-summary` deixa de existir.)

Logo depois da regra `.navigation-status`, adicionar:

```css
.selection-card {
  top: 38%;
  left: 50%;
  width: min(22rem, calc(100vw - 2rem));
  padding: 1rem;
  transform: translate(-50%, -50%);
  text-align: center;
}

.selection-card h2 {
  margin: 0.2rem 0 0.6rem;
}

.selection-card button {
  margin-top: 0.4rem;
}
```

Remover a regra antiga:

```css
.selection-summary {
  left: 1rem;
  bottom: 1rem;
}
```

E, no bloco `@media (max-width: 700px)`, trocar:

```css
.selection-summary {
  right: 0.75rem;
  bottom: 0.75rem;
  left: 0.75rem;
}
```

por:

```css
.selection-card {
  width: calc(100vw - 2rem);
}
```

- [ ] **Etapa 4: verificar e commitar**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Verificar manualmente com `npm.cmd run dev`: a partir da Terra, clicar num marcador (ex.: Marte) deve mostrar o card central com "Ir até Marte", sem alterar o texto "Você está em: Terra" no topo esquerdo.

```powershell
git add src/components/SelectionCard.jsx src/App.jsx src/index.css
git commit -m "feat(travel): show selection as a centered travel card"
```

### Tarefa 3: botão discreto de retorno à Terra

**Files:**
- Create: `src/components/ReturnToEarthButton.jsx`
- Modify: `src/components/NavigationStatus.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consome `currentLocationId: string`, `onReturnToEarth: () => void`.
- Renderiza `null` quando `currentLocationId === 'earth'`.

- [ ] **Etapa 1: remover o botão de dentro de `NavigationStatus`**

`src/components/NavigationStatus.jsx` passa a ser:

```jsx
export function NavigationStatus({ destination }) {
  if (!destination) return null

  return (
    <aside className="navigation-status" aria-label="Localização atual">
      <p>Você está em: <strong>{destination.name}</strong></p>
      <p className="navigation-status__type">{destination.type}</p>
    </aside>
  )
}
```

- [ ] **Etapa 2: criar o botão próprio**

`src/components/ReturnToEarthButton.jsx`:

```jsx
export function ReturnToEarthButton({ currentLocationId, onReturnToEarth }) {
  if (currentLocationId === 'earth') return null

  return (
    <button type="button" className="return-to-earth" onClick={onReturnToEarth}>
      Voltar à Terra
    </button>
  )
}
```

- [ ] **Etapa 3: wire em `App.jsx`**

Adicionar o import:

```jsx
import { ReturnToEarthButton } from './components/ReturnToEarthButton.jsx'
```

Atualizar a chamada de `NavigationStatus` (remover a prop `onReturnToEarth`, já feito na Tarefa 2) e adicionar logo abaixo:

```jsx
<NavigationStatus destination={currentLocation} />
<ReturnToEarthButton currentLocationId={currentLocationId} onReturnToEarth={handleReturnToEarth} />
```

- [ ] **Etapa 4: CSS do botão discreto**

Em `src/index.css`, remover as regras que não existem mais (`.navigation-status button`, `margin-top: 0.35rem`, já que o botão não fica mais dentro do painel — pode manter se outro botão a reaproveitar, mas hoje só servia ao "Voltar à Terra"; remover). Adicionar:

```css
.return-to-earth {
  position: fixed;
  z-index: 2;
  left: 1rem;
  bottom: 1rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.72rem;
  opacity: 0.82;
}

.return-to-earth:hover,
.return-to-earth:focus-visible {
  opacity: 1;
}
```

No bloco `@media (max-width: 700px)`, adicionar:

```css
.return-to-earth {
  left: 0.75rem;
  bottom: 0.75rem;
}
```

- [ ] **Etapa 5: verificar e commitar**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Verificar manualmente: viajar até um destino, confirmar que "Voltar à Terra" aparece discreto no canto inferior esquerdo só depois da chegada (não durante a viagem), e que ao clicar a câmera volta e o botão some.

```powershell
git add src/components/ReturnToEarthButton.jsx src/components/NavigationStatus.jsx src/App.jsx src/index.css
git commit -m "feat(travel): move return-to-earth into its own discreet control"
```

### Tarefa 4: marcador 3D some só quando a câmera chega

**Files:**
- Modify: `src/scene/DestinationMarkers.jsx`
- Modify: `src/scene/ExplorationScene.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- `DestinationMarkers` passa a consumir `currentLocationId: string` em vez de `travel`; o marcador cujo `id === currentLocationId` não é renderizado. O marcador do destino meramente selecionado continua visível (destacado por `aria-pressed`).

- [ ] **Etapa 1: simplificar `DestinationMarkers.jsx`**

Reverter o marcador para não depender de `travel`, usando `currentLocationId`:

```jsx
function DestinationMarker({ destination, isSelected, isCurrentLocation, onSelectDestination }) {
  if (isCurrentLocation) return null

  return (
    <Billboard position={destination.position}>
      <Html center distanceFactor={12}>
        <button
          className="destination-marker"
          type="button"
          aria-pressed={isSelected}
          onClick={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(destination.id)
          }}
          onPointerDown={(event) => {
            stopSceneInteraction(event)
            onSelectDestination(destination.id)
          }}
        >
          <span>{destination.name}</span>
          <small>{destination.type}</small>
        </button>
      </Html>
    </Billboard>
  )
}
```

E o export final:

```jsx
export function DestinationMarkers({ items, destinationById, selectedId, currentLocationId, onSelectDestination }) {
  return items.map((item) => {
    if (item.kind === 'cluster') {
      return (
        <ClusterMarker
          key={item.id}
          item={item}
          destinationById={destinationById}
          onSelectDestination={onSelectDestination}
        />
      )
    }

    const destination = destinationById.get(item.destination.id)

    return (
      <DestinationMarker
        key={destination.id}
        destination={{ ...item.destination, ...destination }}
        isSelected={destination.id === selectedId}
        isCurrentLocation={destination.id === currentLocationId}
        onSelectDestination={onSelectDestination}
      />
    )
  })
}
```

- [ ] **Etapa 2: repassar `currentLocationId` em vez de `travel` na cena**

Em `src/scene/ExplorationScene.jsx`, atualizar a assinatura e o uso:

```jsx
export function ExplorationScene({
  destinations,
  selectedId,
  currentLocationId,
  onSelectDestination,
  travel,
  onTravelComplete,
}) {
```

E a chamada de `DestinationMarkers`:

```jsx
<DestinationMarkers
  items={markerItems}
  destinationById={destinationById}
  selectedId={selectedId}
  currentLocationId={currentLocationId}
  onSelectDestination={onSelectDestination}
/>
```

(`travel` continua sendo passado só para `SceneCanvas`/`CameraTraveller`, como já era antes desta tarefa.)

- [ ] **Etapa 3: passar a prop a partir de `App.jsx`**

Na chamada de `ExplorationScene`:

```jsx
<ExplorationScene
  destinations={destinations}
  selectedId={selectedId}
  currentLocationId={currentLocationId}
  onSelectDestination={setSelectedId}
  travel={travel}
  onTravelComplete={handleTravelComplete}
/>
```

- [ ] **Etapa 4: verificar, checar diff e commitar**

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Roteiro manual: a partir da Terra, selecionar Marte (card central aparece, marcador de Marte continua visível) → "Ir até Marte" (card some, overlay de viagem aparece, marcador de Marte permanece visível durante o trajeto) → chegada (overlay some, marcador de Marte some, "Você está em: Marte" aparece no topo esquerdo, botão discreto "Voltar à Terra" aparece no canto inferior esquerdo) → "Voltar à Terra" (retorna à Terra, botão some, marcador de Marte reaparece). Testar também por busca. Console sem erros.

```powershell
git diff --check
git add src/scene/DestinationMarkers.jsx src/scene/ExplorationScene.jsx src/App.jsx
git commit -m "feat(scene): hide only the marker of the arrived destination"
```

## Critérios de conclusão

- Ao ver a Terra, o painel "Você está em: Terra" fica no topo esquerdo e nada mais cobre a cena.
- Selecionar um destino mostra um card central com nome, tipo e "Ir até lá"; o painel "Você está em" não muda até a chegada real.
- Ao confirmar a viagem, o card central some e o `TravelOverlay` (já existente) assume; ao chegar, o painel "Você está em" atualiza e um botão discreto "Voltar à Terra" aparece no canto inferior esquerdo.
- O marcador 3D do destino onde a câmera está some; marcadores de destinos apenas selecionados ou distantes continuam visíveis normalmente.
- `src/state/travel.js`, `src/scene/cameraTravel.js` e `src/utils/search.js` permanecem inalterados; nenhuma regra de viagem, busca ou catálogo muda.
- `npm test`, `npm run build`, `npm run lint` e `git diff --check` passam ao final de cada tarefa.
