# AGENTS.md — Kepler Lab

## Projeto

Kepler Lab é uma experiência web 3D didática para explorar a Via Láctea e seus destinos cósmicos. O escopo funcional está em [`specs/product-spec.md`](./specs/product-spec.md) e o plano de implementação em [`PLAN.md`](./PLAN.md).

## Princípios obrigatórios

1. **Conteúdo independente da interface.** Catálogo, aliases, dados científicos e fontes em `src/content/` não podem importar React, Three.js, DOM ou APIs de navegador.
2. **Testar antes de renderizar.** Busca, aliases, formatação e regras de apresentação devem ter testes unitários executáveis sem WebGL.
3. **Rigor científico com transparência.** Todo dado deve ter fonte confiável; representações de tamanho, distância ou velocidade adaptadas devem informar que são ilustrativas.
4. **Renderização é consumidora de estado.** A cena 3D recebe estado de navegação e conteúdo; não duplica regras de busca, conteúdo ou preferências.
5. **Persistência local e versionada.** Preferências usam `localStorage` com chave e versão de esquema, sem dados sensíveis.
6. **Sem dependências desnecessárias.** Preferir módulos pequenos e APIs nativas; justificar novas bibliotecas no plano ou PR.

## Arquitetura esperada

```text
src/content/      catálogo curado, aliases, dados e fontes
src/scene/        componentes e objetos Three.js
src/components/   painéis e controles React
src/state/        estado de interface, viagem e persistência
src/utils/        busca e formatação puras com testes
```

## Comandos esperados

Após o scaffold aprovado:

```bash
npm test
npm run build
npm run dev
```

Antes de declarar uma mudança concluída, execute pelo menos `npm test` e `npm run build`.

## Convenções

- JavaScript/JSX com módulos ES.
- Nomes claros em inglês no código; interface em português (pt-BR).
- Evitar mutação de objetos de estado.
- Manter textos de interface em pt-BR e identificadores de código em inglês.
- Tratar explicitamente conteúdo ausente, fontes indisponíveis e representações de escala ilustrativa.

## Estado atual

[`PLAN.md`](./PLAN.md) foi aprovado pelo usuário em 16/09/2026. A implementação pode prosseguir conforme as fases e verificações do plano; novas dependências devem ser justificadas antes de serem adicionadas.
