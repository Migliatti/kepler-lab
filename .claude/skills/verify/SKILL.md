---
name: verify
description: Executa a verificação obrigatória do Kepler Lab (npm test, npm run build, npm run lint) em sequência e reporta o resultado real. Use antes de declarar qualquer mudança concluída, antes de commitar e ao validar trabalho de subagentes.
---

# /verify — verificação obrigatória

Execute os três comandos abaixo, nesta ordem, na raiz do projeto. Pare no primeiro que falhar.

```bash
npm test
npm run build
npm run lint
```

## Como reportar

- Se todos passarem: informe o número de arquivos de teste e testes aprovados, que o build gerou `dist/` e que o lint não reportou erros.
- Se algum falhar: cole a saída relevante do comando que falhou em um bloco de código e não declare a mudança concluída. Avisos de tamanho de chunk do Vite não são falha.
- Nunca resuma como "passou" sem ter executado nesta sessão.

## Quando usar

- Antes de dizer que uma tarefa, fase ou correção está pronta.
- Antes de qualquer commit.
- Após receber o relatório de um subagente worker, para validar de forma independente.
