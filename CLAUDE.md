# CLAUDE.md — Kepler Lab

Este é o arquivo primário de instruções do projeto. `AGENTS.md` apenas aponta para cá.

## Projeto

Kepler Lab é uma experiência web 3D didática, em pt-BR, para explorar a Via Láctea e seus destinos cósmicos. O escopo funcional está em [`specs/product-spec.md`](./specs/product-spec.md) e o plano de implementação em [`PLAN.md`](./PLAN.md).

Stack: React 19 + Vite, Three.js via @react-three/fiber e @react-three/drei, Vitest, Oxlint. Requer Node.js 22.12+ ou 24+.

## Princípios obrigatórios

1. **Conteúdo independente da interface.** Catálogo, aliases, dados científicos e fontes em `src/content/` não podem importar React, Three.js, DOM ou APIs de navegador.
2. **Testar antes de renderizar.** Busca, aliases, formatação e regras de apresentação devem ter testes unitários executáveis sem WebGL.
3. **Rigor científico com transparência.** Todo dado deve ter fonte confiável; representações de tamanho, distância ou velocidade adaptadas devem informar que são ilustrativas.
4. **Renderização é consumidora de estado.** A cena 3D recebe estado de navegação e conteúdo; não duplica regras de busca, conteúdo ou preferências.
5. **Persistência local e versionada.** Preferências usam `localStorage` com chave e versão de esquema, sem dados sensíveis.
6. **Sem dependências desnecessárias.** Preferir módulos pequenos e APIs nativas; justificar novas bibliotecas no plano ou PR.

## Arquitetura

```text
src/content/      catálogo curado, aliases, dados e fontes (puro, sem DOM)
src/scene/        componentes e objetos Three.js; lógica pura em .js, adaptadores R3F em .jsx
src/components/   painéis e controles React
src/state/        estado de interface, viagem e persistência (funções puras)
src/utils/        busca e formatação puras com testes
```

Testes ficam ao lado do módulo (`foo.js` + `foo.test.js`). Lógica nova entra primeiro como função pura testada; o componente React ou R3F é apenas um adaptador.

## Comandos

```bash
npm test          # vitest run
npm run build     # vite build
npm run lint      # oxlint
npm run dev       # servidor local
```

Antes de declarar uma mudança concluída, execute `npm test`, `npm run build` e `npm run lint` e informe o resultado real. O skill `/verify` faz os três em sequência.

## Fluxo de trabalho com Claude Code

- **Planejar antes de codar.** Mudanças de fase seguem os planos em `docs/superpowers/plans/`. Especificações ficam em `specs/`. Registros de execução por tarefa (briefs, relatórios, revisões) ficam em `.superpowers/sdd/<plano>/`.
- **TDD.** Escreva o teste que falha, implemente o mínimo, refatore. Não pule a etapa do teste vermelho.
- **Commits pequenos e convencionais**, em inglês, no formato `tipo(escopo): descrição` (ex.: `feat(travel): connect discovery and return flow`, `docs(scene): record phase two progress`). Tipos usados: `feat`, `fix`, `docs`, `chore`.
- **Commit e push só quando solicitado.** Não use `--no-verify`.
- **Novas dependências** exigem justificativa no plano ou na mudança.
- **Subagentes** são adequados para tarefas isoladas de um plano (scout, worker, reviewer); o orquestrador valida com `/verify` antes de aceitar.

## Convenções

- JavaScript/JSX com módulos ES. Sem TypeScript no código-fonte.
- Nomes claros em inglês no código; textos de interface em português (pt-BR).
- Evitar mutação de objetos de estado; retornar novos objetos.
- Tratar explicitamente conteúdo ausente, fontes indisponíveis e representações de escala ilustrativa.
- Não introduzir texturas hiperrealistas ou modelos pesados; o acabamento 3D é estilizado e procedural (ver Fase 5 do plano).

## Estado atual

[`PLAN.md`](./PLAN.md) foi aprovado em 16/09/2026. Fases 1 (catálogo), 2 (cena e navegação), 3 (viagem e descoberta) e 4 (conteúdo e interface) estão concluídas. A Fase 5 (acabamento e acessibilidade) é a próxima. O desenho da Fase 4 está em `docs/superpowers/specs/2026-09-17-phase-4-content-interface-design.md` e o plano detalhado, com todas as tarefas marcadas, em [`docs/superpowers/plans/2026-09-17-phase-4-content-interface.md`](./docs/superpowers/plans/2026-09-17-phase-4-content-interface.md).
