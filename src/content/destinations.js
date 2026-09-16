/**
 * Curated, static destination catalogue (pt-BR).
 *
 * Pure data: must not import React, Three.js, DOM or browser APIs.
 * Every destination follows the model checked by validateCatalogue:
 * - id: stable kebab-case identifier
 * - name, type, region, summary: pt-BR display text
 * - category: one of DESTINATION_CATEGORIES
 * - aliases: popular names accepted by search
 * - featured: suggested before the visitor types
 * - facts: 4–5 entries for the scientific data card
 * - sources: reputable references (https)
 */
export const destinations = [
  {
    id: 'sun',
    name: 'Sol',
    aliases: ['estrela do Sistema Solar', 'astro-rei'],
    category: 'star',
    type: 'Estrela de sequência principal',
    region: 'Sistema Solar',
    summary: 'A estrela no centro do Sistema Solar, cuja gravidade mantém planetas, luas e pequenos corpos em órbita.',
    featured: true,
    impact:
      'O Sol fornece a luz e a energia que tornam possível a vida na Terra e organiza gravitacionalmente todo o Sistema Solar.',
    overview:
      'É uma estrela de tamanho médio, formada principalmente por plasma, com energia produzida por fusão nuclear em seu núcleo.',
    physics: {
      explanation:
        'No núcleo, a fusão de hidrogênio libera energia; a pressão produzida ajuda a equilibrar a atração da enorme massa do Sol.',
    },
    history:
      'O estudo do Sol evoluiu de observações a olho nu para medições por telescópios e missões espaciais que acompanham sua atividade.',
    facts: [
      { label: 'Raio', value: 'cerca de 700.000 km' },
      { label: 'Massa', value: 'mais de 330.000 massas terrestres' },
      { label: 'Temperatura do núcleo', value: 'cerca de 15 milhões °C' },
      { label: 'Temperatura da fotosfera', value: 'cerca de 5.500 °C' },
      { label: 'Distância média da Terra', value: 'cerca de 150 milhões de km' },
    ],
    sources: [
      {
        title: 'Sun: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/sun/facts/',
      },
    ],
  },
  {
    id: 'mercury',
    name: 'Mercúrio',
    aliases: ['planeta Mercúrio', 'primeiro planeta do Sistema Solar'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar interior',
    summary: 'O menor planeta do Sistema Solar e o mais próximo do Sol.',
    featured: false,
    impact:
      'Mercúrio mostra como a proximidade do Sol pode criar um mundo de extremos térmicos e uma órbita muito rápida.',
    overview:
      'Sua superfície rochosa e cheia de crateras lembra a da Lua, enquanto sua órbita oval o leva muito perto do Sol.',
    physics: {
      explanation:
        'A atmosfera extremamente tênue quase não retém calor: a superfície aquece muito durante o dia e esfria intensamente à noite.',
    },
    history:
      'A sonda Mariner 10 foi a primeira nave a visitar Mercúrio; mais tarde, a missão MESSENGER o estudou em órbita.',
    facts: [
      { label: 'Raio', value: 'cerca de 2.440 km' },
      { label: 'Distância média do Sol', value: 'cerca de 58 milhões de km' },
      { label: 'Período orbital', value: '88 dias terrestres' },
      { label: 'Rotação', value: '59 dias terrestres' },
      { label: 'Temperatura na superfície', value: 'de cerca de -180 °C a 430 °C' },
    ],
    sources: [
      {
        title: 'Mercury: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/mercury/facts/',
      },
    ],
  },
  {
    id: 'venus',
    name: 'Vênus',
    aliases: ['planeta Vênus', 'segundo planeta do Sistema Solar'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar interior',
    summary: 'O segundo planeta a partir do Sol, de tamanho semelhante ao da Terra, mas com uma atmosfera extremamente densa.',
    featured: false,
    impact:
      'Vênus evidencia como uma atmosfera rica em dióxido de carbono pode reter calor e transformar um planeta parecido em tamanho com a Terra.',
    overview:
      'Nuvens densas escondem uma superfície vulcânica, quente e sob pressão atmosférica muito maior que a da Terra.',
    physics: {
      explanation:
        'O efeito estufa intenso retém energia térmica na atmosfera espessa, elevando a temperatura da superfície acima da de Mercúrio.',
    },
    history:
      'As sondas Venera alcançaram a superfície, e a missão Magellan da NASA a mapeou por radar durante cinco anos.',
    facts: [
      { label: 'Diâmetro equatorial', value: 'cerca de 12.104 km' },
      { label: 'Distância média do Sol', value: 'cerca de 108 milhões de km' },
      { label: 'Período orbital', value: '225 dias terrestres' },
      { label: 'Rotação', value: '243 dias terrestres' },
      { label: 'Temperatura na superfície', value: 'cerca de 467 °C' },
    ],
    sources: [
      {
        title: 'Venus: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/venus/venus-facts/',
      },
    ],
  },
  {
    id: 'moon',
    name: 'Lua',
    aliases: ['lua da Terra', 'satélite natural da Terra'],
    category: 'moon',
    type: 'Satélite natural rochoso',
    region: 'Sistema Terra-Lua',
    summary: 'O único satélite natural da Terra e o único corpo celeste além dela já visitado por seres humanos.',
    featured: true,
    impact:
      'A Lua preserva crateras, rochas e gelo que ajudam a investigar a história do Sistema Solar e serve de destino próximo para a exploração humana.',
    overview:
      'Sua superfície sólida e rochosa é marcada por impactos; a rotação sincronizada faz com que o mesmo hemisfério fique voltado para a Terra.',
    physics: {
      explanation:
        'A rotação sincronizada acontece porque interações gravitacionais ao longo do tempo fizeram a Lua girar no mesmo ritmo em que orbita a Terra.',
    },
    history:
      'As missões Apollo levaram doze astronautas à Lua entre 1969 e 1972 e trouxeram amostras que ainda são estudadas.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.740 km' },
      { label: 'Distância média da Terra', value: 'cerca de 384.400 km' },
      { label: 'Período orbital', value: '27 dias terrestres' },
      { label: 'Rotação', value: 'sincronizada com a órbita, em 27 dias terrestres' },
      { label: 'Amostras Apollo trazidas à Terra', value: '382 kg' },
    ],
    sources: [
      {
        title: 'Moon Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/moon/facts/',
      },
    ],
  },
  {
    id: 'mars',
    name: 'Marte',
    aliases: ['planeta Marte', 'quarto planeta do Sistema Solar', 'planeta vermelho'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar interior',
    summary: 'O quarto planeta a partir do Sol, um mundo frio e desértico com atmosfera muito tênue.',
    featured: true,
    impact:
      'Marte é um laboratório para estudar a perda de água e atmosfera em planetas rochosos e um destino central da exploração robótica.',
    overview:
      'O solo rico em minerais de ferro oxidados dá a Marte a aparência avermelhada; há calotas polares, vulcões, cânions e tempestades de poeira.',
    physics: {
      explanation:
        'Sua atmosfera fina deixa o calor escapar com facilidade, contribuindo para grandes variações de temperatura na superfície.',
    },
    history:
      'Desde o pouso da Viking 1 em 1976, orbitadores e robôs móveis estudam o planeta e buscam evidências de ambientes antigos mais úmidos.',
    facts: [
      { label: 'Raio', value: 'cerca de 3.390 km' },
      { label: 'Distância média do Sol', value: 'cerca de 228 milhões de km' },
      { label: 'Período orbital', value: '687 dias terrestres' },
      { label: 'Duração do dia', value: '24,6 horas' },
      { label: 'Luas', value: '2: Fobos e Deimos' },
    ],
    sources: [
      {
        title: 'Mars: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/mars/facts/',
      },
    ],
  },
  {
    id: 'earth',
    name: 'Terra',
    aliases: ['nosso planeta', 'planeta azul'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar',
    summary: 'O terceiro planeta a partir do Sol e o único mundo conhecido que abriga vida.',
    featured: true,
    impact:
      'A Terra é a referência para comparar outros mundos porque concentra toda a vida conhecida e a única civilização capaz de estudá-los.',
    overview:
      'Seu interior rochoso, oceanos de água líquida, atmosfera e campo magnético formam um sistema que sustenta condições habitáveis na superfície.',
    physics: {
      explanation:
        'A gravidade da Terra mantém o ar e a água próximos ao planeta; sua rotação e a energia recebida do Sol também influenciam o clima.',
    },
    history:
      'Observações feitas por satélites e missões espaciais transformaram a Terra de um horizonte local em um planeta medido como um sistema inteiro.',
    facts: [
      { label: 'Raio médio', value: '6.371 km' },
      { label: 'Massa', value: '5,97 × 10²⁴ kg' },
      { label: 'Distância média do Sol', value: '149,6 milhões de km' },
      { label: 'Período orbital', value: '365,26 dias' },
      { label: 'Gravidade na superfície', value: '9,8 m/s²' },
    ],
    sources: [
      {
        title: 'Earth Fact Sheet',
        publisher: 'NASA Space Science Data Coordinated Archive',
        url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html',
      },
    ],
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    aliases: ['planeta Júpiter', 'gigante gasoso Júpiter'],
    category: 'planet',
    type: 'Gigante gasoso',
    region: 'Sistema Solar exterior',
    summary: 'O quinto planeta a partir do Sol e o maior planeta do Sistema Solar.',
    featured: true,
    impact:
      'Júpiter concentra grande parte da massa planetária do Sistema Solar e permite estudar atmosferas profundas, campos magnéticos e sistemas de luas.',
    overview:
      'É um gigante composto principalmente de hidrogênio e hélio, coberto por faixas de nuvens e tempestades, incluindo a Grande Mancha Vermelha.',
    physics: {
      explanation:
        'A rápida rotação e o hidrogênio eletricamente condutor em profundidade ajudam a gerar um campo magnético muito intenso; não há uma superfície sólida onde uma nave possa pousar.',
    },
    history:
      'Observado desde a Antiguidade, Júpiter foi estudado de perto por missões como Voyager, Galileo e Juno, que mede seu campo gravitacional e magnético.',
    facts: [
      { label: 'Raio', value: '69.911 km' },
      { label: 'Distância média do Sol', value: 'cerca de 778 milhões de km' },
      { label: 'Período orbital', value: 'cerca de 12 anos terrestres' },
      { label: 'Duração do dia', value: 'cerca de 9,9 horas' },
      { label: 'Atmosfera principal', value: 'hidrogênio e hélio' },
    ],
    sources: [
      {
        title: 'Jupiter Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/jupiter/jupiter-facts/',
      },
    ],
  },
  {
    id: 'europa',
    name: 'Europa',
    aliases: ['lua Europa de Júpiter', 'Europa, lua de Júpiter'],
    category: 'moon',
    type: 'Satélite natural gelado de Júpiter',
    region: 'Sistema de Júpiter',
    summary: 'Uma grande lua de Júpiter cuja crosta de gelo provavelmente encobre um oceano global de água líquida.',
    featured: true,
    impact:
      'Europa é um destino prioritário para investigar se um oceano subterrâneo em uma lua pode reunir condições favoráveis à vida como a conhecemos.',
    overview:
      'Esta lua de Júpiter tem uma superfície clara e fraturada de gelo; abaixo dela, há fortes evidências de um oceano de água salgada.',
    physics: {
      explanation:
        'A gravidade de Júpiter estica Europa durante sua órbita levemente oval. Esse aquecimento de maré pode manter água líquida sob a crosta de gelo.',
    },
    history:
      'Europa foi observada por Galileu em 1610; as missões Voyager e Galileo revelaram sua superfície fraturada, e a Europa Clipper foi projetada para investigar sua habitabilidade.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.561 km' },
      { label: 'Distância média de Júpiter', value: 'cerca de 671.000 km' },
      { label: 'Período orbital', value: 'cerca de 3,5 dias terrestres' },
      { label: 'Rotação', value: 'sincronizada com a órbita em torno de Júpiter' },
      { label: 'Fenômeno principal', value: 'aquecimento de maré que pode sustentar um oceano interno' },
    ],
    sources: [
      {
        title: 'Europa: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/jupiter/jupiter-moons/europa/europa-facts/',
      },
    ],
  },
  {
    id: 'io',
    name: 'Io',
    aliases: ['lua Io de Júpiter', 'Io, lua de Júpiter'],
    category: 'moon',
    type: 'Satélite natural vulcânico de Júpiter',
    region: 'Sistema de Júpiter',
    summary: 'Uma lua de Júpiter e o corpo com maior atividade vulcânica conhecida no Sistema Solar.',
    featured: false,
    impact:
      'Io mostra como forças gravitacionais podem aquecer o interior de uma lua e alimentar vulcanismo intenso sem depender da energia do Sol.',
    overview:
      'A superfície desta lua de Júpiter é continuamente renovada por erupções vulcânicas e por depósitos ricos em enxofre.',
    physics: {
      explanation:
        'As puxadas gravitacionais de Júpiter, Europa e Ganimedes deformam Io repetidamente. O atrito interno associado a essa maré transforma energia orbital em calor e alimenta vulcões.',
    },
    history:
      'Io foi observada por Galileu em 1610; as sondas Voyager, Galileo e Juno registraram vulcões ativos e ajudaram a medir as forças que os alimentam.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.822 km' },
      { label: 'Distância média de Júpiter', value: 'cerca de 422.000 km' },
      { label: 'Período orbital', value: 'cerca de 1,8 dia terrestre' },
      { label: 'Rotação', value: 'sincronizada com a órbita em torno de Júpiter' },
      { label: 'Fenômeno principal', value: 'vulcanismo alimentado por aquecimento de maré' },
    ],
    sources: [
      {
        title: 'Io: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/jupiter/jupiter-moons/io/facts/',
      },
    ],
  },
  {
    id: 'saturn',
    name: 'Saturno',
    aliases: ['planeta Saturno', 'gigante gasoso Saturno'],
    category: 'planet',
    type: 'Gigante gasoso',
    region: 'Sistema Solar exterior',
    summary: 'O sexto planeta a partir do Sol, conhecido por seu sistema de anéis amplo e complexo.',
    featured: true,
    impact:
      'Saturno permite estudar anéis, luas e processos gravitacionais em um sistema que funciona como um laboratório natural em escala planetária.',
    overview:
      'É o segundo maior planeta do Sistema Solar, feito principalmente de hidrogênio e hélio, com anéis compostos sobretudo de gelo e rocha.',
    physics: {
      explanation:
        'Os anéis são formados por incontáveis partículas em órbitas separadas; a gravidade de Saturno e de suas luas organiza lacunas, ondas e outras estruturas.',
    },
    history:
      'Conhecido desde a Antiguidade, Saturno foi visitado por Pioneer e Voyager; a missão Cassini orbitou o planeta de 2004 a 2017 e transformou o conhecimento sobre seu sistema.',
    facts: [
      { label: 'Diâmetro equatorial', value: 'cerca de 120.500 km' },
      { label: 'Distância média do Sol', value: 'cerca de 1,4 bilhão de km' },
      { label: 'Período orbital', value: 'cerca de 29,4 anos terrestres' },
      { label: 'Duração do dia', value: 'cerca de 10,7 horas' },
      { label: 'Anéis', value: 'partículas de gelo e rocha em órbita' },
    ],
    sources: [
      {
        title: 'Saturn: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/saturn/facts/',
      },
    ],
  },
  {
    id: 'titan',
    name: 'Titã',
    aliases: ['lua Titã de Saturno', 'Titã, lua de Saturno'],
    category: 'moon',
    type: 'Satélite natural com atmosfera de Saturno',
    region: 'Sistema de Saturno',
    summary: 'A maior lua de Saturno, com atmosfera densa e um ciclo de líquidos de metano e etano em sua superfície.',
    featured: true,
    impact:
      'Titã é um caso único para comparar química atmosférica e ciclos de líquidos em um mundo frio, usando metano e etano em vez de água líquida na superfície.',
    overview:
      'Esta lua de Saturno é coberta por uma névoa dourada; sob ela existem nuvens, chuva, rios, lagos e mares de hidrocarbonetos líquidos.',
    physics: {
      explanation:
        'Na baixa temperatura de Titã, metano e etano podem condensar, chover e escoar. A atmosfera densa, composta principalmente de nitrogênio, sustenta esse ciclo de líquidos.',
    },
    history:
      'Descoberto por Christiaan Huygens em 1655, Titã foi investigado pela missão Cassini-Huygens; a sonda Huygens pousou em sua superfície em 2005.',
    facts: [
      { label: 'Raio', value: 'cerca de 2.575 km' },
      { label: 'Distância média de Saturno', value: 'cerca de 1,2 milhão de km' },
      { label: 'Período orbital', value: '15 dias e 22 horas' },
      { label: 'Atmosfera', value: 'densa, principalmente de nitrogênio' },
      { label: 'Fenômeno principal', value: 'ciclo de metano e etano com rios, lagos e mares' },
    ],
    sources: [
      {
        title: 'Titan: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/saturn/moons/titan/facts/',
      },
    ],
  },
  {
    id: 'uranus',
    name: 'Urano',
    aliases: ['planeta Urano', 'gigante de gelo Urano'],
    category: 'planet',
    type: 'Gigante de gelo',
    region: 'Sistema Solar exterior',
    summary: 'O sétimo planeta a partir do Sol, um gigante de gelo que parece girar de lado.',
    featured: false,
    impact:
      'Urano ajuda a investigar uma classe de planetas abundante fora do Sistema Solar, mas ainda pouco explorada de perto: os gigantes de gelo.',
    overview:
      'Sua atmosfera contém hidrogênio, hélio e metano; o metano absorve parte da luz vermelha e contribui para a aparência azul-esverdeada.',
    physics: {
      explanation:
        'O eixo de rotação inclinado em cerca de 98 graus faz o planeta parecer girar de lado e produz estações extremas, com longos períodos de luz ou escuridão nos polos.',
    },
    history:
      'William Herschel descobriu Urano com auxílio de telescópio em 1781; a Voyager 2 realizou a única visita próxima ao planeta em 1986.',
    facts: [
      { label: 'Diâmetro equatorial', value: 'cerca de 51.118 km' },
      { label: 'Distância média do Sol', value: 'cerca de 2,9 bilhões de km' },
      { label: 'Período orbital', value: 'cerca de 84 anos terrestres' },
      { label: 'Duração do dia', value: 'cerca de 17 horas' },
      { label: 'Inclinação do eixo', value: '97,77 graus' },
    ],
    sources: [
      {
        title: 'Uranus: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/uranus/facts/',
      },
    ],
  },
  {
    id: 'neptune',
    name: 'Netuno',
    aliases: ['planeta Netuno', 'gigante de gelo Netuno'],
    category: 'planet',
    type: 'Gigante de gelo',
    region: 'Sistema Solar exterior',
    summary: 'O oitavo e mais distante planeta do Sistema Solar, um mundo frio com ventos extremamente rápidos.',
    featured: false,
    impact:
      'Netuno mostra que uma atmosfera distante, que recebe pouca energia solar, ainda pode apresentar clima dinâmico e ventos intensos.',
    overview:
      'É um gigante de gelo com atmosfera principalmente de hidrogênio e hélio; o metano contribui para sua cor azul e nuvens congeladas são levadas por ventos velozes.',
    physics: {
      explanation:
        'A dinâmica atmosférica de Netuno produz ventos que podem ultrapassar 2.000 km/h. O metano absorve outras cores da luz e ajuda a dar ao planeta sua tonalidade azul.',
    },
    history:
      'Netuno foi identificado em 1846 a partir de previsões matemáticas sobre perturbações na órbita de Urano; a Voyager 2 foi a primeira nave a passar pelo planeta, em 1989.',
    facts: [
      { label: 'Diâmetro equatorial', value: 'cerca de 49.528 km' },
      { label: 'Distância média do Sol', value: 'cerca de 4,5 bilhões de km' },
      { label: 'Período orbital', value: 'cerca de 165 anos terrestres' },
      { label: 'Duração do dia', value: 'cerca de 16 horas' },
      { label: 'Ventos', value: 'mais de 2.000 km/h em sua atmosfera' },
    ],
    sources: [
      {
        title: 'Neptune: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/neptune/neptune-facts/',
      },
    ],
  },
  {
    id: 'pluto',
    name: 'Plutão',
    aliases: ['planeta anão Plutão', 'Plutão do Cinturão de Kuiper'],
    category: 'dwarf-planet',
    type: 'Planeta anão gelado',
    region: 'Cinturão de Kuiper',
    summary: 'Um planeta anão no Cinturão de Kuiper, além de Netuno, com montanhas, planícies, crateras e geleiras.',
    featured: true,
    impact:
      'Plutão ampliou o estudo dos pequenos mundos gelados e mostrou que a classificação científica descreve características orbitais, não uma escala de importância.',
    overview:
      'É um mundo complexo e distante, com gelo de nitrogênio, metano e monóxido de carbono na superfície e uma atmosfera tênue que varia ao longo de sua órbita.',
    physics: {
      explanation:
        'A União Astronômica Internacional classifica Plutão como planeta anão porque ele orbita o Sol, tem forma quase esférica, mas não limpou a vizinhança de sua órbita de outros objetos.',
    },
    history:
      'Descoberto em 1930 e reclassificado pela União Astronômica Internacional em 2006, Plutão foi explorado de perto pela missão New Horizons durante seu sobrevoo de 2015.',
    facts: [
      { label: 'Diâmetro equatorial', value: 'cerca de 2.377 km' },
      { label: 'Distância média do Sol', value: 'cerca de 5,9 bilhões de km' },
      { label: 'Período orbital', value: 'cerca de 248 anos terrestres' },
      { label: 'Duração do dia', value: 'cerca de 153 horas' },
      { label: 'Luas conhecidas', value: '5, incluindo Caronte' },
    ],
    sources: [
      {
        title: 'Pluto: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/dwarf-planets/pluto/facts/',
      },
    ],
  },
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
    },
    history:
      'Conhecido desde a Antiguidade no céu do hemisfério sul, o sistema é estudado como referência para medir distâncias estelares e procurar planetas em estrelas próximas.',
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 4,3 anos-luz' },
      { label: 'Componentes', value: 'Alpha Centauri A, Alpha Centauri B e Proxima Centauri' },
      { label: 'Tipo de A', value: 'estrela semelhante ao Sol' },
      { label: 'Tipo de B', value: 'estrela semelhante ao Sol, um pouco menor' },
      { label: 'Tipo de Proxima', value: 'anã vermelha' },
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
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 8,6 anos-luz' },
      { label: 'Componentes', value: 'Sirius A e Sirius B' },
      { label: 'Período orbital do par', value: 'cerca de 50 anos' },
      { label: 'Sirius A', value: 'a estrela mais brilhante do céu noturno' },
      { label: 'Sirius B', value: 'anã branca' },
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
    },
    history:
      'A queda incomum de brilho observada entre 2019 e 2020 foi acompanhada pelo Very Large Telescope. Os dados indicaram a participação de poeira expelida pela própria estrela.',
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 600 anos-luz' },
      { label: 'Tipo estelar', value: 'supergigante vermelha' },
      { label: 'Constelação', value: 'Órion' },
      { label: 'Tamanho observado', value: 'cerca de 800 vezes o do Sol' },
      { label: 'Fenômeno principal', value: 'variação de brilho e perda de matéria' },
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
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 1.500 anos-luz' },
      { label: 'Designação', value: 'M42' },
      { label: 'Constelação', value: 'Órion' },
      { label: 'Tipo', value: 'nebulosa de emissão' },
      { label: 'Núcleo luminoso', value: 'aglomerado do Trapézio' },
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
    },
    history:
      'Astrônomos chineses e japoneses registraram a supernova em 1054. A nebulosa foi identificada séculos depois e se tornou o primeiro objeto do catálogo de Messier.',
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 6.500 anos-luz' },
      { label: 'Designações', value: 'M1 e NGC 1952' },
      { label: 'Constelação', value: 'Touro' },
      { label: 'Extensão', value: 'cerca de 11 anos-luz' },
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
    facts: [
      { label: 'Distância da Terra', value: 'cerca de 26 mil anos-luz' },
      { label: 'Direção no céu', value: 'constelação de Sagitário' },
      { label: 'Observação óptica', value: 'fortemente bloqueada por poeira' },
      { label: 'Objeto central associado', value: 'Sagittarius A*' },
      { label: 'Faixas úteis', value: 'infravermelho, rádio e raios X' },
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
    facts: [
      { label: 'Tipo', value: 'galáxia espiral barrada' },
      { label: 'Diâmetro do disco', value: 'mais de 100 mil anos-luz' },
      { label: 'Número estimado de estrelas', value: 'cerca de 100 a 400 bilhões' },
      { label: 'Local do Sistema Solar', value: 'em um braço espiral, longe do centro' },
      { label: 'Órbita do Sistema Solar', value: 'cerca de 240 milhões de anos' },
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
    },
    history:
      'Medições de décadas das órbitas estelares no Centro Galáctico sustentaram sua identificação, e o Event Horizon Telescope divulgou sua primeira imagem em 2022.',
    facts: [
      { label: 'Massa', value: 'cerca de 4 milhões de massas solares' },
      { label: 'Distância da Terra', value: 'cerca de 27 mil anos-luz' },
      { label: 'Constelação', value: 'Sagitário' },
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
