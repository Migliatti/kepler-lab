# Fase 4 — Conteúdo e interface

> Desenho aprovado em 17/09/2026. Implementa a Fase 4 de [`PLAN.md`](../../../PLAN.md), conforme [`specs/product-spec.md`](../../../specs/product-spec.md).

## Objetivo

Entregar o conteúdo progressivo de cada destino e a interface que o apresenta: painel de destino, dados científicos persistentes, fórmulas reveladas sob demanda, fontes, aviso de escala e onboarding.

As Fases 1 a 3 já entregaram o catálogo de 22 destinos, a cena 3D, a navegação lateral, a busca e a viagem de câmera. Esta fase consome esse estado; não altera a cena nem as regras de viagem.

## Escopo

Dentro:

- extensão do modelo de conteúdo com curiosidades estruturadas e fórmulas contextualizadas;
- aviso de escala ilustrativa compartilhado;
- painel de destino com as quatro seções da spec de produto;
- superfície de dados científicos ancorada na borda direita;
- onboarding de três telas com persistência local versionada;
- botão de Ajuda que reabre o onboarding.

Fora (Fase 5):

- som ambiente, movimento reduzido, texto maior, alto contraste e rótulos descritivos;
- acabamento 3D estilizado, materiais procedurais, halos e partículas;
- validação de desempenho e responsividade final.

## Modelo de conteúdo

### Curiosidades

Cada destino ganha `curiosities`: de 2 a 4 entradas `{ topic, text }`.

`topic` pertence a um vocabulário fechado exportado por `src/content/curiosityTopics.js`:

| topic | rótulo pt-BR |
| --- | --- |
| `discovery` | Descoberta |
| `naming` | Nome e nomenclatura |
| `mythology` | Mitologia e cultura |
| `missions` | Missões e observação |
| `records` | Recordes |
| `phenomena` | Fenômenos notáveis |

O vocabulário é fechado para que o validador possa checá-lo, para que o painel rotule as entradas de forma consistente e para impedir que cada destino invente sua própria taxonomia.

O campo `history` existente permanece e abre a seção "Curiosidades e história" como prosa; as curiosidades vêm depois, rotuladas.

### Fórmulas

`physics.formula` já é aceito pelo validador como campo opcional e hoje nenhum destino o usa. Esta fase o preenche em nove destinos, escolhidos porque a fórmula ensina algo real sobre o objeto:

Sol, Terra, Lua, Júpiter, Saturno, Alpha Centauri, Betelgeuse, Nebulosa do Caranguejo e Sagittarius A*.

Nos treze destinos restantes a ausência é estado normal e previsto: o painel não exibe o controle de revelar fórmula. Forçar uma fórmula em nebulosas e luas produziria conteúdo artificial, contrário ao princípio de rigor científico.

Cada fórmula usa os valores do próprio destino nas variáveis, acompanhada da interpretação em linguagem simples, como o validador já exige.

### Aviso de escala

O aviso não é campo por destino. A distorção de tamanhos e distâncias é propriedade da cena inteira, produzida por `src/scene/layout.js` para todos os corpos. Um novo módulo `src/content/notices.js` exporta o texto único, exibido sempre na seção "Dados e fontes".

Um campo por destino seria vinte e duas cópias do mesmo texto, com vinte e duas chances de divergirem.

### Divisão do catálogo

`src/content/destinations.js` tem 769 linhas. Com curiosidades e fórmulas passa de 1.150, tamanho em que o arquivo deixa de caber confortavelmente em leitura ou edição.

O catálogo passa a ser:

```text
src/content/destinations/solarSystem.js   14 destinos
src/content/destinations/deepSky.js        8 destinos
src/content/destinations.js                concatena e reexporta
```

A ordem do catálogo e todos os imports existentes permanecem idênticos.

### Validação

`validateCatalogue.js` passa a exigir:

- `curiosities` com 2 a 4 entradas;
- cada entrada com `topic` no vocabulário e `text` não vazio.

A fórmula continua opcional, com as regras atuais quando presente.

## Regras de apresentação

`src/utils/destinationPanel.js` expõe `buildDestinationPanel(destination)`, função pura que devolve o cabeçalho e as seções já ordenadas e rotuladas em pt-BR:

```text
cabeçalho       nome, tipo, região, frase de impacto
'conhecer'      overview
'fisica'        explanation, formula quando existir
'curiosidades'  history seguido das curiosities rotuladas
'dados'         facts, sources, aviso de escala
```

A ordem das seções, os rótulos e a decisão de omitir a fórmula vivem nesta função, testada sem WebGL. O componente React é um mapeador de seções para markup: não conhece a ordem nem decide o que existe.

Isso atende ao princípio de testar antes de renderizar e mantém a renderização como consumidora de estado.

## Estado

Três módulos em `src/state/`, com funções puras que retornam novos objetos.

### `panel.js`

A borda direita é uma superfície única com dois estados:

- `card` — cartão de vidro ancorado na borda direita, centralizado verticalmente, mostrando os 4 a 5 `facts` do destino selecionado. Estado padrão, sempre visível, inclusive na Terra ao abrir a aplicação.
- `expanded` — o cartão cresce para o painel completo, ocupando a altura da lateral direita.

Transições: clicar no cartão expande; fechar o painel devolve o cartão; concluir uma viagem expande automaticamente, como a spec de produto exige.

O módulo guarda o modo, a seção em foco ao abrir e quais fórmulas foram reveladas. Cartão e painel são estados de um componente só, e não dois componentes disputando a mesma borda.

No celular a superfície é a folha inferior expansível prevista na spec, com os mesmos dois estados. Borda lateral não funciona em tela estreita.

### `preferences.js`

A camada de persistência local versionada.

- chave `kepler-lab:preferences`;
- campo `version: 1` no objeto gravado;
- `parsePreferences(raw)` é pura e cai nos valores padrão em JSON inválido, versão ausente ou versão diferente;
- apenas `loadPreferences` e `savePreferences` tocam `localStorage`, dentro de `try/catch`, para que indisponibilidade do armazenamento nunca quebre a aplicação.

A Fase 4 grava um único campo: `hasSeenOnboarding`. A Fase 5 estende o mesmo módulo com som, movimento reduzido, texto maior e contraste, sem reescrevê-lo.

Nenhum dado sensível é persistido.

### `onboarding.js`

Máquina pura de três passos, com avançar, pular e concluir. Recebe `'desktop'` ou `'touch'` como argumento porque o texto do passo 2 muda; a detecção de plataforma fica no componente.

Os três passos são os da spec de produto: boas-vindas, orientações de navegação e descoberta de destinos.

## Componentes

### `DestinationPanel.jsx`

Consome `buildDestinationPanel` e renderiza os dois estados da superfície direita. A alternância entre lateral e folha inferior é feita por media query em CSS, sem lógica de layout em JavaScript.

Clicar no cartão expande o painel com foco na seção "Dados e fontes", que é a continuação natural dos fatos mostrados no cartão. Chegar de viagem expande com foco no topo, em "Conhecer".

A navegação lateral esquerda da Fase 3 permanece intocada.

### `Onboarding.jsx`

Três telas puláveis. Concluir ou pular grava `hasSeenOnboarding`.

### Botão de Ajuda

No canto superior direito, reabre o onboarding. Fecha o laço prometido pela spec de produto e custa poucas linhas. Não há central de ajuda nesta fase.

## Conteúdo ausente e erros

Tratado explicitamente, nunca como exceção:

- fórmula ausente esconde o controle de revelar;
- `localStorage` indisponível ou corrompido cai nos valores padrão, em silêncio;
- destino desconhecido cai na Terra, padrão que `App.jsx` já usa.

## Testes

Todos executáveis sem WebGL:

- validador rejeitando curiosidades fora do vocabulário, em número inválido ou com texto vazio;
- catálogo completo checado contra o modelo estendido;
- `buildDestinationPanel`: ordem das seções, omissão da fórmula, presença do aviso de escala em todos os destinos;
- `preferences`: JSON corrompido, versão divergente, ausência de `localStorage` e ida e volta de gravação;
- `onboarding`: progressão, pulo e variação por plataforma;
- `panel`: transições entre `card` e `expanded`, foco de seção e revelação de fórmula.

Verificação da fase, conforme `PLAN.md`: revisão manual dos 22 destinos e de todos os links de fonte, além de `npm test`, `npm run build` e `npm run lint`.

## Critérios de aceite da fase

- Cada um dos 22 destinos abre um painel com as quatro seções, em pt-BR.
- Os dados científicos do destino selecionado estão sempre visíveis na borda direita.
- Fórmulas ficam ocultas por padrão e, quando reveladas, usam os valores do próprio destino.
- Toda representação de escala é informada como ilustrativa.
- Todas as fontes são acessíveis e apontam para publicações confiáveis.
- O onboarding aparece na primeira visita, é pulável e não reaparece após recarga.
- Nenhum módulo de `src/content/` importa React, Three.js ou APIs de navegador.
