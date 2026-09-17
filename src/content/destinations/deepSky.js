/** Destinations beyond the Solar System (pt-BR). Pure data. */
export const deepSkyDestinations = [
  {
    id: 'alpha-centauri',
    name: 'Alpha Centauri',
    aliases: ['Alfa Centauri', 'Rigil Kentaurus', 'sistema Alpha Centauri'],
    category: 'star-system',
    type: 'Sistema estelar triplo',
    region: 'VizinhanÃ§a Solar',
    summary:
      'O sistema estelar triplo mais prÃ³ximo do Sistema Solar, com Alpha Centauri A, B e Proxima Centauri.',
    featured: true,
    impact:
      'Alpha Centauri Ã© a primeira grande escala alÃ©m do Sistema Solar: sua luz leva mais de quatro anos para chegar atÃ© nÃ³s.',
    overview:
      'O sistema reÃºne duas estrelas parecidas com o Sol, Alpha Centauri A e B, e a anÃ£ vermelha Proxima Centauri. Ã‰ o sistema estelar vizinho mais prÃ³ximo do nosso.',
    physics: {
      explanation:
        'As estrelas do sistema permanecem ligadas pela gravidade. Alpha Centauri A e B orbitam uma Ã  outra, enquanto Proxima Centauri estÃ¡ muito mais distante delas.',
    },
    history:
      'Conhecido desde a Antiguidade no cÃ©u do hemisfÃ©rio sul, o sistema Ã© estudado como referÃªncia para medir distÃ¢ncias estelares e procurar planetas em estrelas prÃ³ximas.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 4,3 anos-luz' },
      { label: 'Componentes', value: 'Alpha Centauri A, Alpha Centauri B e Proxima Centauri' },
      { label: 'Tipo de A', value: 'estrela semelhante ao Sol' },
      { label: 'Tipo de B', value: 'estrela semelhante ao Sol, um pouco menor' },
      { label: 'Tipo de Proxima', value: 'anÃ£ vermelha' },
    ],
    sources: [
      {
        title: 'Cosmic Distances',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/solar-system/cosmic-distances/',
      },
    ],
  },
  {
    id: 'sirius',
    name: 'Sirius',
    aliases: ['SÃ­rio', 'estrela do CÃ£o Maior', 'Sirius A'],
    category: 'star-system',
    type: 'Sistema estelar binÃ¡rio',
    region: 'VizinhanÃ§a Solar',
    summary:
      'O sistema de Sirius contÃ©m a estrela mais brilhante vista no cÃ©u noturno e sua companheira anÃ£ branca.',
    featured: true,
    impact:
      'Sirius parece extraordinariamente brilhante porque combina luminosidade intrÃ­nseca com uma distÃ¢ncia pequena em termos estelares.',
    overview:
      'Sirius A Ã© uma estrela branca muito luminosa; Sirius B Ã© uma anÃ£ branca, o nÃºcleo compacto que restou de uma estrela que jÃ¡ perdeu suas camadas externas.',
    physics: {
      explanation:
        'As duas estrelas orbitam seu centro de massa em cerca de 50 anos. A grande diferenÃ§a de brilho torna Sirius B difÃ­cil de observar perto de Sirius A.',
    },
    history:
      'Sirius foi usado por diferentes culturas para marcar Ã©pocas do ano. ObservaÃ§Ãµes do Hubble ajudaram a medir propriedades de Sirius B, uma das anÃ£s brancas mais prÃ³ximas.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 8,6 anos-luz' },
      { label: 'Componentes', value: 'Sirius A e Sirius B' },
      { label: 'PerÃ­odo orbital do par', value: 'cerca de 50 anos' },
      { label: 'Sirius A', value: 'a estrela mais brilhante do cÃ©u noturno' },
      { label: 'Sirius B', value: 'anÃ£ branca' },
    ],
    sources: [
      {
        title: 'Hubble image of Sirius A, the brightest star in our nighttime sky',
        publisher: 'European Space Agency',
        url: 'https://www.esa.int/ESA_Multimedia/Images/2005/12/Hubble_image_of_Sirius_A_the_brightest_star_in_our_nighttime_sky',
      },
    ],
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    aliases: ['Betelgeuse de Ã“rion', 'Alpha Orionis', 'ombro de Ã“rion'],
    category: 'star',
    type: 'Supergigante vermelha',
    region: 'ConstelaÃ§Ã£o de Ã“rion',
    summary:
      'Uma supergigante vermelha muito grande e variÃ¡vel que marca o ombro da constelaÃ§Ã£o de Ã“rion.',
    featured: true,
    impact:
      'Betelgeuse mostra que uma estrela muito maior que o Sol pode ter uma superfÃ­cie dinÃ¢mica, perder matÃ©ria e mudar de brilho.',
    overview:
      'Ã‰ uma estrela envelhecida e fria para os padrÃµes estelares, por isso tem aparÃªncia avermelhada. Seu tamanho e sua distÃ¢ncia ainda sÃ£o refinados por observaÃ§Ãµes.',
    physics: {
      explanation:
        'Em supergigantes vermelhas, enormes movimentos de gÃ¡s e a perda de matÃ©ria afetam a superfÃ­cie e o brilho. A poeira expelida pode tambÃ©m escurecer a estrela quando vista da Terra.',
    },
    history:
      'A queda incomum de brilho observada entre 2019 e 2020 foi acompanhada pelo Very Large Telescope. Os dados indicaram a participaÃ§Ã£o de poeira expelida pela prÃ³pria estrela.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 600 anos-luz' },
      { label: 'Tipo estelar', value: 'supergigante vermelha' },
      { label: 'ConstelaÃ§Ã£o', value: 'Ã“rion' },
      { label: 'Tamanho observado', value: 'cerca de 800 vezes o do Sol' },
      { label: 'FenÃ´meno principal', value: 'variaÃ§Ã£o de brilho e perda de matÃ©ria' },
    ],
    sources: [
      {
        title: 'A bubbling Betelgeuse',
        publisher: 'European Southern Observatory',
        url: 'https://www.eso.org/public/images/potw2634a/',
      },
    ],
  },
  {
    id: 'orion-nebula',
    name: 'Nebulosa de Ã“rion',
    aliases: ['M42', 'Messier 42', 'Orion Nebula'],
    category: 'nebula',
    type: 'Nebulosa de emissÃ£o e regiÃ£o de formaÃ§Ã£o estelar',
    region: 'ConstelaÃ§Ã£o de Ã“rion',
    summary:
      'Uma regiÃ£o prÃ³xima de formaÃ§Ã£o estelar, iluminada por estrelas jovens no coraÃ§Ã£o da constelaÃ§Ã£o de Ã“rion.',
    featured: true,
    impact:
      'A Nebulosa de Ã“rion permite observar, em uma Ãºnica regiÃ£o, gÃ¡s, poeira e estrelas em diferentes etapas de nascimento.',
    overview:
      'TambÃ©m chamada de M42, ela Ã© uma grande nuvem de gÃ¡s e poeira onde novas estrelas se formam. Pode ser vista a olho nu sob cÃ©u escuro.',
    physics: {
      explanation:
        'A radiaÃ§Ã£o ultravioleta de estrelas jovens energiza o gÃ¡s da nebulosa e faz parte dele brilhar. Ao mesmo tempo, gravidade e pressÃ£o moldam nuvens onde outras estrelas podem nascer.',
    },
    history:
      'A nebulosa Ã© registrada em catÃ¡logos astronÃ´micos desde o sÃ©culo XVII. ObservaÃ§Ãµes modernas do Hubble revelam discos e estruturas associadas ao nascimento de estrelas.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 1.500 anos-luz' },
      { label: 'DesignaÃ§Ã£o', value: 'M42' },
      { label: 'ConstelaÃ§Ã£o', value: 'Ã“rion' },
      { label: 'Tipo', value: 'nebulosa de emissÃ£o' },
      { label: 'NÃºcleo luminoso', value: 'aglomerado do TrapÃ©zio' },
    ],
    sources: [
      {
        title: 'Messier 42',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
      },
    ],
  },
  {
    id: 'crab-nebula',
    name: 'Nebulosa do Caranguejo',
    aliases: ['M1', 'Messier 1', 'Crab Nebula'],
    category: 'nebula',
    type: 'Remanescente de supernova',
    region: 'ConstelaÃ§Ã£o de Touro',
    summary:
      'Os restos em expansÃ£o de uma supernova observada em 1054, energizados por um pulsar em seu centro.',
    featured: true,
    impact:
      'A Nebulosa do Caranguejo conecta um registro histÃ³rico de uma estrela que explodiu aos processos extremos de uma estrela de nÃªutrons.',
    overview:
      'Ela Ã© formada por gÃ¡s expelido na explosÃ£o de uma estrela. No centro hÃ¡ um pulsar, uma estrela de nÃªutrons que gira rapidamente e alimenta parte da emissÃ£o observada.',
    physics: {
      explanation:
        'O pulsar gira cerca de 30 vezes por segundo e acelera partÃ­culas em campos magnÃ©ticos intensos. Essas partÃ­culas produzem radiaÃ§Ã£o e ajudam a iluminar a nebulosa em vÃ¡rios comprimentos de onda.',
    },
    history:
      'AstrÃ´nomos chineses e japoneses registraram a supernova em 1054. A nebulosa foi identificada sÃ©culos depois e se tornou o primeiro objeto do catÃ¡logo de Messier.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 6.500 anos-luz' },
      { label: 'DesignaÃ§Ãµes', value: 'M1 e NGC 1952' },
      { label: 'ConstelaÃ§Ã£o', value: 'Touro' },
      { label: 'ExtensÃ£o', value: 'cerca de 11 anos-luz' },
      { label: 'Objeto central', value: 'Pulsar do Caranguejo' },
    ],
    sources: [
      {
        title: 'Crab Nebula',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/asset/hubble/crab-nebula-3/',
      },
    ],
  },
  {
    id: 'galactic-center',
    name: 'Centro GalÃ¡ctico',
    aliases: ['centro da Via LÃ¡ctea', 'nÃºcleo da Via LÃ¡ctea', 'Galactic Center'],
    category: 'galactic-region',
    type: 'RegiÃ£o central da Via LÃ¡ctea',
    region: 'Via LÃ¡ctea',
    summary:
      'A regiÃ£o central, densa e empoeirada da Via LÃ¡ctea, onde estÃ¡ Sagittarius A*.',
    featured: true,
    impact:
      'O Centro GalÃ¡ctico reÃºne estrelas, gÃ¡s, poeira e gravidade extrema em uma regiÃ£o que sÃ³ Ã© bem estudada com luz infravermelha, rÃ¡dio e raios X.',
    overview:
      'Ele fica na direÃ§Ã£o da constelaÃ§Ã£o de SagitÃ¡rio e Ã© ocultado em luz visÃ­vel por poeira interestelar. TelescÃ³pios que observam outras faixas de luz conseguem revelar sua populaÃ§Ã£o estelar e seu gÃ¡s quente.',
    physics: {
      explanation:
        'A gravidade organiza as Ã³rbitas de estrelas e nuvens de gÃ¡s nessa regiÃ£o. No nÃºcleo estÃ¡ Sagittarius A*, o buraco negro supermassivo jÃ¡ presente neste catÃ¡logo como um destino separado.',
    },
    history:
      'A observaÃ§Ã£o em infravermelho e raios X permitiu atravessar parte da poeira que bloqueia a visÃ£o Ã³ptica e estudar a regiÃ£o central com maior detalhe.',
    facts: [
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 26 mil anos-luz' },
      { label: 'DireÃ§Ã£o no cÃ©u', value: 'constelaÃ§Ã£o de SagitÃ¡rio' },
      { label: 'ObservaÃ§Ã£o Ã³ptica', value: 'fortemente bloqueada por poeira' },
      { label: 'Objeto central associado', value: 'Sagittarius A*' },
      { label: 'Faixas Ãºteis', value: 'infravermelho, rÃ¡dio e raios X' },
    ],
    sources: [
      {
        title: 'Stars at the Galactic Center',
        publisher: 'NASA',
        url: 'https://www.nasa.gov/image-article/stars-galactic-center/',
      },
    ],
  },
  {
    id: 'milky-way',
    name: 'Via LÃ¡ctea',
    aliases: ['nossa galÃ¡xia', 'galÃ¡xia Via LÃ¡ctea', 'Milky Way'],
    category: 'galactic-region',
    type: 'GalÃ¡xia espiral barrada',
    region: 'Grupo Local',
    summary:
      'A galÃ¡xia que abriga o Sistema Solar, formada por estrelas, gÃ¡s, poeira e matÃ©ria escura ligados pela gravidade.',
    featured: true,
    impact:
      'A Via LÃ¡ctea Ã© nosso endereÃ§o cÃ³smico: olhar sua faixa no cÃ©u Ã© observar o disco da galÃ¡xia a partir de dentro.',
    overview:
      'A Via LÃ¡ctea Ã© uma galÃ¡xia espiral barrada. O Sistema Solar fica em um de seus braÃ§os e leva centenas de milhÃµes de anos para dar uma volta ao redor do centro galÃ¡ctico.',
    physics: {
      explanation:
        'A gravidade mantÃ©m bilhÃµes de estrelas, gÃ¡s e poeira ligados Ã  galÃ¡xia. As estrelas orbitam o centro, enquanto braÃ§os espirais e regiÃµes de formaÃ§Ã£o estelar fazem parte da estrutura do disco.',
    },
    history:
      'Antes dos telescÃ³pios, a Via LÃ¡ctea era vista como uma faixa esbranquiÃ§ada. ObservaÃ§Ãµes posteriores mostraram que ela Ã© composta por muitas estrelas e que o Sol estÃ¡ dentro dela.',
    facts: [
      { label: 'Tipo', value: 'galÃ¡xia espiral barrada' },
      { label: 'DiÃ¢metro do disco', value: 'mais de 100 mil anos-luz' },
      { label: 'NÃºmero estimado de estrelas', value: 'cerca de 100 a 400 bilhÃµes' },
      { label: 'Local do Sistema Solar', value: 'em um braÃ§o espiral, longe do centro' },
      { label: 'Ã“rbita do Sistema Solar', value: 'cerca de 240 milhÃµes de anos' },
    ],
    sources: [
      {
        title: 'Galaxies',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/universe/galaxies/',
      },
    ],
  },
  {
    id: 'sagittarius-a-star',
    name: 'Sagittarius A*',
    aliases: ['Sgr A*', 'buraco negro', 'buraco negro da Via LÃ¡ctea'],
    category: 'black-hole',
    type: 'Buraco negro supermassivo',
    region: 'Centro GalÃ¡ctico',
    summary: 'O buraco negro supermassivo no centro da nossa galÃ¡xia.',
    featured: true,
    impact:
      'Sagittarius A* torna visÃ­vel que o centro da Via LÃ¡ctea Ã© dominado por um objeto compacto com milhÃµes de vezes a massa do Sol.',
    overview:
      'Ele estÃ¡ a cerca de 27 mil anos-luz da Terra e Ã© cercado por estrelas que orbitam uma regiÃ£o muito pequena do Centro GalÃ¡ctico.',
    physics: {
      explanation:
        'A gravidade de um buraco negro curva intensamente o espaÃ§o-tempo; as Ã³rbitas das estrelas prÃ³ximas revelam a massa concentrada em Sagittarius A*.',
    },
    history:
      'MediÃ§Ãµes de dÃ©cadas das Ã³rbitas estelares no Centro GalÃ¡ctico sustentaram sua identificaÃ§Ã£o, e o Event Horizon Telescope divulgou sua primeira imagem em 2022.',
    facts: [
      { label: 'Massa', value: 'cerca de 4 milhÃµes de massas solares' },
      { label: 'DistÃ¢ncia da Terra', value: 'cerca de 27 mil anos-luz' },
      { label: 'ConstelaÃ§Ã£o', value: 'SagitÃ¡rio' },
      { label: 'Primeira imagem', value: 'Event Horizon Telescope, 2022' },
    ],
    sources: [
      {
        title: 'Astronomers reveal first image of the black hole at the heart of our galaxy',
        publisher: 'Event Horizon Telescope Collaboration',
        url: 'https://eventhorizontelescope.org/blog/astronomers-reveal-first-image-black-hole-heart-our-galaxy',
      },
    ],
  },
]
