# Kepler Lab

> Experiência web 3D, em pt-BR, para explorar a Via Láctea com conteúdo científico curado.

Kepler Lab é uma experiência didática e contemplativa que parte da Terra para aproximar pessoas curiosas de planetas, luas, estrelas, nebulosas e regiões da Via Láctea. O projeto combina exploração visual com explicações acessíveis, dados científicos e fontes institucionais.

## Estado do projeto

O MVP está em desenvolvimento. A fundação React/Vite, a busca local testável e o catálogo completo de 22 destinos já existem. A cena 3D navegável começa na Terra e permite selecionar destinos por marcadores. Viagens de câmera, retorno à Terra, painéis de destino e preferências de acessibilidade continuam planejados.

| Disponível hoje | Planejado para o MVP |
| --- | --- |
| Aplicação React/Vite em pt-BR | Viagem de câmera opcional e retorno à Terra |
| Catálogo curado completo: 22 destinos com fontes e conteúdo progressivo | Painéis progressivos de destino |
| Cena 3D navegável, iniciando na Terra, com marcadores e descoberta por proximidade | Busca integrada à cena |
| Busca local, aliases e validação do catálogo sem WebGL | Onboarding e preferências locais |
| Testes unitários para busca, texto, conteúdo e regras de cena | Ajustes de acessibilidade planejados |

## Princípios

- **Rigor com transparência:** dados têm fontes confiáveis; escalas visuais adaptadas serão identificadas como ilustrativas.
- **Conteúdo separado da interface:** o catálogo e as regras de busca não dependem de React, Three.js, DOM ou WebGL.
- **Aprendizado progressivo:** cada destino reúne contexto, física em linguagem comum, curiosidades, dados e fontes.
- **Acessível por padrão:** a interface prevista inclui controles claros, redução de movimento, texto maior e alto contraste.

## Catálogo de lançamento

O MVP prevê 22 destinos: objetos do Sistema Solar, Alpha Centauri, Sirius, Betelgeuse, as nebulosas de Órion e do Caranguejo, Sagittarius A*, o Centro Galáctico e uma visão geral da Via Láctea.

O catálogo atual possui os 22 destinos previstos para o lançamento, com fontes institucionais e conteúdo progressivo em pt-BR. As fontes de cada objeto ficam registradas junto de seus dados em [`src/content/`](./src/content/).

## Arquitetura

```text
src/
  content/      catálogo, aliases, dados científicos e fontes
  scene/        componentes e objetos Three.js
  components/   painéis e controles React
  state/        estado de interface, viagem e persistência local
  utils/        busca e formatação puras, com testes unitários
```

## Desenvolvimento

Requer Node.js 22.12+ ou 24+.

```bash
npm install
npm run dev     # inicia o servidor local
npm test        # executa os testes unitários
npm run build   # gera o build de produção
npm run lint    # verifica o código com Oxlint
```

## Documentação do projeto

- [Instruções para Claude Code e outros agentes](./CLAUDE.md)
- [Especificação do produto](./specs/product-spec.md)
- [Plano de implementação](./PLAN.md)
- [Plano detalhado da Fase 1](./docs/superpowers/plans/2026-09-16-phase-1-catalogue.md)
- [Plano detalhado da Fase 2](./docs/superpowers/plans/2026-09-16-phase-2-scene-navigation.md)
- [Arquitetura e regras de contribuição](./AGENTS.md)

## Escopo do MVP

O MVP é uma experiência de exploração científica, não um simulador astronômico em escala real. Ficam fora do escopo laboratórios interativos, contas, nuvem, conteúdo em tempo real, busca na web e simulações físicas completas.
