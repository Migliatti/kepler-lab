# Fase 5 — Acabamento e acessibilidade: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fechar o MVP com preferências locais versionadas (v2), acessibilidade aplicada em toda a interface e acabamento 3D estilizado e procedural dos 22 corpos do catálogo.

**Architecture:** Toda regra nova entra primeiro como função pura testável sem WebGL — `src/state/preferences.js` para o esquema, `src/scene/appearance.js` para os perfis de aparência, `src/scene/surfaces/*` para a geografia de cada corpo, `src/scene/random.js` para geração determinística. Os `.jsx` continuam adaptadores finos: `PreferencesProvider` liga o esquema ao React, `SettingsPanel` mapeia opções declaradas em `src/content/settingsOptions.js` para controles nativos, e `Halo`/`Starfield`/`CategoryEffects`/`BlackHole` só consomem o perfil. Tamanho de texto e contraste são puramente CSS, via atributos no `<html>`; movimento reduzido e rótulos descem por props explícitas até a cena.

**Tech Stack:** React 19 + Vite, Three.js via @react-three/fiber e @react-three/drei (`Html` já instalado), Vitest, Oxlint, CSS puro em `src/index.css`. Nenhuma dependência nova.

**Spec:** [`docs/superpowers/specs/2026-09-17-phase-5-polish-accessibility-design.md`](../specs/2026-09-17-phase-5-polish-accessibility-design.md)

## Global Constraints

- Node.js 22.12+ ou 24+.
- **Nenhuma dependência nova.** Sem `@react-three/postprocessing`, sem bloom, sem pós-processamento.
- `src/content/` não importa React, Three.js, DOM nem APIs de navegador.
- `src/state/preferences.js` continua puro: não importa React, não toca no DOM e **não consulta `matchMedia`**. Quem consulta o navegador é o provider.
- Testes ao lado do módulo (`foo.js` + `foo.test.js`); TDD: teste vermelho antes da implementação. **Nenhum teste renderiza Three.js.**
- Nomes de código em inglês; todo texto de interface em pt-BR.
- Estado imutável: funções retornam novos objetos.
- Commits convencionais em inglês, `tipo(escopo): descrição`; tipos `feat`, `fix`, `docs`, `chore`. Nunca `--no-verify`.
- Nenhuma textura, modelo ou asset carregado da rede. Todo acabamento é procedural e determinístico.
- Partículas sempre por instância (`points`), nunca meshes soltas. O total do campo de estrelas fica em **uma** constante, dimensionada para celular.
- Movimento reduzido chega até a cena: rotações e deriva param; o corpo continua visível e navegável.
- Antes de concluir cada tarefa: `npm test`, `npm run build` e `npm run lint` passando.

## Desvios do desenho (decididos aqui, deliberadamente)

Três pontos do desenho não sobrevivem ao contato com o código. Estão resolvidos assim, e quem executar não deve "consertar" de volta:

1. **`createDefaultPreferences(systemHints)` perde o argumento.** O desenho escolheu `reducedMotion: null` como padrão justamente para que o sistema só seja consultado na leitura. Com isso nenhum padrão depende de `systemHints`, e o parâmetro ficaria morto. `systemHints` existe apenas em `resolveReducedMotion(preferences, systemHints)`. O comportamento descrito no desenho é idêntico.
2. **Movimento reduzido não remove as partículas, zera a deriva delas.** O desenho diz as duas coisas em lugares diferentes ("remove partículas" na lista de testes, "deriva de partículas param; o corpo continua visível" na regra 2). A regra 2 é a que tem justificativa, e apagar a poeira de uma nebulosa apagaria o corpo. `reducedMotion` faz `spin: 0` e `particles.drift: 0`.
3. **Anel e halo são dados por corpo, não só por categoria.** O desenho pede `getAppearanceProfile(category, …)` mas também exige que o anel de Saturno saia do `if (id === 'saturn')`. Saturno e Urano têm anéis diferentes e são a mesma categoria. Existem as duas funções: `getAppearanceProfile(category, options)` para a categoria e `getBodyAppearance(id, category, options)`, que aplica as exceções por id.

## Mapa de arquivos

| Arquivo | Responsabilidade | Tarefa |
| --- | --- | --- |
| `src/state/preferences.js` | esquema v2, migração da v1, funções puras | 1 |
| `src/scene/cameraTravel.js` | mapa único de durações por modo | 2 |
| `src/state/travel.js` | `travelMode` no estado de viagem | 2 |
| `src/scene/CameraTraveller.jsx` | usa a duração do modo | 2 |
| `src/state/PreferencesProvider.jsx` | carrega, persiste, escreve atributos no `<html>` | 3 |
| `src/App.jsx` | consome `usePreferences`, passa `travel`/`labels`/`reducedMotion` | 3, 6, 11 |
| `src/index.css` | tokens de vidro, `data-text-size`, `data-contrast`, painel | 4, 6, 17 |
| `src/content/settingsOptions.js` | textos e opções dos controles (puro) | 5 |
| `src/components/SettingsPanel.jsx` | diálogo acessível de Configurações | 6 |
| `src/scene/appearance.js` | perfis de aparência por categoria e por corpo | 7 |
| `src/scene/layout.js` | deixa de exportar `getCategoryAppearance` | 7 |
| `src/scene/Halo.jsx` | halo aditivo voltado à câmera | 8 |
| `src/scene/CelestialBodies.jsx` | encolhe: ponteiro, seleção, viagem e delegação | 8, 11, 13, 14, 15, 16 |
| `src/scene/random.js` | gerador determinístico por semente | 9 |
| `src/scene/starfield.js` | posições do campo de estrelas (puro) | 9 |
| `src/scene/Starfield.jsx` | `points` do campo de estrelas | 9 |
| `src/scene/particleField.js` | nuvem e disco de partículas (puro) | 10 |
| `src/scene/CategoryEffects.jsx` | partículas por categoria | 10 |
| `src/utils/labels.js` | `resolveLabelVisibility` | 11 |
| `src/scene/latitudeBands.js` | cor por latitude (puro) | 12 |
| `src/scene/PlanetSurface.jsx` | aceita `bands` e `spin` | 12 |
| `src/scene/surfaces/rocky.js` | superfícies dos corpos rochosos e gelados | 13 |
| `src/scene/surfaces/giants.js` | faixas dos gigantes gasosos | 14 |
| `src/scene/bodySurfaces.js` | `getBodySurface(id)` | 13, 14 |
| `src/scene/BodySurface.jsx` | adaptador que liga `getBodySurface` a `PlanetSurface` | 13 |
| `src/scene/blackHole.js` | cores do disco e constantes (puro) | 16 |
| `src/scene/BlackHole.jsx` | sombra, anel de fótons, disco, arco dobrado | 16 |
| `src/content/notices.js` | `BLACK_HOLE_NOTICE` | 16 |
| `src/utils/sceneReadout.js` | aviso de aparência quando houver | 16 |

---

### Task 1: Esquema de preferências v2

O esquema v1 guarda um campo só. A v2 guarda sete e precisa sobreviver a JSON corrompido, versão desconhecida e valor inválido em um campo sem derrubar os demais.

**Files:**
- Modify: `src/state/preferences.js` (arquivo inteiro)
- Modify: `src/state/preferences.test.js` (arquivo inteiro)
- Modify: `src/App.jsx:36-38,64-67` (chamadas de `loadPreferences`/`savePreferences`)

**Interfaces:**
- Produces: `PREFERENCES_SCHEMA_VERSION = 2`, `DEFAULT_PREFERENCES`, `TRAVEL_MODES`, `TEXT_SIZES`, `CONTRAST_MODES`, `LABEL_MODES`, `createDefaultPreferences()`, `parsePreferences(raw)`, `updatePreference(preferences, key, value)`, `resolveReducedMotion(preferences, systemHints)`, `toReducedMotionChoice(value)`, `fromReducedMotionChoice(choice)`, `serializePreferences(preferences)`, `loadPreferences(storage)`, `savePreferences(preferences, storage)`.
- Consumes: nada.

- [ ] **Step 1: Escrever os testes que falham**

Substitua o conteúdo inteiro de `src/state/preferences.test.js`:

```js
import { describe, expect, it } from 'vitest'

import {
  DEFAULT_PREFERENCES,
  createDefaultPreferences,
  fromReducedMotionChoice,
  loadPreferences,
  parsePreferences,
  PREFERENCES_STORAGE_KEY,
  resolveReducedMotion,
  savePreferences,
  serializePreferences,
  toReducedMotionChoice,
  updatePreference,
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
  it('defaults every field, following the system for reduced motion', () => {
    expect(createDefaultPreferences()).toEqual({
      sound: false,
      travel: 'full',
      reducedMotion: null,
      textSize: 'default',
      contrast: 'default',
      labels: 'hover',
      hasSeenOnboarding: false,
    })
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES)
  })

  it('falls back to every default on corrupted JSON or an unknown version', () => {
    expect(parsePreferences('{not json')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"version":99,"labels":"always"}')).toEqual(DEFAULT_PREFERENCES)
    expect(parsePreferences('{"labels":"always"}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('migrates v1 keeping hasSeenOnboarding and defaulting the rest', () => {
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":true}')).toEqual({
      ...DEFAULT_PREFERENCES,
      hasSeenOnboarding: true,
    })
    expect(parsePreferences('{"version":1,"hasSeenOnboarding":"yes"}')).toEqual(DEFAULT_PREFERENCES)
  })

  it('drops only the invalid field, keeping the valid ones around it', () => {
    const parsed = parsePreferences(JSON.stringify({
      version: 2,
      sound: true,
      travel: 'warp',
      reducedMotion: true,
      textSize: 'large',
      contrast: 'nope',
      labels: 'always',
      hasSeenOnboarding: true,
      token: 'x',
    }))

    expect(parsed).toEqual({
      sound: true,
      travel: 'full',
      reducedMotion: true,
      textSize: 'large',
      contrast: 'default',
      labels: 'always',
      hasSeenOnboarding: true,
    })
    expect(parsed).not.toHaveProperty('token')
  })

  it('keeps the three reduced-motion states apart', () => {
    expect(parsePreferences('{"version":2,"reducedMotion":null}').reducedMotion).toBeNull()
    expect(parsePreferences('{"version":2,"reducedMotion":false}').reducedMotion).toBe(false)
    expect(parsePreferences('{"version":2,"reducedMotion":"reduce"}').reducedMotion).toBeNull()
  })

  it('resolves reduced motion from the system only while nothing was chosen', () => {
    const untouched = createDefaultPreferences()

    expect(resolveReducedMotion(untouched, { prefersReducedMotion: true })).toBe(true)
    expect(resolveReducedMotion(untouched, { prefersReducedMotion: false })).toBe(false)
    expect(resolveReducedMotion(untouched, undefined)).toBe(false)

    const off = updatePreference(untouched, 'reducedMotion', false)
    expect(resolveReducedMotion(off, { prefersReducedMotion: true })).toBe(false)

    const on = updatePreference(untouched, 'reducedMotion', true)
    expect(resolveReducedMotion(on, { prefersReducedMotion: false })).toBe(true)
  })

  it('maps the reduced-motion tri-state to and from the radio choice', () => {
    expect(toReducedMotionChoice(null)).toBe('system')
    expect(toReducedMotionChoice(true)).toBe('on')
    expect(toReducedMotionChoice(false)).toBe('off')
    expect(fromReducedMotionChoice('system')).toBeNull()
    expect(fromReducedMotionChoice('on')).toBe(true)
    expect(fromReducedMotionChoice('off')).toBe(false)
    expect(fromReducedMotionChoice('whatever')).toBeNull()
  })

  it('updates one key without mutating the previous object', () => {
    const before = createDefaultPreferences()
    const after = updatePreference(before, 'labels', 'always')

    expect(after.labels).toBe('always')
    expect(before.labels).toBe('hover')
    expect(after).not.toBe(before)
  })

  it('ignores an unknown key or an invalid value, returning the same object', () => {
    const before = createDefaultPreferences()

    expect(updatePreference(before, 'token', 'x')).toBe(before)
    expect(updatePreference(before, 'travel', 'warp')).toBe(before)
    expect(updatePreference(before, 'sound', 'yes')).toBe(before)
  })

  it('writes the schema version with every field', () => {
    expect(JSON.parse(serializePreferences({ ...DEFAULT_PREFERENCES, labels: 'always' }))).toEqual({
      version: 2,
      sound: false,
      travel: 'full',
      reducedMotion: null,
      textSize: 'default',
      contrast: 'default',
      labels: 'always',
      hasSeenOnboarding: false,
    })
  })

  it('round-trips through storage under the versioned key', () => {
    const storage = createMemoryStorage()
    const preferences = { ...DEFAULT_PREFERENCES, textSize: 'large', reducedMotion: true }

    expect(savePreferences(preferences, storage)).toBe(true)
    expect(storage.getItem(PREFERENCES_STORAGE_KEY)).toContain('"version":2')
    expect(loadPreferences(storage)).toEqual(preferences)
  })

  it('never throws when storage is unavailable or blocked', () => {
    expect(loadPreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(loadPreferences(throwingStorage)).toEqual(DEFAULT_PREFERENCES)
    expect(savePreferences(DEFAULT_PREFERENCES, null)).toBe(false)
    expect(savePreferences(DEFAULT_PREFERENCES, throwingStorage)).toBe(false)
  })

  it('returns a fresh defaults object each time', () => {
    const first = parsePreferences(null)
    first.hasSeenOnboarding = true

    expect(parsePreferences(null).hasSeenOnboarding).toBe(false)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/state/preferences.test.js`
Expected: FAIL — `createDefaultPreferences is not a function`.

- [ ] **Step 3: Escrever o esquema v2**

Substitua o conteúdo inteiro de `src/state/preferences.js`:

```js
// Preferências locais do visitante. Puro de propósito: sem React, sem DOM e
// sem matchMedia — quem consulta o navegador é o PreferencesProvider, que
// passa o resultado como systemHints.

export const PREFERENCES_STORAGE_KEY = 'kepler-lab:preferences'
export const PREFERENCES_SCHEMA_VERSION = 2

export const TRAVEL_MODES = Object.freeze(['full', 'short', 'instant'])
export const TEXT_SIZES = Object.freeze(['default', 'large'])
export const CONTRAST_MODES = Object.freeze(['default', 'high'])
export const LABEL_MODES = Object.freeze(['none', 'hover', 'always'])

const isBoolean = (value) => value === true || value === false
const isOneOf = (allowed) => (value) => allowed.includes(value)

// Uma entrada por campo: o padrão e o que conta como valor válido. Um campo
// inválido cai no próprio padrão sem contaminar os vizinhos.
const FIELDS = Object.freeze({
  sound: { fallback: false, isValid: isBoolean },
  travel: { fallback: 'full', isValid: isOneOf(TRAVEL_MODES) },
  reducedMotion: { fallback: null, isValid: (value) => value === null || isBoolean(value) },
  textSize: { fallback: 'default', isValid: isOneOf(TEXT_SIZES) },
  contrast: { fallback: 'default', isValid: isOneOf(CONTRAST_MODES) },
  labels: { fallback: 'hover', isValid: isOneOf(LABEL_MODES) },
  hasSeenOnboarding: { fallback: false, isValid: isBoolean },
})

const FIELD_KEYS = Object.freeze(Object.keys(FIELDS))

export function createDefaultPreferences() {
  const preferences = {}
  for (const key of FIELD_KEYS) preferences[key] = FIELDS[key].fallback
  return preferences
}

export const DEFAULT_PREFERENCES = Object.freeze(createDefaultPreferences())

function readField(data, key) {
  const { fallback, isValid } = FIELDS[key]
  const value = data?.[key]
  return isValid(value) ? value : fallback
}

export function parsePreferences(raw) {
  if (typeof raw !== 'string') return createDefaultPreferences()

  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return createDefaultPreferences()
  }

  // A v1 guardava apenas hasSeenOnboarding. Descartá-la faria o onboarding
  // reaparecer para quem já o viu.
  if (data?.version === 1) {
    return { ...createDefaultPreferences(), hasSeenOnboarding: readField(data, 'hasSeenOnboarding') }
  }

  if (data?.version !== PREFERENCES_SCHEMA_VERSION) return createDefaultPreferences()

  const preferences = {}
  for (const key of FIELD_KEYS) preferences[key] = readField(data, key)
  return preferences
}

export function updatePreference(preferences, key, value) {
  const field = FIELDS[key]
  if (!field || !field.isValid(value)) return preferences
  if (preferences[key] === value) return preferences

  return { ...preferences, [key]: value }
}

export function resolveReducedMotion(preferences, systemHints) {
  if (isBoolean(preferences?.reducedMotion)) return preferences.reducedMotion
  return systemHints?.prefersReducedMotion === true
}

const REDUCED_MOTION_CHOICES = Object.freeze({ system: null, on: true, off: false })

export function toReducedMotionChoice(value) {
  if (value === true) return 'on'
  if (value === false) return 'off'
  return 'system'
}

export function fromReducedMotionChoice(choice) {
  return Object.hasOwn(REDUCED_MOTION_CHOICES, choice) ? REDUCED_MOTION_CHOICES[choice] : null
}

export function serializePreferences(preferences) {
  const payload = { version: PREFERENCES_SCHEMA_VERSION }
  for (const key of FIELD_KEYS) payload[key] = readField(preferences, key)
  return JSON.stringify(payload)
}

export function loadPreferences(storage) {
  try {
    const target = storage === undefined ? globalThis.localStorage : storage
    return parsePreferences(target ? target.getItem(PREFERENCES_STORAGE_KEY) : null)
  } catch {
    return createDefaultPreferences()
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

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/state/preferences.test.js`
Expected: PASS, 13 testes.

- [ ] **Step 5: Verificar que o App continua íntegro**

`src/App.jsx` já chama `loadPreferences()` e `savePreferences({ ...loadPreferences(), hasSeenOnboarding: true })`. As duas assinaturas não mudaram e o espalhamento agora carrega sete campos em vez de um, o que é exatamente o desejado. Nenhuma edição é necessária nesta tarefa — confirme com:

Run: `grep -n "Preferences" src/App.jsx`
Expected: as mesmas três linhas de antes (`import`, `createOnboardingState`, `updateOnboarding`).

- [ ] **Step 6: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/state/preferences.js src/state/preferences.test.js
git commit -m "feat(state): grow preferences to schema version two"
```

---

### Task 2: Modos de viagem com duração única

O modo de viagem precisa chegar até a câmera. Hoje `startTravel` recebe um booleano e a duração é uma constante fixa. O modo passa a viajar dentro do próprio estado de viagem, para que trocar a preferência no meio de uma viagem não mude a viagem em curso.

**Files:**
- Modify: `src/scene/cameraTravel.js:1` (acrescenta o mapa de durações)
- Modify: `src/scene/cameraTravel.test.js` (acrescenta testes ao final)
- Modify: `src/state/travel.js` (arquivo inteiro)
- Modify: `src/state/travel.test.js` (arquivo inteiro)
- Modify: `src/scene/CameraTraveller.jsx:3,57-60`
- Modify: `src/App.jsx:41-44,57-61`

**Interfaces:**
- Consumes: `TRAVEL_MODES` da Task 1.
- Produces: `TRAVEL_DURATIONS_MS`, `getTravelDurationMs(travelMode)` em `src/scene/cameraTravel.js`; `startTravel(destinationId, travelMode)` e `returnToEarth(travelMode)` devolvendo `{ destinationId, travelMode, status }`.

- [ ] **Step 1: Escrever os testes que falham**

Acrescente ao final do `describe` em `src/scene/cameraTravel.test.js`, com o import no topo:

```js
import { getTravelDurationMs, TRAVEL_DURATIONS_MS } from './cameraTravel.js'
```

```js
  it('keeps one duration per travel mode, with the full trip unchanged', () => {
    expect(TRAVEL_DURATIONS_MS).toEqual({ full: 3000, short: 1200, instant: 0 })
    expect(getTravelDurationMs('short')).toBe(1200)
    expect(getTravelDurationMs('instant')).toBe(0)
  })

  it('falls back to the full duration for an unknown mode', () => {
    expect(getTravelDurationMs('warp')).toBe(3000)
    expect(getTravelDurationMs(undefined)).toBe(3000)
  })
```

Substitua o conteúdo inteiro de `src/state/travel.test.js`:

```js
import { describe, expect, it } from 'vitest'
import { completeTravel, returnToEarth, startTravel } from './travel.js'

describe('travel state', () => {
  it('animates the full trip by default', () => {
    expect(startTravel('mars')).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'travelling',
    })
  })

  it('animates the short trip too', () => {
    expect(startTravel('mars', 'short')).toEqual({
      destinationId: 'mars', travelMode: 'short', status: 'travelling',
    })
  })

  it('arrives immediately in instant mode', () => {
    expect(startTravel('mars', 'instant')).toEqual({
      destinationId: 'mars', travelMode: 'instant', status: 'arrived',
    })
  })

  it('treats an unknown mode as the full trip', () => {
    expect(startTravel('mars', 'warp')).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'travelling',
    })
  })

  it('marks the same destination as arrived when a journey is skipped', () => {
    const travel = { destinationId: 'mars', travelMode: 'full', status: 'travelling' }

    expect(completeTravel(travel)).toEqual({
      destinationId: 'mars', travelMode: 'full', status: 'arrived',
    })
    expect(travel.status).toBe('travelling')
  })

  it('returns to Earth in the chosen mode', () => {
    expect(returnToEarth('short')).toEqual({
      destinationId: 'earth', travelMode: 'short', status: 'travelling',
    })
    expect(returnToEarth('instant')).toEqual({
      destinationId: 'earth', travelMode: 'instant', status: 'arrived',
    })
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/state/travel.test.js src/scene/cameraTravel.test.js`
Expected: FAIL — `getTravelDurationMs is not a function` e `travelMode` ausente.

- [ ] **Step 3: Acrescentar o mapa de durações**

Em `src/scene/cameraTravel.js`, substitua a linha 1 por:

```js
export const CAMERA_TRAVEL_DURATION_MS = 3000

// Um mapa único por modo, para que não haja número mágico de duração espalhado
// pela cena. 'instant' é zero porque a viagem nunca chega a animar.
export const TRAVEL_DURATIONS_MS = Object.freeze({
  full: CAMERA_TRAVEL_DURATION_MS,
  short: 1200,
  instant: 0,
})

export function getTravelDurationMs(travelMode) {
  return Object.hasOwn(TRAVEL_DURATIONS_MS, travelMode)
    ? TRAVEL_DURATIONS_MS[travelMode]
    : TRAVEL_DURATIONS_MS.full
}
```

- [ ] **Step 4: Levar o modo para o estado de viagem**

Substitua o conteúdo inteiro de `src/state/travel.js`:

```js
import { TRAVEL_MODES } from './preferences.js'

const DEFAULT_TRAVEL_MODE = 'full'

function normaliseTravelMode(travelMode) {
  return TRAVEL_MODES.includes(travelMode) ? travelMode : DEFAULT_TRAVEL_MODE
}

export function startTravel(destinationId, travelMode) {
  const mode = normaliseTravelMode(travelMode)

  return {
    destinationId,
    travelMode: mode,
    // 'instant' não anima: chega já em 'arrived', sem sobreposição de viagem.
    status: mode === 'instant' ? 'arrived' : 'travelling',
  }
}

export function completeTravel(travel) {
  return { ...travel, status: 'arrived' }
}

export function returnToEarth(travelMode) {
  return startTravel('earth', travelMode)
}
```

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/state/travel.test.js src/scene/cameraTravel.test.js`
Expected: PASS.

- [ ] **Step 6: Usar a duração do modo na câmera**

Em `src/scene/CameraTraveller.jsx`, troque a linha 3:

```js
import { getCameraTravelFrame, getTravelDurationMs } from './cameraTravel.js'
```

e substitua o cálculo de `progress` (linhas 57-60) por:

```js
    const durationMs = getTravelDurationMs(travel?.travelMode)
    const progress = durationMs <= 0
      ? 1
      : Math.min(1, ((clock.getElapsedTime() - startedAtRef.current) * 1000) / durationMs)
```

- [ ] **Step 7: Passar `'full'` explicitamente no App (por enquanto)**

Em `src/App.jsx`, troque `startTravel(destinationId, true)` por `startTravel(destinationId, 'full')` e `returnToEarth(true)` por `returnToEarth('full')`. A preferência real entra na Task 6, depois que o provider existir.

- [ ] **Step 8: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/cameraTravel.js src/scene/cameraTravel.test.js src/state/travel.js src/state/travel.test.js src/scene/CameraTraveller.jsx src/App.jsx
git commit -m "feat(travel): carry the travel mode through the journey state"
```

---

### Task 3: PreferencesProvider

Adaptador React fino: carrega na montagem, persiste a cada mudança e escreve `data-text-size` e `data-contrast` no `<html>`. É o único lugar do projeto que consulta `matchMedia` para movimento reduzido.

**Files:**
- Create: `src/state/PreferencesProvider.jsx`
- Modify: `src/main.jsx` (envolve o `App`)
- Modify: `src/App.jsx:19,36-38,64-67`

**Interfaces:**
- Consumes: `createDefaultPreferences`, `loadPreferences`, `savePreferences`, `updatePreference`, `resolveReducedMotion` da Task 1.
- Produces: `PreferencesProvider`, `usePreferences()` → `{ preferences, setPreference, reducedMotion }`. `setPreference(key, value)` aceita as mesmas chaves e valores de `updatePreference`. `reducedMotion` é o booleano já resolvido, para que nenhum outro componente precise consultar o sistema.

- [ ] **Step 1: Escrever o provider**

Não há teste unitário aqui: o provider é exatamente a casca impura que os módulos puros da Task 1 existem para manter fina. O que ele decide já está testado; o que ele faz (DOM, `matchMedia`, `localStorage`) é verificado no roteiro manual da Task 17.

Crie `src/state/PreferencesProvider.jsx`:

```jsx
// Casca React das preferências: carrega, persiste e reflete no <html> o que
// src/state/preferences.js decide. Nenhuma regra mora aqui.

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  loadPreferences,
  resolveReducedMotion,
  savePreferences,
  updatePreference,
} from './preferences.js'

const PreferencesContext = createContext(null)

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function readSystemHints() {
  return {
    prefersReducedMotion: globalThis.matchMedia?.(REDUCED_MOTION_QUERY).matches === true,
  }
}

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => loadPreferences())
  const [systemHints, setSystemHints] = useState(readSystemHints)

  // Quem nunca escolheu segue o sistema; se o sistema mudar com a página
  // aberta, a cena acompanha sem recarregar.
  useEffect(() => {
    const query = globalThis.matchMedia?.(REDUCED_MOTION_QUERY)
    if (!query?.addEventListener) return undefined

    function handleChange(event) {
      setSystemHints({ prefersReducedMotion: event.matches === true })
    }

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  // Tamanho de texto e contraste são apresentação: viram atributo no <html> e
  // o CSS responde. Nenhum componente precisa saber que existem.
  useEffect(() => {
    const root = globalThis.document?.documentElement
    if (!root) return
    root.dataset.textSize = preferences.textSize
    root.dataset.contrast = preferences.contrast
  }, [preferences.textSize, preferences.contrast])

  const value = useMemo(() => ({
    preferences,
    setPreference: (key, nextValue) => {
      setPreferences((current) => updatePreference(current, key, nextValue))
    },
    reducedMotion: resolveReducedMotion(preferences, systemHints),
  }), [preferences, systemHints])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences precisa de um PreferencesProvider acima')
  return value
}
```

- [ ] **Step 2: Envolver o App**

Confira primeiro o arquivo: `cat src/main.jsx`. Acrescente o import e envolva `<App />`:

```jsx
import { PreferencesProvider } from './state/PreferencesProvider.jsx'
```

```jsx
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>,
```

- [ ] **Step 3: Consumir no App**

Em `src/App.jsx`, troque o import de preferências:

```js
import { usePreferences } from './state/PreferencesProvider.jsx'
```

(remova `import { loadPreferences, savePreferences } from './state/preferences.js'`).

Dentro de `App()`, logo antes de `const [selectedId, ...]`:

```js
  const { preferences, setPreference, reducedMotion } = usePreferences()
```

Troque a inicialização do onboarding:

```js
  const [onboarding, setOnboarding] = useState(
    () => createOnboardingState(!preferences.hasSeenOnboarding),
  )
```

e `updateOnboarding`:

```js
  function updateOnboarding(nextState) {
    setOnboarding(nextState)
    if (!isOnboardingOpen(nextState)) setPreference('hasSeenOnboarding', true)
  }
```

`reducedMotion` fica declarado e sem uso até a Task 11; se o oxlint reclamar de variável não usada, mantenha a desestruturação apenas de `preferences` e `setPreference` nesta tarefa e acrescente `reducedMotion` na Task 11.

- [ ] **Step 4: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

Run: `npm run dev` — abra, complete o onboarding, recarregue e confirme que ele não volta.

```bash
git add src/state/PreferencesProvider.jsx src/main.jsx src/App.jsx
git commit -m "feat(state): distribute preferences through a React provider"
```

---

### Task 4: Tokens de vidro, tamanho de texto e alto contraste

Os painéis usam `rgb(...)` literal em nove lugares. Alto contraste não pode reescrever nove regras; precisa reescrever tokens. Esta tarefa é a refatoração que torna as duas preferências de apresentação possíveis, e já as entrega.

**Files:**
- Modify: `src/index.css:1-13` (tokens), `72`, `101`, `136`, `247`, `250-251`, `290`, `419`, `444`, `450`, `453-454`

**Interfaces:**
- Produces: tokens `--root-font-size`, `--glass-bg`, `--glass-bg-strong`, `--glass-bg-solid`, `--glass-border`, `--glass-blur`, `--color-accent`; seletores `:root[data-text-size="large"]` e `:root[data-contrast="high"]`.

- [ ] **Step 1: Trocar o bloco `:root`**

Em `src/index.css`, substitua as linhas 1-13 por:

```css
:root {
  --color-bg: #05070f;
  --color-text: #e8ecf8;
  --color-text-muted: #9aa3bd;
  --color-accent: #ffe38a;
  --font-sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --font-mono: ui-monospace, 'Cascadia Mono', Consolas, monospace;
  --sheet-card-height: 7.5rem;

  /* Vidro dos painéis. Alto contraste redefine estes tokens em vez de
     reescrever cada painel. */
  --root-font-size: 18px;
  --glass-bg: rgb(3 9 23 / 72%);
  --glass-bg-strong: rgb(3 9 23 / 88%);
  --glass-bg-solid: rgb(3 9 23 / 95%);
  --glass-bg-hover: rgb(10 22 48 / 80%);
  --glass-backdrop: rgb(2 4 10 / 55%);
  --glass-border: rgb(113 131 169 / 60%);
  --glass-border-soft: rgb(113 131 169 / 50%);
  --glass-blur: blur(14px);

  color-scheme: dark;
  font: var(--root-font-size)/1.5 var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  -webkit-font-smoothing: antialiased;
}

/* Texto maior: só a raiz muda; tudo que usa unidades relativas acompanha. */
:root[data-text-size='large'] {
  --root-font-size: 21px;
}

/* Alto contraste não introduz paleta nova: tira a translucidez, que é o que
   atrapalha a legibilidade sobre a cena, e aproxima o texto secundário do
   primário. */
:root[data-contrast='high'] {
  --color-text-muted: #ccd5ea;
  --glass-bg: rgb(2 5 14 / 97%);
  --glass-bg-strong: rgb(2 5 14 / 99%);
  --glass-bg-solid: rgb(2 5 14 / 100%);
  --glass-bg-hover: rgb(12 26 56 / 100%);
  --glass-backdrop: rgb(1 2 6 / 82%);
  --glass-border: rgb(178 196 228 / 95%);
  --glass-border-soft: rgb(178 196 228 / 80%);
  --glass-blur: none;
}
```

- [ ] **Step 2: Trocar os literais pelos tokens**

Uma substituição por linha, conferindo cada uma com `grep -n`:

| linha atual | valor atual | novo valor |
| --- | --- | --- |
| 72 (`.travel-status`) | `rgb(3 9 23 / 88%)` | `var(--glass-bg-strong)` |
| 101 (`.hover-label`) | `rgb(3 9 23 / 88%)` | `var(--glass-bg-strong)` |
| 136 (`.nav-sidebar`) | `rgb(3 9 23 / 95%)` | `var(--glass-bg-solid)` |
| 247 (`.destination-surface`) | `rgb(113 131 169 / 60%)` | `var(--glass-border)` |
| 250 (`.destination-surface`) | `rgb(3 9 23 / 72%)` | `var(--glass-bg)` |
| 251 (`.destination-surface`) | `blur(14px)` | `var(--glass-blur)` |
| 290 (`.destination-card:hover`) | `rgb(10 22 48 / 80%)` | `var(--glass-bg-hover)` |
| 419 (`.formula__content`) | `rgb(113 131 169 / 50%)` | `var(--glass-border-soft)` |
| 444 (`.onboarding-backdrop`) | `rgb(2 4 10 / 55%)` | `var(--glass-backdrop)` |
| 450 (`.onboarding`) | `rgb(113 131 169 / 60%)` | `var(--glass-border)` |
| 453 (`.onboarding`) | `rgb(3 9 23 / 78%)` | `var(--glass-bg)` |
| 454 (`.onboarding`) | `blur(16px)` | `var(--glass-blur)` |

Depois confirme que sobrou apenas o esperado:

Run: `grep -n "rgb(3 9 23\|rgb(2 4 10\|rgb(10 22 48\|rgb(113 131 169\|blur(1" src/index.css`
Expected: só as linhas dentro dos blocos `:root` e `:root[data-contrast='high']`.

- [ ] **Step 3: Conferir no navegador**

Run: `npm run dev`. No console do DevTools:

```js
document.documentElement.dataset.textSize = 'large'
document.documentElement.dataset.contrast = 'high'
```

Expected: todo o texto cresce proporcionalmente; os painéis ficam opacos, com bordas claras, e o texto secundário fica legível sobre a cena. Depois:

```js
document.documentElement.dataset.textSize = 'default'
document.documentElement.dataset.contrast = 'default'
```

Expected: volta exatamente ao visual de antes desta tarefa.

- [ ] **Step 4: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/index.css
git commit -m "feat(ui): drive panel glass, text size and contrast from tokens"
```

---

### Task 5: Opções e textos do painel de Configurações

Os controles são dados, não markup. Declará-los em `src/content/` mantém o componente burro e deixa a cópia em pt-BR testável.

**Files:**
- Create: `src/content/settingsOptions.js`
- Create: `src/content/settingsOptions.test.js`

**Interfaces:**
- Consumes: `TRAVEL_MODES`, `TEXT_SIZES`, `CONTRAST_MODES`, `LABEL_MODES` da Task 1.
- Produces: `SETTINGS_TITLE`, `SETTINGS_GROUPS` — array de `{ key, legend, control: 'radio' | 'checkbox', options?: [{ value, label, hint? }], label?, note?, reserved? }`. Para `reducedMotion`, os `value` são as escolhas `'system' | 'on' | 'off'`, convertidas por `fromReducedMotionChoice`.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/content/settingsOptions.test.js`:

```js
import { describe, expect, it } from 'vitest'

import {
  CONTRAST_MODES,
  LABEL_MODES,
  TEXT_SIZES,
  TRAVEL_MODES,
} from '../state/preferences.js'
import { SETTINGS_GROUPS, SETTINGS_TITLE } from './settingsOptions.js'

const byKey = (key) => SETTINGS_GROUPS.find((group) => group.key === key)

describe('settings options', () => {
  it('covers every preference the visitor can change', () => {
    expect(SETTINGS_GROUPS.map(({ key }) => key)).toEqual([
      'sound', 'travel', 'reducedMotion', 'textSize', 'contrast', 'labels',
    ])
    expect(SETTINGS_TITLE).toMatch(/configura/i)
  })

  it('offers exactly the values the schema accepts', () => {
    expect(byKey('travel').options.map(({ value }) => value)).toEqual([...TRAVEL_MODES])
    expect(byKey('textSize').options.map(({ value }) => value)).toEqual([...TEXT_SIZES])
    expect(byKey('contrast').options.map(({ value }) => value)).toEqual([...CONTRAST_MODES])
    expect(byKey('labels').options.map(({ value }) => value)).toEqual([...LABEL_MODES])
    expect(byKey('reducedMotion').options.map(({ value }) => value)).toEqual(['system', 'on', 'off'])
  })

  it('marks sound as reserved and says so in Portuguese', () => {
    expect(byKey('sound')).toMatchObject({ control: 'checkbox', reserved: true })
    expect(byKey('sound').note).toMatch(/próxima etapa/i)
  })

  it('labels every control and option in Portuguese', () => {
    for (const group of SETTINGS_GROUPS) {
      expect(group.legend).toMatch(/\S/)
      for (const option of group.options ?? []) {
        expect(option.label).toMatch(/\S/)
        expect(option.label).not.toMatch(/^[a-z-]+$/)
      }
    }
  })

  it('never imports the interface', async () => {
    const source = await import('node:fs/promises')
      .then(({ readFile }) => readFile(new URL('./settingsOptions.js', import.meta.url), 'utf8'))

    expect(source).not.toMatch(/from 'react'/)
    expect(source).not.toMatch(/three/)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/content/settingsOptions.test.js`
Expected: FAIL — `Failed to resolve import "./settingsOptions.js"`.

- [ ] **Step 3: Escrever as opções**

Crie `src/content/settingsOptions.js`:

```js
// Declaração dos controles de Configurações. Dado puro: o painel só mapeia
// isto para <fieldset>, <legend> e controles nativos.

export const SETTINGS_TITLE = 'Configurações'

export const SETTINGS_GROUPS = Object.freeze([
  Object.freeze({
    key: 'sound',
    legend: 'Som',
    control: 'checkbox',
    label: 'Som ambiente',
    note: 'O som ambiente chega em uma próxima etapa. A escolha já fica guardada.',
    reserved: true,
  }),
  Object.freeze({
    key: 'travel',
    legend: 'Viagem',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'full', label: 'Completa', hint: 'A câmera percorre todo o trajeto.' }),
      Object.freeze({ value: 'short', label: 'Curta', hint: 'O mesmo trajeto, em menos tempo.' }),
      Object.freeze({ value: 'instant', label: 'Imediata', hint: 'Chega ao destino sem animação.' }),
    ]),
  }),
  Object.freeze({
    key: 'reducedMotion',
    legend: 'Movimento',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'system', label: 'Seguir o sistema' }),
      Object.freeze({ value: 'on', label: 'Movimento reduzido' }),
      Object.freeze({ value: 'off', label: 'Movimento completo' }),
    ]),
  }),
  Object.freeze({
    key: 'textSize',
    legend: 'Texto',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'default', label: 'Padrão' }),
      Object.freeze({ value: 'large', label: 'Maior' }),
    ]),
  }),
  Object.freeze({
    key: 'contrast',
    legend: 'Contraste',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'default', label: 'Padrão' }),
      Object.freeze({ value: 'high', label: 'Alto contraste' }),
    ]),
  }),
  Object.freeze({
    key: 'labels',
    legend: 'Rótulos',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'none', label: 'Ocultos' }),
      Object.freeze({ value: 'hover', label: 'Ao apontar' }),
      Object.freeze({ value: 'always', label: 'Sempre visíveis' }),
    ]),
  }),
])
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/content/settingsOptions.test.js`
Expected: PASS, 5 testes.

- [ ] **Step 5: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/content/settingsOptions.js src/content/settingsOptions.test.js
git commit -m "feat(content): declare the settings controls as data"
```

---

### Task 6: Painel de Configurações acessível

Diálogo aberto por um botão ao lado de "Ajuda": foco preso, Esc, clique fora, foco devolvido. Cada controle é rádio ou checkbox nativo — o elemento nativo já traz teclado e leitor de tela.

**Files:**
- Create: `src/components/SettingsPanel.jsx`
- Modify: `src/App.jsx` (estado de abertura, botão, painel, uso de `preferences.travel`)
- Modify: `src/index.css` (final do arquivo e bloco `@media (max-width: 700px)`)

**Interfaces:**
- Consumes: `SETTINGS_GROUPS`, `SETTINGS_TITLE` da Task 5; `usePreferences` da Task 3; `toReducedMotionChoice`, `fromReducedMotionChoice` da Task 1.
- Produces: `SettingsPanel({ isOpen, onClose })`.

- [ ] **Step 1: Escrever o painel**

Crie `src/components/SettingsPanel.jsx`:

```jsx
import { useEffect, useRef } from 'react'

import { SETTINGS_GROUPS, SETTINGS_TITLE } from '../content/settingsOptions.js'
import { usePreferences } from '../state/PreferencesProvider.jsx'
import { fromReducedMotionChoice, toReducedMotionChoice } from '../state/preferences.js'

const FOCUSABLE = 'button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])'

// O valor que o grupo mostra. reducedMotion é o único que não guarda a própria
// escolha: guarda null/true/false e mostra 'system'/'on'/'off'.
function currentValue(preferences, key) {
  return key === 'reducedMotion' ? toReducedMotionChoice(preferences.reducedMotion) : preferences[key]
}

function nextValue(key, value) {
  return key === 'reducedMotion' ? fromReducedMotionChoice(value) : value
}

export function SettingsPanel({ isOpen, onClose }) {
  const { preferences, setPreference } = usePreferences()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const opener = document.activeElement
    panelRef.current?.querySelector(FOCUSABLE)?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Foco preso: a lista é recalculada a cada Tab porque o painel não muda
      // de tamanho, mas os controles podem ficar desabilitados.
      const focusable = [...(panelRef.current?.querySelectorAll(FOCUSABLE) ?? [])]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Devolver o foco a quem abriu, se ainda estiver na página.
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="settings-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        ref={panelRef}
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <header className="settings-panel__header">
          <h2 id="settings-title">{SETTINGS_TITLE}</h2>
          <button type="button" className="settings-panel__close" onClick={onClose}>
            Fechar
          </button>
        </header>

        {SETTINGS_GROUPS.map((group) => (
          <fieldset key={group.key} className="settings-group">
            <legend>{group.legend}</legend>

            {group.control === 'checkbox' ? (
              <label className="settings-option">
                <input
                  type="checkbox"
                  checked={preferences[group.key] === true}
                  onChange={(event) => setPreference(group.key, event.target.checked)}
                />
                <span>{group.label}</span>
              </label>
            ) : (
              group.options.map((option) => (
                <label key={option.value} className="settings-option">
                  <input
                    type="radio"
                    name={`settings-${group.key}`}
                    value={option.value}
                    checked={currentValue(preferences, group.key) === option.value}
                    onChange={() => setPreference(group.key, nextValue(group.key, option.value))}
                  />
                  <span>
                    {option.label}
                    {option.hint && <small>{option.hint}</small>}
                  </span>
                </label>
              ))
            )}

            {group.note && <p className="settings-group__note">{group.note}</p>}
          </fieldset>
        ))}
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Abrir o painel a partir do App**

Em `src/App.jsx`, acrescente o import:

```js
import { SettingsPanel } from './components/SettingsPanel.jsx'
```

o estado, junto dos demais `useState`:

```js
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
```

e, logo antes do botão de Ajuda, o botão e o painel:

```jsx
      <button
        type="button"
        className="settings-toggle"
        onClick={() => setIsSettingsOpen(true)}
      >
        Configurações
      </button>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
```

- [ ] **Step 3: Ligar a preferência de viagem**

Ainda em `src/App.jsx`, troque as duas chamadas fixas da Task 2:

```js
    setTravel(startTravel(destinationId, preferences.travel))
```

```js
    setTravel(returnToEarth(preferences.travel))
```

- [ ] **Step 4: Estilar o painel**

Acrescente ao final de `src/index.css`, antes do bloco `@media (max-width: 700px)`:

```css
.settings-toggle {
  position: fixed;
  z-index: 3;
  top: 1rem;
  right: 6.2rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.78rem;
}

.settings-backdrop {
  position: fixed;
  z-index: 10;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: var(--glass-backdrop);
}

.settings-panel {
  width: min(30rem, 100%);
  max-height: min(42rem, 90dvh);
  overflow-y: auto;
  padding: 1.2rem;
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
}

.settings-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.settings-panel__header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.settings-panel__close {
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
}

.settings-group {
  margin: 1rem 0 0;
  padding: 0.7rem 0.9rem 0.9rem;
  border: 1px solid var(--glass-border-soft);
  border-radius: 0.7rem;
}

.settings-group legend {
  padding: 0 0.4rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.settings-option {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  min-height: 44px;
  padding: 0.25rem 0;
  font-size: 0.92rem;
  cursor: pointer;
}

.settings-option input {
  margin-top: 0.35rem;
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--color-accent);
  flex: none;
}

.settings-option small {
  display: block;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.settings-group__note {
  margin: 0.4rem 0 0;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}
```

E dentro do `@media (max-width: 700px)`, junto do bloco de `.help-toggle`:

```css
  .settings-toggle {
    top: 0.75rem;
    right: 5.4rem;
    padding: 0.35rem 0.55rem;
  }

  /* Em celular o painel não cobre a cena inteira. */
  .settings-panel {
    width: 100%;
    max-height: 80dvh;
  }

  .settings-backdrop {
    align-items: end;
    padding: 0.5rem;
  }
```

- [ ] **Step 5: Percorrer o painel pelo teclado**

Run: `npm run dev`.

1. Tab até "Configurações" e Enter: o painel abre e o foco vai para "Fechar".
2. Tab percorre todos os controles e volta ao primeiro (foco preso).
3. Setas mudam a opção dentro de cada grupo de rádio.
4. Alterar "Texto" para "Maior" e "Contraste" para "Alto contraste" muda a tela na hora, inclusive o próprio painel.
5. Esc fecha e o foco volta ao botão "Configurações".
6. Reabrir, clicar fora do painel: fecha.
7. Recarregar: todas as escolhas voltaram.
8. Escolher "Viagem: Imediata" e viajar: chega sem animação e sem a sobreposição de viagem. Depois "Curta": o mesmo trajeto, mais rápido.

- [ ] **Step 6: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/components/SettingsPanel.jsx src/App.jsx src/index.css
git commit -m "feat(ui): add an accessible settings panel"
```

---

### Task 7: Perfis de aparência

`CATEGORY_APPEARANCE` sai de `src/scene/layout.js` e vira um módulo próprio, com halo, giro, partículas e anel. É puro e testado sem WebGL — é aqui que "movimento reduzido" e "o anel de Saturno é dado" ficam verificáveis sem renderizar nada.

**Files:**
- Create: `src/scene/appearance.js`
- Create: `src/scene/appearance.test.js`
- Modify: `src/scene/layout.js:27-37,60-62` (remove `CATEGORY_APPEARANCE` e `getCategoryAppearance`)
- Modify: `src/scene/layout.test.js:5,30-33`
- Modify: `src/scene/CelestialBodies.jsx:2,35,71`

**Interfaces:**
- Consumes: `DESTINATION_CATEGORIES` de `src/content/categories.js`.
- Produces: `getAppearanceProfile(category, { reducedMotion } = {})` e `getBodyAppearance(id, category, { reducedMotion } = {})`, ambos devolvendo `{ color, emissive, transparent, opacity, spin, halo, particles, ring }`, com `halo`/`particles`/`ring` em `null` quando o corpo não os tem. `halo` é `{ scale, opacity, color }`; `particles` é `{ count, spread, color, drift, shape }`; `ring` é `{ inner, outer, color, opacity, tilt, gap }`, com `inner`/`outer`/`gap` em múltiplos do raio e `tilt` em radianos.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/scene/appearance.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { DESTINATION_CATEGORIES } from '../content/categories.js'
import { destinations } from '../content/destinations.js'
import { getAppearanceProfile, getBodyAppearance } from './appearance.js'

describe('appearance profiles', () => {
  it('gives every category in the catalogue a visible profile', () => {
    for (const category of DESTINATION_CATEGORIES) {
      const profile = getAppearanceProfile(category)

      expect(profile.color).toMatch(/^#[0-9a-f]{6}$/i)
      expect(profile.emissive).toMatch(/^#[0-9a-f]{6}$/i)
      expect(profile.opacity).toBeGreaterThan(0)
      expect(profile.opacity).toBeLessThanOrEqual(1)
    }
  })

  it('covers every destination in the catalogue', () => {
    for (const { id, category } of destinations) {
      expect(() => getBodyAppearance(id, category)).not.toThrow()
    }
  })

  it('refuses an unknown category instead of rendering nothing', () => {
    expect(() => getAppearanceProfile('wormhole')).toThrow(/wormhole/)
  })

  it('gives stars, nebulae and the black hole a halo, and planets none', () => {
    expect(getAppearanceProfile('star').halo).toMatchObject({ scale: expect.any(Number) })
    expect(getAppearanceProfile('nebula').halo).not.toBeNull()
    expect(getAppearanceProfile('black-hole').halo).not.toBeNull()
    expect(getAppearanceProfile('planet').halo).toBeNull()
  })

  it('stops rotation and drift under reduced motion, keeping the body visible', () => {
    const nebula = getAppearanceProfile('nebula', { reducedMotion: true })

    expect(nebula.spin).toBe(0)
    expect(nebula.particles.drift).toBe(0)
    expect(nebula.particles.count).toBeGreaterThan(0)
    expect(nebula.opacity).toBe(getAppearanceProfile('nebula').opacity)
    expect(getAppearanceProfile('planet', { reducedMotion: true }).spin).toBe(0)
  })

  it('keeps some motion when reduced motion is off', () => {
    expect(getAppearanceProfile('planet').spin).toBeGreaterThan(0)
    expect(getAppearanceProfile('nebula').particles.drift).toBeGreaterThan(0)
  })

  it('reads Saturn and Uranus rings from the profile, not from the component', () => {
    const saturn = getBodyAppearance('saturn', 'planet')
    const uranus = getBodyAppearance('uranus', 'planet')

    expect(saturn.ring).toMatchObject({ inner: expect.any(Number), outer: expect.any(Number) })
    expect(saturn.ring.outer).toBeGreaterThan(saturn.ring.inner)
    expect(saturn.ring.gap).toHaveLength(2)
    expect(uranus.ring.tilt).toBeGreaterThan(1)
    expect(getBodyAppearance('jupiter', 'planet').ring).toBeNull()
  })

  it('lets a body override its category halo without losing the rest', () => {
    const sun = getBodyAppearance('sun', 'star-system')

    expect(sun.halo.scale).toBeGreaterThan(getAppearanceProfile('star-system').halo.scale)
    expect(sun.color).toBe(getAppearanceProfile('star-system').color)
  })

  it('still silences an overridden body under reduced motion', () => {
    expect(getBodyAppearance('milky-way', 'galactic-region', { reducedMotion: true })).toMatchObject({
      spin: 0,
      particles: { drift: 0 },
    })
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/appearance.test.js`
Expected: FAIL — `Failed to resolve import "./appearance.js"`.

- [ ] **Step 3: Escrever os perfis**

Crie `src/scene/appearance.js`:

```js
// Aparência de cada corpo: cor, giro, halo, partículas e anel. Puro e sem
// Three.js, para que as regras da fase — movimento reduzido, anel como dado —
// sejam verificáveis sem renderizar.
//
// Distâncias de halo, anel e partículas são múltiplos do raio ilustrativo do
// corpo; quem converte para unidades de cena é o adaptador R3F.

const NEUTRAL = Object.freeze({ spin: 0, halo: null, particles: null, ring: null })

const CATEGORY_PROFILES = Object.freeze({
  planet: {
    color: '#3d9ee8', emissive: '#082744', transparent: false, opacity: 1, spin: 0.06,
  },
  moon: {
    color: '#a9c6e8', emissive: '#162331', transparent: false, opacity: 1, spin: 0.04,
  },
  'dwarf-planet': {
    color: '#8ca6d1', emissive: '#171f36', transparent: false, opacity: 1, spin: 0.04,
  },
  'star-system': {
    color: '#ffd66b', emissive: '#7a4a08', transparent: false, opacity: 1, spin: 0.02,
    halo: { scale: 2.2, opacity: 0.3, color: '#ffe9a8' },
  },
  star: {
    color: '#ffe38a', emissive: '#9d5d08', transparent: false, opacity: 1, spin: 0.02,
    halo: { scale: 2.4, opacity: 0.34, color: '#fff3c4' },
  },
  nebula: {
    color: '#b37aff', emissive: '#3a1769', transparent: true, opacity: 0.72, spin: 0.012,
    halo: { scale: 1.9, opacity: 0.22, color: '#c9a2ff' },
    particles: { count: 180, spread: 2.6, color: '#d8bcff', drift: 0.06, shape: 'cloud' },
  },
  'galactic-region': {
    color: '#6181cf', emissive: '#141c57', transparent: true, opacity: 0.68, spin: 0.008,
    halo: { scale: 1.7, opacity: 0.18, color: '#9db4ff' },
    particles: { count: 220, spread: 3.2, color: '#b9c9ff', drift: 0.04, shape: 'disc' },
  },
  'black-hole': {
    color: '#ffb04a', emissive: '#6f2800', transparent: false, opacity: 1, spin: 0.3,
    halo: { scale: 1.5, opacity: 0.26, color: '#ffc27a' },
    particles: { count: 260, spread: 2.4, color: '#ffd7a0', drift: 0.12, shape: 'disc' },
  },
})

// Exceções por corpo. Existem porque Saturno e Urano são a mesma categoria com
// anéis diferentes, e porque o Sol precisa de um halo maior que o das demais
// estrelas para ler como o corpo central da cena.
const OVERRIDES_BY_ID = Object.freeze({
  sun: { halo: { scale: 3.2, opacity: 0.42, color: '#ffd166' } },
  sirius: { halo: { scale: 2.6, opacity: 0.4, color: '#dbe9ff' } },
  betelgeuse: { halo: { scale: 3.0, opacity: 0.32, color: '#ff8a5c' } },
  'alpha-centauri': { halo: { scale: 2.3, opacity: 0.32, color: '#ffe9c4' } },
  saturn: {
    ring: { inner: 1.35, outer: 2.0, color: '#d8bb75', opacity: 0.72, tilt: 0.12, gap: [1.66, 1.74] },
  },
  uranus: {
    // Quase vertical: é a inclinação que faz de Urano o planeta "deitado".
    ring: { inner: 1.5, outer: 1.66, color: '#9fd9dd', opacity: 0.5, tilt: 1.45, gap: null },
  },
  'milky-way': {
    particles: { count: 420, spread: 4.6, color: '#c3d2ff', drift: 0.03, shape: 'disc' },
  },
  'orion-nebula': {
    particles: { count: 220, spread: 2.8, color: '#ffd0e4', drift: 0.05, shape: 'cloud' },
  },
})

function withoutMotion(profile) {
  return {
    ...profile,
    spin: 0,
    // O corpo continua visível: só a deriva para. Apagar a poeira de uma
    // nebulosa apagaria a nebulosa.
    particles: profile.particles ? { ...profile.particles, drift: 0 } : null,
  }
}

function build(base, { reducedMotion = false } = {}) {
  const profile = { ...NEUTRAL, ...base }
  return reducedMotion ? withoutMotion(profile) : profile
}

export function getAppearanceProfile(category, options = {}) {
  const base = CATEGORY_PROFILES[category]
  if (!base) throw new Error(`Missing appearance profile for category "${category}"`)

  return build(base, options)
}

export function getBodyAppearance(id, category, options = {}) {
  const base = CATEGORY_PROFILES[category]
  if (!base) throw new Error(`Missing appearance profile for category "${category}"`)

  return build({ ...base, ...OVERRIDES_BY_ID[id] }, options)
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/appearance.test.js`
Expected: PASS, 9 testes.

- [ ] **Step 5: Esvaziar o layout**

Em `src/scene/layout.js`, apague o bloco `const CATEGORY_APPEARANCE = Object.freeze({ ... })` (linhas 27-37) e a função `getCategoryAppearance` (linhas 60-62). O arquivo passa a cuidar só de posição e raio.

Em `src/scene/layout.test.js`, remova `getCategoryAppearance` do import e apague o teste `'provides a visible appearance for every rendered category'` — a cobertura equivalente agora vive em `appearance.test.js`.

Em `src/scene/CelestialBodies.jsx`, troque a linha 2 por:

```js
import { getBodyAppearance } from './appearance.js'
```

a linha 35 por:

```js
    const appearance = getBodyAppearance(id, category)
```

e o `<meshStandardMaterial {...appearance} …>` da linha 71 por props explícitas — o perfil agora carrega `spin`, `halo`, `particles` e `ring`, que não são propriedades de material:

```jsx
            <meshStandardMaterial
              color={appearance.color}
              emissive={appearance.emissive}
              transparent={appearance.transparent}
              opacity={appearance.opacity}
              emissiveIntensity={isSelected || isHovered ? 1.7 : 1}
            />
```

- [ ] **Step 6: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde. Run `npm run dev` e confirme que a cena está visualmente igual à de antes.

```bash
git add src/scene/appearance.js src/scene/appearance.test.js src/scene/layout.js src/scene/layout.test.js src/scene/CelestialBodies.jsx
git commit -m "feat(scene): move body appearance into its own pure profile"
```

---

### Task 8: Halo e anel como dado

O halo é o que dá presença a estrelas, nebulosas e ao buraco negro sem bloom. O anel deixa de ser um `if` por id dentro do componente.

**Files:**
- Create: `src/scene/Halo.jsx`
- Create: `src/scene/BodyRing.jsx`
- Modify: `src/scene/CelestialBodies.jsx` (arquivo inteiro)

**Interfaces:**
- Consumes: `getBodyAppearance` da Task 7.
- Produces: `Halo({ radius, halo })` e `BodyRing({ radius, ring })`. Os dois são decoração: `raycast` desligado.

- [ ] **Step 1: Escrever o halo**

Crie `src/scene/Halo.jsx`:

```jsx
// Halo aditivo sempre voltado à câmera. É o que dá presença luminosa a
// estrelas, nebulosas e ao buraco negro sem depender de bloom ou de qualquer
// passe de pós-processamento — que esta fase excluiu de propósito.
//
// Dois sprites concêntricos: o interno concentra o brilho junto do corpo, o
// externo espalha a queda. O material aditivo faz a soma parecer luz.

import * as THREE from 'three'

const NO_RAYCAST = () => null

export function Halo({ radius, halo }) {
  if (!halo) return null

  const inner = radius * halo.scale
  const outer = inner * 1.8

  return (
    <>
      <sprite scale={[inner, inner, 1]} raycast={NO_RAYCAST}>
        <spriteMaterial
          color={halo.color}
          transparent
          opacity={halo.opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite scale={[outer, outer, 1]} raycast={NO_RAYCAST}>
        <spriteMaterial
          color={halo.color}
          transparent
          opacity={halo.opacity * 0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  )
}
```

- [ ] **Step 2: Escrever o anel**

Crie `src/scene/BodyRing.jsx`:

```jsx
// Anel a partir do perfil de aparência. `inner`, `outer` e `gap` são múltiplos
// do raio do corpo; `gap` desenha duas faixas em vez de uma — é a divisão de
// Cassini em Saturno.

import * as THREE from 'three'

const NO_RAYCAST = () => null

function ringSpans(ring) {
  if (!ring.gap) return [[ring.inner, ring.outer]]
  return [[ring.inner, ring.gap[0]], [ring.gap[1], ring.outer]]
}

export function BodyRing({ radius, ring }) {
  if (!ring) return null

  return (
    <group rotation={[Math.PI / 2 + (ring.tilt ?? 0), 0, 0]}>
      {ringSpans(ring).map(([inner, outer]) => (
        <mesh key={`${inner}-${outer}`} raycast={NO_RAYCAST}>
          <ringGeometry args={[radius * inner, radius * outer, 64]} />
          <meshStandardMaterial
            color={ring.color}
            side={THREE.DoubleSide}
            transparent
            opacity={ring.opacity ?? 0.7}
          />
        </mesh>
      ))}
    </group>
  )
}
```

- [ ] **Step 3: Encolher `CelestialBodies`**

Substitua o conteúdo inteiro de `src/scene/CelestialBodies.jsx`:

```jsx
// Este componente cuida de ponteiro, seleção e viagem. Aparência é delegada:
// o perfil vem de appearance.js e cada decoração tem seu próprio adaptador.

import { getBodyAppearance } from './appearance.js'
import { BodyRing } from './BodyRing.jsx'
import { buildEarthPatches, EARTH_APPEARANCE } from './earthSurface.js'
import { Halo } from './Halo.jsx'
import { PlanetSurface } from './PlanetSurface.jsx'

// Construída uma vez: a geometria é determinística, então toda Terra em todo
// render compartilha os mesmos contornos.
const EARTH_PATCHES = buildEarthPatches()

const BODIES_WITH_SURFACE = new Set(['earth'])

function EarthSurface({ radius, highlighted }) {
  return (
    <PlanetSurface
      radius={radius}
      patches={EARTH_PATCHES}
      gradient="poles"
      oceanLow={EARTH_APPEARANCE.oceanDeep}
      oceanHigh={EARTH_APPEARANCE.oceanPolar}
      atmosphereColor={EARTH_APPEARANCE.atmosphere}
      atmosphereOpacity={highlighted ? 0.26 : 0.14}
    />
  )
}

export function CelestialBodies({
  destinations,
  selectedId,
  currentLocationId,
  hoveredId,
  onHoverChange,
  onSelectDestination,
  onConfirmTravel,
}) {
  return destinations.map(({ id, category, position, radius }) => {
    const appearance = getBodyAppearance(id, category)
    const isSelected = id === selectedId
    const isHovered = id === hoveredId
    const isCurrentLocation = id === currentLocationId
    const hasSurface = BODIES_WITH_SURFACE.has(id)

    function handlePointerOver(event) {
      event.stopPropagation()
      document.body.style.cursor = isCurrentLocation ? 'default' : 'pointer'
      onHoverChange(id)
    }

    function handlePointerOut(event) {
      event.stopPropagation()
      document.body.style.cursor = 'auto'
      onHoverChange((current) => (current === id ? null : current))
    }

    function handleClick(event) {
      event.stopPropagation()
      if (isCurrentLocation) return
      if (isSelected) {
        onConfirmTravel(id)
        return
      }
      onSelectDestination(id)
    }

    return (
      <group key={id} position={position} scale={isSelected ? 1.25 : 1}>
        {hasSurface && <EarthSurface radius={radius} highlighted={isSelected || isHovered} />}

        <Halo radius={radius} halo={appearance.halo} />
        <BodyRing radius={radius} ring={appearance.ring} />

        {/* Um corpo com superfície própria guarda uma esfera invisível para os
            eventos de ponteiro, para que a decoração nunca responda ao
            raycaster. */}
        <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
          <sphereGeometry args={[hasSurface ? radius * 1.05 : radius, 20, 14]} />
          {hasSurface ? (
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          ) : (
            <meshStandardMaterial
              color={appearance.color}
              emissive={appearance.emissive}
              transparent={appearance.transparent}
              opacity={appearance.opacity}
              emissiveIntensity={isSelected || isHovered ? 1.7 : 1}
            />
          )}
        </mesh>
      </group>
    )
  })
}
```

- [ ] **Step 4: Conferir na tela**

Run: `npm run dev`
Expected: Sol, Alpha Centauri, Sirius, Betelgeuse, as duas nebulosas, o centro galáctico, a Via Láctea e Sgr A* ganham halo. Saturno mantém o anel, agora com a divisão de Cassini visível; Urano ganha um anel fino quase vertical. Nenhum halo bloqueia o clique no corpo.

- [ ] **Step 5: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/Halo.jsx src/scene/BodyRing.jsx src/scene/CelestialBodies.jsx
git commit -m "feat(scene): render halos and rings from the appearance profile"
```

---

### Task 9: Campo de estrelas determinístico

O fundo precisa ser o mesmo entre recargas e entre execuções de teste, então nasce de uma semente fixa. O total de pontos fica em uma constante única, dimensionada para celular.

**Files:**
- Create: `src/scene/random.js`
- Create: `src/scene/random.test.js`
- Create: `src/scene/starfield.js`
- Create: `src/scene/starfield.test.js`
- Create: `src/scene/Starfield.jsx`
- Modify: `src/scene/SceneCanvas.jsx:1-6,10-11`

**Interfaces:**
- Produces: `createRandom(seed)` → função sem argumentos devolvendo `[0, 1)`; `STARFIELD_SEED`, `STARFIELD_COUNT`, `STARFIELD_RADIUS`, `buildStarfield({ count, radius, seed })` → `{ count, positions: Float32Array, sizes: Float32Array }`; `Starfield()`.

- [ ] **Step 1: Escrever os testes que falham**

Crie `src/scene/random.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { createRandom } from './random.js'

describe('seeded random', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = createRandom(7)
    const b = createRandom(7)

    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('gives different sequences for different seeds', () => {
    expect(createRandom(7)()).not.toBe(createRandom(8)())
  })

  it('stays inside [0, 1)', () => {
    const random = createRandom(42)

    for (let i = 0; i < 500; i++) {
      const value = random()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })
})
```

Crie `src/scene/starfield.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { buildStarfield, STARFIELD_COUNT, STARFIELD_RADIUS } from './starfield.js'

describe('starfield', () => {
  it('keeps the point budget in a single constant, sized for mobile', () => {
    expect(STARFIELD_COUNT).toBeLessThanOrEqual(2000)
    expect(buildStarfield().count).toBe(STARFIELD_COUNT)
  })

  it('is deterministic across runs', () => {
    expect([...buildStarfield().positions]).toEqual([...buildStarfield().positions])
  })

  it('fills one flat buffer per attribute', () => {
    const field = buildStarfield({ count: 10 })

    expect(field.positions).toBeInstanceOf(Float32Array)
    expect(field.positions).toHaveLength(30)
    expect(field.sizes).toHaveLength(10)
  })

  it('places every star on a shell far beyond the catalogue', () => {
    const { positions, count } = buildStarfield({ count: 200 })

    for (let i = 0; i < count; i++) {
      const distance = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      expect(distance).toBeGreaterThan(STARFIELD_RADIUS * 0.8)
      expect(distance).toBeLessThanOrEqual(STARFIELD_RADIUS + 0.001)
    }
  })

  it('does not always point the same way', () => {
    const { positions } = buildStarfield({ count: 50 })
    const heights = new Set(Array.from({ length: 50 }, (_, i) => positions[i * 3 + 1]))

    expect(heights.size).toBeGreaterThan(40)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/random.test.js src/scene/starfield.test.js`
Expected: FAIL — `Failed to resolve import "./random.js"` e `"./starfield.js"`.

- [ ] **Step 3: Escrever o gerador**

Crie `src/scene/random.js`:

```js
// Gerador determinístico por semente (mulberry32). Existe para que o
// acabamento procedural — campo de estrelas, poeira de nebulosa, disco do
// buraco negro — seja o mesmo entre recargas e entre execuções de teste.
// Math.random não serve: a cena mudaria a cada abertura.

export function createRandom(seed) {
  let state = seed >>> 0

  return function random() {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
```

- [ ] **Step 4: Escrever o campo de estrelas**

Crie `src/scene/starfield.js`:

```js
import { createRandom } from './random.js'

export const STARFIELD_SEED = 20260917

// Orçamento único de pontos do fundo, dimensionado para celular. Qualquer
// ajuste de desempenho acontece aqui, e em nenhum outro lugar.
export const STARFIELD_COUNT = 1400

// Bem além do destino mais distante do catálogo (Via Láctea, em z = -52), para
// que o fundo nunca colida com um corpo navegável.
export const STARFIELD_RADIUS = 160

export function buildStarfield({
  count = STARFIELD_COUNT,
  radius = STARFIELD_RADIUS,
  seed = STARFIELD_SEED,
} = {}) {
  const random = createRandom(seed)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    // Amostragem uniforme na esfera: sortear a altura, e não o ângulo polar,
    // é o que evita o acúmulo de estrelas nos polos.
    const height = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const ring = Math.sqrt(1 - height * height)
    // Uma casca com alguma espessura dá profundidade sem custo nenhum.
    const distance = radius * (0.85 + random() * 0.15)

    positions[i * 3] = distance * ring * Math.cos(angle)
    positions[i * 3 + 1] = distance * height
    positions[i * 3 + 2] = distance * ring * Math.sin(angle)
    sizes[i] = 0.4 + random() * 1.1
  }

  return { count, positions, sizes }
}
```

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/random.test.js src/scene/starfield.test.js`
Expected: PASS, 8 testes.

- [ ] **Step 6: Escrever o adaptador**

Crie `src/scene/Starfield.jsx`:

```jsx
// Fundo de estrelas: um único `points`, nunca meshes soltas. Não gira e não
// responde ao ponteiro, então movimento reduzido não tem o que desligar aqui.

import { useMemo } from 'react'
import * as THREE from 'three'

import { buildStarfield } from './starfield.js'

const NO_RAYCAST = () => null

export function Starfield() {
  const geometry = useMemo(() => {
    const { positions, sizes } = buildStarfield()
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  return (
    <points geometry={geometry} raycast={NO_RAYCAST} frustumCulled={false}>
      <pointsMaterial
        color="#d6e2ff"
        size={0.55}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}
```

- [ ] **Step 7: Colocar na cena**

Em `src/scene/SceneCanvas.jsx`, acrescente o import:

```js
import { Starfield } from './Starfield.jsx'
```

e o componente logo depois de `<color attach="background" … />`:

```jsx
      <Starfield />
```

- [ ] **Step 8: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

Run: `npm run dev` — o fundo ganha estrelas; recarregar não muda o padrão; orbitar e viajar continua fluido em largura de celular (DevTools, 390 × 844, com *CPU throttling* 4×).

```bash
git add src/scene/random.js src/scene/random.test.js src/scene/starfield.js src/scene/starfield.test.js src/scene/Starfield.jsx src/scene/SceneCanvas.jsx
git commit -m "feat(scene): add a seeded background starfield"
```

---

### Task 10: Partículas por categoria

Poeira nas nebulosas, disco no buraco negro e na região galáctica — sempre em um `points` por corpo.

**Files:**
- Create: `src/scene/particleField.js`
- Create: `src/scene/particleField.test.js`
- Create: `src/scene/CategoryEffects.jsx`
- Modify: `src/scene/CelestialBodies.jsx` (acrescenta `<CategoryEffects>`)

**Interfaces:**
- Consumes: `createRandom` da Task 9; o campo `particles` do perfil da Task 7.
- Produces: `buildParticleField({ count, spread, shape, seed })` → `{ count, positions: Float32Array }`; `CategoryEffects({ id, radius, particles })`.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/scene/particleField.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { buildParticleField } from './particleField.js'

describe('particle field', () => {
  it('is deterministic for the same seed', () => {
    const options = { count: 40, spread: 2, shape: 'cloud', seed: 3 }

    expect([...buildParticleField(options).positions])
      .toEqual([...buildParticleField(options).positions])
  })

  it('gives each body its own pattern', () => {
    const cloud = buildParticleField({ count: 40, spread: 2, shape: 'cloud', seed: 3 })
    const other = buildParticleField({ count: 40, spread: 2, shape: 'cloud', seed: 4 })

    expect([...cloud.positions]).not.toEqual([...other.positions])
  })

  it('keeps a cloud inside the requested spread', () => {
    const { positions, count } = buildParticleField({ count: 200, spread: 2.5, shape: 'cloud', seed: 1 })

    for (let i = 0; i < count; i++) {
      const distance = Math.hypot(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])
      expect(distance).toBeLessThanOrEqual(2.5 + 0.001)
    }
  })

  it('flattens a disc: wide across, thin through', () => {
    const { positions, count } = buildParticleField({ count: 300, spread: 3, shape: 'disc', seed: 2 })
    let maxRadial = 0
    let maxHeight = 0

    for (let i = 0; i < count; i++) {
      maxRadial = Math.max(maxRadial, Math.hypot(positions[i * 3], positions[i * 3 + 2]))
      maxHeight = Math.max(maxHeight, Math.abs(positions[i * 3 + 1]))
    }

    expect(maxRadial).toBeGreaterThan(2)
    expect(maxHeight).toBeLessThan(maxRadial / 4)
  })

  it('returns nothing for a body without particles', () => {
    expect(buildParticleField({ count: 0, spread: 1, shape: 'cloud', seed: 1 }).count).toBe(0)
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/particleField.test.js`
Expected: FAIL — `Failed to resolve import "./particleField.js"`.

- [ ] **Step 3: Escrever o gerador**

Crie `src/scene/particleField.js`:

```js
import { createRandom } from './random.js'

// Achatamento do disco. É o que separa visualmente um disco de acreção de uma
// nuvem de poeira sem precisar de material diferente.
const DISC_THICKNESS = 0.08

export function buildParticleField({ count, spread, shape = 'cloud', seed = 1 }) {
  const total = Math.max(0, count)
  const positions = new Float32Array(total * 3)

  const random = createRandom(seed)

  for (let i = 0; i < total; i++) {
    if (shape === 'disc') {
      // A raiz quadrada distribui a densidade por área; sortear o raio direto
      // satura o centro e esvazia a borda.
      const distance = spread * Math.sqrt(0.15 + random() * 0.85)
      const angle = random() * Math.PI * 2

      positions[i * 3] = distance * Math.cos(angle)
      positions[i * 3 + 1] = (random() * 2 - 1) * spread * DISC_THICKNESS
      positions[i * 3 + 2] = distance * Math.sin(angle)
      continue
    }

    const height = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const ring = Math.sqrt(1 - height * height)
    // A raiz cúbica faz o mesmo por volume, para a nuvem.
    const distance = spread * Math.cbrt(random())

    positions[i * 3] = distance * ring * Math.cos(angle)
    positions[i * 3 + 1] = distance * height
    positions[i * 3 + 2] = distance * ring * Math.sin(angle)
  }

  return { count: total, positions }
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/particleField.test.js`
Expected: PASS, 5 testes.

- [ ] **Step 5: Escrever o adaptador**

A semente sai do próprio id do corpo, para que duas nebulosas não tenham a mesma poeira.

Crie `src/scene/CategoryEffects.jsx`:

```jsx
// Partículas por categoria: poeira nas nebulosas, disco no buraco negro e na
// região galáctica. Um único `points` por corpo — nunca meshes soltas.

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { buildParticleField } from './particleField.js'

const NO_RAYCAST = () => null

function seedFromId(id) {
  let seed = 0
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0
  return seed
}

export function CategoryEffects({ id, radius, particles }) {
  const groupRef = useRef(null)

  const geometry = useMemo(() => {
    if (!particles) return null

    const { positions } = buildParticleField({
      count: particles.count,
      spread: radius * particles.spread,
      shape: particles.shape,
      seed: seedFromId(id),
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [id, radius, particles])

  // `drift` já vem zerado do perfil sob movimento reduzido: não há segunda
  // regra aqui, só a consequência.
  useFrame((_, delta) => {
    if (groupRef.current && particles?.drift) {
      groupRef.current.rotation.y += particles.drift * delta
    }
  })

  if (!particles || !geometry) return null

  return (
    <group ref={groupRef}>
      <points geometry={geometry} raycast={NO_RAYCAST}>
        <pointsMaterial
          color={particles.color}
          size={radius * 0.06}
          sizeAttenuation
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
```

- [ ] **Step 6: Ligar na cena**

Em `src/scene/CelestialBodies.jsx`, acrescente o import:

```js
import { CategoryEffects } from './CategoryEffects.jsx'
```

e o componente logo depois do `<BodyRing …>`:

```jsx
        <CategoryEffects id={id} radius={radius} particles={appearance.particles} />
```

- [ ] **Step 7: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

Run: `npm run dev` — Órion e Caranguejo ganham poeira; o centro galáctico, a Via Láctea e Sgr A* ganham disco. Clicar em qualquer um deles continua selecionando o corpo, não as partículas.

```bash
git add src/scene/particleField.js src/scene/particleField.test.js src/scene/CategoryEffects.jsx src/scene/CelestialBodies.jsx
git commit -m "feat(scene): add per-category particle fields"
```

---

### Task 11: Rótulos e movimento reduzido chegando à cena

As duas preferências que a cena consome descem por props explícitas — a cena recebe estado, não o descobre. `none` suprime os dois rótulos, mas o `SceneReadout` continua anunciando a seleção; sem isso, `none` quebraria o acesso por leitor de tela.

**Files:**
- Create: `src/utils/labels.js`
- Create: `src/utils/labels.test.js`
- Create: `src/scene/BodyLabel.jsx`
- Modify: `src/scene/CelestialBodies.jsx` (recebe `showSceneLabels` e `reducedMotion`, aplica o giro)
- Modify: `src/scene/layout.js` e `src/scene/layout.test.js` (`name` na projeção de cena)
- Modify: `src/scene/ExplorationScene.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css` (`.body-label`)

**Interfaces:**
- Consumes: `usePreferences` da Task 3; `getBodyAppearance` da Task 7.
- Produces: `resolveLabelVisibility(labels)` → `{ hover: boolean, scene: boolean }`; `BodyLabel({ name, radius })`; `getSceneDestination` passa a devolver `name`.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/utils/labels.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { LABEL_MODES } from '../state/preferences.js'
import { resolveLabelVisibility } from './labels.js'

describe('label visibility', () => {
  it('draws the name next to every body when labels are always on', () => {
    expect(resolveLabelVisibility('always')).toEqual({ hover: false, scene: true })
  })

  it('keeps the pointer label as the default', () => {
    expect(resolveLabelVisibility('hover')).toEqual({ hover: true, scene: false })
  })

  it('suppresses both when labels are hidden', () => {
    expect(resolveLabelVisibility('none')).toEqual({ hover: false, scene: false })
  })

  it('falls back to the pointer label for anything unknown', () => {
    expect(resolveLabelVisibility(undefined)).toEqual({ hover: true, scene: false })
    expect(resolveLabelVisibility('shout')).toEqual({ hover: true, scene: false })
  })

  it('answers for every mode the schema accepts', () => {
    for (const mode of LABEL_MODES) {
      expect(resolveLabelVisibility(mode)).toMatchObject({
        hover: expect.any(Boolean),
        scene: expect.any(Boolean),
      })
    }
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/utils/labels.test.js`
Expected: FAIL — `Failed to resolve import "./labels.js"`.

- [ ] **Step 3: Escrever a regra**

Crie `src/utils/labels.js`:

```js
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
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/utils/labels.test.js`
Expected: PASS, 5 testes.

- [ ] **Step 5: Escrever o rótulo de cena**

Crie `src/scene/BodyLabel.jsx`:

```jsx
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
```

Acrescente ao final de `src/index.css`, antes do `@media (max-width: 700px)`:

```css
.body-label {
  display: block;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  font-size: 0.72rem;
  white-space: nowrap;
  color: var(--color-text);
  background: var(--glass-bg-strong);
  user-select: none;
}
```

- [ ] **Step 6: Levar o nome até a cena**

`getSceneDestination` em `src/scene/layout.js` não copia `name`. Acrescente-o ao objeto devolvido:

```js
  return {
    id: destination.id,
    name: destination.name,
    category: destination.category,
    featured: destination.featured,
    ...presentation,
  }
```

e acrescente a asserção em `src/scene/layout.test.js`, dentro do teste que já confere a Terra:

```js
    expect(getSceneDestination(destinations.find(({ id }) => id === 'earth')).name).toBe('Terra')
```

- [ ] **Step 7: Girar e rotular em `CelestialBodies`**

O giro precisa de um nó que gire e de um `useFrame`, e `useFrame` só pode ser chamado dentro de um componente — não dentro do callback do `map`. Acrescente, em `src/scene/CelestialBodies.jsx`, os imports:

```js
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import { BodyLabel } from './BodyLabel.jsx'
```

e o componente auxiliar, logo acima de `CelestialBodies`:

```jsx
function SpinningGroup({ spin, children }) {
  const ref = useRef(null)

  // `spin` já vem zerado do perfil sob movimento reduzido: aqui não há segunda
  // regra, só a consequência.
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += spin * delta
  })

  return <group ref={ref}>{children}</group>
}
```

Troque a assinatura:

```jsx
export function CelestialBodies({
  destinations,
  selectedId,
  currentLocationId,
  hoveredId,
  showSceneLabels,
  reducedMotion,
  onHoverChange,
  onSelectDestination,
  onConfirmTravel,
}) {
  return destinations.map(({ id, name, category, position, radius }) => {
    const appearance = getBodyAppearance(id, category, { reducedMotion })
```

e o retorno do `map`, mantendo halo, anel, partículas e rótulo **fora** do nó que gira — o halo é voltado à câmera e o rótulo não deve girar junto:

```jsx
      <group key={id} position={position} scale={isSelected ? 1.25 : 1}>
        <SpinningGroup spin={appearance.spin}>
          {hasSurface && <EarthSurface radius={radius} highlighted={isSelected || isHovered} />}

          <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
            <sphereGeometry args={[hasSurface ? radius * 1.05 : radius, 20, 14]} />
            {hasSurface ? (
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            ) : (
              <meshStandardMaterial
                color={appearance.color}
                emissive={appearance.emissive}
                transparent={appearance.transparent}
                opacity={appearance.opacity}
                emissiveIntensity={isSelected || isHovered ? 1.7 : 1}
              />
            )}
          </mesh>
        </SpinningGroup>

        <Halo radius={radius} halo={appearance.halo} />
        <BodyRing radius={radius} ring={appearance.ring} />
        <CategoryEffects id={id} radius={radius} particles={appearance.particles} />

        {showSceneLabels && <BodyLabel name={name} radius={radius} />}
      </group>
```

- [ ] **Step 8: Repassar a partir de `ExplorationScene` e do `App`**

Em `src/scene/ExplorationScene.jsx`, acrescente `labels` e `reducedMotion` às props, o import:

```js
import { resolveLabelVisibility } from '../utils/labels.js'
```

e troque o cálculo do destino apontado:

```js
  const labelVisibility = resolveLabelVisibility(labels)
  const hoveredDestination = travel?.status === 'travelling' || !labelVisibility.hover
    ? undefined
    : destinations.find(({ id }) => id === hoveredId)
```

passando para `<CelestialBodies>`:

```jsx
          showSceneLabels={labelVisibility.scene}
          reducedMotion={reducedMotion}
```

Em `src/App.jsx`, garanta `reducedMotion` na desestruturação de `usePreferences()` e passe para a cena:

```jsx
        labels={preferences.labels}
        reducedMotion={reducedMotion}
```

- [ ] **Step 9: Conferir na tela e no leitor de tela**

Run: `npm run dev`.

1. Configurações → Rótulos → "Sempre visíveis": todo corpo mostra o nome; o nome não bloqueia o clique.
2. "Ao apontar": volta o rótulo atual.
3. "Ocultos": nenhum dos dois aparece, mas o readout no canto inferior esquerdo continua mostrando o destino e, ao Tab até ele, o leitor de tela o anuncia.
4. Movimento → "Movimento reduzido": os corpos param de girar e a poeira das nebulosas para de derivar; todos continuam clicáveis e navegáveis.
5. Movimento → "Seguir o sistema", com movimento reduzido ligado no sistema operacional: a cena fica parada sem que ninguém precise escolher nada.

- [ ] **Step 10: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/utils/labels.js src/utils/labels.test.js src/scene/BodyLabel.jsx src/scene/CelestialBodies.jsx src/scene/ExplorationScene.jsx src/scene/layout.js src/scene/layout.test.js src/App.jsx src/index.css
git commit -m "feat(scene): honour label and reduced-motion preferences"
```

---

### Task 12: Primitivas que faltam no `PlanetSurface`

O vocabulário visual da Terra cobre retalho preenchido, contorno, atmosfera e anel. Faltam duas primitivas para o resto do catálogo: faixas latitudinais (os gigantes gasosos) e retalho sem preenchimento (as fraturas de Europa).

**Files:**
- Create: `src/scene/latitudeBands.js`
- Create: `src/scene/latitudeBands.test.js`
- Modify: `src/scene/PlanetSurface.jsx` (aceita `bands`; retalho com `fill: null` não desenha malha)

**Interfaces:**
- Produces: `bandStops(bands, latitude)` → `{ from, to, t }` ou `null`; `PlanetSurface` aceita `bands` (array de `{ latitude, color }` em graus, crescente) e trata `patch.fill === null` como "só contorno".

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/scene/latitudeBands.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { bandStops } from './latitudeBands.js'

const BANDS = [
  { latitude: -90, color: '#111111' },
  { latitude: 0, color: '#222222' },
  { latitude: 90, color: '#333333' },
]

describe('latitude bands', () => {
  it('returns nothing when the body has no bands', () => {
    expect(bandStops(undefined, 0)).toBeNull()
    expect(bandStops([], 0)).toBeNull()
  })

  it('uses the only colour a single band offers', () => {
    expect(bandStops([{ latitude: 0, color: '#abcdef' }], 40))
      .toEqual({ from: '#abcdef', to: '#abcdef', t: 0 })
  })

  it('lands exactly on a stop at its own latitude', () => {
    expect(bandStops(BANDS, 0)).toMatchObject({ from: '#222222', t: 0 })
    expect(bandStops(BANDS, -90)).toMatchObject({ from: '#111111', t: 0 })
  })

  it('blends between the two neighbouring stops', () => {
    expect(bandStops(BANDS, 45)).toEqual({ from: '#222222', to: '#333333', t: 0.5 })
    expect(bandStops(BANDS, -22.5)).toEqual({ from: '#111111', to: '#222222', t: 0.75 })
  })

  it('clamps outside the declared range instead of extrapolating', () => {
    expect(bandStops(BANDS, 200)).toMatchObject({ from: '#333333', t: 0 })
    expect(bandStops(BANDS, -200)).toMatchObject({ from: '#111111', t: 0 })
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/latitudeBands.test.js`
Expected: FAIL — `Failed to resolve import "./latitudeBands.js"`.

- [ ] **Step 3: Escrever a regra**

Crie `src/scene/latitudeBands.js`:

```js
// Faixas latitudinais dos gigantes gasosos. As faixas são pontos de controle
// em graus, do sul para o norte; a cor de uma latitude é a interpolação entre
// os dois pontos vizinhos. Puro: devolve quais cores misturar e quanto, e quem
// mistura de fato é o PlanetSurface, que já tem THREE.Color em mãos.

export function bandStops(bands, latitude) {
  if (!bands || bands.length === 0) return null

  const first = bands[0]
  const last = bands[bands.length - 1]

  // Fora do intervalo declarado o valor é fixado, nunca extrapolado: uma
  // extrapolação inventaria cor onde o corpo não tem dado.
  if (bands.length === 1 || latitude <= first.latitude) {
    return { from: first.color, to: first.color, t: 0 }
  }
  if (latitude >= last.latitude) return { from: last.color, to: last.color, t: 0 }

  for (let i = 0; i < bands.length - 1; i++) {
    const low = bands[i]
    const high = bands[i + 1]
    if (latitude > high.latitude) continue

    const span = high.latitude - low.latitude
    const t = span === 0 ? 0 : (latitude - low.latitude) / span
    return t === 0
      ? { from: low.color, to: low.color, t: 0 }
      : { from: low.color, to: high.color, t }
  }

  return { from: last.color, to: last.color, t: 0 }
}
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/latitudeBands.test.js`
Expected: PASS, 5 testes.

- [ ] **Step 5: Ensinar as duas primitivas ao `PlanetSurface`**

Em `src/scene/PlanetSurface.jsx`, acrescente o import:

```js
import { bandStops } from './latitudeBands.js'
```

acrescente `bands` à lista de props (logo depois de `gradient = 'latitude'`):

```js
  bands,
```

e troque o corpo do `useMemo` de `sphereGeo` para consultar as faixas antes do gradiente:

```js
  const sphereGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(radius, 96, 64)
    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const low = new THREE.Color(oceanLow)
    const high = new THREE.Color(oceanHigh)
    const tmp = new THREE.Color()
    const from = new THREE.Color()

    for (let i = 0; i < pos.count; i++) {
      const height = pos.getY(i) / radius

      if (bands) {
        // Faixas por latitude: é assim que Júpiter e Netuno ganham bandas sem
        // textura nenhuma.
        const latitude = (Math.asin(Math.min(1, Math.max(-1, height))) * 180) / Math.PI
        const stops = bandStops(bands, latitude)
        from.set(stops.from)
        tmp.copy(from).lerp(new THREE.Color(stops.to), stops.t)
      } else {
        // 'poles' grada do equador para fora, que é como um globo ilustrado se
        // lê; 'latitude' grada do sul para o norte.
        const t = gradient === 'poles'
          ? Math.pow(Math.abs(height), 0.9)
          : Math.pow((height + 1) / 2, 0.85)
        tmp.copy(low).lerp(high, t)
      }

      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [radius, oceanLow, oceanHigh, gradient, bands])
```

Em seguida, deixe o retalho sem preenchimento passar. No `map` de `surfacePatches`, troque o `<mesh geometry={patch.fillGeo} …>` por:

```jsx
          {patch.fill !== null && (
            <mesh geometry={patch.fillGeo} raycast={NO_RAYCAST}>
              <meshStandardMaterial
                color={patch.fill ?? landFill}
                roughness={0.95}
                metalness={0}
                side={THREE.DoubleSide}
                transparent={(patch.opacity ?? 1) < 1}
                opacity={patch.opacity ?? 1}
              />
            </mesh>
          )}
```

`fill: undefined` continua caindo em `landFill`, como hoje; só `fill: null` significa "não preencha". É essa distinção que dá as fraturas de Europa.

- [ ] **Step 6: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde. A Terra não usa nenhuma das duas primitivas, então deve continuar idêntica — confirme em `npm run dev`.

```bash
git add src/scene/latitudeBands.js src/scene/latitudeBands.test.js src/scene/PlanetSurface.jsx
git commit -m "feat(scene): add latitude bands and outline-only patches"
```

---

### Task 13: Superfícies dos corpos rochosos e gelados

Oito corpos ganham superfície própria, todos pelo mesmo `PlanetSurface`: Mercúrio, Vênus, Lua, Marte, Europa, Io, Titã e Plutão.

**Files:**
- Create: `src/scene/surfaces/rocky.js`
- Create: `src/scene/bodySurfaces.js`
- Create: `src/scene/bodySurfaces.test.js`
- Create: `src/scene/BodySurface.jsx`
- Modify: `src/scene/CelestialBodies.jsx` (usa `getBodySurface` em vez do `Set` com a Terra)

**Interfaces:**
- Consumes: `circleOutline`, `ellipseOutline`, `latLonToVector3` de `src/scene/sphericalPatch.js`; `buildEarthPatches`, `EARTH_APPEARANCE` de `src/scene/earthSurface.js`.
- Produces: `getBodySurface(id)` → props de `PlanetSurface` ou `null`; `hasBodySurface(id)`; `BodySurface({ id, radius, highlighted })`. `ROCKY_SURFACES` em `src/scene/surfaces/rocky.js`.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/scene/bodySurfaces.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { destinations } from '../content/destinations.js'
import { getBodySurface, hasBodySurface, SURFACE_IDS } from './bodySurfaces.js'

const HEX = /^#[0-9a-f]{6}$/i

describe('body surfaces', () => {
  it('only claims a surface for bodies that exist in the catalogue', () => {
    const ids = new Set(destinations.map(({ id }) => id))

    for (const id of SURFACE_IDS) expect(ids).toContain(id)
  })

  // A lista cresce na Task 14, com os quatro gigantes gasosos.
  it('gives a surface to every rocky and icy body', () => {
    expect([...SURFACE_IDS].sort()).toEqual([
      'earth', 'europa', 'io', 'mars', 'mercury', 'moon', 'pluto', 'titan', 'venus',
    ])
  })

  it('answers nothing for a body without a surface', () => {
    expect(hasBodySurface('sun')).toBe(false)
    expect(getBodySurface('orion-nebula')).toBeNull()
    expect(getBodySurface('sagittarius-a-star')).toBeNull()
  })

  it('describes every surface with usable colours', () => {
    for (const id of SURFACE_IDS) {
      const surface = getBodySurface(id)

      expect(surface.oceanLow).toMatch(HEX)
      expect(surface.oceanHigh).toMatch(HEX)
      for (const patch of surface.patches ?? []) {
        expect(patch.id).toMatch(/\S/)
        expect(patch.outline.length).toBeGreaterThan(2)
        if (patch.fill !== null) expect(patch.fill).toMatch(HEX)
      }
    }
  })

  it('states the scientific facts the art direction encodes', () => {
    // Vênus não tem relevo visível: é justamente o fato.
    expect(getBodySurface('venus').patches ?? []).toHaveLength(0)
    expect(getBodySurface('venus').atmosphereOpacity).toBeGreaterThan(0.4)

    // Mercúrio e a Lua não têm atmosfera; Mercúrio tem o campo de crateras mais
    // denso do catálogo.
    expect(getBodySurface('mercury').showAtmosphere).toBe(false)
    expect(getBodySurface('moon').showAtmosphere).toBe(false)
    expect(getBodySurface('mercury').craters.length).toBeGreaterThan(10)

    // Marte tem calotas nos dois polos.
    const caps = getBodySurface('mars').patches.filter(({ id }) => id.includes('cap'))
    expect(caps).toHaveLength(2)

    // As fraturas de Europa são só linha, sem preenchimento.
    const fractures = getBodySurface('europa').patches.filter(({ fill }) => fill === null)
    expect(fractures.length).toBeGreaterThan(3)
  })

  it('is deterministic: the same surface every call', () => {
    expect(getBodySurface('mars')).toEqual(getBodySurface('mars'))
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/bodySurfaces.test.js`
Expected: FAIL — `Failed to resolve import "./bodySurfaces.js"`. Os testes de Júpiter, Saturno, Urano e Netuno continuarão falhando até a Task 14; não invente dados para eles agora.

- [ ] **Step 3: Escrever os corpos rochosos e gelados**

Crie `src/scene/surfaces/rocky.js`:

```js
// Superfícies dos corpos rochosos e gelados, na mesma direção de arte da
// Terra: esfera graduada, relevo chapado com contorno mais escuro, atmosfera
// como casca de baixa opacidade. Contornos em [longitude, latitude] em graus.
//
// Placement é fiel ao mapa conhecido de cada corpo; o detalhe não é — na
// escala da cena nunca aparece mais que a silhueta.

import { circleOutline, ellipseOutline, latLonToVector3 } from '../sphericalPatch.js'

function craterAt(longitude, latitude, r) {
  return { center: latLonToVector3(longitude, latitude).toArray(), r }
}

function blotch(id, longitude, latitude, length, width, fill, rotation = 0) {
  // Mancha sem contorno: mares lunares, manchas de enxofre, Tombaugh. O que as
  // distingue de um continente é justamente não terem borda desenhada.
  return { id, outline: ellipseOutline(longitude, latitude, length, width, rotation), fill }
}

// `angularRadius` em graus, como em circleOutline: a calota de Marte tem uns
// 14° de raio angular, não 0,14 radianos.
function cap(id, latitude, angularRadius, fill) {
  return { id, outline: circleOutline(0, latitude, angularRadius), fill }
}

function fracture(id, outline, line) {
  // fill: null é o que faz o PlanetSurface desenhar só o contorno.
  return { id, outline, fill: null, line }
}

const MERCURY_CRATERS = [
  craterAt(-160, 30, 0.12), craterAt(-120, 10, 0.08), craterAt(-95, -25, 0.1),
  craterAt(-60, 45, 0.07), craterAt(-30, -10, 0.09), craterAt(0, 25, 0.06),
  craterAt(25, -40, 0.08), craterAt(55, 15, 0.11), craterAt(90, -20, 0.07),
  craterAt(120, 35, 0.09), craterAt(150, -5, 0.06), craterAt(175, 50, 0.08),
  craterAt(-140, -55, 0.07), craterAt(70, 60, 0.06), craterAt(-45, -60, 0.05),
]

const MOON_CRATERS = [
  craterAt(-20, -43, 0.14), craterAt(15, 30, 0.09), craterAt(-60, 12, 0.08),
  craterAt(40, -15, 0.07), craterAt(-100, 50, 0.1), craterAt(120, -35, 0.11),
  craterAt(160, 20, 0.08), craterAt(-150, -20, 0.09),
]

export const ROCKY_SURFACES = Object.freeze({
  mercury: {
    oceanLow: '#6f6a63', oceanHigh: '#8d8880', gradient: 'latitude',
    craterLine: '#4a453f', showAtmosphere: false,
    patches: [], craters: MERCURY_CRATERS,
  },

  // Nenhum relevo visível, e é esse o fato: a atmosfera opaca esconde a
  // superfície inteira.
  venus: {
    oceanLow: '#cdaf74', oceanHigh: '#e3c98d', gradient: 'poles',
    showAtmosphere: true, atmosphereColor: '#f0dda8', atmosphereOpacity: 0.55,
    patches: [], craters: [],
  },

  moon: {
    oceanLow: '#9d9a95', oceanHigh: '#b9b6b0', gradient: 'latitude',
    craterLine: '#5c5952', showAtmosphere: false,
    patches: [
      blotch('mare-imbrium', -16, 33, 22, 18, '#8e8b86'),
      blotch('mare-serenitatis', 18, 28, 15, 13, '#8a8782'),
      blotch('mare-tranquillitatis', 31, 8, 17, 14, '#8a8782'),
      blotch('oceanus-procellarum', -57, 19, 26, 34, '#93908b'),
      blotch('mare-crisium', 59, 17, 12, 10, '#88857f'),
    ],
    craters: MOON_CRATERS,
  },

  mars: {
    oceanLow: '#a44e2d', oceanHigh: '#c1613a', gradient: 'poles',
    craterLine: '#6d3320', showAtmosphere: true,
    atmosphereColor: '#e3a183', atmosphereOpacity: 0.09,
    patches: [
      blotch('syrtis-major', 70, 10, 18, 22, '#7d4a2f'),
      blotch('valles-marineris', -60, -10, 46, 6, '#8a4326', 8),
      blotch('hellas', 70, -42, 24, 20, '#cf7a4d'),
      cap('north-cap', 90, 14, '#f2f7fa'),
      cap('south-cap', -90, 12, '#eef4f8'),
    ],
    craters: [craterAt(-30, 20, 0.06), craterAt(140, -25, 0.07)],
  },

  europa: {
    oceanLow: '#c9d6de', oceanHigh: '#dfe7ec', gradient: 'poles',
    showAtmosphere: false,
    patches: [
      fracture('lineae-1', [[-150, 30], [-90, 12], [-20, -4], [50, -18], [130, -30]], '#9a6f55'),
      fracture('lineae-2', [[-170, -30], [-100, -18], [-10, 6], [70, 24], [150, 34]], '#a87a5c'),
      fracture('lineae-3', [[-60, 70], [-40, 20], [-20, -30], [-5, -70]], '#8f6850'),
      fracture('lineae-4', [[40, 68], [70, 22], [95, -26], [120, -66]], '#8f6850'),
      fracture('lineae-5', [[-120, -60], [-30, -52], [60, -46], [150, -40]], '#a87a5c'),
    ],
    craters: [],
  },

  io: {
    oceanLow: '#d4b448', oceanHigh: '#e8c95a', gradient: 'latitude',
    showAtmosphere: false,
    patches: [
      blotch('pele', -105, -19, 20, 16, '#b5402f'),
      blotch('loki', -50, 13, 16, 14, '#8c3a2c'),
      blotch('prometheus', 25, -2, 12, 10, '#c05038'),
      blotch('tvashtar', 120, 60, 14, 12, '#a8402e'),
      blotch('masubi', -150, -45, 11, 9, '#b8543a'),
      blotch('amirani', 60, 25, 13, 10, '#933c2d'),
    ],
    craters: [],
  },

  titan: {
    oceanLow: '#c08a46', oceanHigh: '#d9a25c', gradient: 'poles',
    showAtmosphere: true, atmosphereColor: '#e8b978', atmosphereOpacity: 0.48,
    patches: [
      blotch('kraken-mare', -50, 68, 26, 18, '#7d5c3a'),
      blotch('shangri-la', -160, -8, 40, 22, '#a87a44'),
    ],
    craters: [],
  },

  pluto: {
    oceanLow: '#a8937c', oceanHigh: '#c8b49c', gradient: 'latitude',
    showAtmosphere: false,
    patches: [
      blotch('tombaugh-regio', 175, 18, 42, 36, '#eadfc8'),
      blotch('cthulhu-macula', 130, 2, 60, 16, '#6f5b48'),
      cap('north-cap', 90, 10, '#e4dcd0'),
    ],
    craters: [],
  },
})
```

- [ ] **Step 4: Montar o mapa de superfícies**

Crie `src/scene/bodySurfaces.js`:

```js
// Uma superfície por corpo, nas props que o PlanetSurface consome. Puro e
// determinístico: mesma entrada, mesmos contornos, toda execução.

import { buildEarthPatches, EARTH_APPEARANCE } from './earthSurface.js'
import { ROCKY_SURFACES } from './surfaces/rocky.js'

const EARTH_SURFACE = Object.freeze({
  oceanLow: EARTH_APPEARANCE.oceanDeep,
  oceanHigh: EARTH_APPEARANCE.oceanPolar,
  gradient: 'poles',
  showAtmosphere: true,
  atmosphereColor: EARTH_APPEARANCE.atmosphere,
  atmosphereOpacity: 0.14,
  patches: buildEarthPatches(),
  craters: [],
})

const SURFACES = Object.freeze({
  earth: EARTH_SURFACE,
  ...ROCKY_SURFACES,
})

export const SURFACE_IDS = Object.freeze(Object.keys(SURFACES))

export function hasBodySurface(id) {
  return Object.hasOwn(SURFACES, id)
}

export function getBodySurface(id) {
  return hasBodySurface(id) ? SURFACES[id] : null
}
```

O teste `'gives a surface to every rocky and icy body'` cobre exatamente os nove ids desta tarefa. A Task 14 troca esse `expect` pela lista completa de treze quando os gigantes entrarem; não antecipe a lista aqui.

- [ ] **Step 5: Escrever o adaptador**

Crie `src/scene/BodySurface.jsx`:

```jsx
// Liga o dado de superfície ao PlanetSurface. É decoração pura: quem responde
// ao ponteiro é sempre a esfera invisível de CelestialBodies.

import { getBodySurface } from './bodySurfaces.js'
import { PlanetSurface } from './PlanetSurface.jsx'

export function BodySurface({ id, radius, highlighted }) {
  const surface = getBodySurface(id)
  if (!surface) return null

  return (
    <PlanetSurface
      radius={radius}
      {...surface}
      atmosphereOpacity={
        surface.showAtmosphere === false
          ? 0
          : (surface.atmosphereOpacity ?? 0.08) * (highlighted ? 1.8 : 1)
      }
    />
  )
}
```

- [ ] **Step 6: Trocar o `Set` da Terra pelo mapa**

Em `src/scene/CelestialBodies.jsx`:

- remova `const BODIES_WITH_SURFACE = new Set(['earth'])`, a função local `EarthSurface` e os imports `buildEarthPatches`, `EARTH_APPEARANCE`, `PlanetSurface` e a constante `EARTH_PATCHES`;
- acrescente `import { BodySurface } from './BodySurface.jsx'` e `import { hasBodySurface } from './bodySurfaces.js'`;
- troque `const hasSurface = BODIES_WITH_SURFACE.has(id)` por `const hasSurface = hasBodySurface(id)`;
- troque `{hasSurface && <EarthSurface … />}` por:

```jsx
          {hasSurface && <BodySurface id={id} radius={radius} highlighted={isSelected || isHovered} />}
```

- [ ] **Step 7: Conferir corpo a corpo**

Run: `npm run dev`. Viaje até cada um e confira contra o texto da direção de arte:

| corpo | o que precisa aparecer |
| --- | --- |
| Mercúrio | cinza, sem brilho de atmosfera, campo denso de crateras |
| Vênus | creme uniforme, atmosfera opaca, nenhum relevo |
| Lua | cinza claro, crateras grandes e mares escuros sem contorno |
| Marte | vermelho-alaranjado, Syrtis Major e Valles Marineris escuros, duas calotas brancas |
| Europa | gelo quase branco com fraturas avermelhadas, só linha |
| Io | amarelo-enxofre com manchas vermelhas irregulares |
| Titã | laranja com atmosfera espessa que quase esconde a superfície |
| Plutão | bege com a região clara de Tombaugh |

A Terra precisa continuar idêntica à de antes desta tarefa.

- [ ] **Step 8: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/surfaces/rocky.js src/scene/bodySurfaces.js src/scene/bodySurfaces.test.js src/scene/BodySurface.jsx src/scene/CelestialBodies.jsx
git commit -m "feat(scene): draw the rocky and icy bodies"
```

---

### Task 14: Faixas dos gigantes gasosos

Júpiter, Saturno, Urano e Netuno. As faixas são a primitiva da Task 12; a Grande Mancha Vermelha é uma elipse; os anéis já vêm do perfil da Task 7.

**Files:**
- Create: `src/scene/surfaces/giants.js`
- Modify: `src/scene/bodySurfaces.js` (acrescenta os gigantes)
- Modify: `src/scene/bodySurfaces.test.js` (reativa a lista completa, acrescenta as asserções dos gigantes)

**Interfaces:**
- Consumes: `bandStops` (indiretamente, via `PlanetSurface`) da Task 12; `ellipseOutline` de `src/scene/sphericalPatch.js`.
- Produces: `GIANT_SURFACES` — os mesmos campos de `ROCKY_SURFACES`, mais `bands: [{ latitude, color }]`.

- [ ] **Step 1: Escrever o teste que falha**

Em `src/scene/bodySurfaces.test.js`, troque o teste `'gives a surface to every rocky and icy body'` pela lista completa:

```js
  it('gives a surface to every Solar System body with one', () => {
    expect([...SURFACE_IDS].sort()).toEqual([
      'earth', 'europa', 'io', 'jupiter', 'mars', 'mercury', 'moon', 'neptune',
      'pluto', 'saturn', 'titan', 'uranus', 'venus',
    ])
  })
```

e acrescente ao final do `describe`:

```js
  it('bands the gas giants from south to north', () => {
    for (const id of ['jupiter', 'saturn', 'uranus', 'neptune']) {
      const { bands } = getBodySurface(id)

      expect(bands.length).toBeGreaterThan(4)
      expect(bands[0].latitude).toBe(-90)
      expect(bands[bands.length - 1].latitude).toBe(90)
      for (let i = 1; i < bands.length; i++) {
        expect(bands[i].latitude).toBeGreaterThan(bands[i - 1].latitude)
        expect(bands[i].color).toMatch(HEX)
      }
    }
  })

  it('places the Great Red Spot where Jupiter has it', () => {
    const spot = getBodySurface('jupiter').patches.find(({ id }) => id === 'great-red-spot')

    expect(spot).toBeDefined()
    expect(spot.fill).toMatch(HEX)
    // 60° O, 22° S: o contorno tem de ficar todo no hemisfério sul.
    for (const [, latitude] of spot.outline) expect(latitude).toBeLessThan(0)
  })

  it('leaves the giants without craters and gives Neptune its dark spot', () => {
    expect(getBodySurface('jupiter').craters).toHaveLength(0)
    expect(getBodySurface('neptune').patches.some(({ id }) => id === 'great-dark-spot')).toBe(true)
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/bodySurfaces.test.js`
Expected: FAIL — `getBodySurface('jupiter')` devolve `null`.

- [ ] **Step 3: Escrever os gigantes**

Crie `src/scene/surfaces/giants.js`:

```js
// Gigantes gasosos: nenhum relevo, só faixas de latitude e algumas tempestades
// como elipses. As faixas são pontos de controle do polo sul ao polo norte,
// interpolados por latitudeBands.js.

import { ellipseOutline } from '../sphericalPatch.js'

function storm(id, longitude, latitude, length, width, fill, rotation = 0) {
  return { id, outline: ellipseOutline(longitude, latitude, length, width, rotation), fill }
}

export const GIANT_SURFACES = Object.freeze({
  jupiter: {
    oceanLow: '#c9a26a', oceanHigh: '#e8d2a8', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#f0dcb4', atmosphereOpacity: 0.12,
    bands: [
      { latitude: -90, color: '#b08a5c' },
      { latitude: -60, color: '#d8c09a' },
      { latitude: -42, color: '#9c7346' },
      { latitude: -28, color: '#e8d2a8' },
      { latitude: -16, color: '#a87a4c' },
      { latitude: -6, color: '#f0e0c0' },
      { latitude: 8, color: '#b98a54' },
      { latitude: 20, color: '#eddaae' },
      { latitude: 34, color: '#a37848' },
      { latitude: 52, color: '#d6be98' },
      { latitude: 90, color: '#ad875c' },
    ],
    patches: [storm('great-red-spot', -60, -22, 26, 14, '#b4533a')],
    craters: [],
  },

  saturn: {
    oceanLow: '#c4a978', oceanHigh: '#e6d6b0', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#f0e4c4', atmosphereOpacity: 0.1,
    // Faixas mais suaves que as de Júpiter: é a diferença que se vê a olho nu.
    bands: [
      { latitude: -90, color: '#b99d70' },
      { latitude: -50, color: '#dccba4' },
      { latitude: -20, color: '#c7ae80' },
      { latitude: 5, color: '#e6d6b0' },
      { latitude: 30, color: '#cdb488' },
      { latitude: 60, color: '#dfcfa8' },
      { latitude: 90, color: '#b99d70' },
    ],
    patches: [],
    craters: [],
  },

  uranus: {
    oceanLow: '#74c2c6', oceanHigh: '#8fd6d9', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#a6e2e4', atmosphereOpacity: 0.14,
    // Faixas fracas: o contraste entre elas é quase nulo, como nas imagens da
    // Voyager 2.
    bands: [
      { latitude: -90, color: '#7cc8cc' },
      { latitude: -40, color: '#8fd6d9' },
      { latitude: 0, color: '#86ced1' },
      { latitude: 40, color: '#8fd6d9' },
      { latitude: 90, color: '#7cc8cc' },
    ],
    patches: [],
    craters: [],
  },

  neptune: {
    oceanLow: '#2f4fa8', oceanHigh: '#3b63c4', gradient: 'latitude',
    showAtmosphere: true, atmosphereColor: '#6f93e0', atmosphereOpacity: 0.14,
    bands: [
      { latitude: -90, color: '#2c4a9e' },
      { latitude: -45, color: '#3b63c4' },
      { latitude: -10, color: '#4a74d4' },
      { latitude: 25, color: '#3b63c4' },
      { latitude: 60, color: '#33569f' },
      { latitude: 90, color: '#2c4a9e' },
    ],
    patches: [storm('great-dark-spot', 20, -22, 24, 13, '#20356f')],
    craters: [],
  },
})
```

- [ ] **Step 4: Acrescentar ao mapa**

Em `src/scene/bodySurfaces.js`, acrescente o import e a entrada:

```js
import { GIANT_SURFACES } from './surfaces/giants.js'
```

```js
const SURFACES = Object.freeze({
  earth: EARTH_SURFACE,
  ...ROCKY_SURFACES,
  ...GIANT_SURFACES,
})
```

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/bodySurfaces.test.js`
Expected: PASS, 9 testes, sem nenhum `todo` pendente.

- [ ] **Step 6: Conferir na tela**

Run: `npm run dev`.

- **Júpiter**: faixas creme e ocre bem contrastadas; a Grande Mancha Vermelha aparece no hemisfério sul quando o planeta gira para o lado certo (com movimento reduzido ligado ela fica parada onde foi desenhada).
- **Saturno**: faixas suaves e o anel largo com a divisão de Cassini.
- **Urano**: faixas quase indistintas e o anel fino quase vertical.
- **Netuno**: azul com faixas fracas e a Grande Mancha Escura.

- [ ] **Step 7: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/surfaces/giants.js src/scene/bodySurfaces.js src/scene/bodySurfaces.test.js
git commit -m "feat(scene): band the gas giants"
```

---

### Task 15: Corpos luminosos com cor própria

Sol, estrelas, nebulosas e regiões galácticas não têm superfície: o que os distingue é cor, halo e partículas. Halo e partículas já vieram das Tasks 8 e 10; falta dar a cada um a sua cor, em vez de todos herdarem a da categoria.

**Files:**
- Modify: `src/scene/appearance.js` (acrescenta cor e emissivo aos `OVERRIDES_BY_ID`)
- Modify: `src/scene/appearance.test.js` (acrescenta as asserções de cor por corpo)

**Interfaces:**
- Consumes: `getBodyAppearance` da Task 7.
- Produces: nenhuma assinatura nova. Só dado.

- [ ] **Step 1: Escrever o teste que falha**

Acrescente ao final do `describe` em `src/scene/appearance.test.js`:

```js
  it('gives each luminous body its own colour instead of the category default', () => {
    const categoryStar = getAppearanceProfile('star').color

    expect(getBodyAppearance('sirius', 'star').color).not.toBe(categoryStar)
    expect(getBodyAppearance('betelgeuse', 'star').color).not.toBe(categoryStar)
    expect(getBodyAppearance('betelgeuse', 'star').color).not.toBe(
      getBodyAppearance('sirius', 'star').color,
    )
    expect(getBodyAppearance('orion-nebula', 'nebula').color).not.toBe(
      getBodyAppearance('crab-nebula', 'nebula').color,
    )
  })

  it('reads Betelgeuse as red and Sirius as white-blue', () => {
    const red = getBodyAppearance('betelgeuse', 'star').color
    const white = getBodyAppearance('sirius', 'star').color
    const channel = (hex, index) => Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16)

    expect(channel(red, 0)).toBeGreaterThan(channel(red, 2))
    expect(channel(white, 2)).toBeGreaterThanOrEqual(channel(white, 0))
  })

  it('keeps the Sun emissive enough to read as the source of light', () => {
    const sun = getBodyAppearance('sun', 'star-system')

    expect(sun.emissive).toMatch(/^#[0-9a-f]{6}$/i)
    expect(sun.halo.scale).toBeGreaterThanOrEqual(3)
  })
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/appearance.test.js`
Expected: FAIL — Sirius e Betelgeuse ainda devolvem a cor da categoria.

- [ ] **Step 3: Dar cor a cada corpo luminoso**

Em `src/scene/appearance.js`, substitua o bloco `OVERRIDES_BY_ID` inteiro por:

```js
// Exceções por corpo. Existem porque Saturno e Urano são a mesma categoria com
// anéis diferentes, e porque estrelas e nebulosas da mesma categoria têm cores
// que o visitante reconhece: Betelgeuse é vermelha, Sirius é branco-azulada.
const OVERRIDES_BY_ID = Object.freeze({
  sun: {
    color: '#ffcf5c', emissive: '#ff9a13',
    halo: { scale: 3.2, opacity: 0.42, color: '#ffd166' },
  },
  'alpha-centauri': {
    color: '#ffe0a8', emissive: '#a8720f',
    halo: { scale: 2.3, opacity: 0.32, color: '#ffe9c4' },
  },
  sirius: {
    color: '#dfe9ff', emissive: '#4a6ba8',
    halo: { scale: 2.6, opacity: 0.4, color: '#dbe9ff' },
  },
  betelgeuse: {
    color: '#ff7a4a', emissive: '#8c2b08',
    halo: { scale: 3.0, opacity: 0.32, color: '#ff8a5c' },
  },
  'orion-nebula': {
    color: '#ff9ac4', emissive: '#6d1b48',
    halo: { scale: 2.0, opacity: 0.24, color: '#ffb6d4' },
    particles: { count: 220, spread: 2.8, color: '#ffd0e4', drift: 0.05, shape: 'cloud' },
  },
  'crab-nebula': {
    color: '#8fb8ff', emissive: '#1f3a78',
    halo: { scale: 1.9, opacity: 0.24, color: '#a8c8ff' },
    particles: { count: 200, spread: 2.5, color: '#c6dcff', drift: 0.07, shape: 'cloud' },
  },
  'galactic-center': {
    color: '#ffc98f', emissive: '#7a3d0a',
    halo: { scale: 1.9, opacity: 0.24, color: '#ffd9ae' },
    particles: { count: 280, spread: 2.9, color: '#ffe3c0', drift: 0.05, shape: 'disc' },
  },
  'milky-way': {
    color: '#7f9ce0', emissive: '#1b2a63',
    halo: { scale: 1.6, opacity: 0.16, color: '#b6c8ff' },
    particles: { count: 420, spread: 4.6, color: '#c3d2ff', drift: 0.03, shape: 'disc' },
  },
  saturn: {
    ring: { inner: 1.35, outer: 2.0, color: '#d8bb75', opacity: 0.72, tilt: 0.12, gap: [1.66, 1.74] },
  },
  uranus: {
    // Quase vertical: é a inclinação que faz de Urano o planeta "deitado".
    ring: { inner: 1.5, outer: 1.66, color: '#9fd9dd', opacity: 0.5, tilt: 1.45, gap: null },
  },
})
```

- [ ] **Step 4: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/appearance.test.js`
Expected: PASS, 12 testes.

- [ ] **Step 5: Conferir na tela**

Run: `npm run dev` — o Sol é o corpo mais luminoso da cena; Alpha Centauri é amarelada, Sirius branco-azulada, Betelgeuse vermelha e maior; Órion é rósea e o Caranguejo azulado; o centro galáctico é dourado e a Via Láctea azul-acinzentada, ambos com disco de partículas.

- [ ] **Step 6: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/appearance.js src/scene/appearance.test.js
git commit -m "feat(scene): colour each luminous body on its own"
```

---

### Task 16: Buraco negro por geometria

Sgr A* é o único corpo cuja aparência real é um efeito óptico. A lente gravitacional de verdade exige render target e segundo passe, que esta fase excluiu junto com bloom. Entra a leitura fiel montada por geometria — e a interface diz que o disco dobrado é ilustrativo.

**Files:**
- Create: `src/scene/blackHole.js`
- Create: `src/scene/blackHole.test.js`
- Create: `src/scene/BlackHole.jsx`
- Modify: `src/content/notices.js` (acrescenta `BLACK_HOLE_NOTICE`)
- Modify: `src/content/notices.test.js`
- Modify: `src/utils/sceneReadout.js` e `src/utils/sceneReadout.test.js` (`appearanceNotice`)
- Modify: `src/components/SceneReadout.jsx`
- Modify: `src/scene/CelestialBodies.jsx` (desenha `BlackHole` em vez da esfera de categoria)

**Interfaces:**
- Consumes: o perfil de `black-hole` da Task 7; `CategoryEffects` da Task 10.
- Produces: `BLACK_HOLE_GEOMETRY`, `dopplerBrightness(angle)`, `buildDiscBrightness(segments)` em `src/scene/blackHole.js`; `BlackHole({ radius, appearance })`; `BLACK_HOLE_NOTICE` em `src/content/notices.js`; `buildSceneReadout` passa a devolver `appearanceNotice: string | null`.

- [ ] **Step 1: Escrever os testes que falham**

Crie `src/scene/blackHole.test.js`:

```js
import { describe, expect, it } from 'vitest'

import { BLACK_HOLE_GEOMETRY, buildDiscBrightness, dopplerBrightness } from './blackHole.js'

describe('black hole', () => {
  it('keeps the shadow inside the photon ring, and the disc outside both', () => {
    const { shadow, photonInner, photonOuter, discInner, discOuter } = BLACK_HOLE_GEOMETRY

    expect(shadow).toBeLessThan(photonInner)
    expect(photonInner).toBeLessThan(photonOuter)
    expect(photonOuter).toBeLessThanOrEqual(discInner)
    expect(discInner).toBeLessThan(discOuter)
  })

  it('brightens the approaching side and dims the receding one', () => {
    expect(dopplerBrightness(-Math.PI / 2)).toBeCloseTo(1)
    expect(dopplerBrightness(Math.PI / 2)).toBeCloseTo(0)
    expect(dopplerBrightness(0)).toBeCloseTo(0.5)
  })

  it('never leaves [0, 1] around the whole disc', () => {
    for (let i = 0; i <= 64; i++) {
      const value = dopplerBrightness((i / 64) * Math.PI * 2)

      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(1)
    }
  })

  it('samples one brightness per segment boundary', () => {
    const brightness = buildDiscBrightness(8)

    expect(brightness).toBeInstanceOf(Float32Array)
    expect(brightness).toHaveLength(9)
    expect(brightness[0]).toBeCloseTo(brightness[8])
  })
})
```

Acrescente a `src/content/notices.test.js`:

```js
import { BLACK_HOLE_NOTICE, SCALE_NOTICE } from './notices.js'
```

```js
  it('says the folded accretion disc is an illustrative representation', () => {
    expect(BLACK_HOLE_NOTICE).toMatch(/ilustrativ/i)
    expect(BLACK_HOLE_NOTICE).toMatch(/disco/i)
    expect(BLACK_HOLE_NOTICE).not.toBe(SCALE_NOTICE)
  })
```

Acrescente a `src/utils/sceneReadout.test.js`, dentro do `describe` existente:

```js
  it('warns that the black hole appearance is illustrative, and only there', () => {
    const blackHole = destinations.find(({ id }) => id === 'sagittarius-a-star')
    const earth = destinations.find(({ id }) => id === 'earth')

    expect(buildSceneReadout(blackHole).appearanceNotice).toMatch(/ilustrativ/i)
    expect(buildSceneReadout(earth).appearanceNotice).toBeNull()
  })
```

(se `destinations` ainda não estiver importado nesse arquivo, acrescente `import { destinations } from '../content/destinations.js'`).

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `npx vitest run src/scene/blackHole.test.js src/content/notices.test.js src/utils/sceneReadout.test.js`
Expected: FAIL — `Failed to resolve import "./blackHole.js"`, `BLACK_HOLE_NOTICE` indefinido, `appearanceNotice` indefinido.

- [ ] **Step 3: Escrever a parte pura**

Crie `src/scene/blackHole.js`:

```js
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
```

Em `src/content/notices.js`, acrescente:

```js
export const BLACK_HOLE_NOTICE =
  'O disco dobrado sobre a sombra é uma representação ilustrativa do efeito de lente gravitacional, desenhada por geometria.'
```

- [ ] **Step 4: Levar o aviso ao readout**

Em `src/utils/sceneReadout.js`:

```js
import { BLACK_HOLE_NOTICE, SCALE_NOTICE } from '../content/notices.js'

// Corpos cuja aparência precisa de um aviso próprio, além do de escala.
const APPEARANCE_NOTICES = Object.freeze({
  'sagittarius-a-star': BLACK_HOLE_NOTICE,
})

export function buildSceneReadout(destination) {
  return {
    name: destination.name,
    kind: destination.coordinates.kind,
    entries: destination.coordinates.entries.map(({ label, value }) => ({ label, value })),
    scaleNotice: SCALE_NOTICE,
    appearanceNotice: APPEARANCE_NOTICES[destination.id] ?? null,
  }
}
```

Em `src/components/SceneReadout.jsx`, logo depois do `<p className="scene-readout__notice" …>` existente:

```jsx
      {readout.appearanceNotice && (
        <p className="scene-readout__notice" role="note">{readout.appearanceNotice}</p>
      )}
```

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/scene/blackHole.test.js src/content/notices.test.js src/utils/sceneReadout.test.js`
Expected: PASS.

- [ ] **Step 6: Escrever o adaptador**

Crie `src/scene/BlackHole.jsx`:

```jsx
// Quatro peças, na ordem em que a imagem se lê: sombra, anel de fótons, disco
// de acreção inclinado e o arco dobrado por cima da sombra.

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { BLACK_HOLE_GEOMETRY, buildDiscBrightness } from './blackHole.js'

const NO_RAYCAST = () => null
const DISC_SEGMENTS = 96

// Frio e quente do gradiente Doppler: o lado que se aproxima puxa para o azul.
const DISC_COOL = new THREE.Color('#c0561c')
const DISC_HOT = new THREE.Color('#cfe4ff')

function useDiscGeometry(radius, inner, outer, segments) {
  return useMemo(() => {
    const geo = new THREE.RingGeometry(radius * inner, radius * outer, segments, 1)
    const position = geo.attributes.position
    const colors = new Float32Array(position.count * 3)
    const brightness = buildDiscBrightness(segments)
    const colour = new THREE.Color()

    for (let i = 0; i < position.count; i++) {
      // RingGeometry percorre o anel por ângulo; o ângulo de cada vértice sai
      // da própria posição, o que dispensa reimplementar a topologia.
      const angle = Math.atan2(position.getY(i), position.getX(i))
      const t = brightness[Math.round(((angle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * segments) % segments]

      colour.copy(DISC_COOL).lerp(DISC_HOT, t)
      colors[i * 3] = colour.r
      colors[i * 3 + 1] = colour.g
      colors[i * 3 + 2] = colour.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [radius, inner, outer, segments])
}

// O anel de fótons e o arco dobrado são contornos vistos de frente: giram para
// acompanhar a câmera, como o halo.
function Billboard({ children }) {
  const ref = useRef(null)

  useFrame(({ camera }) => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion)
  })

  return <group ref={ref}>{children}</group>
}

export function BlackHole({ radius, appearance }) {
  const { shadow, photonInner, photonOuter, discInner, discOuter, discTilt, foldInner, foldOuter } =
    BLACK_HOLE_GEOMETRY

  const discGeometry = useDiscGeometry(radius, discInner, discOuter, DISC_SEGMENTS)

  return (
    <group>
      {/* Sombra: preto puro, sem material emissivo. */}
      <mesh raycast={NO_RAYCAST}>
        <sphereGeometry args={[radius * shadow, 32, 24]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <Billboard>
        {/* Anel de fótons: o contorno brilhante da sombra. */}
        <mesh raycast={NO_RAYCAST}>
          <ringGeometry args={[radius * photonInner, radius * photonOuter, 96]} />
          <meshBasicMaterial
            color={appearance.halo?.color ?? '#ffc27a'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Arco dobrado: o topo do disco visto por cima da sombra. Meia volta
            só, e desenhado sem teste de profundidade para ficar por cima. */}
        <mesh raycast={NO_RAYCAST} rotation={[0, 0, Math.PI]}>
          <ringGeometry args={[radius * foldInner, radius * foldOuter, 64, 1, 0, Math.PI]} />
          <meshBasicMaterial
            color="#ffb060"
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      </Billboard>

      {/* Disco de acreção: inclinado, com a assimetria Doppler nas cores de
          vértice. */}
      <mesh geometry={discGeometry} rotation={[discTilt, 0, 0]} raycast={NO_RAYCAST}>
        <meshBasicMaterial
          vertexColors
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  )
}
```

`foldInner` e `foldOuter` alimentam o `ringGeometry` do arco dobrado, e `useDiscGeometry` serve só ao disco de acreção — o arco não precisa do gradiente Doppler, porque é o mesmo gás visto de cima.

- [ ] **Step 7: Desenhar o buraco negro no lugar da esfera**

Em `src/scene/CelestialBodies.jsx`, acrescente:

```js
import { BlackHole } from './BlackHole.jsx'
```

```js
    const isBlackHole = category === 'black-hole'
```

e, dentro do `<SpinningGroup>`, antes da malha de ponteiro:

```jsx
          {isBlackHole && <BlackHole radius={radius} appearance={appearance} />}
```

A malha de ponteiro passa a ser invisível para o buraco negro, como já é para os corpos com superfície:

```js
    const usesOwnArt = hasSurface || isBlackHole
```

trocando `hasSurface` por `usesOwnArt` nas três ocorrências dentro do `<mesh>` de ponteiro (raio, escolha do material e material invisível), e mantendo `hasSurface` só na linha do `<BodySurface>`.

- [ ] **Step 8: Conferir na tela**

Run: `npm run dev` — viaje até Sagittarius A*.

Expected: uma sombra preta redonda, um anel brilhante bem junto dela, um disco inclinado visivelmente mais claro e azulado de um lado, um arco passando por cima da sombra, e o readout mostrando os dois avisos — o de escala e o de representação do disco dobrado. Orbitando, o anel e o arco continuam de frente para a câmera; o disco continua inclinado.

- [ ] **Step 9: Verificação e commit**

Run: `npm test && npm run build && npm run lint`
Expected: tudo verde.

```bash
git add src/scene/blackHole.js src/scene/blackHole.test.js src/scene/BlackHole.jsx src/content/notices.js src/content/notices.test.js src/utils/sceneReadout.js src/utils/sceneReadout.test.js src/components/SceneReadout.jsx src/scene/CelestialBodies.jsx
git commit -m "feat(scene): build Sagittarius A-star out of geometry"
```

---

### Task 17: Responsividade, roteiro manual e registro da fase

Última tarefa: percorrer a interface inteira com texto maior e alto contraste ligados, confirmar o desempenho qualitativo em celular e registrar a fase.

**Files:**
- Modify: `src/index.css` (correções encontradas no roteiro)
- Modify: `CLAUDE.md` ("Estado atual")
- Modify: `README.md` (link do plano)
- Modify: `PLAN.md` (Fase 5 concluída)

- [ ] **Step 1: Roteiro de teclado e foco**

Run: `npm run dev`, em desktop.

1. Abrir Configurações **pelo teclado**, sem tocar no mouse.
2. Percorrer todos os controles com Tab, ida e volta (Shift+Tab); o foco nunca escapa do diálogo.
3. Fechar com Esc; o foco volta ao botão "Configurações".
4. Repetir fechando pelo clique fora e pelo botão "Fechar": nos três casos o foco volta ao mesmo lugar.

Qualquer falha aqui é um defeito da Task 6 — corrija em `SettingsPanel.jsx` e some a correção ao commit desta tarefa.

- [ ] **Step 2: Roteiro de preferências**

1. Alterar **cada** preferência e confirmar efeito visível imediato:
   - Som: a caixa marca e a nota de "reservado" continua visível; nenhum som toca.
   - Viagem: completa, curta e imediata, conferidas em uma viagem cada.
   - Movimento: reduzido para a cena; completo volta a girar; "seguir o sistema" acompanha o SO.
   - Texto: maior aumenta tudo proporcionalmente.
   - Contraste: alto opaca os painéis.
   - Rótulos: ocultos, ao apontar, sempre visíveis.
2. Recarregar a página: **todas** as sete preferências sobreviveram.
3. No DevTools, corromper o armazenamento e recarregar:
   ```js
   localStorage.setItem('kepler-lab:preferences', '{"version":2,"labels":"shout"}')
   ```
   Expected: a página abre com todos os padrões, sem erro no console, e o onboarding reaparece (era o que a v2 corrompida perdeu).
4. Simular a v1 e recarregar:
   ```js
   localStorage.setItem('kepler-lab:preferences', '{"version":1,"hasSeenOnboarding":true}')
   ```
   Expected: o onboarding **não** reaparece e as demais preferências estão nos padrões.

- [ ] **Step 3: Roteiro de leitor de tela**

Com rótulos em "Ocultos", usando o leitor de tela do sistema (Narrador no Windows, VoiceOver no macOS):

1. Tab até o readout no canto inferior esquerdo: ele anuncia o nome e as coordenadas do destino selecionado.
2. Selecionar outro destino pela barra lateral: o readout muda e é anunciado.
3. Em Sagittarius A*, os dois avisos — escala e disco dobrado — são lidos.

Se algum deles não for anunciado, é defeito da Task 11 ou da 16.

- [ ] **Step 4: Roteiro de texto maior e alto contraste**

Com **os dois** ligados, percorra cada superfície procurando texto cortado, sobreposto ou ilegível: barra lateral e busca, cartão inferior, painel de destino expandido com fórmula revelada, readout, sobreposição de viagem, onboarding, painel de Configurações, rótulos de cena.

Correções vão em `src/index.css`; prefira `min-width`, `flex-wrap` e `overflow-y: auto` a fixar tamanhos em pixel — o ponto de texto maior é justamente que os tamanhos acompanhem.

- [ ] **Step 5: Roteiro de celular**

No DevTools, 390 × 844, com *CPU throttling* 4×:

1. O painel de Configurações cabe na tela, rola, e não cobre a cena inteira.
2. A cena continua respondendo ao toque: orbitar, tocar num corpo para selecionar, tocar de novo para viajar.
3. Com rótulos "sempre visíveis", os nomes não se empilham a ponto de esconder os corpos.
4. Viajar até Júpiter, Sgr A* e a Via Láctea — os três corpos com mais geometria — e confirmar que a cena continua respondendo ao toque durante e depois da viagem.

Desempenho é avaliado qualitativamente nesta fase: a cena continua responsiva. Não há instrumentação de métricas, e não se deve acrescentar nenhuma aqui.

Se a cena travar, reduza `STARFIELD_COUNT` em `src/scene/starfield.js` e os `count` de partículas em `src/scene/appearance.js` — é para isso que os dois orçamentos estão cada um em um lugar só — e registre o número final no commit.

- [ ] **Step 6: Atualizar a documentação**

Em `CLAUDE.md`, substitua o parágrafo de "Estado atual" por:

```markdown
[`PLAN.md`](./PLAN.md) foi aprovado em 16/09/2026. As cinco fases do MVP estão concluídas: catálogo, cena e navegação, viagem e descoberta, conteúdo e interface, e acabamento e acessibilidade. O desenho da Fase 5 está em `docs/superpowers/specs/2026-09-17-phase-5-polish-accessibility-design.md` e o plano detalhado, com todas as tarefas marcadas, em [`docs/superpowers/plans/2026-09-17-phase-5-polish-accessibility.md`](./docs/superpowers/plans/2026-09-17-phase-5-polish-accessibility.md). Os itens deliberadamente adiados estão na seção "Pós-MVP" do desenho da Fase 5.
```

Em `README.md`, depois da linha do plano da Fase 4:

```markdown
- [Plano detalhado da Fase 5](./docs/superpowers/plans/2026-09-17-phase-5-polish-accessibility.md)
```

Em `PLAN.md`, marque a Fase 5 como concluída no mesmo formato usado pelas fases anteriores (confira com `grep -n "Fase 4" PLAN.md` antes de editar).

- [ ] **Step 7: Verificação final**

Run: `npm test && npm run build && npm run lint && git diff --check`
Expected: tudo verde, sem espaços sobrando.

- [ ] **Step 8: Commit**

```bash
git add src/index.css CLAUDE.md README.md PLAN.md
git commit -m "docs(scene): record phase five completion"
```

---

## Cobertura do desenho

| Seção do desenho | Onde vive |
| --- | --- |
| Esquema v2 e migração da v1 | Task 1 |
| Funções puras de preferências | Task 1 |
| `PreferencesProvider` e `usePreferences` | Task 3 |
| Apresentação por CSS, estado por props | Tasks 4 e 11 |
| `travel` como argumento de `startTravel` | Tasks 2 e 6 |
| Painel de Configurações | Tasks 5 e 6 |
| Perfis de aparência | Tasks 7 e 15 |
| `Halo.jsx` | Task 8 |
| `Starfield.jsx` | Task 9 |
| `CategoryEffects.jsx` | Task 10 |
| `CelestialBodies.jsx` encolhe | Tasks 8, 13 e 16 |
| Orçamento de desempenho | Tasks 9, 10 e 17 |
| Movimento reduzido até a cena | Tasks 7 e 11 |
| Rótulos `none`/`hover`/`always` | Task 11 |
| Primitivas que faltam | Tasks 12, 13 e 14 |
| Acabamento por corpo | Tasks 13, 14 e 15 |
| Buraco negro | Task 16 |
| Testes sem WebGL | Tasks 1, 2, 5, 7, 9, 10, 11, 12, 13, 14, 16 |
| Verificação manual | Task 17 |
| Pós-MVP | fora do plano, por decisão do desenho |
