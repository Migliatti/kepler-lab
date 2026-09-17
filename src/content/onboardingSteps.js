const NAVIGATION_PARAGRAPHS = Object.freeze({
  desktop: [
    'Arraste com o mouse para girar a vista, use a roda para aproximar e arraste com o botão direito para deslocar.',
    'Clique em um astro para selecioná-lo e clique de novo para viajar até ele.',
  ],
  touch: [
    'Arraste com um dedo para girar a vista, faça pinça para aproximar e arraste com dois dedos para deslocar.',
    'Toque em um astro para selecioná-lo e toque de novo para viajar até ele.',
  ],
})

export function getOnboardingSteps(platform) {
  const navigation = NAVIGATION_PARAGRAPHS[platform] ?? NAVIGATION_PARAGRAPHS.desktop

  return [
    {
      id: 'welcome',
      title: 'Você está aqui.',
      paragraphs: [
        'Em um pequeno mundo azul, na borda de uma galáxia repleta de estrelas, mundos e mistérios.',
        'Aproxime-se. Observe. Viaje.',
      ],
    },
    { id: 'navigation', title: 'Como navegar', paragraphs: [...navigation] },
    {
      id: 'discovery',
      title: 'Descubra destinos',
      paragraphs: [
        'Abra Navegação, no canto superior esquerdo, e busque qualquer destino pelo nome — vale até “buraco negro”.',
        'Os dados do destino selecionado ficam sempre à vista; ao chegar, o painel completo se abre para você conhecer, entender a física e ver as fontes.',
      ],
    },
  ]
}
