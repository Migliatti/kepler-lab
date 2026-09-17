# Fase 4 — Conteúdo e interface: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar o conteúdo progressivo dos 22 destinos e a interface que o apresenta: superfície de dados e painel na borda direita, readout discreto de coordenadas e escala, fórmulas sob demanda e onboarding com persistência local versionada.

**Architecture:** Todo dado novo entra primeiro em `src/content/` (puro) e é checado por `validateCatalogue`. Regras de apresentação viram funções puras em `src/utils/` e transições de interface em `src/state/`, todas testadas sem WebGL. Componentes React em `src/components/` só mapeiam o resultado dessas funções para markup; `App.jsx` orquestra.

**Tech Stack:** React 19 + Vite, Vitest, Oxlint, CSS puro em `src/index.css`. Nenhuma dependência nova.

**Spec:** [`docs/superpowers/specs/2026-09-17-phase-4-content-interface-design.md`](../specs/2026-09-17-phase-4-content-interface-design.md)

## Global Constraints

- Node.js 22.12+ ou 24+.
- Nenhuma dependência nova.
- `src/content/` não importa React, Three.js, DOM nem APIs de navegador.
- Testes ao lado do módulo (`foo.js` + `foo.test.js`); TDD: teste vermelho antes da implementação.
- Nomes de código em inglês; todo texto de interface em pt-BR.
- Estado imutável: funções retornam novos objetos.
- Commits convencionais em inglês, `tipo(escopo): descrição`; tipos `feat`, `fix`, `docs`, `chore`. Nunca `--no-verify`.
- Todo dado científico precisa estar sustentado por uma fonte listada no próprio destino.
- Quando um valor já existe em `facts`, qualquer outro campo do mesmo destino que repita essa grandeza copia o valor literalmente.
- Antes de concluir cada tarefa: `npm test`, `npm run build` e `npm run lint` passando.

## Mapa de arquivos

| Arquivo | Responsabilidade | Tarefa |
| --- | --- | --- |
| `src/content/destinations/solarSystem.js` | 14 destinos do Sistema Solar | 1 |
| `src/content/destinations/deepSky.js` | 8 destinos além do Sistema Solar | 1 |
| `src/content/destinations.js` | concatena e reexporta, ordem preservada | 1 |
| `src/content/regions.js` | `SOLAR_SYSTEM_IDS` | 1 |
| `src/content/notices.js` | `SCALE_NOTICE` (movido de `src/scene/layout.js`) | 1 |
| `src/content/validateCatalogue.js` | regras de `coordinates` e `curiosities` | 2, 3, 4 |
| `src/content/curiosityTopics.js` | vocabulário fechado de curiosidades | 3 |
| `src/content/onboardingSteps.js` | textos das 3 telas por plataforma | 11 |
| `src/utils/destinationPanel.js` | seções ordenadas do painel | 6 |
| `src/utils/sceneReadout.js` | entradas do readout + aviso | 7 |
| `src/state/panel.js` | modos `card` / `expanded`, foco, fórmulas reveladas | 8 |
| `src/state/preferences.js` | `localStorage` versionado | 10 |
| `src/state/onboarding.js` | máquina de passos | 11 |
| `src/components/SceneReadout.jsx` | readout inferior esquerdo | 7 |
| `src/components/DestinationPanel.jsx` | cartão e painel da borda direita | 9 |
| `src/components/Onboarding.jsx` | diálogo de 3 telas | 12 |
| `src/scene/ExplorationScene.jsx` | deixa de renderizar o aviso de escala | 7 |
| `src/App.jsx` | orquestração | 9, 12 |
| `src/index.css` | estilos novos; remove `.scale-notice` | 7, 9, 12 |

---

### Task 1: Dividir o catálogo e mover o aviso de escala para o conteúdo

Refatoração sem mudança de comportamento. Prepara o terreno para o crescimento do catálogo nas tarefas 2–5.

**Files:**
- Create: `src/content/destinations/solarSystem.js`
- Create: `src/content/destinations/deepSky.js`
- Create: `src/content/regions.js`
- Create: `src/content/notices.js`
- Create: `src/content/notices.test.js`
- Modify: `src/content/destinations.js` (arquivo inteiro)
- Modify: `src/content/catalogue.test.js`
- Modify: `src/scene/layout.js:1` (remove `SCALE_NOTICE`)
- Modify: `src/scene/layout.test.js:3-10,36-39`
- Modify: `src/scene/ExplorationScene.jsx:5`

**Interfaces:**
- Produces: `solarSystemDestinations` (array de 14), `deepSkyDestinations` (array de 8), `SOLAR_SYSTEM_IDS` (array congelado de 14 ids), `SCALE_NOTICE` (string) em `src/content/notices.js`. `destinations` continua exportado de `src/content/destinations.js` com a mesma ordem.

- [ ] **Step 1: Escrever os testes que falham**

Acrescente ao final do `describe` em `src/content/catalogue.test.js`, e os imports no topo:

```js
import { deepSkyDestinations } from './destinations/deepSky.js'
import { solarSystemDestinations } from './destinations/solarSystem.js'
import { SOLAR_SYSTEM_IDS } from './regions.js'
```

```js
  it('keeps the catalogue order stable across the split files', () => {
    expect(destinations.map(({ id }) => id)).toEqual([
      'sun', 'mercury', 'venus', 'moon', 'mars', 'earth', 'jupiter', 'europa', 'io',
      'saturn', 'titan', 'uranus', 'neptune', 'pluto',
      'alpha-centauri', 'sirius', 'betelgeuse', 'orion-nebula', 'crab-nebula',
      'galactic-center', 'milky-way', 'sagittarius-a-star',
    ])
  })

  it('declares exactly the Solar System destinations in SOLAR_SYSTEM_IDS', () => {
    expect(solarSystemDestinations.map(({ id }) => id)).toEqual([...SOLAR_SYSTEM_IDS])
    expect(deepSkyDestinations.some(({ id }) => SOLAR_SYSTEM_IDS.includes(id))).toBe(false)
  })
```

Crie `src/content/notices.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { SCALE_NOTICE } from './notices.js'

describe('notices', () => {
  it('states explicitly that visual positions and sizes are illustrative', () => {
    expect(SCALE_NOTICE).toMatch(/posições e tamanhos/i)
    expect(SCALE_NOTICE).toMatch(/ilustrativ/i)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content`
Expected: FAIL — `Failed to resolve import "./destinations/deepSky.js"` e `"./notices.js"`.

- [ ] **Step 3: Dividir o catálogo mecanicamente**

As linhas 15–490 de `src/content/destinations.js` contêm os 14 destinos do Sistema Solar (de `sun` a `pluto`); as linhas 491–768 contêm os 8 demais (de `alpha-centauri` a `sagittarius-a-star`). Confirme com `sed -n '15p;490,491p;768,769p' src/content/destinations.js` — deve imprimir `  {`, `  },`, `  {`, `  },`, `]`. Então:

```bash
mkdir -p src/content/destinations
{ printf '%s\n' '/** Solar System destinations of the curated catalogue (pt-BR). Pure data. */' 'export const solarSystemDestinations = ['; sed -n '15,490p' src/content/destinations.js; echo ']'; } > src/content/destinations/solarSystem.js
{ printf '%s\n' '/** Destinations beyond the Solar System (pt-BR). Pure data. */' 'export const deepSkyDestinations = ['; sed -n '491,768p' src/content/destinations.js; echo ']'; } > src/content/destinations/deepSky.js
```

Substitua o conteúdo inteiro de `src/content/destinations.js` por:

```js
/**
 * Curated, static destination catalogue (pt-BR).
 *
 * Pure data: must not import React, Three.js, DOM or browser APIs.
 * The content model is enforced by validateCatalogue.
 */
import { deepSkyDestinations } from './destinations/deepSky.js'
import { solarSystemDestinations } from './destinations/solarSystem.js'

export const destinations = [...solarSystemDestinations, ...deepSkyDestinations]
```

- [ ] **Step 4: Criar `regions.js` e `notices.js`**

`src/content/regions.js`:

```js
export const SOLAR_SYSTEM_IDS = Object.freeze([
  'sun', 'mercury', 'venus', 'moon', 'mars', 'earth', 'jupiter', 'europa', 'io',
  'saturn', 'titan', 'uranus', 'neptune', 'pluto',
])
```

`src/content/notices.js`:

```js
export const SCALE_NOTICE = 'Posições e tamanhos são ilustrativos para permitir a exploração.'
```

- [ ] **Step 5: Tirar o aviso da cena**

Em `src/scene/layout.js`, apague a linha 1 (`export const SCALE_NOTICE = ...`) e a linha em branco seguinte.

Em `src/scene/layout.test.js`, remova `SCALE_NOTICE,` do import e apague o teste `'states explicitly that visual positions and sizes are illustrative'` inteiro (agora vive em `notices.test.js`).

Em `src/scene/ExplorationScene.jsx`, troque a linha 5 por:

```js
import { SCALE_NOTICE } from '../content/notices.js'
import { getSceneDestinations } from './layout.js'
```

O `<p className="scale-notice">` continua renderizado até a Tarefa 7.

- [ ] **Step 6: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: todos os testes passam (os dois novos incluídos), build e lint limpos.

- [ ] **Step 7: Commit**

```bash
git add src/content src/scene/layout.js src/scene/layout.test.js src/scene/ExplorationScene.jsx
git commit -m "chore(content): split catalogue by region and move scale notice to content"
```

---

### Task 2: Coordenadas por categoria

**Files:**
- Modify: `src/content/validateCatalogue.js`
- Modify: `src/content/validateCatalogue.test.js`
- Modify: `src/content/destinations/solarSystem.js` (14 destinos)
- Modify: `src/content/destinations/deepSky.js` (8 destinos)

**Interfaces:**
- Consumes: `SOLAR_SYSTEM_IDS` de `src/content/regions.js`.
- Produces: todo destino tem `coordinates: { kind: 'equatorial' | 'orbital', entries: Array<{ label: string, value: string }> }` com 2–3 entradas.

- [ ] **Step 1: Escrever os testes que falham**

Em `src/content/validateCatalogue.test.js`, acrescente ao objeto retornado por `makeDestination`, logo antes de `...overrides`:

```js
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 1 UA' },
        { label: 'Período orbital', value: 'cerca de 365,25 dias terrestres' },
      ],
    },
```

Acrescente ao final do `describe`:

```js
  it('requires coordinates with a known kind', () => {
    expect(validateCatalogue([makeDestination({ coordinates: undefined })])).toContain(
      'earth: coordinates.kind must be one of equatorial, orbital',
    )
    expect(
      validateCatalogue([makeDestination({ coordinates: { kind: 'galactic', entries: [] } })]),
    ).toContain('earth: coordinates.kind must be one of equatorial, orbital')
  })

  it('never gives a Solar System body a fixed sky position', () => {
    const coordinates = {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '12h 00m 00s' },
        { label: 'Declinação', value: '+00° 00′' },
      ],
    }

    expect(validateCatalogue([makeDestination({ coordinates })])).toContain(
      'earth: coordinates.kind must be "orbital" for this destination',
    )
  })

  it('requires equatorial coordinates beyond the Solar System', () => {
    const betelgeuse = makeDestination({ id: 'betelgeuse', name: 'Betelgeuse', aliases: [] })

    expect(validateCatalogue([betelgeuse])).toContain(
      'betelgeuse: coordinates.kind must be "equatorial" for this destination',
    )
  })

  it('requires between 2 and 3 complete coordinate entries', () => {
    const [first] = makeDestination().coordinates.entries

    expect(
      validateCatalogue([makeDestination({ coordinates: { kind: 'orbital', entries: [first] } })]),
    ).toContain('earth: coordinates.entries must have between 2 and 3 items')
    expect(
      validateCatalogue([
        makeDestination({
          coordinates: { kind: 'orbital', entries: [first, { label: '', value: '1' }] },
        }),
      ]),
    ).toContain('earth: coordinates.entries[1] must have a non-empty label and value')
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content/validateCatalogue.test.js`
Expected: FAIL nos quatro testes novos (nenhuma mensagem de `coordinates` é emitida).

- [ ] **Step 3: Implementar a regra**

Em `src/content/validateCatalogue.js`, acrescente aos imports:

```js
import { SOLAR_SYSTEM_IDS } from './regions.js'
```

Acrescente às constantes do topo:

```js
const COORDINATE_KINDS = ['equatorial', 'orbital']
const MIN_COORDINATE_ENTRIES = 2
const MAX_COORDINATE_ENTRIES = 3
```

Acrescente, dentro de `validateDestination`, logo antes do bloco `const sources = ...`:

```js
  const coordinates = destination.coordinates
  if (!COORDINATE_KINDS.includes(coordinates?.kind)) {
    errors.push(`coordinates.kind must be one of ${COORDINATE_KINDS.join(', ')}`)
  } else {
    const expectedKind = SOLAR_SYSTEM_IDS.includes(destination.id) ? 'orbital' : 'equatorial'
    if (coordinates.kind !== expectedKind) {
      errors.push(`coordinates.kind must be "${expectedKind}" for this destination`)
    }
  }

  const coordinateEntries = Array.isArray(coordinates?.entries) ? coordinates.entries : []
  if (
    coordinateEntries.length < MIN_COORDINATE_ENTRIES ||
    coordinateEntries.length > MAX_COORDINATE_ENTRIES
  ) {
    errors.push(
      `coordinates.entries must have between ${MIN_COORDINATE_ENTRIES} and ${MAX_COORDINATE_ENTRIES} items`,
    )
  }
  coordinateEntries.forEach((entry, index) => {
    if (!isNonEmptyString(entry?.label) || !isNonEmptyString(entry?.value)) {
      errors.push(`coordinates.entries[${index}] must have a non-empty label and value`)
    }
  })
```

- [ ] **Step 4: Rodar e ver os novos testes passarem e o catálogo falhar**

Run: `npx vitest run src/content/validateCatalogue.test.js`
Expected: os quatro testes novos passam; `accepts the curated catalogue` e os testes de lote falham com `coordinates.kind must be one of equatorial, orbital` para os 22 destinos. É o vermelho que o passo seguinte resolve.

- [ ] **Step 5: Preencher as coordenadas dos 22 destinos**

Acrescente a cada destino, logo depois de `facts`, o bloco correspondente. Os períodos e distâncias em km repetem literalmente os `facts` existentes; distâncias em UA são a mesma grandeza em outra unidade e estão nas páginas NASA já citadas em cada destino.

`src/content/destinations/solarSystem.js`:

```js
// sun
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Posição', value: 'centro do Sistema Solar' },
        { label: 'Distância média da Terra', value: 'cerca de 1 UA' },
        { label: 'Volta ao redor do centro galáctico', value: 'cerca de 230 milhões de anos' },
      ],
    },
// mercury
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 0,39 UA' },
        { label: 'Período orbital', value: '88 dias terrestres' },
      ],
    },
// venus
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 0,72 UA' },
        { label: 'Período orbital', value: '225 dias terrestres' },
      ],
    },
// moon
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Terra' },
        { label: 'Distância média da Terra', value: 'cerca de 384.400 km' },
        { label: 'Período orbital', value: '27 dias terrestres' },
      ],
    },
// mars
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 1,52 UA' },
        { label: 'Período orbital', value: '687 dias terrestres' },
      ],
    },
// earth
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: '1 UA, por definição' },
        { label: 'Período orbital', value: '365,26 dias' },
      ],
    },
// jupiter
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 5,2 UA' },
        { label: 'Período orbital', value: 'cerca de 12 anos terrestres' },
      ],
    },
// europa
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Júpiter' },
        { label: 'Distância média de Júpiter', value: 'cerca de 671.000 km' },
        { label: 'Período orbital', value: 'cerca de 3,5 dias terrestres' },
      ],
    },
// io
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Júpiter' },
        { label: 'Distância média de Júpiter', value: 'cerca de 422.000 km' },
        { label: 'Período orbital', value: 'cerca de 1,8 dia terrestre' },
      ],
    },
// saturn
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 9,5 UA' },
        { label: 'Período orbital', value: 'cerca de 29,4 anos terrestres' },
      ],
    },
// titan
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Saturno' },
        { label: 'Distância média de Saturno', value: 'cerca de 1,2 milhão de km' },
        { label: 'Período orbital', value: '15 dias e 22 horas' },
      ],
    },
// uranus
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 19,2 UA' },
        { label: 'Período orbital', value: 'cerca de 84 anos terrestres' },
      ],
    },
// neptune
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 30 UA' },
        { label: 'Período orbital', value: 'cerca de 165 anos terrestres' },
      ],
    },
// pluto
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 39,5 UA' },
        { label: 'Período orbital', value: 'cerca de 248 anos terrestres' },
      ],
    },
```

`src/content/destinations/deepSky.js` — ascensão reta e declinação em J2000, arredondadas; as distâncias repetem literalmente os `facts`:

```js
// alpha-centauri
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '14h 39m 36s' },
        { label: 'Declinação', value: '−60° 50′' },
        { label: 'Distância da Terra', value: 'cerca de 4,3 anos-luz' },
      ],
    },
// sirius
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '06h 45m 09s' },
        { label: 'Declinação', value: '−16° 43′' },
        { label: 'Distância da Terra', value: 'cerca de 8,6 anos-luz' },
      ],
    },
// betelgeuse
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 55m 10s' },
        { label: 'Declinação', value: '+07° 24′' },
        { label: 'Distância da Terra', value: 'cerca de 600 anos-luz' },
      ],
    },
// orion-nebula
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 35m 17s' },
        { label: 'Declinação', value: '−05° 23′' },
        { label: 'Distância da Terra', value: 'cerca de 1.500 anos-luz' },
      ],
    },
// crab-nebula
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 34m 32s' },
        { label: 'Declinação', value: '+22° 01′' },
        { label: 'Distância da Terra', value: 'cerca de 6.500 anos-luz' },
      ],
    },
// galactic-center
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '17h 45m 40s' },
        { label: 'Declinação', value: '−29° 00′' },
        { label: 'Distância da Terra', value: 'cerca de 26 mil anos-luz' },
      ],
    },
// milky-way — estamos dentro dela; não há uma direção única no céu
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Diâmetro do disco', value: 'cerca de 100 mil anos-luz' },
        { label: 'Distância do Sol ao centro', value: 'cerca de 26 mil anos-luz' },
        { label: 'Direção do centro no céu', value: 'constelação de Sagitário' },
      ],
    },
// sagittarius-a-star
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '17h 45m 40s' },
        { label: 'Declinação', value: '−29° 00′' },
        { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      ],
    },
```

Acrescente a fonte de posição celeste aos sete destinos com ascensão reta, sem repetir URL dentro do destino:

| id | título | URL |
| --- | --- | --- |
| `alpha-centauri` | `SIMBAD: alf Cen` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=alf+Cen` |
| `sirius` | `SIMBAD: Sirius` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sirius` |
| `betelgeuse` | `SIMBAD: Betelgeuse` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Betelgeuse` |
| `orion-nebula` | `SIMBAD: M 42` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=M42` |
| `crab-nebula` | `SIMBAD: M 1` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=M1` |
| `galactic-center` | `SIMBAD: Sgr A*` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sgr+A*` |
| `sagittarius-a-star` | `SIMBAD: Sgr A*` | `https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sgr+A*` |

Formato de cada entrada: `{ title: '<título>', publisher: 'CDS, Université de Strasbourg', url: '<URL>' }`. Abra cada URL e confirme que a ascensão reta e a declinação exibidas arredondam para os valores acima; corrija o conteúdo, não a fonte, se divergirem.

> **Atenção para a revisão manual (Tarefa 13):** o catálogo já publicava distâncias diferentes para o Centro Galáctico (26 mil anos-luz) e Sagittarius A* (27 mil anos-luz), que estão no mesmo lugar. Esta tarefa preserva os `facts` como estão; a divergência é registrada para decisão na revisão de conteúdo.

- [ ] **Step 6: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde, incluindo `accepts the curated catalogue`.

- [ ] **Step 7: Commit**

```bash
git add src/content
git commit -m "feat(content): add per-category coordinates to every destination"
```

---

### Task 3: Vocabulário de curiosidades e curiosidades do Sistema Solar

A regra entra validando `curiosities` **quando presente**; a obrigatoriedade vem na Tarefa 4, quando os 22 destinos já tiverem o campo. Assim o catálogo nunca fica vermelho entre tarefas.

**Files:**

- Create: `src/content/curiosityTopics.js`
- Create: `src/content/curiosityTopics.test.js`
- Modify: `src/content/validateCatalogue.js`
- Modify: `src/content/validateCatalogue.test.js`
- Modify: `src/content/catalogue.test.js`
- Modify: `src/content/destinations/solarSystem.js` (14 destinos)

**Interfaces:**

- Produces: `CURIOSITY_TOPICS` (array congelado de `{ id, label }`), `CURIOSITY_TOPIC_IDS` (array de ids), `getCuriosityTopicLabel(topicId): string | undefined`. Destinos do Sistema Solar com `curiosities: Array<{ topic: string, text: string }>`.

- [ ] **Step 1: Escrever os testes que falham**

`src/content/curiosityTopics.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { CURIOSITY_TOPIC_IDS, getCuriosityTopicLabel } from './curiosityTopics.js'

describe('curiosity topics', () => {
  it('exposes the closed vocabulary in display order', () => {
    expect(CURIOSITY_TOPIC_IDS).toEqual([
      'discovery', 'naming', 'mythology', 'missions', 'records', 'phenomena',
    ])
  })

  it('labels each topic in pt-BR', () => {
    expect(getCuriosityTopicLabel('discovery')).toBe('Descoberta')
    expect(getCuriosityTopicLabel('missions')).toBe('Missões e observação')
  })

  it('returns undefined for an unknown topic', () => {
    expect(getCuriosityTopicLabel('gossip')).toBeUndefined()
  })
})
```

Em `src/content/validateCatalogue.test.js`, acrescente ao final do `describe`:

```js
  it('accepts a destination without curiosities while the batch is in progress', () => {
    expect(validateCatalogue([makeDestination()])).toEqual([])
  })

  it('validates curiosities when present', () => {
    const curiosities = [
      { topic: 'gossip', text: 'Texto válido.' },
      { topic: 'records', text: '' },
    ]

    expect(validateCatalogue([makeDestination({ curiosities })])).toEqual(
      expect.arrayContaining([
        'earth: curiosities[0].topic must be one of discovery, naming, mythology, missions, records, phenomena',
        'earth: curiosities[1] must have a non-empty text',
      ]),
    )
  })

  it('requires between 2 and 4 curiosities with distinct topics', () => {
    const single = [{ topic: 'records', text: 'Único lugar conhecido com vida.' }]
    const repeated = [
      { topic: 'records', text: 'Primeiro recorde.' },
      { topic: 'records', text: 'Segundo recorde.' },
    ]

    expect(validateCatalogue([makeDestination({ curiosities: single })])).toContain(
      'earth: "curiosities" must have between 2 and 4 items',
    )
    expect(validateCatalogue([makeDestination({ curiosities: repeated })])).toContain(
      'earth: curiosities[1].topic "records" is repeated',
    )
  })
```

Em `src/content/catalogue.test.js`, acrescente ao final do `describe`:

```js
  it('gives every Solar System destination its curiosities', () => {
    for (const destination of solarSystemDestinations) {
      expect(destination.curiosities, destination.id).toBeInstanceOf(Array)
    }
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content`
Expected: FAIL — `curiosityTopics.js` não existe; testes de curiosidades sem mensagens; destinos sem `curiosities`.

- [ ] **Step 3: Criar o vocabulário**

`src/content/curiosityTopics.js`:

```js
export const CURIOSITY_TOPICS = Object.freeze([
  Object.freeze({ id: 'discovery', label: 'Descoberta' }),
  Object.freeze({ id: 'naming', label: 'Nome e nomenclatura' }),
  Object.freeze({ id: 'mythology', label: 'Mitologia e cultura' }),
  Object.freeze({ id: 'missions', label: 'Missões e observação' }),
  Object.freeze({ id: 'records', label: 'Recordes' }),
  Object.freeze({ id: 'phenomena', label: 'Fenômenos notáveis' }),
])

export const CURIOSITY_TOPIC_IDS = Object.freeze(CURIOSITY_TOPICS.map(({ id }) => id))

export function getCuriosityTopicLabel(topicId) {
  return CURIOSITY_TOPICS.find(({ id }) => id === topicId)?.label
}
```

- [ ] **Step 4: Implementar a regra opcional**

Em `src/content/validateCatalogue.js`, acrescente aos imports:

```js
import { CURIOSITY_TOPIC_IDS } from './curiosityTopics.js'
```

Às constantes:

```js
const MIN_CURIOSITIES = 2
const MAX_CURIOSITIES = 4
```

Acima de `validateDestination`:

```js
function validateCuriosities(curiosities) {
  const errors = []
  const items = Array.isArray(curiosities) ? curiosities : []

  if (items.length < MIN_CURIOSITIES || items.length > MAX_CURIOSITIES) {
    errors.push(`"curiosities" must have between ${MIN_CURIOSITIES} and ${MAX_CURIOSITIES} items`)
  }

  const seenTopics = new Set()
  items.forEach((curiosity, index) => {
    if (!CURIOSITY_TOPIC_IDS.includes(curiosity?.topic)) {
      errors.push(`curiosities[${index}].topic must be one of ${CURIOSITY_TOPIC_IDS.join(', ')}`)
    } else if (seenTopics.has(curiosity.topic)) {
      errors.push(`curiosities[${index}].topic "${curiosity.topic}" is repeated`)
    } else {
      seenTopics.add(curiosity.topic)
    }

    if (!isNonEmptyString(curiosity?.text)) {
      errors.push(`curiosities[${index}] must have a non-empty text`)
    }
  })

  return errors
}
```

Dentro de `validateDestination`, logo depois do bloco de `physics.formula`:

```js
  if (destination.curiosities !== undefined) {
    errors.push(...validateCuriosities(destination.curiosities))
  }
```

- [ ] **Step 5: Escrever as curiosidades do Sistema Solar**

Acrescente a cada destino, logo depois de `history`, o bloco `curiosities` abaixo.

Regra de fonte: cada texto precisa estar sustentado por uma fonte já listada no destino. Antes de salvar, abra a fonte do destino e confirme o fato. Se ele não estiver lá, acrescente a `sources` uma página de NASA Science, ESA ou JPL que o sustente. Se não houver fonte confiável, troque a curiosidade por outra do mesmo tópico que a fonte existente sustente — nunca publique sem fonte.

```js
// sun
    curiosities: [
      { topic: 'phenomena', text: 'A luz que sai da superfície do Sol leva cerca de 8 minutos e 20 segundos para chegar à Terra.' },
      { topic: 'records', text: 'O Sol concentra cerca de 99,8% de toda a massa do Sistema Solar.' },
      { topic: 'missions', text: 'A sonda Parker Solar Probe, lançada em 2018, é o objeto construído por humanos que mais se aproximou do Sol.' },
    ],
// mercury
    curiosities: [
      { topic: 'naming', text: 'Recebeu o nome do mensageiro dos deuses romanos, veloz como o planeta que dá uma volta no Sol em apenas 88 dias.' },
      { topic: 'phenomena', text: 'Apesar de ser o planeta mais próximo do Sol, Mercúrio não é o mais quente: Vênus o supera por causa de sua atmosfera densa.' },
      { topic: 'missions', text: 'A missão BepiColombo, da ESA e da JAXA, foi lançada em 2018 para estudar Mercúrio a partir de sua órbita.' },
    ],
// venus
    curiosities: [
      { topic: 'phenomena', text: 'Vênus gira no sentido contrário ao da maioria dos planetas; por lá, o Sol nasce a oeste.' },
      { topic: 'records', text: 'É o planeta mais quente do Sistema Solar, com superfície quente o bastante para derreter chumbo.' },
      { topic: 'naming', text: 'Leva o nome da deusa romana do amor e da beleza e é o objeto natural mais brilhante do céu noturno depois da Lua.' },
    ],
// moon
    curiosities: [
      { topic: 'missions', text: 'Em 1969, a missão Apollo 11 levou Neil Armstrong e Buzz Aldrin a caminhar pela primeira vez em outro mundo.' },
      { topic: 'phenomena', text: 'A Lua se afasta da Terra cerca de 3,8 centímetros por ano.' },
      { topic: 'records', text: 'É a quinta maior lua do Sistema Solar.' },
    ],
// mars
    curiosities: [
      { topic: 'naming', text: 'Recebeu o nome do deus romano da guerra por causa de sua cor avermelhada.' },
      { topic: 'records', text: 'O Monte Olimpo, em Marte, é o maior vulcão conhecido do Sistema Solar, cerca de três vezes mais alto que o Monte Everest.' },
      { topic: 'missions', text: 'Em 2021, o helicóptero Ingenuity fez o primeiro voo motorizado e controlado em outro planeta.' },
    ],
// earth
    curiosities: [
      { topic: 'records', text: 'É o único lugar conhecido do universo onde existe vida.' },
      { topic: 'phenomena', text: 'Cerca de 71% da superfície da Terra é coberta por água.' },
      { topic: 'naming', text: 'É o único planeta do Sistema Solar cujo nome não vem de uma divindade grega ou romana.' },
    ],
// jupiter
    curiosities: [
      { topic: 'records', text: 'Júpiter tem mais que o dobro da massa de todos os outros planetas do Sistema Solar somados.' },
      { topic: 'phenomena', text: 'A Grande Mancha Vermelha é uma tempestade maior que a Terra, observada há mais de 150 anos.' },
      { topic: 'discovery', text: 'Em 1610, Galileu Galilei descobriu suas quatro maiores luas, a primeira evidência de corpos orbitando outro astro que não a Terra.' },
    ],
// europa
    curiosities: [
      { topic: 'phenomena', text: 'Sob a crosta de gelo, Europa provavelmente esconde um oceano de água salgada com mais água do que todos os oceanos da Terra.' },
      { topic: 'discovery', text: 'Foi descoberta por Galileu Galilei em 1610, junto com Io, Ganimedes e Calisto.' },
      { topic: 'missions', text: 'A sonda Europa Clipper, lançada em 2024, vai investigar se o oceano de Europa reúne condições para a vida.' },
    ],
// io
    curiosities: [
      { topic: 'records', text: 'Io é o corpo com maior atividade vulcânica do Sistema Solar.' },
      { topic: 'phenomena', text: 'O calor dos vulcões vem das marés: a gravidade de Júpiter e de outras luas deforma e aquece o interior de Io.' },
      { topic: 'missions', text: 'Suas erupções ativas foram vistas pela primeira vez pela sonda Voyager 1, em 1979.' },
    ],
// saturn
    curiosities: [
      { topic: 'phenomena', text: 'Os anéis são feitos principalmente de pedaços de gelo e rocha, de grãos de poeira a blocos do tamanho de casas.' },
      { topic: 'records', text: 'Saturno é o planeta menos denso do Sistema Solar, menos denso até que a água.' },
      { topic: 'missions', text: 'A sonda Cassini estudou Saturno por 13 anos e encerrou a missão mergulhando no planeta em 2017.' },
    ],
// titan
    curiosities: [
      { topic: 'records', text: 'Titã é a segunda maior lua do Sistema Solar e é maior que o planeta Mercúrio.' },
      { topic: 'phenomena', text: 'É o único lugar conhecido além da Terra com lagos e mares líquidos na superfície, formados por metano e etano.' },
      { topic: 'missions', text: 'Em 2005, a sonda Huygens pousou em Titã, o pouso mais distante já realizado pela humanidade.' },
    ],
// uranus
    curiosities: [
      { topic: 'phenomena', text: 'Urano gira praticamente deitado, com o eixo inclinado cerca de 98 graus.' },
      { topic: 'discovery', text: 'Foi o primeiro planeta descoberto com um telescópio, por William Herschel, em 1781.' },
      { topic: 'missions', text: 'A Voyager 2 é a única nave que visitou Urano, em 1986.' },
    ],
// neptune
    curiosities: [
      { topic: 'discovery', text: 'Netuno foi o primeiro planeta localizado por cálculos matemáticos antes de ser observado, em 1846.' },
      { topic: 'records', text: 'Tem os ventos mais fortes do Sistema Solar, que passam de 2.000 km/h.' },
      { topic: 'missions', text: 'A Voyager 2 é a única nave que visitou Netuno, em 1989.' },
    ],
// pluto
    curiosities: [
      { topic: 'discovery', text: 'Plutão foi descoberto por Clyde Tombaugh em 1930 e reclassificado como planeta anão em 2006.' },
      { topic: 'missions', text: 'Em 2015, a sonda New Horizons revelou em Plutão uma grande planície de gelo em forma de coração.' },
      { topic: 'naming', text: 'O nome foi sugerido por Venetia Burney, uma menina inglesa de 11 anos.' },
    ],
```

- [ ] **Step 6: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 7: Commit**

```bash
git add src/content
git commit -m "feat(content): add curiosity vocabulary and Solar System curiosities"
```

---

### Task 4: Curiosidades além do Sistema Solar e obrigatoriedade

**Files:**

- Modify: `src/content/validateCatalogue.js`
- Modify: `src/content/validateCatalogue.test.js`
- Modify: `src/content/catalogue.test.js`
- Modify: `src/content/destinations/deepSky.js` (8 destinos)

**Interfaces:**

- Consumes: `validateCuriosities` e `CURIOSITY_TOPIC_IDS` da Tarefa 3.
- Produces: todo destino tem `curiosities` válido; o campo passa a ser obrigatório.

- [ ] **Step 1: Escrever os testes que falham**

Em `src/content/validateCatalogue.test.js`, **substitua** o teste `'accepts a destination without curiosities while the batch is in progress'` por:

```js
  it('requires curiosities', () => {
    expect(validateCatalogue([makeDestination({ curiosities: undefined })])).toContain(
      'earth: "curiosities" must have between 2 and 4 items',
    )
  })
```

E acrescente ao objeto de `makeDestination`, antes de `...overrides`:

```js
    curiosities: [
      { topic: 'records', text: 'É o único lugar conhecido com vida.' },
      { topic: 'phenomena', text: 'A maior parte da superfície é coberta por água.' },
    ],
```

Em `src/content/catalogue.test.js`, **substitua** o teste `'gives every Solar System destination its curiosities'` por:

```js
  it('gives every destination its curiosities', () => {
    for (const destination of destinations) {
      expect(destination.curiosities, destination.id).toBeInstanceOf(Array)
    }
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content`
Expected: FAIL — `requires curiosities` sem a mensagem; os 8 destinos de `deepSky.js` sem `curiosities`.

- [ ] **Step 3: Tornar o campo obrigatório**

Em `src/content/validateCatalogue.js`, substitua:

```js
  if (destination.curiosities !== undefined) {
    errors.push(...validateCuriosities(destination.curiosities))
  }
```

por:

```js
  errors.push(...validateCuriosities(destination.curiosities))
```

- [ ] **Step 4: Escrever as curiosidades dos 8 destinos**

Mesma regra de fonte da Tarefa 3. Para Sagittarius A*, a fonte do Event Horizon Telescope já está no destino; acrescente `{ title: 'The Nobel Prize in Physics 2020', publisher: 'Nobel Prize Outreach', url: 'https://www.nobelprize.org/prizes/physics/2020/summary/' }` para sustentar a terceira curiosidade.

```js
// alpha-centauri
    curiosities: [
      { topic: 'records', text: 'Proxima Centauri, uma das três estrelas do sistema, é a estrela mais próxima do Sol.' },
      { topic: 'discovery', text: 'Proxima Centauri tem pelo menos um planeta confirmado, Proxima b, que orbita em sua zona habitável.' },
      { topic: 'naming', text: '"Alpha" indica a estrela mais brilhante da constelação do Centauro, visível no céu do hemisfério Sul.' },
    ],
// sirius
    curiosities: [
      { topic: 'records', text: 'Sirius é a estrela mais brilhante do céu noturno.' },
      { topic: 'discovery', text: 'Tem uma companheira discreta, Sirius B, uma anã branca identificada no século XIX.' },
      { topic: 'mythology', text: 'No Egito antigo, o reaparecimento de Sirius antes do nascer do Sol anunciava a época das cheias do Nilo.' },
    ],
// betelgeuse
    curiosities: [
      { topic: 'phenomena', text: 'Entre 2019 e 2020, Betelgeuse escureceu de forma inesperada; observações indicaram uma grande nuvem de poeira expelida pela própria estrela.' },
      { topic: 'records', text: 'É uma supergigante vermelha tão grande que, no lugar do Sol, ultrapassaria a órbita de Marte.' },
      { topic: 'naming', text: 'O nome vem do árabe e costuma ser associado à "mão" ou ao "ombro" da figura de Órion.' },
    ],
// orion-nebula
    curiosities: [
      { topic: 'records', text: 'É a região de grande formação de estrelas mais próxima da Terra.' },
      { topic: 'phenomena', text: 'Em seu interior, o Trapézio é um aglomerado de estrelas jovens e quentes que ilumina toda a nuvem.' },
      { topic: 'missions', text: 'É visível a olho nu como uma mancha difusa na "espada" da constelação de Órion.' },
    ],
// crab-nebula
    curiosities: [
      { topic: 'discovery', text: 'É o que restou de uma supernova registrada por astrônomos chineses em 1054, visível até de dia por semanas.' },
      { topic: 'phenomena', text: 'No centro há um pulsar que gira cerca de 30 vezes por segundo.' },
      { topic: 'naming', text: 'O nome vem de um desenho feito em 1844 por Lord Rosse, que lembrava um caranguejo.' },
    ],
// galactic-center
    curiosities: [
      { topic: 'phenomena', text: 'A poeira interestelar bloqueia a luz visível do centro galáctico, que por isso é estudado principalmente em infravermelho, rádio e raios X.' },
      { topic: 'records', text: 'É a região da Via Láctea com maior concentração de estrelas.' },
      { topic: 'missions', text: 'No céu, fica na direção da constelação de Sagitário.' },
    ],
// milky-way
    curiosities: [
      { topic: 'mythology', text: 'O nome vem da mitologia greco-romana, que associava a faixa luminosa do céu a leite derramado.' },
      { topic: 'discovery', text: 'Em 1610, Galileu observou com um telescópio que a faixa da Via Láctea é formada por inúmeras estrelas.' },
      { topic: 'records', text: 'A Via Láctea reúne de 100 a 400 bilhões de estrelas.' },
    ],
// sagittarius-a-star
    curiosities: [
      { topic: 'missions', text: 'Em 2022, o Event Horizon Telescope divulgou a primeira imagem da sombra de Sagittarius A*.' },
      { topic: 'records', text: 'Tem cerca de 4 milhões de vezes a massa do Sol.' },
      { topic: 'discovery', text: 'Sua massa foi medida acompanhando por décadas as órbitas de estrelas vizinhas, trabalho reconhecido pelo Nobel de Física de 2020.' },
    ],
```

- [ ] **Step 5: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 6: Commit**

```bash
git add src/content
git commit -m "feat(content): complete deep-sky curiosities and require them"
```

---

### Task 5: Fórmulas contextualizadas em nove destinos

`physics.formula` já é validado quando presente. Esta tarefa acrescenta conteúdo e um teste que fixa a lista.

**Files:**

- Modify: `src/content/catalogue.test.js`
- Modify: `src/content/destinations/solarSystem.js` (sun, earth, moon, jupiter, saturn)
- Modify: `src/content/destinations/deepSky.js` (alpha-centauri, betelgeuse, crab-nebula, sagittarius-a-star)

**Interfaces:**

- Produces: `physics.formula: { expression, variables: Array<{ symbol, meaning, value }>, interpretation }` exatamente nos nove ids abaixo.

- [ ] **Step 1: Escrever o teste que falha**

Em `src/content/catalogue.test.js`:

```js
  it('offers a contextualized formula exactly where it teaches something', () => {
    const withFormula = destinations
      .filter(({ physics }) => physics.formula !== undefined)
      .map(({ id }) => id)
      .sort()

    expect(withFormula).toEqual([
      'alpha-centauri', 'betelgeuse', 'crab-nebula', 'earth', 'jupiter',
      'moon', 'sagittarius-a-star', 'saturn', 'sun',
    ])
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content/catalogue.test.js`
Expected: FAIL — `expected [] to deeply equal [ 'alpha-centauri', … ]`.

- [ ] **Step 3: Acrescentar as fórmulas**

Em cada destino, dentro do objeto `physics` existente e depois de `explanation`, acrescente `formula`. As contas foram conferidas; os valores batem com os `facts` onde a grandeza já aparece (Terra: massa `5,97 × 10²⁴ kg`, raio `6.371 km`, gravidade `9,8 m/s²`).

```js
// sun
      formula: {
        expression: 'L = 4πR²σT⁴',
        variables: [
          { symbol: 'L', meaning: 'luminosidade: a energia emitida a cada segundo', value: 'cerca de 3,8 × 10²⁶ W' },
          { symbol: 'R', meaning: 'raio do Sol', value: '6,96 × 10⁸ m' },
          { symbol: 'σ', meaning: 'constante de Stefan-Boltzmann', value: '5,67 × 10⁻⁸ W/(m²·K⁴)' },
          { symbol: 'T', meaning: 'temperatura da superfície', value: 'cerca de 5.772 K' },
        ],
        interpretation:
          'A energia que uma estrela irradia cresce muito depressa com a temperatura: dobrar T multiplicaria a luminosidade por 16. Com o raio e a temperatura do Sol, a conta chega a cerca de 3,8 × 10²⁶ watts a cada segundo.',
      },
// earth
      formula: {
        expression: 'g = GM / R²',
        variables: [
          { symbol: 'g', meaning: 'aceleração da gravidade na superfície', value: '9,8 m/s²' },
          { symbol: 'G', meaning: 'constante gravitacional', value: '6,67 × 10⁻¹¹ N·m²/kg²' },
          { symbol: 'M', meaning: 'massa da Terra', value: '5,97 × 10²⁴ kg' },
          { symbol: 'R', meaning: 'raio médio da Terra', value: '6,371 × 10⁶ m' },
        ],
        interpretation:
          'Mais massa puxa com mais força; estar mais longe do centro enfraquece a atração. Com a massa e o raio da Terra, cada segundo de queda livre acrescenta cerca de 9,8 m/s à velocidade.',
      },
// moon
      formula: {
        expression: 'g = GM / R²',
        variables: [
          { symbol: 'g', meaning: 'aceleração da gravidade na superfície', value: 'cerca de 1,62 m/s²' },
          { symbol: 'G', meaning: 'constante gravitacional', value: '6,67 × 10⁻¹¹ N·m²/kg²' },
          { symbol: 'M', meaning: 'massa da Lua', value: '7,35 × 10²² kg' },
          { symbol: 'R', meaning: 'raio da Lua', value: '1,74 × 10⁶ m' },
        ],
        interpretation:
          'A mesma conta da Terra, com a massa bem menor da Lua, dá cerca de um sexto da gravidade terrestre — por isso os astronautas da Apollo avançavam aos saltos.',
      },
// jupiter
      formula: {
        expression: 'v = √(2GM / R)',
        variables: [
          { symbol: 'v', meaning: 'velocidade de escape: a mínima para deixar o planeta sem propulsão', value: 'cerca de 60 km/s' },
          { symbol: 'G', meaning: 'constante gravitacional', value: '6,67 × 10⁻¹¹ N·m²/kg²' },
          { symbol: 'M', meaning: 'massa de Júpiter', value: '1,90 × 10²⁷ kg' },
          { symbol: 'R', meaning: 'raio equatorial de Júpiter', value: '6,99 × 10⁷ m' },
        ],
        interpretation:
          'Quanto mais massa concentrada, mais rápido é preciso ir para escapar. Em Júpiter são cerca de 60 km/s, mais de cinco vezes os 11 km/s necessários para deixar a Terra.',
      },
// saturn
      formula: {
        expression: 'ρ = M / (4⁄3 · πR³)',
        variables: [
          { symbol: 'ρ', meaning: 'densidade média', value: 'cerca de 0,69 g/cm³' },
          { symbol: 'M', meaning: 'massa de Saturno', value: '5,68 × 10²⁶ kg' },
          { symbol: 'R', meaning: 'raio médio de Saturno', value: '5,82 × 10⁷ m' },
        ],
        interpretation:
          'Densidade é massa dividida pelo volume. Saturno é enorme, mas feito sobretudo de hidrogênio e hélio: sua densidade média, cerca de 0,69 g/cm³, é menor que a da água (1 g/cm³).',
      },
// alpha-centauri
      formula: {
        expression: 't = d / c',
        variables: [
          { symbol: 't', meaning: 'tempo que a luz leva para chegar até nós', value: 'cerca de 4,3 anos' },
          { symbol: 'd', meaning: 'distância até Alpha Centauri', value: 'cerca de 4,1 × 10¹⁶ m' },
          { symbol: 'c', meaning: 'velocidade da luz', value: '3,00 × 10⁸ m/s' },
        ],
        interpretation:
          'Tempo é distância dividida por velocidade. A luz de Alpha Centauri que vemos hoje saiu de lá há cerca de 4,3 anos — olhar para o céu é sempre olhar para o passado.',
      },
// betelgeuse
      formula: {
        expression: 'λ = b / T',
        variables: [
          { symbol: 'λ', meaning: 'comprimento de onda em que a estrela brilha mais', value: 'cerca de 800 nm' },
          { symbol: 'b', meaning: 'constante de deslocamento de Wien', value: '2,898 × 10⁻³ m·K' },
          { symbol: 'T', meaning: 'temperatura da superfície', value: 'cerca de 3.600 K' },
        ],
        interpretation:
          'Quanto mais fria a estrela, maior o comprimento de onda do seu brilho mais intenso. Em Betelgeuse o pico cai no infravermelho, logo além do vermelho visível — por isso a vemos alaranjada.',
      },
// crab-nebula
      formula: {
        expression: 'f = 1 / P',
        variables: [
          { symbol: 'f', meaning: 'frequência: voltas por segundo', value: 'cerca de 30 voltas/s' },
          { symbol: 'P', meaning: 'período de rotação do pulsar central', value: 'cerca de 0,033 s' },
        ],
        interpretation:
          'Se uma volta dura 0,033 segundo, cabem cerca de 30 voltas em um segundo. É um objeto com mais massa que o Sol, espremido em poucas dezenas de quilômetros, girando mais rápido que uma hélice.',
      },
// sagittarius-a-star
      formula: {
        expression: 'rₛ = 2GM / c²',
        variables: [
          { symbol: 'rₛ', meaning: 'raio de Schwarzschild: o tamanho do horizonte de eventos', value: 'cerca de 1,3 × 10¹⁰ m' },
          { symbol: 'G', meaning: 'constante gravitacional', value: '6,67 × 10⁻¹¹ N·m²/kg²' },
          { symbol: 'M', meaning: 'massa de Sagittarius A*', value: 'cerca de 8,6 × 10³⁶ kg (4 milhões de sóis)' },
          { symbol: 'c', meaning: 'velocidade da luz', value: '3,00 × 10⁸ m/s' },
        ],
        interpretation:
          'O horizonte de eventos é a fronteira de onde nem a luz escapa, e seu tamanho cresce na mesma proporção da massa. Para Sagittarius A* são cerca de 13 milhões de km — algo como um quinto da distância entre o Sol e Mercúrio.',
      },
```

Confirme temperatura, massa e raio de cada destino contra a fonte do próprio destino. Se a fonte trouxer valor diferente, use o da fonte e refaça a conta do resultado (primeira variável) e da interpretação.

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat(content): add contextualized formulas to nine destinations"
```

---

### Task 6: Regras de apresentação do painel

**Files:**

- Create: `src/utils/destinationPanel.js`
- Create: `src/utils/destinationPanel.test.js`

**Interfaces:**

- Consumes: `getCuriosityTopicLabel` (Tarefa 3), `SCALE_NOTICE` (Tarefa 1), destinos com `curiosities` e `physics.formula` opcional.
- Produces:

```text
PANEL_SECTION_IDS = ['overview', 'physics', 'curiosities', 'data']

buildDestinationPanel(destination) → {
  header: { name, type, region, impact },
  sections: [
    { id: 'overview',    title: 'Conhecer',                overview },
    { id: 'physics',     title: 'Entender a física',       explanation, formula /* objeto ou null */ },
    { id: 'curiosities', title: 'Curiosidades e história', history, curiosities: [{ topic, label, text }] },
    { id: 'data',        title: 'Dados e fontes',          facts, sources, scaleNotice },
  ],
}
```

- [ ] **Step 1: Escrever os testes que falham**

`src/utils/destinationPanel.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { SCALE_NOTICE } from '../content/notices.js'
import { destinations } from '../content/destinations.js'
import { buildDestinationPanel, PANEL_SECTION_IDS } from './destinationPanel.js'

const byId = (id) => destinations.find((destination) => destination.id === id)

describe('buildDestinationPanel', () => {
  it('orders the sections as the product spec requires', () => {
    const panel = buildDestinationPanel(byId('mars'))

    expect(panel.sections.map(({ id }) => id)).toEqual(PANEL_SECTION_IDS)
    expect(panel.sections.map(({ title }) => title)).toEqual([
      'Conhecer', 'Entender a física', 'Curiosidades e história', 'Dados e fontes',
    ])
  })

  it('builds the header from the destination', () => {
    const mars = byId('mars')

    expect(buildDestinationPanel(mars).header).toEqual({
      name: mars.name, type: mars.type, region: mars.region, impact: mars.impact,
    })
  })

  it('exposes a formula only when the destination has one', () => {
    const physicsOf = (id) => buildDestinationPanel(byId(id)).sections[1]

    expect(physicsOf('mercury').formula).toBeNull()
    expect(physicsOf('sun').formula.expression).toBe('L = 4πR²σT⁴')
  })

  it('labels curiosities in pt-BR, after the history text', () => {
    const section = buildDestinationPanel(byId('pluto')).sections[2]

    expect(section.history).toBe(byId('pluto').history)
    expect(section.curiosities[0]).toEqual({
      topic: 'discovery',
      label: 'Descoberta',
      text: byId('pluto').curiosities[0].text,
    })
  })

  it('shows the illustrative scale notice in the data section of every destination', () => {
    for (const destination of destinations) {
      const data = buildDestinationPanel(destination).sections[3]

      expect(data.scaleNotice, destination.id).toBe(SCALE_NOTICE)
      expect(data.facts).toBe(destination.facts)
      expect(data.sources).toBe(destination.sources)
    }
  })

  it('does not mutate the catalogue', () => {
    const original = structuredClone(destinations)

    destinations.forEach(buildDestinationPanel)

    expect(destinations).toEqual(original)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/utils/destinationPanel.test.js`
Expected: FAIL — `Failed to resolve import "./destinationPanel.js"`.

- [ ] **Step 3: Implementar**

`src/utils/destinationPanel.js`:

```js
import { getCuriosityTopicLabel } from '../content/curiosityTopics.js'
import { SCALE_NOTICE } from '../content/notices.js'

export const PANEL_SECTION_IDS = Object.freeze(['overview', 'physics', 'curiosities', 'data'])

export function buildDestinationPanel(destination) {
  return {
    header: {
      name: destination.name,
      type: destination.type,
      region: destination.region,
      impact: destination.impact,
    },
    sections: [
      { id: 'overview', title: 'Conhecer', overview: destination.overview },
      {
        id: 'physics',
        title: 'Entender a física',
        explanation: destination.physics.explanation,
        formula: destination.physics.formula ?? null,
      },
      {
        id: 'curiosities',
        title: 'Curiosidades e história',
        history: destination.history,
        curiosities: destination.curiosities.map(({ topic, text }) => ({
          topic,
          label: getCuriosityTopicLabel(topic),
          text,
        })),
      },
      {
        id: 'data',
        title: 'Dados e fontes',
        facts: destination.facts,
        sources: destination.sources,
        scaleNotice: SCALE_NOTICE,
      },
    ],
  }
}
```

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Commit**

```bash
git add src/utils/destinationPanel.js src/utils/destinationPanel.test.js
git commit -m "feat(content): build ordered destination panel sections"
```

---

### Task 7: Readout discreto de coordenadas e escala

Substitui o aviso de escala que hoje flutua no canto inferior direito — que colidiria com a superfície da borda direita — pelo readout no canto inferior esquerdo.

**Files:**

- Create: `src/utils/sceneReadout.js`
- Create: `src/utils/sceneReadout.test.js`
- Create: `src/components/SceneReadout.jsx`
- Modify: `src/scene/ExplorationScene.jsx` (remove o `<p className="scale-notice">` e o import de `SCALE_NOTICE`)
- Modify: `src/App.jsx`
- Modify: `src/index.css` (remove `.scale-notice` nas linhas 59–72 e no bloco `@media`; acrescenta `.scene-readout`)

**Interfaces:**

- Consumes: `destination.coordinates` (Tarefa 2), `SCALE_NOTICE` (Tarefa 1).
- Produces: `buildSceneReadout(destination) → { name: string, kind: 'equatorial' | 'orbital', entries: Array<{ label, value }>, scaleNotice: string }`; componente `<SceneReadout destination={destination} />`.

- [ ] **Step 1: Escrever os testes que falham**

`src/utils/sceneReadout.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { destinations } from '../content/destinations.js'
import { SCALE_NOTICE } from '../content/notices.js'
import { buildSceneReadout } from './sceneReadout.js'

const byId = (id) => destinations.find((destination) => destination.id === id)

describe('buildSceneReadout', () => {
  it('shows fixed sky coordinates for a distant object', () => {
    const readout = buildSceneReadout(byId('betelgeuse'))

    expect(readout.name).toBe('Betelgeuse')
    expect(readout.kind).toBe('equatorial')
    expect(readout.entries.map(({ label }) => label)).toEqual([
      'Ascensão reta', 'Declinação', 'Distância da Terra',
    ])
  })

  it('shows orbital data, never a sky position, for a Solar System body', () => {
    const readout = buildSceneReadout(byId('mars'))

    expect(readout.kind).toBe('orbital')
    expect(readout.entries.map(({ label }) => label)).not.toContain('Ascensão reta')
  })

  it('always carries the illustrative scale notice', () => {
    for (const destination of destinations) {
      expect(buildSceneReadout(destination).scaleNotice, destination.id).toBe(SCALE_NOTICE)
    }
  })

  it('returns entries that do not share references with the catalogue', () => {
    const mars = byId('mars')
    const readout = buildSceneReadout(mars)

    expect(readout.entries).toEqual(mars.coordinates.entries)
    expect(readout.entries).not.toBe(mars.coordinates.entries)
    expect(readout.entries[0]).not.toBe(mars.coordinates.entries[0])
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/utils/sceneReadout.test.js`
Expected: FAIL — `Failed to resolve import "./sceneReadout.js"`.

- [ ] **Step 3: Implementar a função pura**

`src/utils/sceneReadout.js`:

```js
import { SCALE_NOTICE } from '../content/notices.js'

export function buildSceneReadout(destination) {
  return {
    name: destination.name,
    kind: destination.coordinates.kind,
    entries: destination.coordinates.entries.map(({ label, value }) => ({ label, value })),
    scaleNotice: SCALE_NOTICE,
  }
}
```

- [ ] **Step 4: Rodar os testes**

Run: `npx vitest run src/utils/sceneReadout.test.js`
Expected: PASS.

- [ ] **Step 5: Criar o componente**

`src/components/SceneReadout.jsx`:

```jsx
import { buildSceneReadout } from '../utils/sceneReadout.js'

export function SceneReadout({ destination }) {
  const readout = buildSceneReadout(destination)

  return (
    <aside className="scene-readout" aria-label={`Coordenadas de ${readout.name}`} tabIndex={0}>
      <dl className="scene-readout__entries">
        {readout.entries.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="scene-readout__notice" role="note">{readout.scaleNotice}</p>
    </aside>
  )
}
```

`tabIndex={0}` existe para que o clareamento também aconteça no foco por teclado, como a spec exige.

- [ ] **Step 6: Tirar o aviso antigo da cena e montar o readout**

Em `src/scene/ExplorationScene.jsx`, apague a linha `<p className="scale-notice" role="note">{SCALE_NOTICE}</p>` e a linha `import { SCALE_NOTICE } from '../content/notices.js'`.

Em `src/App.jsx`, acrescente o import:

```jsx
import { SceneReadout } from './components/SceneReadout.jsx'
```

e, dentro do fragmento, logo depois de `<ExplorationScene … />`:

```jsx
      <SceneReadout destination={selectedDestination} />
```

- [ ] **Step 7: Estilos**

Em `src/index.css`, apague o bloco `.scale-notice { … }` (linhas 59–72) e o bloco `.scale-notice { … }` dentro de `@media (max-width: 700px)`.

Acrescente a `:root`:

```css
  --font-mono: ui-monospace, 'Cascadia Mono', Consolas, monospace;
  --sheet-card-height: 7.5rem;
```

Acrescente antes do `@media (max-width: 700px)`:

```css
.scene-readout {
  position: fixed;
  z-index: 2;
  bottom: 1rem;
  left: 1rem;
  max-width: min(22rem, calc(100vw - 2rem));
  color: rgb(154 163 189 / 45%);
  font: 0.66rem/1.45 var(--font-mono);
  letter-spacing: 0.02em;
  transition: color 200ms ease;
}

.scene-readout:hover,
.scene-readout:focus-visible {
  color: rgb(200 213 238 / 85%);
}

.scene-readout:focus-visible {
  outline: 1px dashed rgb(200 213 238 / 40%);
  outline-offset: 4px;
}

.scene-readout__entries {
  display: grid;
  gap: 0.05rem;
  margin: 0;
}

.scene-readout__entries div {
  display: flex;
  gap: 0.6rem;
}

.scene-readout__entries dd {
  margin: 0;
}

.scene-readout__notice {
  margin: 0.3rem 0 0;
}

@media (prefers-reduced-motion: reduce) {
  .scene-readout {
    transition: none;
  }
}
```

Dentro de `@media (max-width: 700px)`, acrescente — no celular a folha inferior (Tarefa 9) ocupa a base da tela, então o readout sobe acima dela:

```css
  .scene-readout {
    bottom: calc(var(--sheet-card-height) + 1.25rem);
    left: 0.75rem;
  }
```

O contraste baixo é intencional (instrumento de fundo, pedido explícito). O mesmo aviso de escala também aparece com contraste pleno na seção "Dados e fontes" do painel; a preferência de alto contraste da Fase 5 deve elevar este readout.

- [ ] **Step 8: Rodar a verificação completa e inspecionar**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

Run: `npm run dev`, abra a URL exibida. Confirme: o readout aparece apagado no canto inferior esquerdo com as entradas da Terra e o aviso; clareia no hover e ao receber foco com Tab; selecionar Betelgeuse troca para ascensão reta e declinação; o aviso antigo no canto inferior direito sumiu.

- [ ] **Step 9: Commit**

```bash
git add src/utils/sceneReadout.js src/utils/sceneReadout.test.js src/components/SceneReadout.jsx src/scene/ExplorationScene.jsx src/App.jsx src/index.css
git commit -m "feat(scene): replace floating scale notice with discreet coordinate readout"
```

---

### Task 8: Estado da superfície da borda direita

**Files:**

- Create: `src/state/panel.js`
- Create: `src/state/panel.test.js`

**Interfaces:**

- Consumes: ids de seção de `PANEL_SECTION_IDS` (Tarefa 6), como strings.
- Produces:

```text
createPanelState() → { mode: 'card', focusSectionId: null, revealedFormulaIds: [] }
expandPanel(state, focusSectionId) → mesmo formato, mode 'expanded'
collapsePanel(state) → mode 'card', focusSectionId null, fórmulas reveladas preservadas
toggleFormula(state, destinationId) → alterna o id em revealedFormulaIds
isFormulaRevealed(state, destinationId) → boolean
```

- [ ] **Step 1: Escrever os testes que falham**

`src/state/panel.test.js`:

```js
import { describe, expect, it } from 'vitest'

import {
  collapsePanel,
  createPanelState,
  expandPanel,
  isFormulaRevealed,
  toggleFormula,
} from './panel.js'

describe('panel state', () => {
  it('starts as the facts card with every formula hidden', () => {
    expect(createPanelState()).toEqual({
      mode: 'card', focusSectionId: null, revealedFormulaIds: [],
    })
  })

  it('expands focusing the requested section', () => {
    expect(expandPanel(createPanelState(), 'data')).toMatchObject({
      mode: 'expanded', focusSectionId: 'data',
    })
  })

  it('collapses back to the card without forgetting revealed formulas', () => {
    const revealed = toggleFormula(expandPanel(createPanelState(), 'overview'), 'sun')
    const collapsed = collapsePanel(revealed)

    expect(collapsed).toMatchObject({ mode: 'card', focusSectionId: null })
    expect(isFormulaRevealed(collapsed, 'sun')).toBe(true)
  })

  it('toggles a formula per destination', () => {
    const shown = toggleFormula(createPanelState(), 'sun')

    expect(isFormulaRevealed(shown, 'sun')).toBe(true)
    expect(isFormulaRevealed(shown, 'earth')).toBe(false)
    expect(isFormulaRevealed(toggleFormula(shown, 'sun'), 'sun')).toBe(false)
  })

  it('never mutates the previous state', () => {
    const initial = createPanelState()
    const snapshot = structuredClone(initial)

    collapsePanel(toggleFormula(expandPanel(initial, 'data'), 'sun'))

    expect(initial).toEqual(snapshot)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/state/panel.test.js`
Expected: FAIL — `Failed to resolve import "./panel.js"`.

- [ ] **Step 3: Implementar**

`src/state/panel.js`:

```js
export function createPanelState() {
  return { mode: 'card', focusSectionId: null, revealedFormulaIds: [] }
}

export function expandPanel(state, focusSectionId) {
  return { ...state, mode: 'expanded', focusSectionId }
}

export function collapsePanel(state) {
  return { ...state, mode: 'card', focusSectionId: null }
}

export function toggleFormula(state, destinationId) {
  const revealedFormulaIds = state.revealedFormulaIds.includes(destinationId)
    ? state.revealedFormulaIds.filter((id) => id !== destinationId)
    : [...state.revealedFormulaIds, destinationId]

  return { ...state, revealedFormulaIds }
}

export function isFormulaRevealed(state, destinationId) {
  return state.revealedFormulaIds.includes(destinationId)
}
```

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Commit**

```bash
git add src/state/panel.js src/state/panel.test.js
git commit -m "feat(state): add card and expanded panel transitions"
```

---

### Task 9: Cartão e painel de destino na borda direita

**Files:**

- Create: `src/components/DestinationPanel.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**

- Consumes: `buildDestinationPanel` (Tarefa 6); `createPanelState`, `expandPanel`, `collapsePanel`, `toggleFormula`, `isFormulaRevealed` (Tarefa 8).
- Produces: `<DestinationPanel destination panel onExpand onCollapse onToggleFormula />`, onde `onExpand()` não recebe argumentos (o cartão sempre abre em `'data'`, decidido pelo App) e `onToggleFormula()` alterna a fórmula do destino exibido.

- [ ] **Step 1: Criar o componente**

`src/components/DestinationPanel.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import { isFormulaRevealed } from '../state/panel.js'
import { buildDestinationPanel } from '../utils/destinationPanel.js'

function FactList({ facts }) {
  return (
    <dl className="destination-panel__facts">
      {facts.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Formula({ formula, isRevealed, onToggle }) {
  return (
    <div className="formula">
      <button type="button" className="formula__toggle" aria-expanded={isRevealed} onClick={onToggle}>
        {isRevealed ? 'Ocultar fórmula' : 'Mostrar fórmula'}
      </button>
      {isRevealed && (
        <div className="formula__content">
          <p className="formula__expression">{formula.expression}</p>
          <dl className="destination-panel__facts">
            {formula.variables.map(({ symbol, meaning, value }) => (
              <div key={symbol}>
                <dt>{symbol} — {meaning}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>{formula.interpretation}</p>
        </div>
      )}
    </div>
  )
}

function SectionBody({ section, isRevealed, onToggleFormula }) {
  switch (section.id) {
    case 'overview':
      return <p>{section.overview}</p>
    case 'physics':
      return (
        <>
          <p>{section.explanation}</p>
          {section.formula && (
            <Formula formula={section.formula} isRevealed={isRevealed} onToggle={onToggleFormula} />
          )}
        </>
      )
    case 'curiosities':
      return (
        <>
          <p>{section.history}</p>
          <dl className="destination-panel__facts">
            {section.curiosities.map(({ topic, label, text }) => (
              <div key={topic}>
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </>
      )
    case 'data':
      return (
        <>
          <FactList facts={section.facts} />
          <ul className="destination-panel__sources">
            {section.sources.map(({ title, publisher, url }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">{title}</a> — {publisher}
              </li>
            ))}
          </ul>
          <p className="destination-panel__notice" role="note">{section.scaleNotice}</p>
        </>
      )
    default:
      return null
  }
}

export function DestinationPanel({ destination, panel, onExpand, onCollapse, onToggleFormula }) {
  const bodyRef = useRef(null)
  const content = buildDestinationPanel(destination)

  useEffect(() => {
    if (panel.mode !== 'expanded' || !panel.focusSectionId) return
    bodyRef.current
      ?.querySelector(`[data-section="${panel.focusSectionId}"]`)
      ?.scrollIntoView({ block: 'start' })
  }, [panel.mode, panel.focusSectionId, destination.id])

  if (panel.mode === 'card') {
    return (
      <button type="button" className="destination-surface destination-card" onClick={onExpand}>
        <span className="destination-card__name">{content.header.name}</span>
        <span className="destination-card__facts">
          {destination.facts.map(({ label, value }) => (
            <span key={label} className="destination-card__fact">
              <span>{label}</span>
              <strong>{value}</strong>
            </span>
          ))}
        </span>
        <span className="destination-card__hint">Ver painel completo</span>
      </button>
    )
  }

  return (
    <aside className="destination-surface destination-panel" aria-label={`Painel de ${content.header.name}`}>
      <header className="destination-panel__header">
        <div>
          <p className="destination-panel__meta">{content.header.type} · {content.header.region}</p>
          <h2>{content.header.name}</h2>
        </div>
        <button type="button" className="destination-panel__close" onClick={onCollapse}>
          Fechar
        </button>
      </header>
      <div ref={bodyRef} className="destination-panel__body">
        <p className="destination-panel__impact">{content.header.impact}</p>
        {content.sections.map((section) => (
          <section
            key={section.id}
            data-section={section.id}
            className="destination-panel__section"
            aria-labelledby={`panel-section-${section.id}`}
          >
            <h3 id={`panel-section-${section.id}`}>{section.title}</h3>
            <SectionBody
              section={section}
              isRevealed={isFormulaRevealed(panel, destination.id)}
              onToggleFormula={onToggleFormula}
            />
          </section>
        ))}
      </div>
    </aside>
  )
}
```

`scrollIntoView` usa o comportamento instantâneo padrão de propósito: rolagem suave sem checar movimento reduzido violaria a preferência que a Fase 5 vai introduzir.

- [ ] **Step 2: Ligar no App**

Em `src/App.jsx`, acrescente os imports:

```jsx
import { DestinationPanel } from './components/DestinationPanel.jsx'
import { collapsePanel, createPanelState, expandPanel, toggleFormula } from './state/panel.js'
```

Acrescente o estado, logo depois de `const [travel, setTravel] = useState(null)`:

```jsx
  const [panel, setPanel] = useState(createPanelState)
```

Em `handleTravelComplete`, depois do bloco `setTravel(...)`, acrescente:

```jsx
    setPanel((current) => expandPanel(current, 'overview'))
```

Acrescente, dentro do fragmento, logo depois de `<SceneReadout … />`:

```jsx
      <DestinationPanel
        destination={selectedDestination}
        panel={panel}
        onExpand={() => setPanel((current) => expandPanel(current, 'data'))}
        onCollapse={() => setPanel(collapsePanel)}
        onToggleFormula={() => setPanel((current) => toggleFormula(current, selectedDestination.id))}
      />
```

`handleSkipTravel` já chama `handleTravelComplete`, então pular a viagem também expande o painel — é a mesma chegada.

- [ ] **Step 3: Estilos**

Acrescente a `src/index.css`, antes do `@media (max-width: 700px)`:

```css
.destination-surface {
  position: fixed;
  z-index: 3;
  right: 1rem;
  border: 1px solid rgb(113 131 169 / 60%);
  border-radius: 0.9rem;
  color: #f1f5ff;
  background: rgb(3 9 23 / 72%);
  backdrop-filter: blur(14px);
}

.destination-card {
  top: 50%;
  display: grid;
  gap: 0.6rem;
  justify-items: stretch;
  width: min(16rem, calc(100vw - 2rem));
  padding: 0.9rem 1rem;
  transform: translateY(-50%);
  text-align: left;
  font-size: 0.75rem;
}

.destination-card:hover,
.destination-card:focus-visible {
  background: rgb(10 22 48 / 80%);
}

.destination-card__name {
  font-size: 1rem;
  font-weight: 600;
}

.destination-card__facts {
  display: grid;
  gap: 0.45rem;
}

.destination-card__fact {
  display: grid;
  gap: 0.05rem;
}

.destination-card__fact span {
  color: var(--color-text-muted);
  font-size: 0.66rem;
}

.destination-card__fact strong {
  font-weight: 500;
}

.destination-card__hint {
  color: #ffe38a;
  font-size: 0.68rem;
}

.destination-panel {
  top: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: min(24rem, calc(100vw - 2rem));
  font-size: 0.82rem;
}

.destination-panel__header {
  display: flex;
  gap: 1rem;
  align-items: start;
  justify-content: space-between;
  padding: 1rem 1rem 0.5rem;
}

.destination-panel__header h2 {
  margin: 0;
  font-size: 1.3rem;
}

.destination-panel__meta {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

.destination-panel__close,
.formula__toggle {
  min-height: 36px;
  padding: 0.2rem 0.7rem;
  font-size: 0.72rem;
}

.destination-panel__body {
  overflow: auto;
  padding: 0 1rem 1rem;
}

.destination-panel__impact {
  color: #ffe38a;
  font-size: 0.95rem;
}

.destination-panel__section h3 {
  margin: 1.2rem 0 0.4rem;
  color: #c8d5ee;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.destination-panel__section p {
  margin: 0 0 0.6rem;
}

.destination-panel__facts {
  display: grid;
  gap: 0.45rem;
  margin: 0 0 0.6rem;
}

.destination-panel__facts dt {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

.destination-panel__facts dd {
  margin: 0;
}

.destination-panel__sources {
  margin: 0.6rem 0;
  padding-left: 1.1rem;
}

.destination-panel__sources a {
  color: #9fd0ff;
}

.destination-panel__notice {
  color: var(--color-text-muted);
  font-size: 0.72rem;
  font-style: italic;
}

.formula__content {
  margin-top: 0.6rem;
  padding: 0.7rem;
  border: 1px solid rgb(113 131 169 / 50%);
  border-radius: 0.5rem;
}

.formula__expression {
  color: #ffe38a;
  font: 1.05rem var(--font-mono);
}
```

Dentro de `@media (max-width: 700px)` — folha inferior com os mesmos dois estados:

```css
  .destination-surface {
    right: 0.75rem;
    bottom: 0.75rem;
    left: 0.75rem;
  }

  .destination-card {
    top: auto;
    width: auto;
    max-height: var(--sheet-card-height);
    overflow: hidden;
    transform: none;
  }

  .destination-card__facts > :nth-child(n + 3) {
    display: none;
  }

  .destination-panel {
    top: 35dvh;
    width: auto;
  }
```

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Inspecionar no navegador**

Run: `npm run dev`. No desktop, confirme:

1. Ao abrir, o cartão da Terra aparece centralizado verticalmente na borda direita, com os fatos.
2. Clicar no cartão expande o painel rolado até "Dados e fontes"; "Fechar" volta ao cartão.
3. Selecionar outro destino na navegação troca o conteúdo sem mudar o modo.
4. Viajar até o Sol expande o painel no topo; "Mostrar fórmula" revela a fórmula e o botão anuncia `aria-expanded`; Mercúrio não mostra o botão.
5. Pular a viagem também expande o painel.
6. Com o painel aberto, o readout inferior esquerdo e a navegação continuam acessíveis.

No DevTools, em 390 × 844: o cartão vira folha inferior com nome e dois fatos, o readout fica acima dela, e o painel expandido ocupa a parte de baixo a partir de 35% da altura.

- [ ] **Step 6: Commit**

```bash
git add src/components/DestinationPanel.jsx src/App.jsx src/index.css
git commit -m "feat(content): add right-edge facts card that expands into the destination panel"
```

---

### Task 10: Preferências locais versionadas

**Files:**

- Create: `src/state/preferences.js`
- Create: `src/state/preferences.test.js`

**Interfaces:**

- Produces:

```text
PREFERENCES_STORAGE_KEY = 'kepler-lab:preferences'
PREFERENCES_SCHEMA_VERSION = 1
DEFAULT_PREFERENCES = { hasSeenOnboarding: false }
parsePreferences(raw: string | null) → { hasSeenOnboarding: boolean }
serializePreferences(preferences) → string JSON com version
loadPreferences(storage?) → preferências; nunca lança
savePreferences(preferences, storage?) → boolean; nunca lança
```

`storage` é opcional; quando omitido, usa `globalThis.localStorage`. O acesso a ele acontece dentro do `try`, porque em alguns navegadores só ler a propriedade já lança `SecurityError`.

- [ ] **Step 1: Escrever os testes que falham**

`src/state/preferences.test.js`:

```js
import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  parsePreferences,
  PREFERENCES_STORAGE_KEY,
  savePreferences,
  serializePreferences,
} from './preferences.js'

function createMemoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial))

  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  }
}

const throwingStorage = {
  getItem: () => { throw new Error('blocked') },
  setItem: () => { throw new Error('quota') },
}

describe('preferences', () => {
  it('falls back to defaults when nothing is stored', () => {
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to defaults on corrupted JSON', () => {
    expect(parsePreferences('{not json')).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to defaults when the schema version is missing or different', () => {
    expect(parsePreferences('{"hasSeenOnboarding":true}')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"version":2,"hasSeenOnboarding":true}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('reads only known fields with the expected type', () => {
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":"yes","token":"x"}')).toEqual({
      hasSeenOnboarding: false,
    })
  })

  it('writes the schema version with the preferences', () => {
    expect(JSON.parse(serializePreferences({ hasSeenOnboarding: true }))).toEqual({
      version: 1,
      hasSeenOnboarding: true,
    })
  })

  it('round-trips through storage under the versioned key', () => {
    const storage = createMemoryStorage()

    expect(savePreferences({ hasSeenOnboarding: true }, storage)).toBe(true)
    expect(storage.getItem(PREFERENCES_STORAGE_KEY)).toContain('"version":1')
    expect(loadPreferences(storage)).toEqual({ hasSeenOnboarding: true })
  })

  it('never throws when storage is unavailable or blocked', () => {
    expect(loadPreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(loadPreferences(throwingStorage)).toEqual(DEFAULT_PREFERENCES)
    expect(savePreferences({ hasSeenOnboarding: true }, null)).toBe(false)
    expect(savePreferences({ hasSeenOnboarding: true }, throwingStorage)).toBe(false)
  })

  it('returns a fresh defaults object each time', () => {
    const first = parsePreferences(null)
    first.hasSeenOnboarding = true

    expect(parsePreferences(null)).toEqual({ hasSeenOnboarding: false })
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/state/preferences.test.js`
Expected: FAIL — `Failed to resolve import "./preferences.js"`.

- [ ] **Step 3: Implementar**

`src/state/preferences.js`:

```js
export const PREFERENCES_STORAGE_KEY = 'kepler-lab:preferences'
export const PREFERENCES_SCHEMA_VERSION = 1
export const DEFAULT_PREFERENCES = Object.freeze({ hasSeenOnboarding: false })

const createDefaults = () => ({ ...DEFAULT_PREFERENCES })

export function parsePreferences(raw) {
  if (typeof raw !== 'string') return createDefaults()

  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return createDefaults()
  }

  if (data?.version !== PREFERENCES_SCHEMA_VERSION) return createDefaults()

  return { hasSeenOnboarding: data.hasSeenOnboarding === true }
}

export function serializePreferences(preferences) {
  return JSON.stringify({
    version: PREFERENCES_SCHEMA_VERSION,
    hasSeenOnboarding: preferences.hasSeenOnboarding === true,
  })
}

export function loadPreferences(storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    return parsePreferences(target ? target.getItem(PREFERENCES_STORAGE_KEY) : null)
  } catch {
    return createDefaults()
  }
}

export function savePreferences(preferences, storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    if (!target) return false
    target.setItem(PREFERENCES_STORAGE_KEY, serializePreferences(preferences))
    return true
  } catch {
    return false
  }
}
```

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Commit**

```bash
git add src/state/preferences.js src/state/preferences.test.js
git commit -m "feat(state): add versioned local preferences storage"
```

---

### Task 11: Textos e máquina de passos do onboarding

**Files:**

- Create: `src/content/onboardingSteps.js`
- Create: `src/content/onboardingSteps.test.js`
- Create: `src/state/onboarding.js`
- Create: `src/state/onboarding.test.js`

**Interfaces:**

- Produces:

```text
getOnboardingSteps(platform: 'desktop' | 'touch') → Array<{ id, title, paragraphs: string[] }>  (3 passos)

createOnboardingState(isOpen: boolean) → { status: 'open' | 'closed', stepIndex: 0 }
nextOnboardingStep(state, stepCount) → avança; no último passo → status 'completed'
previousOnboardingStep(state) → recua, sem passar de 0
skipOnboarding(state) → status 'skipped'
reopenOnboarding() → { status: 'open', stepIndex: 0 }
isOnboardingOpen(state) → boolean
```

Os textos de navegação refletem os controles reais: `OrbitControls` com giro, zoom e pan habilitados (`src/scene/SceneCanvas.jsx`) e seleção seguida de confirmação por segundo clique ou toque (Fase 3).

- [ ] **Step 1: Escrever os testes que falham**

`src/content/onboardingSteps.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { getOnboardingSteps } from './onboardingSteps.js'

describe('onboarding steps', () => {
  it('has welcome, navigation and discovery steps', () => {
    expect(getOnboardingSteps('desktop').map(({ id }) => id)).toEqual([
      'welcome', 'navigation', 'discovery',
    ])
  })

  it('opens with the welcome text from the product spec', () => {
    const [welcome] = getOnboardingSteps('desktop')

    expect(welcome.title).toBe('Você está aqui.')
    expect(welcome.paragraphs).toEqual([
      'Em um pequeno mundo azul, na borda de uma galáxia repleta de estrelas, mundos e mistérios.',
      'Aproxime-se. Observe. Viaje.',
    ])
  })

  it('adapts navigation guidance to the platform', () => {
    const desktop = getOnboardingSteps('desktop')[1].paragraphs.join(' ')
    const touch = getOnboardingSteps('touch')[1].paragraphs.join(' ')

    expect(desktop).toMatch(/mouse/)
    expect(touch).toMatch(/pinça/)
    expect(touch).not.toMatch(/mouse/)
  })

  it('treats an unknown platform as desktop', () => {
    expect(getOnboardingSteps('console')).toEqual(getOnboardingSteps('desktop'))
  })
})
```

`src/state/onboarding.test.js`:

```js
import { describe, expect, it } from 'vitest'

import {
  createOnboardingState,
  isOnboardingOpen,
  nextOnboardingStep,
  previousOnboardingStep,
  reopenOnboarding,
  skipOnboarding,
} from './onboarding.js'

describe('onboarding state', () => {
  it('opens on the first step for a first visit and stays closed otherwise', () => {
    expect(createOnboardingState(true)).toEqual({ status: 'open', stepIndex: 0 })
    expect(isOnboardingOpen(createOnboardingState(false))).toBe(false)
  })

  it('advances and completes after the last step', () => {
    const second = nextOnboardingStep(createOnboardingState(true), 3)
    const third = nextOnboardingStep(second, 3)

    expect(second.stepIndex).toBe(1)
    expect(third).toEqual({ status: 'open', stepIndex: 2 })
    expect(nextOnboardingStep(third, 3).status).toBe('completed')
  })

  it('goes back without passing the first step', () => {
    const second = nextOnboardingStep(createOnboardingState(true), 3)

    expect(previousOnboardingStep(second).stepIndex).toBe(0)
    expect(previousOnboardingStep(createOnboardingState(true)).stepIndex).toBe(0)
  })

  it('can be skipped from any step and reopened from the start', () => {
    const skipped = skipOnboarding(nextOnboardingStep(createOnboardingState(true), 3))

    expect(isOnboardingOpen(skipped)).toBe(false)
    expect(reopenOnboarding()).toEqual({ status: 'open', stepIndex: 0 })
  })

  it('never mutates the previous state', () => {
    const initial = createOnboardingState(true)

    skipOnboarding(nextOnboardingStep(initial, 3))

    expect(initial).toEqual({ status: 'open', stepIndex: 0 })
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content/onboardingSteps.test.js src/state/onboarding.test.js`
Expected: FAIL — os dois módulos não existem.

- [ ] **Step 3: Implementar os textos**

`src/content/onboardingSteps.js`:

```js
const NAVIGATION_PARAGRAPHS = Object.freeze({
  desktop: [
    'Arraste com o mouse para girar a vista, use a roda para aproximar e arraste com o botão direito para deslocar.',
    'Clique em um astro para selecioná-lo e clique de novo para viajar até ele.',
  ],
  touch: [
    'Arraste com um dedo para girar a vista, faça pinça para aproximar e arraste com dois dedos para deslocar.',
    'Toque em um astro para selecioná-lo e toque de novo para viajar até ele.',
  ],
})

export function getOnboardingSteps(platform) {
  const navigation = NAVIGATION_PARAGRAPHS[platform] ?? NAVIGATION_PARAGRAPHS.desktop

  return [
    {
      id: 'welcome',
      title: 'Você está aqui.',
      paragraphs: [
        'Em um pequeno mundo azul, na borda de uma galáxia repleta de estrelas, mundos e mistérios.',
        'Aproxime-se. Observe. Viaje.',
      ],
    },
    { id: 'navigation', title: 'Como navegar', paragraphs: [...navigation] },
    {
      id: 'discovery',
      title: 'Descubra destinos',
      paragraphs: [
        'Abra Navegação, no canto superior esquerdo, e busque qualquer destino pelo nome — vale até “buraco negro”.',
        'Os dados do destino selecionado ficam sempre à vista; ao chegar, o painel completo se abre para você conhecer, entender a física e ver as fontes.',
      ],
    },
  ]
}
```

- [ ] **Step 4: Implementar a máquina de passos**

`src/state/onboarding.js`:

```js
export function createOnboardingState(isOpen) {
  return { status: isOpen ? 'open' : 'closed', stepIndex: 0 }
}

export function nextOnboardingStep(state, stepCount) {
  if (state.stepIndex >= stepCount - 1) {
    return { ...state, status: 'completed' }
  }

  return { ...state, stepIndex: state.stepIndex + 1 }
}

export function previousOnboardingStep(state) {
  return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) }
}

export function skipOnboarding(state) {
  return { ...state, status: 'skipped' }
}

export function reopenOnboarding() {
  return { status: 'open', stepIndex: 0 }
}

export function isOnboardingOpen(state) {
  return state.status === 'open'
}
```

- [ ] **Step 5: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 6: Commit**

```bash
git add src/content/onboardingSteps.js src/content/onboardingSteps.test.js src/state/onboarding.js src/state/onboarding.test.js
git commit -m "feat(content): add onboarding steps and step state machine"
```

---

### Task 12: Diálogo de onboarding e botão de Ajuda

**Files:**

- Create: `src/components/Onboarding.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**

- Consumes: `getOnboardingSteps` e a máquina de passos (Tarefa 11); `loadPreferences`, `savePreferences` (Tarefa 10).
- Produces: `<Onboarding steps state onNext onPrevious onSkip />`, que não renderiza nada quando fechado.

- [ ] **Step 1: Criar o componente**

`src/components/Onboarding.jsx`:

```jsx
import { useEffect } from 'react'
import { isOnboardingOpen } from '../state/onboarding.js'

export function Onboarding({ steps, state, onNext, onPrevious, onSkip }) {
  const isOpen = isOnboardingOpen(state)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onSkip()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onSkip])

  if (!isOpen) return null

  const step = steps[state.stepIndex]
  const isLastStep = state.stepIndex === steps.length - 1

  return (
    <div className="onboarding-backdrop">
      <section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <p className="onboarding__progress">{state.stepIndex + 1} de {steps.length}</p>
        <h2 id="onboarding-title">{step.title}</h2>
        {step.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <div className="onboarding__actions">
          <button type="button" className="onboarding__skip" onClick={onSkip}>
            Pular
          </button>
          {state.stepIndex > 0 && (
            <button type="button" onClick={onPrevious}>
              Voltar
            </button>
          )}
          <button key={step.id} type="button" autoFocus onClick={onNext}>
            {isLastStep ? 'Começar a explorar' : 'Próximo'}
          </button>
        </div>
      </section>
    </div>
  )
}
```

A `key={step.id}` remonta o botão principal a cada passo, para que `autoFocus` devolva o foco a ele.

- [ ] **Step 2: Ligar no App**

Em `src/App.jsx`, acrescente os imports:

```jsx
import { Onboarding } from './components/Onboarding.jsx'
import { getOnboardingSteps } from './content/onboardingSteps.js'
import {
  createOnboardingState,
  isOnboardingOpen,
  nextOnboardingStep,
  previousOnboardingStep,
  reopenOnboarding,
  skipOnboarding,
} from './state/onboarding.js'
import { loadPreferences, savePreferences } from './state/preferences.js'
```

Acima de `function App()`:

```jsx
function detectOnboardingPlatform() {
  return window.matchMedia?.('(pointer: coarse)').matches ? 'touch' : 'desktop'
}
```

Dentro de `App`, junto aos outros estados:

```jsx
  const [onboardingSteps] = useState(() => getOnboardingSteps(detectOnboardingPlatform()))
  const [onboarding, setOnboarding] = useState(
    () => createOnboardingState(!loadPreferences().hasSeenOnboarding),
  )

  function updateOnboarding(nextState) {
    setOnboarding(nextState)
    if (!isOnboardingOpen(nextState)) {
      savePreferences({ ...loadPreferences(), hasSeenOnboarding: true })
    }
  }
```

Dentro do fragmento, ao final:

```jsx
      <button type="button" className="help-toggle" onClick={() => setOnboarding(reopenOnboarding())}>
        Ajuda
      </button>
      <Onboarding
        steps={onboardingSteps}
        state={onboarding}
        onNext={() => updateOnboarding(nextOnboardingStep(onboarding, onboardingSteps.length))}
        onPrevious={() => setOnboarding(previousOnboardingStep(onboarding))}
        onSkip={() => updateOnboarding(skipOnboarding(onboarding))}
      />
```

- [ ] **Step 3: Estilos**

Acrescente a `src/index.css`, antes do `@media (max-width: 700px)`:

```css
.help-toggle {
  position: fixed;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.78rem;
}

.onboarding-backdrop {
  position: fixed;
  z-index: 10;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgb(2 4 10 / 55%);
}

.onboarding {
  width: min(28rem, 100%);
  padding: 1.5rem;
  border: 1px solid rgb(113 131 169 / 60%);
  border-radius: 1rem;
  color: #f1f5ff;
  background: rgb(3 9 23 / 78%);
  backdrop-filter: blur(16px);
}

.onboarding h2 {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
}

.onboarding p {
  margin: 0 0 0.6rem;
  font-size: 0.9rem;
}

.onboarding .onboarding__progress {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

.onboarding__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
}

.onboarding__actions button {
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
}

.onboarding__skip {
  margin-right: auto;
  border-color: transparent;
  background: transparent;
}
```

Dentro de `@media (max-width: 700px)`:

```css
  .help-toggle {
    top: 0.75rem;
    right: 0.75rem;
  }
```

- [ ] **Step 4: Rodar a verificação completa**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

- [ ] **Step 5: Inspecionar no navegador**

Run: `npm run dev`. Confirme:

1. Em aba anônima, o onboarding abre com "Você está aqui." e o foco está em "Próximo".
2. "Próximo" percorre os três passos, "Voltar" recua, e "Começar a explorar" fecha.
3. Recarregar a página não reabre o onboarding.
4. "Ajuda" reabre no primeiro passo; Esc fecha.
5. No DevTools, apague `kepler-lab:preferences` e recarregue: abre de novo. Grave `{not json` na chave e recarregue: abre, sem erro no console.
6. Com emulação de toque ativa no DevTools, o passo 2 fala em pinça e toque.

- [ ] **Step 6: Commit**

```bash
git add src/components/Onboarding.jsx src/App.jsx src/index.css
git commit -m "feat(content): add skippable onboarding with help entry and persisted dismissal"
```

---

### Task 13: Revisão de conteúdo, fontes e registro da fase

**Files:**

- Modify: `CLAUDE.md` (seção "Estado atual")
- Modify: `README.md` (lista de planos detalhados)
- Modify: conteúdo em `src/content/destinations/*.js` somente se a revisão encontrar problema

- [ ] **Step 1: Checar todos os links de fonte**

Run:

```bash
node -e "import('./src/content/destinations.js').then(async ({ destinations }) => { for (const d of destinations) for (const s of d.sources) { try { const r = await fetch(s.url, { redirect: 'follow' }); console.log(r.status, d.id, s.url) } catch (e) { console.log('ERR', d.id, s.url, e.message) } } })"
```

Expected: `200` para cada linha. Para qualquer outro status, abra a URL no navegador — alguns sites recusam requisições automatizadas mas abrem normalmente. Link realmente quebrado: troque pela página equivalente atual do mesmo publicador.

- [ ] **Step 2: Revisar os 22 destinos no navegador**

Run: `npm run dev`. Para cada destino, na ordem do catálogo:

- viaje até ele e leia as quatro seções do painel;
- confirme que cada curiosidade e cada coordenada é sustentada por uma fonte listada;
- nos nove com fórmula, revele e confira se os valores batem com os `facts`;
- confira que o readout mostra ascensão reta e declinação só fora do Sistema Solar;
- confira que nenhum texto está cortado no cartão ou no painel.

Registre a decisão sobre a divergência já existente entre Centro Galáctico (26 mil anos-luz) e Sagittarius A* (27 mil anos-luz): alinhar os dois `facts` e as `coordinates` ao valor da fonte mais recente, ou manter com justificativa. Se alinhar, rode `npm test` e faça commit separado `fix(content): align galactic center distances`.

- [ ] **Step 3: Revisar em largura de celular**

No DevTools, em 390 × 844, percorra ao menos Terra, Sol (fórmula), Betelgeuse (coordenadas equatoriais) e Via Láctea (entradas especiais): folha inferior, painel expandido rolável, readout acima da folha, onboarding legível.

- [ ] **Step 4: Atualizar a documentação**

Em `CLAUDE.md`, substitua o parágrafo de "Estado atual" por:

```markdown
[`PLAN.md`](./PLAN.md) foi aprovado em 16/09/2026. Fases 1 (catálogo), 2 (cena e navegação), 3 (viagem e descoberta) e 4 (conteúdo e interface) estão concluídas. A Fase 5 (acabamento e acessibilidade) é a próxima. O desenho da Fase 4 está em `docs/superpowers/specs/2026-09-17-phase-4-content-interface-design.md` e seu ledger em `.superpowers/sdd/2026-09-17-phase-4-content-interface/progress.md`.
```

Em `README.md`, logo depois da linha do plano da Fase 2, acrescente:

```markdown
- [Plano detalhado da Fase 4](./docs/superpowers/plans/2026-09-17-phase-4-content-interface.md)
```

- [ ] **Step 5: Verificação final**

Run: `npm test && npm run build && npm run lint && git diff --check`
Expected: tudo verde, sem espaços sobrando.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs(content): record phase four completion"
```
