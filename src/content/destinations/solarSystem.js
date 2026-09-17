/** Solar System destinations of the curated catalogue (pt-BR). Pure data. */
export const solarSystemDestinations = [
  {
    id: 'sun',
    name: 'Sol',
    aliases: ['estrela do Sistema Solar', 'astro-rei'],
    category: 'star',
    type: 'Estrela de sequÃªncia principal',
    region: 'Sistema Solar',
    summary: 'A estrela no centro do Sistema Solar, cuja gravidade mantÃ©m planetas, luas e pequenos corpos em Ã³rbita.',
    featured: true,
    impact:
      'O Sol fornece a luz e a energia que tornam possÃ­vel a vida na Terra e organiza gravitacionalmente todo o Sistema Solar.',
    overview:
      'Ã‰ uma estrela de tamanho mÃ©dio, formada principalmente por plasma, com energia produzida por fusÃ£o nuclear em seu nÃºcleo.',
    physics: {
      explanation:
        'No nÃºcleo, a fusÃ£o de hidrogÃªnio libera energia; a pressÃ£o produzida ajuda a equilibrar a atraÃ§Ã£o da enorme massa do Sol.',
    },
    history:
      'O estudo do Sol evoluiu de observaÃ§Ãµes a olho nu para mediÃ§Ãµes por telescÃ³pios e missÃµes espaciais que acompanham sua atividade.',
    facts: [
      { label: 'Raio', value: 'cerca de 700.000 km' },
      { label: 'Massa', value: 'mais de 330.000 massas terrestres' },
      { label: 'Temperatura do nÃºcleo', value: 'cerca de 15 milhÃµes Â°C' },
      { label: 'Temperatura da fotosfera', value: 'cerca de 5.500 Â°C' },
      { label: 'DistÃ¢ncia mÃ©dia da Terra', value: 'cerca de 150 milhÃµes de km' },
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
    name: 'MercÃºrio',
    aliases: ['planeta MercÃºrio', 'primeiro planeta do Sistema Solar'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar interior',
    summary: 'O menor planeta do Sistema Solar e o mais prÃ³ximo do Sol.',
    featured: false,
    impact:
      'MercÃºrio mostra como a proximidade do Sol pode criar um mundo de extremos tÃ©rmicos e uma Ã³rbita muito rÃ¡pida.',
    overview:
      'Sua superfÃ­cie rochosa e cheia de crateras lembra a da Lua, enquanto sua Ã³rbita oval o leva muito perto do Sol.',
    physics: {
      explanation:
        'A atmosfera extremamente tÃªnue quase nÃ£o retÃ©m calor: a superfÃ­cie aquece muito durante o dia e esfria intensamente Ã  noite.',
    },
    history:
      'A sonda Mariner 10 foi a primeira nave a visitar MercÃºrio; mais tarde, a missÃ£o MESSENGER o estudou em Ã³rbita.',
    facts: [
      { label: 'Raio', value: 'cerca de 2.440 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 58 milhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: '88 dias terrestres' },
      { label: 'RotaÃ§Ã£o', value: '59 dias terrestres' },
      { label: 'Temperatura na superfÃ­cie', value: 'de cerca de -180 Â°C a 430 Â°C' },
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
    name: 'VÃªnus',
    aliases: ['planeta VÃªnus', 'segundo planeta do Sistema Solar'],
    category: 'planet',
    type: 'Planeta rochoso',
    region: 'Sistema Solar interior',
    summary: 'O segundo planeta a partir do Sol, de tamanho semelhante ao da Terra, mas com uma atmosfera extremamente densa.',
    featured: false,
    impact:
      'VÃªnus evidencia como uma atmosfera rica em diÃ³xido de carbono pode reter calor e transformar um planeta parecido em tamanho com a Terra.',
    overview:
      'Nuvens densas escondem uma superfÃ­cie vulcÃ¢nica, quente e sob pressÃ£o atmosfÃ©rica muito maior que a da Terra.',
    physics: {
      explanation:
        'O efeito estufa intenso retÃ©m energia tÃ©rmica na atmosfera espessa, elevando a temperatura da superfÃ­cie acima da de MercÃºrio.',
    },
    history:
      'As sondas Venera alcanÃ§aram a superfÃ­cie, e a missÃ£o Magellan da NASA a mapeou por radar durante cinco anos.',
    facts: [
      { label: 'DiÃ¢metro equatorial', value: 'cerca de 12.104 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 108 milhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: '225 dias terrestres' },
      { label: 'RotaÃ§Ã£o', value: '243 dias terrestres' },
      { label: 'Temperatura na superfÃ­cie', value: 'cerca de 467 Â°C' },
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
    aliases: ['lua da Terra', 'satÃ©lite natural da Terra'],
    category: 'moon',
    type: 'SatÃ©lite natural rochoso',
    region: 'Sistema Terra-Lua',
    summary: 'O Ãºnico satÃ©lite natural da Terra e o Ãºnico corpo celeste alÃ©m dela jÃ¡ visitado por seres humanos.',
    featured: true,
    impact:
      'A Lua preserva crateras, rochas e gelo que ajudam a investigar a histÃ³ria do Sistema Solar e serve de destino prÃ³ximo para a exploraÃ§Ã£o humana.',
    overview:
      'Sua superfÃ­cie sÃ³lida e rochosa Ã© marcada por impactos; a rotaÃ§Ã£o sincronizada faz com que o mesmo hemisfÃ©rio fique voltado para a Terra.',
    physics: {
      explanation:
        'A rotaÃ§Ã£o sincronizada acontece porque interaÃ§Ãµes gravitacionais ao longo do tempo fizeram a Lua girar no mesmo ritmo em que orbita a Terra.',
    },
    history:
      'As missÃµes Apollo levaram doze astronautas Ã  Lua entre 1969 e 1972 e trouxeram amostras que ainda sÃ£o estudadas.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.740 km' },
      { label: 'DistÃ¢ncia mÃ©dia da Terra', value: 'cerca de 384.400 km' },
      { label: 'PerÃ­odo orbital', value: '27 dias terrestres' },
      { label: 'RotaÃ§Ã£o', value: 'sincronizada com a Ã³rbita, em 27 dias terrestres' },
      { label: 'Amostras Apollo trazidas Ã  Terra', value: '382 kg' },
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
    summary: 'O quarto planeta a partir do Sol, um mundo frio e desÃ©rtico com atmosfera muito tÃªnue.',
    featured: true,
    impact:
      'Marte Ã© um laboratÃ³rio para estudar a perda de Ã¡gua e atmosfera em planetas rochosos e um destino central da exploraÃ§Ã£o robÃ³tica.',
    overview:
      'O solo rico em minerais de ferro oxidados dÃ¡ a Marte a aparÃªncia avermelhada; hÃ¡ calotas polares, vulcÃµes, cÃ¢nions e tempestades de poeira.',
    physics: {
      explanation:
        'Sua atmosfera fina deixa o calor escapar com facilidade, contribuindo para grandes variaÃ§Ãµes de temperatura na superfÃ­cie.',
    },
    history:
      'Desde o pouso da Viking 1 em 1976, orbitadores e robÃ´s mÃ³veis estudam o planeta e buscam evidÃªncias de ambientes antigos mais Ãºmidos.',
    facts: [
      { label: 'Raio', value: 'cerca de 3.390 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 228 milhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: '687 dias terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: '24,6 horas' },
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
    summary: 'O terceiro planeta a partir do Sol e o Ãºnico mundo conhecido que abriga vida.',
    featured: true,
    impact:
      'A Terra Ã© a referÃªncia para comparar outros mundos porque concentra toda a vida conhecida e a Ãºnica civilizaÃ§Ã£o capaz de estudÃ¡-los.',
    overview:
      'Seu interior rochoso, oceanos de Ã¡gua lÃ­quida, atmosfera e campo magnÃ©tico formam um sistema que sustenta condiÃ§Ãµes habitÃ¡veis na superfÃ­cie.',
    physics: {
      explanation:
        'A gravidade da Terra mantÃ©m o ar e a Ã¡gua prÃ³ximos ao planeta; sua rotaÃ§Ã£o e a energia recebida do Sol tambÃ©m influenciam o clima.',
    },
    history:
      'ObservaÃ§Ãµes feitas por satÃ©lites e missÃµes espaciais transformaram a Terra de um horizonte local em um planeta medido como um sistema inteiro.',
    facts: [
      { label: 'Raio mÃ©dio', value: '6.371 km' },
      { label: 'Massa', value: '5,97 Ã— 10Â²â´ kg' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: '149,6 milhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: '365,26 dias' },
      { label: 'Gravidade na superfÃ­cie', value: '9,8 m/sÂ²' },
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
    name: 'JÃºpiter',
    aliases: ['planeta JÃºpiter', 'gigante gasoso JÃºpiter'],
    category: 'planet',
    type: 'Gigante gasoso',
    region: 'Sistema Solar exterior',
    summary: 'O quinto planeta a partir do Sol e o maior planeta do Sistema Solar.',
    featured: true,
    impact:
      'JÃºpiter concentra grande parte da massa planetÃ¡ria do Sistema Solar e permite estudar atmosferas profundas, campos magnÃ©ticos e sistemas de luas.',
    overview:
      'Ã‰ um gigante composto principalmente de hidrogÃªnio e hÃ©lio, coberto por faixas de nuvens e tempestades, incluindo a Grande Mancha Vermelha.',
    physics: {
      explanation:
        'A rÃ¡pida rotaÃ§Ã£o e o hidrogÃªnio eletricamente condutor em profundidade ajudam a gerar um campo magnÃ©tico muito intenso; nÃ£o hÃ¡ uma superfÃ­cie sÃ³lida onde uma nave possa pousar.',
    },
    history:
      'Observado desde a Antiguidade, JÃºpiter foi estudado de perto por missÃµes como Voyager, Galileo e Juno, que mede seu campo gravitacional e magnÃ©tico.',
    facts: [
      { label: 'Raio', value: '69.911 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 778 milhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 12 anos terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: 'cerca de 9,9 horas' },
      { label: 'Atmosfera principal', value: 'hidrogÃªnio e hÃ©lio' },
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
    aliases: ['lua Europa de JÃºpiter', 'Europa, lua de JÃºpiter'],
    category: 'moon',
    type: 'SatÃ©lite natural gelado de JÃºpiter',
    region: 'Sistema de JÃºpiter',
    summary: 'Uma grande lua de JÃºpiter cuja crosta de gelo provavelmente encobre um oceano global de Ã¡gua lÃ­quida.',
    featured: true,
    impact:
      'Europa Ã© um destino prioritÃ¡rio para investigar se um oceano subterrÃ¢neo em uma lua pode reunir condiÃ§Ãµes favorÃ¡veis Ã  vida como a conhecemos.',
    overview:
      'Esta lua de JÃºpiter tem uma superfÃ­cie clara e fraturada de gelo; abaixo dela, hÃ¡ fortes evidÃªncias de um oceano de Ã¡gua salgada.',
    physics: {
      explanation:
        'A gravidade de JÃºpiter estica Europa durante sua Ã³rbita levemente oval. Esse aquecimento de marÃ© pode manter Ã¡gua lÃ­quida sob a crosta de gelo.',
    },
    history:
      'Europa foi observada por Galileu em 1610; as missÃµes Voyager e Galileo revelaram sua superfÃ­cie fraturada, e a Europa Clipper foi projetada para investigar sua habitabilidade.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.561 km' },
      { label: 'DistÃ¢ncia mÃ©dia de JÃºpiter', value: 'cerca de 671.000 km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 3,5 dias terrestres' },
      { label: 'RotaÃ§Ã£o', value: 'sincronizada com a Ã³rbita em torno de JÃºpiter' },
      { label: 'FenÃ´meno principal', value: 'aquecimento de marÃ© que pode sustentar um oceano interno' },
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
    aliases: ['lua Io de JÃºpiter', 'Io, lua de JÃºpiter'],
    category: 'moon',
    type: 'SatÃ©lite natural vulcÃ¢nico de JÃºpiter',
    region: 'Sistema de JÃºpiter',
    summary: 'Uma lua de JÃºpiter e o corpo com maior atividade vulcÃ¢nica conhecida no Sistema Solar.',
    featured: false,
    impact:
      'Io mostra como forÃ§as gravitacionais podem aquecer o interior de uma lua e alimentar vulcanismo intenso sem depender da energia do Sol.',
    overview:
      'A superfÃ­cie desta lua de JÃºpiter Ã© continuamente renovada por erupÃ§Ãµes vulcÃ¢nicas e por depÃ³sitos ricos em enxofre.',
    physics: {
      explanation:
        'As puxadas gravitacionais de JÃºpiter, Europa e Ganimedes deformam Io repetidamente. O atrito interno associado a essa marÃ© transforma energia orbital em calor e alimenta vulcÃµes.',
    },
    history:
      'Io foi observada por Galileu em 1610; as sondas Voyager, Galileo e Juno registraram vulcÃµes ativos e ajudaram a medir as forÃ§as que os alimentam.',
    facts: [
      { label: 'Raio', value: 'cerca de 1.822 km' },
      { label: 'DistÃ¢ncia mÃ©dia de JÃºpiter', value: 'cerca de 422.000 km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 1,8 dia terrestre' },
      { label: 'RotaÃ§Ã£o', value: 'sincronizada com a Ã³rbita em torno de JÃºpiter' },
      { label: 'FenÃ´meno principal', value: 'vulcanismo alimentado por aquecimento de marÃ©' },
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
    summary: 'O sexto planeta a partir do Sol, conhecido por seu sistema de anÃ©is amplo e complexo.',
    featured: true,
    impact:
      'Saturno permite estudar anÃ©is, luas e processos gravitacionais em um sistema que funciona como um laboratÃ³rio natural em escala planetÃ¡ria.',
    overview:
      'Ã‰ o segundo maior planeta do Sistema Solar, feito principalmente de hidrogÃªnio e hÃ©lio, com anÃ©is compostos sobretudo de gelo e rocha.',
    physics: {
      explanation:
        'Os anÃ©is sÃ£o formados por incontÃ¡veis partÃ­culas em Ã³rbitas separadas; a gravidade de Saturno e de suas luas organiza lacunas, ondas e outras estruturas.',
    },
    history:
      'Conhecido desde a Antiguidade, Saturno foi visitado por Pioneer e Voyager; a missÃ£o Cassini orbitou o planeta de 2004 a 2017 e transformou o conhecimento sobre seu sistema.',
    facts: [
      { label: 'DiÃ¢metro equatorial', value: 'cerca de 120.500 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 1,4 bilhÃ£o de km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 29,4 anos terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: 'cerca de 10,7 horas' },
      { label: 'AnÃ©is', value: 'partÃ­culas de gelo e rocha em Ã³rbita' },
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
    name: 'TitÃ£',
    aliases: ['lua TitÃ£ de Saturno', 'TitÃ£, lua de Saturno'],
    category: 'moon',
    type: 'SatÃ©lite natural com atmosfera de Saturno',
    region: 'Sistema de Saturno',
    summary: 'A maior lua de Saturno, com atmosfera densa e um ciclo de lÃ­quidos de metano e etano em sua superfÃ­cie.',
    featured: true,
    impact:
      'TitÃ£ Ã© um caso Ãºnico para comparar quÃ­mica atmosfÃ©rica e ciclos de lÃ­quidos em um mundo frio, usando metano e etano em vez de Ã¡gua lÃ­quida na superfÃ­cie.',
    overview:
      'Esta lua de Saturno Ã© coberta por uma nÃ©voa dourada; sob ela existem nuvens, chuva, rios, lagos e mares de hidrocarbonetos lÃ­quidos.',
    physics: {
      explanation:
        'Na baixa temperatura de TitÃ£, metano e etano podem condensar, chover e escoar. A atmosfera densa, composta principalmente de nitrogÃªnio, sustenta esse ciclo de lÃ­quidos.',
    },
    history:
      'Descoberto por Christiaan Huygens em 1655, TitÃ£ foi investigado pela missÃ£o Cassini-Huygens; a sonda Huygens pousou em sua superfÃ­cie em 2005.',
    facts: [
      { label: 'Raio', value: 'cerca de 2.575 km' },
      { label: 'DistÃ¢ncia mÃ©dia de Saturno', value: 'cerca de 1,2 milhÃ£o de km' },
      { label: 'PerÃ­odo orbital', value: '15 dias e 22 horas' },
      { label: 'Atmosfera', value: 'densa, principalmente de nitrogÃªnio' },
      { label: 'FenÃ´meno principal', value: 'ciclo de metano e etano com rios, lagos e mares' },
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
    summary: 'O sÃ©timo planeta a partir do Sol, um gigante de gelo que parece girar de lado.',
    featured: false,
    impact:
      'Urano ajuda a investigar uma classe de planetas abundante fora do Sistema Solar, mas ainda pouco explorada de perto: os gigantes de gelo.',
    overview:
      'Sua atmosfera contÃ©m hidrogÃªnio, hÃ©lio e metano; o metano absorve parte da luz vermelha e contribui para a aparÃªncia azul-esverdeada.',
    physics: {
      explanation:
        'O eixo de rotaÃ§Ã£o inclinado em cerca de 98 graus faz o planeta parecer girar de lado e produz estaÃ§Ãµes extremas, com longos perÃ­odos de luz ou escuridÃ£o nos polos.',
    },
    history:
      'William Herschel descobriu Urano com auxÃ­lio de telescÃ³pio em 1781; a Voyager 2 realizou a Ãºnica visita prÃ³xima ao planeta em 1986.',
    facts: [
      { label: 'DiÃ¢metro equatorial', value: 'cerca de 51.118 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 2,9 bilhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 84 anos terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: 'cerca de 17 horas' },
      { label: 'InclinaÃ§Ã£o do eixo', value: '97,77 graus' },
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
    summary: 'O oitavo e mais distante planeta do Sistema Solar, um mundo frio com ventos extremamente rÃ¡pidos.',
    featured: false,
    impact:
      'Netuno mostra que uma atmosfera distante, que recebe pouca energia solar, ainda pode apresentar clima dinÃ¢mico e ventos intensos.',
    overview:
      'Ã‰ um gigante de gelo com atmosfera principalmente de hidrogÃªnio e hÃ©lio; o metano contribui para sua cor azul e nuvens congeladas sÃ£o levadas por ventos velozes.',
    physics: {
      explanation:
        'A dinÃ¢mica atmosfÃ©rica de Netuno produz ventos que podem ultrapassar 2.000 km/h. O metano absorve outras cores da luz e ajuda a dar ao planeta sua tonalidade azul.',
    },
    history:
      'Netuno foi identificado em 1846 a partir de previsÃµes matemÃ¡ticas sobre perturbaÃ§Ãµes na Ã³rbita de Urano; a Voyager 2 foi a primeira nave a passar pelo planeta, em 1989.',
    facts: [
      { label: 'DiÃ¢metro equatorial', value: 'cerca de 49.528 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 4,5 bilhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 165 anos terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: 'cerca de 16 horas' },
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
    name: 'PlutÃ£o',
    aliases: ['planeta anÃ£o PlutÃ£o', 'PlutÃ£o do CinturÃ£o de Kuiper'],
    category: 'dwarf-planet',
    type: 'Planeta anÃ£o gelado',
    region: 'CinturÃ£o de Kuiper',
    summary: 'Um planeta anÃ£o no CinturÃ£o de Kuiper, alÃ©m de Netuno, com montanhas, planÃ­cies, crateras e geleiras.',
    featured: true,
    impact:
      'PlutÃ£o ampliou o estudo dos pequenos mundos gelados e mostrou que a classificaÃ§Ã£o cientÃ­fica descreve caracterÃ­sticas orbitais, nÃ£o uma escala de importÃ¢ncia.',
    overview:
      'Ã‰ um mundo complexo e distante, com gelo de nitrogÃªnio, metano e monÃ³xido de carbono na superfÃ­cie e uma atmosfera tÃªnue que varia ao longo de sua Ã³rbita.',
    physics: {
      explanation:
        'A UniÃ£o AstronÃ´mica Internacional classifica PlutÃ£o como planeta anÃ£o porque ele orbita o Sol, tem forma quase esfÃ©rica, mas nÃ£o limpou a vizinhanÃ§a de sua Ã³rbita de outros objetos.',
    },
    history:
      'Descoberto em 1930 e reclassificado pela UniÃ£o AstronÃ´mica Internacional em 2006, PlutÃ£o foi explorado de perto pela missÃ£o New Horizons durante seu sobrevoo de 2015.',
    facts: [
      { label: 'DiÃ¢metro equatorial', value: 'cerca de 2.377 km' },
      { label: 'DistÃ¢ncia mÃ©dia do Sol', value: 'cerca de 5,9 bilhÃµes de km' },
      { label: 'PerÃ­odo orbital', value: 'cerca de 248 anos terrestres' },
      { label: 'DuraÃ§Ã£o do dia', value: 'cerca de 153 horas' },
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
]
