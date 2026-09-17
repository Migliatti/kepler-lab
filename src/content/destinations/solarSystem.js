/** Solar System destinations of the curated catalogue (pt-BR). Pure data. */
export const solarSystemDestinations = [
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Posição', value: 'centro do Sistema Solar' },
        { label: 'Distância média da Terra', value: 'cerca de 1 UA' },
        { label: 'Volta ao redor do centro galáctico', value: 'cerca de 230 milhões de anos' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 0,39 UA' },
        { label: 'Período orbital', value: '88 dias terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 0,72 UA' },
        { label: 'Período orbital', value: '225 dias terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Terra' },
        { label: 'Distância média da Terra', value: 'cerca de 384.400 km' },
        { label: 'Período orbital', value: '27 dias terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 1,52 UA' },
        { label: 'Período orbital', value: '687 dias terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: '1 UA, por definição' },
        { label: 'Período orbital', value: '365,26 dias' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 5,2 UA' },
        { label: 'Período orbital', value: 'cerca de 12 anos terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Júpiter' },
        { label: 'Distância média de Júpiter', value: 'cerca de 671.000 km' },
        { label: 'Período orbital', value: 'cerca de 3,5 dias terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Júpiter' },
        { label: 'Distância média de Júpiter', value: 'cerca de 422.000 km' },
        { label: 'Período orbital', value: 'cerca de 1,8 dia terrestre' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 9,5 UA' },
        { label: 'Período orbital', value: 'cerca de 29,4 anos terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Corpo central', value: 'Saturno' },
        { label: 'Distância média de Saturno', value: 'cerca de 1,2 milhão de km' },
        { label: 'Período orbital', value: '15 dias e 22 horas' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 19,2 UA' },
        { label: 'Período orbital', value: 'cerca de 84 anos terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 30 UA' },
        { label: 'Período orbital', value: 'cerca de 165 anos terrestres' },
      ],
    },
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
    coordinates: {
      kind: 'orbital',
      entries: [
        { label: 'Distância média do Sol', value: 'cerca de 39,5 UA' },
        { label: 'Período orbital', value: 'cerca de 248 anos terrestres' },
      ],
    },
    sources: [
      {
        title: 'Pluto: Facts',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/dwarf-planets/pluto/facts/',
      },
    ],
  },
]
