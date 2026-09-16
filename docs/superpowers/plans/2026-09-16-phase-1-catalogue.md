# Fase 1 — Fundação e catálogo: plano de implementação

> **Para agentes de implementação:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. As etapas usam caixas de seleção (`- [ ]`) para acompanhamento.

**Objetivo:** concluir a fundação de conteúdo do Kepler Lab com os 22 destinos previstos, conteúdo progressivo em pt-BR, dados científicos citados, busca local e validação automatizada independente de React e WebGL.

**Arquitetura:** `src/content/` contém somente dados e validação pura; `src/utils/` contém normalização e busca pura. Cada destino implementa um contrato único consumido futuramente pela interface e pela cena, sem importar React, Three.js, DOM ou APIs do navegador.

**Stack:** JavaScript com módulos ES, Vitest 5, Oxlint, Node.js 22.12+ ou 24+.

**Especificação:** `specs/product-spec.md`; roteiro geral: `PLAN.md`.

## Progresso de execução

Fase em andamento. Tarefas 1–3 concluídas e revisadas; Tarefas 4–6 pendentes.

- `cc1d5a7` — contrato progressivo e estrito.
- `e4cd06e` — destinos do Sistema Solar interior.
- `44c9f7f` — destinos do Sistema Solar exterior.
- Estado verificado após a Tarefa 3: 15 destinos, 27 testes aprovados, lint e build aprovados.

## Restrições globais

- Interface e conteúdo em pt-BR; identificadores do código em inglês.
- O catálogo deve conter exatamente os 22 destinos definidos em `specs/product-spec.md`.
- Todo destino deve ter pelo menos uma fonte científica ou institucional acessível por HTTPS.
- Tamanhos, distâncias ou velocidades adaptados futuramente pela cena devem ser identificados como ilustrativos; o catálogo armazena dados científicos, não coordenadas visuais adaptadas.
- Conteúdo, validação, busca e formatação não podem importar React, Three.js, DOM nem APIs do navegador.
- Não adicionar dependências nesta fase.
- Não mutar o catálogo nem seus objetos durante busca ou validação.
- Antes de concluir cada tarefa, executar o teste focal; ao concluir a fase, executar `npm.cmd test`, `npm.cmd run lint` e `npm.cmd run build` no Windows/PowerShell.

## Estrutura de arquivos

- Modificar `src/content/destinations.js`: catálogo estático e curado dos 22 destinos.
- Modificar `src/content/validateCatalogue.js`: contrato e mensagens de validação do catálogo.
- Modificar `src/content/validateCatalogue.test.js`: testes unitários do contrato e do catálogo real.
- Modificar `src/utils/search.js`: indexação dos novos campos textuais sem alterar o ranqueamento principal.
- Modificar `src/utils/search.test.js`: testes de conteúdo progressivo, aliases e não mutação.
- Criar `src/content/catalogue.test.js`: testes de cobertura nominal, contagem e integridade editorial do catálogo de lançamento.
- Modificar `AGENT_ISSUES.md`: registrar evidências e mover a Fase 1 para concluída somente após todas as verificações.

## Contrato de destino produzido por esta fase

```js
{
  id: 'earth',
  name: 'Terra',
  aliases: ['nosso planeta', 'planeta azul'],
  category: 'planet',
  type: 'Planeta rochoso',
  region: 'Sistema Solar',
  summary: 'Frase curta exibida em resultados de busca.',
  featured: true,
  impact: 'Frase de impacto curta para o cabeçalho.',
  overview: 'Conteúdo acessível da seção Conhecer.',
  physics: {
    explanation: 'Explicação em linguagem comum.',
    formula: {
      expression: 'g = GM / r²',
      variables: [
        { symbol: 'g', meaning: 'aceleração gravitacional', value: '9,8 m/s²' },
      ],
      interpretation: 'Leitura simples do resultado para este destino.',
    },
  },
  history: 'Curiosidades, observação, nomenclatura ou cultura.',
  facts: [{ label: 'Raio médio', value: '6.371 km' }],
  sources: [{ title: 'Earth Fact Sheet', publisher: 'NASA', url: 'https://...' }],
}
```

`physics.formula` é opcional quando uma fórmula contextualizada não acrescenta compreensão adequada. Quando presente, `expression`, `variables` e `interpretation` são obrigatórios. `impact`, `overview`, `physics.explanation` e `history` são obrigatórios em todos os destinos.

---

### Tarefa 1: tornar o contrato completo e estrito

**Arquivos:**

- Modificar: `src/content/validateCatalogue.test.js`
- Modificar: `src/content/validateCatalogue.js`
- Modificar: `src/content/destinations.js`

**Interfaces:**

- Consome: `normalizeText(value)` e `DESTINATION_CATEGORIES`.
- Produz: `validateCatalogue(destinations): string[]`, aceitando o contrato documentado acima e retornando mensagens legíveis.

- [x] **Etapa 1: escrever testes que falhem para os novos campos e formatos**

Atualizar `makeDestination()` com `impact`, `overview`, `physics` e `history`, e adicionar testes equivalentes a:

```js
it('requires the progressive content fields', () => {
  const destination = makeDestination({
    impact: '',
    overview: undefined,
    physics: { explanation: '' },
    history: '',
  })

  expect(validateCatalogue([destination])).toEqual(
    expect.arrayContaining([
      'earth: "impact" must be a non-empty string',
      'earth: "overview" must be a non-empty string',
      'earth: physics.explanation must be a non-empty string',
      'earth: "history" must be a non-empty string',
    ]),
  )
})

it('requires kebab-case ids', () => {
  expect(validateCatalogue([makeDestination({ id: 'Earth Planet' })])).toContain(
    'Earth Planet: "id" must use kebab-case',
  )
})

it('validates an optional contextualized formula', () => {
  const physics = {
    explanation: 'A gravidade depende da massa e do raio.',
    formula: { expression: '', variables: [], interpretation: '' },
  }

  expect(validateCatalogue([makeDestination({ physics })])).toEqual(
    expect.arrayContaining([
      'earth: physics.formula.expression must be a non-empty string',
      'earth: physics.formula.variables must have at least one item',
      'earth: physics.formula.interpretation must be a non-empty string',
    ]),
  )
})
```

- [x] **Etapa 2: executar o teste focal e confirmar a falha**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js`

Resultado esperado: falhas referentes aos campos progressivos, ao formato do ID e à fórmula ainda não validados.

- [x] **Etapa 3: implementar a validação mínima**

Em `validateCatalogue.js`, incluir `impact`, `overview` e `history` nos campos textuais obrigatórios; exigir `physics.explanation`; validar IDs com `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`; e, quando `physics.formula` existir, validar:

```js
const formula = destination.physics?.formula
if (formula !== undefined) {
  if (!isNonEmptyString(formula.expression)) {
    errors.push('physics.formula.expression must be a non-empty string')
  }
  if (!Array.isArray(formula.variables) || formula.variables.length === 0) {
    errors.push('physics.formula.variables must have at least one item')
  }
  for (const [index, variable] of (formula.variables ?? []).entries()) {
    if (
      !isNonEmptyString(variable?.symbol) ||
      !isNonEmptyString(variable?.meaning) ||
      !isNonEmptyString(variable?.value)
    ) {
      errors.push(
        `physics.formula.variables[${index}] must have a non-empty symbol, meaning and value`,
      )
    }
  }
  if (!isNonEmptyString(formula.interpretation)) {
    errors.push('physics.formula.interpretation must be a non-empty string')
  }
}
```

Atualizar Terra e Sagittarius A* em `destinations.js` com conteúdo factual para os novos campos, mantendo quatro ou cinco fatos e suas fontes atuais.

- [x] **Etapa 4: executar o teste focal e confirmar aprovação**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js`

Resultado esperado: arquivo de teste aprovado sem mensagens de validação para o catálogo real.

- [x] **Etapa 5: criar commit da tarefa**

```powershell
git add src/content/validateCatalogue.js src/content/validateCatalogue.test.js src/content/destinations.js
git commit -m "feat(content): validate progressive destination content"
```

---

### Tarefa 2: cadastrar os destinos do Sistema Solar interior

**Arquivos:**

- Modificar: `src/content/destinations.js`
- Modificar: `src/content/validateCatalogue.test.js`

**Interfaces:**

- Consome: contrato validado por `validateCatalogue()`.
- Produz: objetos `sun`, `mercury`, `venus`, `moon` e `mars`.

- [x] **Etapa 1: adicionar um teste focal para o lote**

```js
it('validates the inner Solar System content batch', () => {
  const ids = ['sun', 'mercury', 'venus', 'moon', 'mars']
  const batch = destinations.filter(({ id }) => ids.includes(id))

  expect(batch).toHaveLength(ids.length)
  expect(validateCatalogue(batch)).toEqual([])
})
```

- [x] **Etapa 2: executar o teste focal e confirmar que faltam cinco destinos**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js -t "inner Solar System"`

Resultado esperado: `batch` tem tamanho `0`, não `5`.

- [x] **Etapa 3: cadastrar o lote com conteúdo completo**

Adicionar os cinco objetos usando o contrato desta fase. Usar aliases populares inequívocos; quatro ou cinco fatos por destino; e fontes primárias ou institucionais, priorizando NASA Solar System Exploration e NASA Science. Cada `physics.formula`, quando usada, deve empregar valores já exibidos nos fatos do mesmo objeto e explicar o resultado sem exigir matemática prévia.

- [x] **Etapa 4: executar validação e teste editorial**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js`

Resultado esperado: todos os testes do validador passam, incluindo o lote com cinco destinos.

- [x] **Etapa 5: criar commit do lote**

```powershell
git add src/content/destinations.js src/content/validateCatalogue.test.js
git commit -m "feat(content): add inner Solar System destinations"
```

---

### Tarefa 3: cadastrar os destinos do Sistema Solar exterior

**Arquivos:**

- Modificar: `src/content/destinations.js`
- Modificar: `src/content/validateCatalogue.test.js`

**Interfaces:**

- Consome: contrato validado por `validateCatalogue()`.
- Produz: objetos `jupiter`, `europa`, `io`, `saturn`, `titan`, `uranus`, `neptune` e `pluto`.

- [x] **Etapa 1: adicionar um teste focal para o lote**

```js
it('validates the outer Solar System content batch', () => {
  const ids = ['jupiter', 'europa', 'io', 'saturn', 'titan', 'uranus', 'neptune', 'pluto']
  const batch = destinations.filter(({ id }) => ids.includes(id))

  expect(batch).toHaveLength(ids.length)
  expect(validateCatalogue(batch)).toEqual([])
})
```

- [x] **Etapa 2: executar o teste focal e confirmar que faltam oito destinos**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js -t "outer Solar System"`

Resultado esperado: `batch` tem tamanho `0`, não `8`.

- [x] **Etapa 3: cadastrar o lote com conteúdo completo**

Adicionar os oito objetos com quatro ou cinco fatos, aliases inequívocos e fontes institucionais. Para Europa, Io e Titan, distinguir claramente lua, planeta orbitado e fenômeno físico principal. Para Plutão, usar a categoria `dwarf-planet` e explicar a classificação sem tratá-la como rebaixamento científico.

- [x] **Etapa 4: executar validação e teste editorial**

Executar: `npm.cmd test -- src/content/validateCatalogue.test.js`

Resultado esperado: todos os testes do validador passam, incluindo os lotes interior e exterior.

- [x] **Etapa 5: criar commit do lote**

```powershell
git add src/content/destinations.js src/content/validateCatalogue.test.js
git commit -m "feat(content): add outer Solar System destinations"
```

---

### Tarefa 4: cadastrar estrelas, nebulosas e regiões galácticas

**Arquivos:**

- Modificar: `src/content/destinations.js`
- Modificar: `src/content/validateCatalogue.test.js`
- Criar: `src/content/catalogue.test.js`

**Interfaces:**

- Consome: contrato validado por `validateCatalogue()`.
- Produz: objetos `alpha-centauri`, `sirius`, `betelgeuse`, `orion-nebula`, `crab-nebula`, `galactic-center` e `milky-way`.

- [ ] **Etapa 1: criar o teste editorial completo, que falha pelos sete destinos ausentes**

Criar `catalogue.test.js` com a lista nominal aprovada:

```js
import { describe, expect, it } from 'vitest'

import { destinations } from './destinations.js'

const LAUNCH_DESTINATION_IDS = [
  'sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'europa', 'io',
  'saturn', 'titan', 'uranus', 'neptune', 'pluto',
  'alpha-centauri', 'sirius', 'betelgeuse', 'orion-nebula', 'crab-nebula',
  'sagittarius-a-star', 'galactic-center', 'milky-way',
]

describe('launch catalogue', () => {
  it('contains exactly the 22 approved destinations', () => {
    expect(destinations.map(({ id }) => id).sort()).toEqual(
      [...LAUNCH_DESTINATION_IDS].sort(),
    )
  })

  it('validates the stellar and galactic content batch', () => {
    const ids = [
    'alpha-centauri',
    'sirius',
    'betelgeuse',
    'orion-nebula',
    'crab-nebula',
    'galactic-center',
    'milky-way',
    ]
    const batch = destinations.filter(({ id }) => ids.includes(id))

    expect(batch).toHaveLength(ids.length)
  })

  it('keeps every source attributable and secure', () => {
    for (const destination of destinations) {
      expect(destination.sources.length).toBeGreaterThan(0)
      for (const source of destination.sources) {
        expect(source.publisher).not.toHaveLength(0)
        expect(source.url).toMatch(/^https:\/\//)
      }
    }
  })
})
```

- [ ] **Etapa 2: executar o teste focal e confirmar que faltam sete destinos**

Executar: `npm.cmd test -- src/content/catalogue.test.js`

Resultado esperado: a comparação nominal e o lote galáctico falham pelos sete destinos ausentes.

- [ ] **Etapa 3: cadastrar o lote com conteúdo completo**

Adicionar os sete objetos, distinguindo Alpha Centauri como sistema estelar, o Centro Galáctico como região e Sagittarius A* como objeto dentro dessa região. Para distâncias e dimensões com incerteza ou aproximação, usar qualificadores como “cerca de” e evitar precisão maior que a fornecida pela fonte. Priorizar NASA, ESA, ESO, Chandra e páginas institucionais de observatórios.

- [ ] **Etapa 4: executar os testes focal e editorial**

Executar:

```powershell
npm.cmd test -- src/content/catalogue.test.js
npm.cmd test -- src/content/validateCatalogue.test.js
```

Resultado esperado: ambos passam; o catálogo contém exatamente os 22 IDs aprovados.

- [ ] **Etapa 5: criar commit do lote**

```powershell
git add src/content/destinations.js src/content/validateCatalogue.test.js src/content/catalogue.test.js
git commit -m "feat(content): complete launch destination catalogue"
```

---

### Tarefa 5: integrar o conteúdo progressivo à busca local

**Arquivos:**

- Modificar: `src/utils/search.test.js`
- Modificar: `src/utils/search.js`

**Interfaces:**

- Consome: destinos com `name`, `aliases`, `type`, `region`, `summary`, `impact`, `overview`, `physics.explanation` e `history`.
- Produz: `searchDestinations(destinations, query): destination[]` sem mutação, preservando o ranqueamento nome/alias → tipo/região → resumo → conteúdo aprofundado.

- [ ] **Etapa 1: escrever testes de pesquisa nos novos campos**

```js
it('finds lower-priority matches in progressive content', () => {
  const destination = {
    ...earth,
    impact: 'Um ponto azul no espaço.',
    overview: 'A biosfera transforma o planeta.',
    physics: { explanation: 'A magnetosfera desvia partículas carregadas.' },
    history: 'A missão Apollo fotografou a Terra inteira.',
  }

  expect(ids(searchDestinations([destination], 'magnetosfera'))).toEqual(['earth'])
  expect(ids(searchDestinations([destination], 'Apollo'))).toEqual(['earth'])
})

it('keeps summary matches ahead of progressive content matches', () => {
  const summaryMatch = { ...earth, id: 'summary', summary: 'Magnetosfera terrestre' }
  const contentMatch = {
    ...earth,
    id: 'content',
    summary: 'Planeta rochoso',
    physics: { explanation: 'A magnetosfera protege o planeta.' },
  }

  expect(ids(searchDestinations([contentMatch, summaryMatch], 'magnetosfera'))).toEqual([
    'summary',
    'content',
  ])
})
```

- [ ] **Etapa 2: executar o teste focal e confirmar a falha**

Executar: `npm.cmd test -- src/utils/search.test.js`

Resultado esperado: a busca ainda não encontra `physics.explanation` nem `history`.

- [ ] **Etapa 3: implementar a camada de menor prioridade**

Adicionar `progressiveContent: 5` a `RANK` e, depois do teste de `summary`, pesquisar:

```js
const progressiveContent = [
  destination.impact,
  destination.overview,
  destination.physics?.explanation,
  destination.history,
].map(normalizeText)

if (progressiveContent.some((content) => content.includes(query))) {
  return RANK.progressiveContent
}
```

Não indexar expressões matemáticas, valores dos fatos nem URLs.

- [ ] **Etapa 4: executar testes de busca e catálogo**

Executar:

```powershell
npm.cmd test -- src/utils/search.test.js
npm.cmd test -- src/content
```

Resultado esperado: todos os testes aprovados e catálogo sem mutação.

- [ ] **Etapa 5: criar commit da tarefa**

```powershell
git add src/utils/search.js src/utils/search.test.js
git commit -m "feat(search): index progressive destination content"
```

---

### Tarefa 6: auditoria editorial e encerramento da Fase 1

**Arquivos:**

- Modificar: `src/content/catalogue.test.js`
- Modificar: `AGENT_ISSUES.md`

**Interfaces:**

- Consome: catálogo final e todos os validadores/testes.
- Produz: evidência reproduzível de conclusão da Fase 1 e próximo passo explícito para a Fase 2.

- [ ] **Etapa 1: acrescentar garantias contra conteúdo provisório e fontes duplicadas**

Adicionar a `catalogue.test.js`:

```js
it('contains no editorial placeholders', () => {
  const serialized = JSON.stringify(destinations)

  expect(serialized).not.toMatch(/\b(?:TBD|TODO|lorem ipsum)\b/i)
})

it('does not repeat a source URL inside one destination', () => {
  for (const destination of destinations) {
    const urls = destination.sources.map(({ url }) => url)
    expect(new Set(urls).size).toBe(urls.length)
  }
})
```

- [ ] **Etapa 2: executar toda a validação automatizada**

Executar:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git diff --check
```

Resultado esperado: 100% dos testes aprovados, lint sem diagnósticos, build Vite concluído e `git diff --check` sem saída de erro.

- [ ] **Etapa 3: realizar auditoria manual das fontes e do texto**

Para cada um dos 22 destinos:

1. Abrir cada URL cadastrada e confirmar título, publicador e relação direta com os fatos usados.
2. Comparar números, unidades e qualificadores do objeto com a fonte.
3. Confirmar que `overview`, `physics.explanation` e `history` não fazem afirmações científicas sem apoio nas fontes do objeto.
4. Confirmar pt-BR, linguagem acessível e ausência de promessa de escala real.
5. Confirmar que aliases não colidem; executar `validateCatalogue(destinations)` por meio dos testes.

- [ ] **Etapa 4: atualizar o registro do projeto**

Em `AGENT_ISSUES.md`, mover `AI-001` apenas se seu escopo tiver sido redefinido para a Fase 1; caso continue representando o MVP inteiro, mantê-lo em andamento e substituir `Next` por “iniciar o plano detalhado da Fase 2 — cena e navegação”. Registrar como evidência as contagens finais dos testes e os comandos aprovados.

- [ ] **Etapa 5: criar commit de encerramento**

```powershell
git add src/content/catalogue.test.js AGENT_ISSUES.md
git commit -m "chore(content): verify phase one catalogue"
```

## Critérios de conclusão

- `destinations` contém exatamente os 22 IDs aprovados.
- Cada destino possui as quatro camadas editoriais, quatro ou cinco fatos e pelo menos uma fonte HTTPS atribuída.
- Fórmulas presentes são opcionais, contextualizadas e explicadas em linguagem simples.
- Busca encontra nomes, aliases, tipo, região, resumo e conteúdo progressivo com ranqueamento previsível.
- Catálogo, busca e validação continuam independentes de React, Three.js, DOM e APIs do navegador.
- `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build` e `git diff --check` são aprovados.
- A auditoria manual confirma que todas as afirmações e unidades são sustentadas pelas fontes cadastradas.
