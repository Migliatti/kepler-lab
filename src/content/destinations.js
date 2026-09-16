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
