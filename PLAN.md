# Plano de implementação — Kepler Lab MVP

## Status

Este plano substitui o plano orbital anterior. Aprovado pelo usuário em 16/09/2026; implementação autorizada conforme as fases e verificações abaixo.

A especificação de produto aprovada durante o planejamento está em [`specs/product-spec.md`](./specs/product-spec.md). As decisões estruturadas estão em [`specs/planning-context.yaml`](./specs/planning-context.yaml).

## Objetivo

Criar uma experiência 3D pt-BR de exploração científica e contemplativa da Via Láctea, começando na Terra. O visitante deve poder descobrir ou buscar destinos, viajar até eles e ler conteúdo progressivo, científico e citado.

## Escopo do MVP

- Cena 3D navegável de escalas exploratórias adaptadas.
- Catálogo estático de 22 destinos.
- Marcadores com descoberta por proximidade e agrupamento visual.
- Busca local com sugestões e aliases simples.
- Viagem de câmera opcional, pulável e configurável.
- Painel progressivo de destino: Conhecer, Entender a física, Curiosidades e história, Dados e fontes.
- Fórmulas opcionais, contextualizadas com os valores do astro selecionado.
- Dados científicos persistentes do destino selecionado.
- Onboarding opcional, ajuda, som ambiente, configurações e opções de acessibilidade.
- Persistência local apenas para preferências.

## Fora do escopo

Laboratórios interativos, simulações físicas, conteúdo em tempo real, contas, nuvem, sessão salva, busca externa e modo de escala real.

## Arquitetura proposta

```text
src/
  content/          # Catálogo curado, aliases, dados, fontes e textos pt-BR
  scene/            # Cena 3D e adaptadores de representação visual
  components/       # Painéis, busca, onboarding e controles React
  state/            # Estado de interface, viagem, seleção e preferências locais
  utils/            # Funções puras de busca, formatação e acessibilidade
```

A cena consome o estado da aplicação e o conteúdo curado. Nenhuma informação científica deve depender do renderizador WebGL.

## Fases executáveis

1. **Fundação e catálogo**
   - Criar a aplicação React/Vite e o modelo de conteúdo estático.
   - Implementar busca local, aliases e testes puros de filtragem.
   - Cadastrar os 22 destinos com fontes.
   - **Verificação:** testes unitários do conteúdo/busca e build.

2. **Cena e navegação**
   - Criar a cena 3D, Terra como ponto inicial, câmera e representação adaptada dos destinos.
   - Implementar marcadores, proximidade, agrupamento e seleção em desktop/mobile.
   - **Verificação:** build e inspeção manual desktop/mobile.

3. **Viagem e descoberta**
   - Implementar “Ir até lá”, viagem de 3–6 s, pular viagem, retorno à Terra e indicador de local.
   - Integrar busca com a viagem.
   - **Verificação:** fluxos manuais de marcador, busca, viagem, pulo e retorno.

4. **Conteúdo e interface**
   - Implementar painel de destino, cartão de dados científicos e fórmulas reveladas sob demanda.
   - Adicionar fontes, avisos de escala e onboarding.
   - **Verificação:** revisão manual de todos os destinos e links de fonte.

5. **Acabamento e acessibilidade**
   - Aplicar identidade mística/científica e glassmorphism.
   - Implementar preferências locais: som, viagem, movimento reduzido, texto maior, contraste e rótulos.
   - Validar responsividade e desempenho básico.
   - **Verificação:** `npm test && npm run build` e roteiro manual desktop/mobile.

## Critérios de aceite

- A pessoa inicia na Terra e navega até qualquer destino do catálogo.
- Busca e marcadores levam ao destino sem poluir a cena.
- Cada destino tem conteúdo pt-BR, dados essenciais, curiosidades e fontes confiáveis.
- Física é explicada sem pré-requisito matemático; fórmulas são opcionais e contextualizadas.
- A interface funciona em desktop e celular, incluindo controles por toque.
- Preferências de acessibilidade e som persistem localmente.
- A aplicação informa toda representação de escala ilustrativa.

## Dependências candidatas

- React + Vite;
- Three.js + @react-three/fiber + @react-three/drei;
- Vitest.

Novas dependências devem ser justificadas no plano ou na mudança correspondente, conforme `AGENTS.md`.
