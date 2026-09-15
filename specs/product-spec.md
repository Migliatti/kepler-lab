# Especificação de produto — Kepler Lab MVP

> Registro das decisões confirmadas durante o desenho do produto. Interface em pt-BR.

## Visão

Kepler Lab é uma experiência 3D de exploração científica da Via Láctea para público geral curioso. A pessoa começa na Terra, navega por escalas exploratórias adaptadas e descobre destinos cósmicos por meio de conteúdo progressivo, visualmente contemplativo e cientificamente fundamentado.

O produto não é um simulador astronômico de escala real nem um laboratório interativo no MVP. Quando tamanhos, distâncias ou velocidades forem adaptados para viabilizar a navegação, isso deve ser informado.

## Experiência principal

1. A primeira visita apresenta um onboarding opcional e curto.
2. A exploração começa na Terra.
3. Destinos podem ser descobertos por marcadores ou buscados no catálogo.
4. No desktop, passar o mouse em um destino mostra a ação **Ir até lá**; no celular, tocar seleciona o destino e mostra essa ação explicitamente.
5. A viagem de câmera dura aproximadamente 3–6 segundos, exibe o destino e uma distância ilustrativa, pode ser pulada e pode ser desativada nas configurações.
6. Ao chegar, o painel do destino abre automaticamente.

## Onboarding

Três etapas, sempre puláveis e disponíveis posteriormente em **Ajuda**:

1. Boas-vindas:

   > Você está aqui.
   >
   > Em um pequeno mundo azul, na borda de uma galáxia repleta de estrelas, mundos e mistérios.
   >
   > Aproxime-se. Observe. Viaje.

2. Orientações de navegação específicas para desktop ou celular.
3. Descoberta de destinos por marcadores e busca.

## Painel de destino

O painel é contínuo e progressivo: no desktop, abre como painel lateral direito; no celular, como painel inferior expansível. Pode ser fechado e reaberto pelo marcador/resumo do destino.

Ordem do conteúdo:

1. Cabeçalho visual: nome, tipo e região.
2. Frase de impacto curta.
3. **Conhecer**: explicação acessível sobre o objeto e sua importância.
4. **Entender a física**: explicação em linguagem comum dos fenômenos relevantes ao objeto.
   - Fórmulas ficam ocultas por padrão.
   - Quando solicitadas, usam valores e variáveis do próprio destino, acompanhadas de explicação em linguagem simples.
5. **Curiosidades e história**: descoberta, observação, nomenclatura, mitologia e cultura, missões, recordes e fenômenos notáveis quando aplicáveis.
6. **Dados e fontes**: dados essenciais, fontes científicas e aviso de escala ilustrativa.

O cartão persistente de **Dados científicos** no canto inferior esquerdo mostra de quatro a cinco dados relevantes do destino selecionado. Um clique/toque conduz aos dados completos no painel.

## Busca e descoberta

- A busca usa apenas o catálogo estático e curado do MVP; não consulta serviços externos.
- A lupa é fixa. No desktop abre uma janela flutuante; no celular, um painel inferior.
- Resultados filtram enquanto a pessoa digita e apresentam nome, tipo, região, descrição breve e **Ir até lá**.
- Antes da digitação, há sugestões de destinos.
- São aceitos aliases populares simples, como “buraco negro” para Sagittarius A*.
- Destinos principais são sugeridos desde o começo. Outros marcadores aparecem por proximidade.
- Marcadores distantes minimizam ou se ocultam; regiões densas agrupam marcadores até a aproximação.

## Interface persistente

- Superior esquerdo: local atual e caminho de navegação.
- Superior direito: busca, Ajuda, som e configurações.
- Inferior esquerdo: cartão de Dados científicos.
- Inferior direito: retorno à Terra.

Os controles são discretos e podem reduzir a opacidade quando inativos.

## Configurações e acessibilidade

Preferências persistidas localmente:

- ativar/desativar viagem de câmera;
- reduzir animações;
- volume e silenciar som ambiente;
- texto maior;
- alto contraste;
- rótulos descritivos, sem depender apenas de ícones.

## Identidade visual

A cena é cientificamente fundamentada, porém trabalhada e mística: gradientes profundos, poeira cósmica luminosa discreta, nebulosas suaves, parallax e bloom contidos. Astros têm formas e cores reconhecíveis, mas texturas simplificadas para preservar desempenho móvel.

A interface usa glassmorphism inspirado no ecossistema Apple: superfícies translúcidas e foscas, desfoque suave, cantos arredondados, bordas sutis e texto com contraste suficiente.

Marcadores usam diferenças de ícone e rótulo além da cor. Categorias sugeridas: azul para planetas e luas, amarelo suave para estrelas, violeta para nebulosas e âmbar para objetos extremos.

## Catálogo de lançamento

### Sistema Solar

Sol, Mercúrio, Vênus, Terra, Lua, Marte, Júpiter, Europa, Io, Saturno, Titan, Urano, Netuno e Plutão.

### Via Láctea e cosmos próximo

Alpha Centauri, Sirius, Betelgeuse, Nebulosa de Órion, Nebulosa do Caranguejo, Sagittarius A*, Centro Galáctico e uma visão geral da Via Láctea.

## Fora do escopo do MVP

- Laboratórios e simulações científicas interativas;
- jornadas guiadas;
- notícias ou conteúdo externo em tempo real;
- contas, nuvem, destinos salvos e retomada de sessão;
- modo de escala real;
- busca na web.
