# Fase 5 — Acabamento e acessibilidade

> Desenho aprovado em 17/09/2026. Implementa a Fase 5 de [`PLAN.md`](../../../PLAN.md), conforme [`specs/product-spec.md`](../../../specs/product-spec.md).

## Objetivo

Fechar o MVP com três entregas: preferências locais completas, acessibilidade aplicada em toda a interface e acabamento 3D estilizado e procedural dos corpos celestes.

As Fases 1 a 4 entregaram o catálogo de 22 destinos, a cena 3D, a navegação, a busca, a viagem de câmera e o conteúdo progressivo. Esta fase não acrescenta destinos nem seções de conteúdo; ela ajusta como tudo isso é apresentado e dá ao visitante controle sobre essa apresentação.

## Escopo

Dentro:

- esquema de preferências v2, com migração a partir da v1;
- `PreferencesProvider` e `usePreferences`;
- painel de Configurações acessível, aberto por botão ao lado de Ajuda;
- preferências de som (reservada), viagem, movimento reduzido, tamanho de texto, contraste e rótulos;
- acabamento 3D procedural: perfis de aparência por categoria, halos, campo de estrelas e partículas;
- responsividade e desempenho qualitativo em desktop e celular.

Fora:

- **áudio ambiente tocando.** Nesta fase só a preferência existe e persiste; nenhum som é reproduzido;
- **malha de espaço-tempo** e o campo `gravity` no catálogo que ela exige — ver "Pós-MVP";
- **bloom e pós-processamento** — ver "Pós-MVP";
- modo de escala real, explicitamente fora do escopo do MVP;
- texturas hiperrealistas, modelos pesados e qualquer asset carregado da rede.

## Preferências

### Esquema v2

`src/state/preferences.js` sobe para `PREFERENCES_SCHEMA_VERSION = 2`. O módulo continua puro: não importa React, não toca no DOM e não consulta `matchMedia`.

| campo | valores | padrão |
| --- | --- | --- |
| `sound` | `true` \| `false` | `false` |
| `travel` | `'full'` \| `'short'` \| `'instant'` | `'full'` |
| `reducedMotion` | `true` \| `false` \| `null` | `null` (segue o sistema) |
| `textSize` | `'default'` \| `'large'` | `'default'` |
| `contrast` | `'default'` \| `'high'` | `'default'` |
| `labels` | `'none'` \| `'hover'` \| `'always'` | `'hover'` |
| `hasSeenOnboarding` | `true` \| `false` | `false` |

`reducedMotion` guarda três estados porque o sistema só decide o padrão inicial. `null` significa "nunca escolhi, siga o sistema"; uma vez que a pessoa mexa no controle, `true` ou `false` é gravado e passa a valer mesmo contra a preferência do sistema operacional. Um booleano de dois estados não distinguiria "escolhi desligar" de "nunca escolhi", e desligar movimento reduzido seria silenciosamente revertido a cada recarregamento em quem tem a preferência ativa no SO.

### Funções

Todas puras, todas testadas sem DOM:

- `createDefaultPreferences(systemHints)` — recebe `{ prefersReducedMotion: boolean }` como argumento explícito. Quem consulta o navegador é o provider, no mesmo padrão de `detectOnboardingPlatform()` em `src/App.jsx`.
- `parsePreferences(raw, systemHints)` — valida campo a campo.
- `updatePreference(preferences, key, value)` — retorna novo objeto; chave ou valor inválido devolve o objeto original inalterado.
- `resolveReducedMotion(preferences, systemHints)` — converte os três estados no booleano que a cena consome.
- `serializePreferences`, `loadPreferences`, `savePreferences` — como hoje, com a versão nova.

### Robustez e migração

Um valor desconhecido em um campo cai no padrão **daquele campo**, sem invalidar os demais. JSON corrompido ou versão desconhecida cai em todos os padrões.

A v1 guarda apenas `hasSeenOnboarding`. `parsePreferences` reconhece `version: 1`, preserva `hasSeenOnboarding` e preenche o resto com os padrões. Descartar a v1 faria o onboarding reaparecer para quem já o viu.

## Distribuição

### PreferencesProvider

`src/state/PreferencesProvider.jsx` é um adaptador React fino com três responsabilidades:

1. carregar na montagem, passando `{ prefersReducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches }`;
2. persistir a cada mudança;
3. escrever `data-text-size` e `data-contrast` no elemento `<html>` por efeito.

Expõe `usePreferences()`, que devolve `{ preferences, setPreference }`.

### Apresentação por CSS, estado por props

Tamanho de texto e contraste são puramente de apresentação e **não** descem como props. O CSS responde aos atributos do `<html>`, redefinindo os tokens que já existem em `src/index.css`:

- `:root[data-text-size="large"]` aumenta a raiz de 18px para 21px; tudo que usa unidades relativas acompanha;
- `:root[data-contrast="high"]` escurece os fundos de vidro, aumenta a opacidade das bordas e aproxima `--color-text-muted` de `--color-text`. Alto contraste não introduz paleta nova: os painéis glassmorphism perdem translucidez, que é o que atrapalha a legibilidade sobre a cena.

Nenhum componente de interface precisa saber que essas duas preferências existem.

Já `reducedMotion` (resolvido) e `labels` são estado que a cena consome, e descem por props explícitas: `App` → `ExplorationScene` → `CelestialBodies`. Isso preserva o princípio 4 do `CLAUDE.md` — a cena recebe estado, não o descobre.

`travel` vira argumento de `startTravel`, que já aceita a flag hoje em `src/state/travel.js`; o `App` apenas deixa de passar `true` fixo. `'full'` mantém a duração atual de 3000 ms, `'short'` usa 1200 ms e `'instant'` chega já em `arrived` sem animar a câmera. As três durações ficam em um mapa único exportado junto de `CAMERA_TRAVEL_DURATION_MS` em `src/scene/cameraTravel.js`, para que não haja número mágico espalhado.

### Painel de Configurações

`src/components/SettingsPanel.jsx`, overlay aberto por um botão "Configurações" ao lado do botão "Ajuda" existente.

- `role="dialog"` com rótulo acessível, foco preso enquanto aberto, fechamento por Esc e por clique fora, e foco devolvido ao botão que o abriu;
- controles agrupados em `<fieldset>` com `<legend>`: Som, Viagem, Movimento, Texto, Contraste, Rótulos;
- cada controle é rádio ou checkbox **nativo** — o elemento nativo já traz teclado e leitor de tela sem trabalho adicional;
- as escolhas valem no clique, sem botão de confirmar;
- o controle de Som aparece visível porém marcado como reservado ("o som ambiente chega em uma próxima etapa"); a preferência já persiste;
- em telas de celular o painel não cobre a cena inteira.

## Acabamento 3D

### Perfis de aparência

`src/scene/appearance.js` (novo) absorve o `CATEGORY_APPEARANCE` que hoje vive em `src/scene/layout.js` e o expande:

```js
{
  color, emissive, opacity,
  halo:      { scale, opacity, color } | null,
  spin:      radiansPerSecond,
  particles: { count, spread, color } | null,
  ring:      { inner, outer, color } | null,
}
```

`getAppearanceProfile(category, { reducedMotion })` é pura e testada sem WebGL. O anel de Saturno deixa de ser o `if (id === 'saturn')` embutido em `src/scene/CelestialBodies.jsx` e passa a ser dado.

### Adaptadores R3F

Consomem o perfil e nada mais:

- `Halo.jsx` — sprite ou plano com material aditivo, sempre voltado à câmera. É o que dá presença a estrelas, nebulosas e ao buraco negro sem depender de bloom.
- `Starfield.jsx` — campo de estrelas de fundo gerado a partir de uma semente fixa, para que a cena seja determinística entre recargas e entre execuções de teste.
- `CategoryEffects.jsx` — partículas por categoria: poeira em nebulosas, disco no buraco negro.
- `CelestialBodies.jsx` encolhe: continua cuidando de ponteiro, seleção e viagem, e delega aparência.

### Regras da fase

1. **Orçamento de desempenho.** Partículas por instância (`instancedMesh` ou `points`), nunca meshes soltas. O total de pontos do campo de estrelas fica em uma constante única, dimensionada para celular. Nenhuma textura carregada da rede.
2. **Movimento reduzido chega até a cena.** Rotações, pulsações e deriva de partículas param; o corpo continua visível e navegável. Isso é verificável no nível do perfil, sem renderizar.
3. **Rótulos.** `always` desenha o nome junto de cada corpo, via `Html` do drei (já instalado). `hover` mantém o comportamento atual de `src/components/HoverLabel.jsx`. `none` suprime ambos — mas o `SceneReadout` continua anunciando a seleção, senão `none` quebraria o acesso por leitor de tela.

## Testes

Unitários, ao lado do módulo, sem WebGL:

- `preferences.test.js` — padrões a partir de `systemHints`; migração da v1 preservando `hasSeenOnboarding`; valor inválido caindo no padrão do próprio campo sem derrubar os demais; `reducedMotion: null` resolvendo pelo sistema e um valor explícito prevalecendo sobre ele; imutabilidade de `updatePreference`.
- `appearance.test.js` — toda categoria do catálogo tem perfil; movimento reduzido zera `spin` e remove partículas; o anel de Saturno vem do perfil.
- `travel.test.js` — `startTravel` em cada modo; `'instant'` chegando já em `arrived`.

Nenhum teste depende de renderizar Three.js. Os `.jsx` permanecem adaptadores finos exatamente para sustentar isso.

## Verificação manual

Roteiro em desktop e celular:

1. abrir Configurações pelo teclado; percorrer todos os controles com Tab; fechar com Esc; conferir que o foco volta ao botão de Configurações;
2. alterar cada preferência e confirmar efeito visível imediato;
3. recarregar a página e confirmar que todas as preferências sobreviveram;
4. com movimento reduzido ligado, confirmar que a cena para de animar e que a viagem respeita o modo escolhido;
5. com rótulos em `none`, confirmar por leitor de tela que o `SceneReadout` ainda anuncia a seleção;
6. com alto contraste e texto maior ligados, percorrer todos os painéis procurando texto cortado ou ilegível;
7. em celular, confirmar que o painel de Configurações cabe na tela e que a cena continua respondendo ao toque.

Desempenho é avaliado qualitativamente nesta fase — a cena continua responsiva ao toque em celular. Não há instrumentação de métricas.

## Verificação da fase

`npm test`, `npm run build` e `npm run lint` (skill `/verify`), mais o roteiro manual acima.

## Pós-MVP

Itens levantados no desenho desta fase, deliberadamente adiados:

- **Malha de espaço-tempo.** Poço local ancorado no destino selecionado, com profundidade derivada da massa em escala logarítmica, preferência própria para ligar e desligar, e aviso de representação ilustrativa. Depende de um campo novo no catálogo: `gravity: { massEarths, source } | null`, já que hoje a massa existe apenas como texto legível dentro de `facts`. Recebem `null` — e portanto não mostram malha — as nebulosas, a região do centro galáctico e a Via Láctea, cuja massa é difusa ou não pertence a um corpo único.
- **Bloom e pós-processamento** via `@react-three/postprocessing`, para estrelas e núcleo galáctico. Dependência nova, custo de GPU em celular e necessidade de desligamento sob movimento reduzido.
- **Áudio ambiente**, procedural via Web Audio API ou por faixa licenciada, ligado à preferência `sound` já entregue nesta fase.
