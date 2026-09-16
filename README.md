# Kepler Lab

> Experiência web 3D, em pt-BR, para explorar a Via Láctea com conteúdo científico curado.

Kepler Lab é uma experiência didática e contemplativa que parte da Terra para aproximar pessoas curiosas de planetas, luas, estrelas, nebulosas e regiões da Via Láctea. O projeto combina exploração visual com explicações acessíveis, dados científicos e fontes institucionais.

## Estado do projeto

O MVP está em desenvolvimento. A fundação React/Vite, a busca local testável e 15 destinos do catálogo já existem. A cena 3D, marcadores, viagens de câmera, painéis de destino e preferências de acessibilidade são as próximas etapas planejadas.

| Disponível hoje | Planejado para o MVP |
| --- | --- |
| Aplicação React/Vite em pt-BR | Cena 3D navegável, iniciando na Terra |
| Catálogo curado de destinos do Sistema Solar e Sagittarius A* | Marcadores, descoberta por proximidade e busca integrada |
| Busca local, aliases e validação do catálogo sem WebGL | Viagem de câmera opcional e retorno à Terra |
| Testes unitários para busca, texto e conteúdo | Painéis progressivos, onboarding e preferências locais |

## Princípios

- **Rigor com transparência:** dados têm fontes confiáveis; escalas visuais adaptadas serão identificadas como ilustrativas.
- **Conteúdo separado da interface:** o catálogo e as regras de busca não dependem de React, Three.js, DOM ou WebGL.
- **Aprendizado progressivo:** cada destino reúne contexto, física em linguagem comum, curiosidades, dados e fontes.
- **Acessível por padrão:** a interface prevista inclui controles claros, redução de movimento, texto maior e alto contraste.

## Catálogo de lançamento

O MVP prevê 22 destinos: objetos do Sistema Solar, Alpha Centauri, Sirius, Betelgeuse, as nebulosas de Órion e do Caranguejo, Sagittarius A*, o Centro Galáctico e uma visão geral da Via Láctea.

O catálogo atual possui 15 destinos e continua em expansão. As fontes de cada objeto ficam registradas junto de seus dados em [`src/content/`](./src/content/).

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

- [Especificação do produto](./specs/product-spec.md)
- [Plano de implementação](./PLAN.md)
- [Plano detalhado da Fase 1](./docs/superpowers/plans/2026-09-16-phase-1-catalogue.md)
- [Arquitetura e regras de contribuição](./AGENTS.md)

## Escopo do MVP

O MVP é uma experiência de exploração científica, não um simulador astronômico em escala real. Ficam fora do escopo laboratórios interativos, contas, nuvem, conteúdo em tempo real, busca na web e simulações físicas completas.
