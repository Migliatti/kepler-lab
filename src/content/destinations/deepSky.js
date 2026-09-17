/** Destinations beyond the Solar System (pt-BR). Pure data. */
export const deepSkyDestinations = [
  {
    id: 'alpha-centauri',
    name: 'Alpha Centauri',
    aliases: ['Alfa Centauri', 'Rigil Kentaurus', 'sistema Alpha Centauri'],
    category: 'star-system',
    type: 'Sistema estelar triplo',
    region: 'Vizinhança Solar',
    summary:
      'O sistema estelar triplo mais próximo do Sistema Solar, com Alpha Centauri A, B e Proxima Centauri.',
    featured: true,
    impact:
      'Alpha Centauri é a primeira grande escala além do Sistema Solar: sua luz leva mais de quatro anos para chegar até nós.',
    overview:
      'O sistema reúne duas estrelas parecidas com o Sol, Alpha Centauri A e B, e a anã vermelha Proxima Centauri. É o sistema estelar vizinho mais próximo do nosso.',
    physics: {
      explanation:
        'As estrelas do sistema permanecem ligadas pela gravidade. Alpha Centauri A e B orbitam uma à outra, enquanto Proxima Centauri está muito mais distante delas.',
      formula: {
        expression: 't = d / c',
        variables: [
          { symbol: 't', meaning: 'tempo que a luz leva para chegar até nós', value: 'cerca de 4,3 anos' },
          { symbol: 'd', meaning: 'distância até Alpha Centauri', value: 'cerca de 4,1 × 10¹⁶ m' },
          { symbol: 'c', meaning: 'velocidade da luz', value: '3,00 × 10⁸ m/s' },
        ],
        interpretation:
          'Tempo é distância dividida por velocidade. A luz de Alpha Centauri que vemos hoje saiu de lá há cerca de 4,3 anos — olhar para o céu é sempre olhar para o passado.',
      },
    },
    history:
      'Conhecido desde a Antiguidade no céu do hemisfério sul, o sistema é estudado como referência para medir distâncias estelares e procurar planetas em estrelas próximas.',
    curiosities: [
      { topic: 'records', text: 'Proxima Centauri, uma das três estrelas do sistema, é a estrela mais próxima do Sol.' },
      { topic: 'discovery', text: 'Proxima Centauri tem pelo menos um planeta confirmado, Proxima b, que orbita em sua zona habitável.' },
      { topic: 'naming', text: '"Alpha" indica a estrela mais brilhante da constelação do Centauro, visível no céu do hemisfério Sul.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 4,3 anos-luz' },
      { label: 'Componentes', value: 'Alpha Centauri A, Alpha Centauri B e Proxima Centauri' },
      { label: 'Tipo de A', value: 'estrela semelhante ao Sol' },
      { label: 'Tipo de B', value: 'estrela semelhante ao Sol, um pouco menor' },
      { label: 'Tipo de Proxima', value: 'anã vermelha' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '14h 39m 36s' },
        { label: 'Declinação', value: '−60° 50′' },
        { label: 'Distância da Terra', value: 'cerca de 4,3 anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Cosmic Distances',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/solar-system/cosmic-distances/',
      },
      {
        title: 'SIMBAD: alf Cen',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=alf+Cen',
      },
    ],
  },
  {
    id: 'sirius',
    name: 'Sirius',
    aliases: ['Sírio', 'estrela do Cão Maior', 'Sirius A'],
    category: 'star-system',
    type: 'Sistema estelar binário',
    region: 'Vizinhança Solar',
    summary:
      'O sistema de Sirius contém a estrela mais brilhante vista no céu noturno e sua companheira anã branca.',
    featured: true,
    impact:
      'Sirius parece extraordinariamente brilhante porque combina luminosidade intrínseca com uma distância pequena em termos estelares.',
    overview:
      'Sirius A é uma estrela branca muito luminosa; Sirius B é uma anã branca, o núcleo compacto que restou de uma estrela que já perdeu suas camadas externas.',
    physics: {
      explanation:
        'As duas estrelas orbitam seu centro de massa em cerca de 50 anos. A grande diferença de brilho torna Sirius B difícil de observar perto de Sirius A.',
    },
    history:
      'Sirius foi usado por diferentes culturas para marcar épocas do ano. Observações do Hubble ajudaram a medir propriedades de Sirius B, uma das anãs brancas mais próximas.',
    curiosities: [
      { topic: 'records', text: 'Sirius é a estrela mais brilhante do céu noturno.' },
      { topic: 'discovery', text: 'Tem uma companheira discreta, Sirius B, uma anã branca identificada no século XIX.' },
      { topic: 'mythology', text: 'No Egito antigo, o reaparecimento de Sirius antes do nascer do Sol anunciava a época das cheias do Nilo.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 8,6 anos-luz' },
      { label: 'Componentes', value: 'Sirius A e Sirius B' },
      { label: 'Período orbital do par', value: 'cerca de 50 anos' },
      { label: 'Sirius A', value: 'a estrela mais brilhante do céu noturno' },
      { label: 'Sirius B', value: 'anã branca' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '06h 45m 09s' },
        { label: 'Declinação', value: '−16° 43′' },
        { label: 'Distância da Terra', value: 'cerca de 8,6 anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Hubble image of Sirius A, the brightest star in our nighttime sky',
        publisher: 'European Space Agency',
        url: 'https://www.esa.int/ESA_Multimedia/Images/2005/12/Hubble_image_of_Sirius_A_the_brightest_star_in_our_nighttime_sky',
      },
      {
        title: 'SIMBAD: Sirius',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sirius',
      },
    ],
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    aliases: ['Betelgeuse de Órion', 'Alpha Orionis', 'ombro de Órion'],
    category: 'star',
    type: 'Supergigante vermelha',
    region: 'Constelação de Órion',
    summary:
      'Uma supergigante vermelha muito grande e variável que marca o ombro da constelação de Órion.',
    featured: true,
    impact:
      'Betelgeuse mostra que uma estrela muito maior que o Sol pode ter uma superfície dinâmica, perder matéria e mudar de brilho.',
    overview:
      'É uma estrela envelhecida e fria para os padrões estelares, por isso tem aparência avermelhada. Seu tamanho e sua distância ainda são refinados por observações.',
    physics: {
      explanation:
        'Em supergigantes vermelhas, enormes movimentos de gás e a perda de matéria afetam a superfície e o brilho. A poeira expelida pode também escurecer a estrela quando vista da Terra.',
      formula: {
        expression: 'λ = b / T',
        variables: [
          { symbol: 'λ', meaning: 'comprimento de onda em que a estrela brilha mais', value: 'cerca de 800 nm' },
          { symbol: 'b', meaning: 'constante de deslocamento de Wien', value: '2,898 × 10⁻³ m·K' },
          { symbol: 'T', meaning: 'temperatura da superfície', value: 'cerca de 3.600 K' },
        ],
        interpretation:
          'Quanto mais fria a estrela, maior o comprimento de onda do seu brilho mais intenso. Em Betelgeuse o pico cai no infravermelho, logo além do vermelho visível — por isso a vemos alaranjada.',
      },
    },
    history:
      'A queda incomum de brilho observada entre 2019 e 2020 foi acompanhada pelo Very Large Telescope. Os dados indicaram a participação de poeira expelida pela própria estrela.',
    curiosities: [
      { topic: 'phenomena', text: 'Entre 2019 e 2020, Betelgeuse escureceu de forma inesperada; observações indicaram uma grande nuvem de poeira expelida pela própria estrela.' },
      { topic: 'records', text: 'É uma supergigante vermelha tão grande que, no lugar do Sol, ultrapassaria a órbita de Marte.' },
      { topic: 'naming', text: 'O nome vem do árabe e costuma ser associado à "mão" ou ao "ombro" da figura de Órion.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 600 anos-luz' },
      { label: 'Tipo estelar', value: 'supergigante vermelha' },
      { label: 'Constelação', value: 'Órion' },
      { label: 'Tamanho observado', value: 'cerca de 800 vezes o do Sol' },
      { label: 'Fenômeno principal', value: 'variação de brilho e perda de matéria' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 55m 10s' },
        { label: 'Declinação', value: '+07° 24′' },
        { label: 'Distância da Terra', value: 'cerca de 600 anos-luz' },
      ],
    },
    sources: [
      {
        title: 'A bubbling Betelgeuse',
        publisher: 'European Southern Observatory',
        url: 'https://www.eso.org/public/images/potw2634a/',
      },
      {
        title: 'SIMBAD: Betelgeuse',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Betelgeuse',
      },
    ],
  },
  {
    id: 'orion-nebula',
    name: 'Nebulosa de Órion',
    aliases: ['M42', 'Messier 42', 'Orion Nebula'],
    category: 'nebula',
    type: 'Nebulosa de emissão e região de formação estelar',
    region: 'Constelação de Órion',
    summary:
      'Uma região próxima de formação estelar, iluminada por estrelas jovens no coração da constelação de Órion.',
    featured: true,
    impact:
      'A Nebulosa de Órion permite observar, em uma única região, gás, poeira e estrelas em diferentes etapas de nascimento.',
    overview:
      'Também chamada de M42, ela é uma grande nuvem de gás e poeira onde novas estrelas se formam. Pode ser vista a olho nu sob céu escuro.',
    physics: {
      explanation:
        'A radiação ultravioleta de estrelas jovens energiza o gás da nebulosa e faz parte dele brilhar. Ao mesmo tempo, gravidade e pressão moldam nuvens onde outras estrelas podem nascer.',
    },
    history:
      'A nebulosa é registrada em catálogos astronômicos desde o século XVII. Observações modernas do Hubble revelam discos e estruturas associadas ao nascimento de estrelas.',
    curiosities: [
      { topic: 'records', text: 'É a região de grande formação de estrelas mais próxima da Terra.' },
      { topic: 'phenomena', text: 'Em seu interior, o Trapézio é um aglomerado de estrelas jovens e quentes que ilumina toda a nuvem.' },
      { topic: 'missions', text: 'É visível a olho nu como uma mancha difusa na "espada" da constelação de Órion.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 1.500 anos-luz' },
      { label: 'Designação', value: 'M42' },
      { label: 'Constelação', value: 'Órion' },
      { label: 'Tipo', value: 'nebulosa de emissão' },
      { label: 'Núcleo luminoso', value: 'aglomerado do Trapézio' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 35m 17s' },
        { label: 'Declinação', value: '−05° 23′' },
        { label: 'Distância da Terra', value: 'cerca de 1.500 anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Messier 42',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/',
      },
      {
        title: 'SIMBAD: M 42',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=M42',
      },
    ],
  },
  {
    id: 'crab-nebula',
    name: 'Nebulosa do Caranguejo',
    aliases: ['M1', 'Messier 1', 'Crab Nebula'],
    category: 'nebula',
    type: 'Remanescente de supernova',
    region: 'Constelação de Touro',
    summary:
      'Os restos em expansão de uma supernova observada em 1054, energizados por um pulsar em seu centro.',
    featured: true,
    impact:
      'A Nebulosa do Caranguejo conecta um registro histórico de uma estrela que explodiu aos processos extremos de uma estrela de nêutrons.',
    overview:
      'Ela é formada por gás expelido na explosão de uma estrela. No centro há um pulsar, uma estrela de nêutrons que gira rapidamente e alimenta parte da emissão observada.',
    physics: {
      explanation:
        'O pulsar gira cerca de 30 vezes por segundo e acelera partículas em campos magnéticos intensos. Essas partículas produzem radiação e ajudam a iluminar a nebulosa em vários comprimentos de onda.',
      formula: {
        expression: 'f = 1 / P',
        variables: [
          { symbol: 'f', meaning: 'frequência: voltas por segundo', value: 'cerca de 30 voltas/s' },
          { symbol: 'P', meaning: 'período de rotação do pulsar central', value: 'cerca de 0,033 s' },
        ],
        interpretation:
          'Se uma volta dura 0,033 segundo, cabem cerca de 30 voltas em um segundo. É um objeto com mais massa que o Sol, espremido em poucas dezenas de quilômetros, girando mais rápido que uma hélice.',
      },
    },
    history:
      'Astrônomos chineses e japoneses registraram a supernova em 1054. A nebulosa foi identificada séculos depois e se tornou o primeiro objeto do catálogo de Messier.',
    curiosities: [
      { topic: 'discovery', text: 'É o que restou de uma supernova registrada por astrônomos chineses em 1054, visível até de dia por semanas.' },
      { topic: 'phenomena', text: 'No centro há um pulsar que gira cerca de 30 vezes por segundo.' },
      { topic: 'naming', text: 'O nome vem de um desenho feito em 1844 por Lord Rosse, que lembrava um caranguejo.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 6.500 anos-luz' },
      { label: 'Designações', value: 'M1 e NGC 1952' },
      { label: 'Constelação', value: 'Touro' },
      { label: 'Extensão', value: 'cerca de 11 anos-luz' },
      { label: 'Objeto central', value: 'Pulsar do Caranguejo' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '05h 34m 32s' },
        { label: 'Declinação', value: '+22° 01′' },
        { label: 'Distância da Terra', value: 'cerca de 6.500 anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Crab Nebula',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/asset/hubble/crab-nebula-3/',
      },
      {
        title: 'SIMBAD: M 1',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=M1',
      },
    ],
  },
  {
    id: 'galactic-center',
    name: 'Centro Galáctico',
    aliases: ['centro da Via Láctea', 'núcleo da Via Láctea', 'Galactic Center'],
    category: 'galactic-region',
    type: 'Região central da Via Láctea',
    region: 'Via Láctea',
    summary:
      'A região central, densa e empoeirada da Via Láctea, onde está Sagittarius A*.',
    featured: true,
    impact:
      'O Centro Galáctico reúne estrelas, gás, poeira e gravidade extrema em uma região que só é bem estudada com luz infravermelha, rádio e raios X.',
    overview:
      'Ele fica na direção da constelação de Sagitário e é ocultado em luz visível por poeira interestelar. Telescópios que observam outras faixas de luz conseguem revelar sua população estelar e seu gás quente.',
    physics: {
      explanation:
        'A gravidade organiza as órbitas de estrelas e nuvens de gás nessa região. No núcleo está Sagittarius A*, o buraco negro supermassivo já presente neste catálogo como um destino separado.',
    },
    history:
      'A observação em infravermelho e raios X permitiu atravessar parte da poeira que bloqueia a visão óptica e estudar a região central com maior detalhe.',
    curiosities: [
      { topic: 'phenomena', text: 'A poeira interestelar bloqueia a luz visível do centro galáctico, que por isso é estudado principalmente em infravermelho, rádio e raios X.' },
      { topic: 'records', text: 'É a região da Via Láctea com maior concentração de estrelas.' },
      { topic: 'missions', text: 'No céu, fica na direção da constelação de Sagitário.' },
    ],
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      { label: 'Direção no céu', value: 'constelação de Sagitário' },
      { label: 'Observação óptica', value: 'fortemente bloqueada por poeira' },
      { label: 'Objeto central associado', value: 'Sagittarius A*' },
      { label: 'Faixas úteis', value: 'infravermelho, rádio e raios X' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '17h 45m 40s' },
        { label: 'Declinação', value: '−29° 00′' },
        { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Stars at the Galactic Center',
        publisher: 'NASA',
        url: 'https://www.nasa.gov/image-article/stars-galactic-center/',
      },
      {
        title: 'SIMBAD: Sgr A*',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sgr+A*',
      },
    ],
  },
  {
    id: 'milky-way',
    name: 'Via Láctea',
    aliases: ['nossa galáxia', 'galáxia Via Láctea', 'Milky Way'],
    category: 'galactic-region',
    type: 'Galáxia espiral barrada',
    region: 'Grupo Local',
    summary:
      'A galáxia que abriga o Sistema Solar, formada por estrelas, gás, poeira e matéria escura ligados pela gravidade.',
    featured: true,
    impact:
      'A Via Láctea é nosso endereço cósmico: olhar sua faixa no céu é observar o disco da galáxia a partir de dentro.',
    overview:
      'A Via Láctea é uma galáxia espiral barrada. O Sistema Solar fica em um de seus braços e leva centenas de milhões de anos para dar uma volta ao redor do centro galáctico.',
    physics: {
      explanation:
        'A gravidade mantém bilhões de estrelas, gás e poeira ligados à galáxia. As estrelas orbitam o centro, enquanto braços espirais e regiões de formação estelar fazem parte da estrutura do disco.',
    },
    history:
      'Antes dos telescópios, a Via Láctea era vista como uma faixa esbranquiçada. Observações posteriores mostraram que ela é composta por muitas estrelas e que o Sol está dentro dela.',
    curiosities: [
      { topic: 'mythology', text: 'O nome vem da mitologia greco-romana, que associava a faixa luminosa do céu a leite derramado.' },
      { topic: 'discovery', text: 'Em 1610, Galileu observou com um telescópio que a faixa da Via Láctea é formada por inúmeras estrelas.' },
      { topic: 'records', text: 'A Via Láctea reúne de 100 a 400 bilhões de estrelas.' },
    ],
    facts: [
      { label: 'Tipo', value: 'galáxia espiral barrada' },
      { label: 'Diâmetro do disco', value: 'mais de 100 mil anos-luz' },
      { label: 'Número estimado de estrelas', value: 'cerca de 100 a 400 bilhões' },
      { label: 'Local do Sistema Solar', value: 'em um braço espiral, longe do centro' },
      { label: 'Órbita do Sistema Solar', value: 'cerca de 240 milhões de anos' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Diâmetro do disco', value: 'cerca de 100 mil anos-luz' },
        { label: 'Distância do Sol ao centro', value: 'cerca de 27 mil anos-luz' },
        { label: 'Direção do centro no céu', value: 'constelação de Sagitário' },
      ],
    },
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
    aliases: ['Sgr A*', 'buraco negro', 'buraco negro da Via Láctea'],
    category: 'black-hole',
    type: 'Buraco negro supermassivo',
    region: 'Centro Galáctico',
    summary: 'O buraco negro supermassivo no centro da nossa galáxia.',
    featured: true,
    impact:
      'Sagittarius A* torna visível que o centro da Via Láctea é dominado por um objeto compacto com milhões de vezes a massa do Sol.',
    overview:
      'Ele está a cerca de 27 mil anos-luz da Terra e é cercado por estrelas que orbitam uma região muito pequena do Centro Galáctico.',
    physics: {
      explanation:
        'A gravidade de um buraco negro curva intensamente o espaço-tempo; as órbitas das estrelas próximas revelam a massa concentrada em Sagittarius A*.',
      formula: {
        expression: 'rₛ = 2GM / c²',
        variables: [
          { symbol: 'rₛ', meaning: 'raio de Schwarzschild: o tamanho do horizonte de eventos', value: 'cerca de 1,3 × 10¹⁰ m' },
          { symbol: 'G', meaning: 'constante gravitacional', value: '6,67 × 10⁻¹¹ N·m²/kg²' },
          { symbol: 'M', meaning: 'massa de Sagittarius A*', value: 'cerca de 8,6 × 10³⁶ kg (4 milhões de sóis)' },
          { symbol: 'c', meaning: 'velocidade da luz', value: '3,00 × 10⁸ m/s' },
        ],
        interpretation:
          'O horizonte de eventos é a fronteira de onde nem a luz escapa, e seu tamanho cresce na mesma proporção da massa. Para Sagittarius A* são cerca de 13 milhões de km — algo como um quinto da distância entre o Sol e Mercúrio.',
      },
    },
    history:
      'Medições de décadas das órbitas estelares no Centro Galáctico sustentaram sua identificação, e o Event Horizon Telescope divulgou sua primeira imagem em 2022.',
    curiosities: [
      { topic: 'missions', text: 'Em 2022, o Event Horizon Telescope divulgou a primeira imagem da sombra de Sagittarius A*.' },
      { topic: 'records', text: 'Tem cerca de 4 milhões de vezes a massa do Sol.' },
      { topic: 'discovery', text: 'Sua massa foi medida acompanhando por décadas as órbitas de estrelas vizinhas, trabalho reconhecido pelo Nobel de Física de 2020.' },
    ],
    facts: [
      { label: 'Massa', value: 'cerca de 4 milhões de massas solares' },
      { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      { label: 'Constelação', value: 'Sagitário' },
      { label: 'Primeira imagem', value: 'Event Horizon Telescope, 2022' },
    ],
    coordinates: {
      kind: 'equatorial',
      entries: [
        { label: 'Ascensão reta', value: '17h 45m 40s' },
        { label: 'Declinação', value: '−29° 00′' },
        { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      ],
    },
    sources: [
      {
        title: 'Astronomers reveal first image of the black hole at the heart of our galaxy',
        publisher: 'Event Horizon Telescope Collaboration',
        url: 'https://eventhorizontelescope.org/blog/astronomers-reveal-first-image-black-hole-heart-our-galaxy',
      },
      {
        title: 'SIMBAD: Sgr A*',
        publisher: 'CDS, Université de Strasbourg',
        url: 'https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Sgr+A*',
      },
      {
        title: 'The Nobel Prize in Physics 2020',
        publisher: 'Nobel Prize Outreach',
        url: 'https://www.nobelprize.org/prizes/physics/2020/summary/',
      },
    ],
  },
]
