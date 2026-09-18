// Declaração dos controles de Configurações. Dado puro: o painel só mapeia
// isto para <fieldset>, <legend> e controles nativos.

export const SETTINGS_TITLE = 'Configurações'

export const SETTINGS_GROUPS = Object.freeze([
  Object.freeze({
    key: 'sound',
    legend: 'Som',
    control: 'checkbox',
    label: 'Som ambiente',
    note: 'O som ambiente chega em uma próxima etapa. A escolha já fica guardada.',
    reserved: true,
  }),
  Object.freeze({
    key: 'travel',
    legend: 'Viagem',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'full', label: 'Completa', hint: 'A câmera percorre todo o trajeto.' }),
      Object.freeze({ value: 'short', label: 'Curta', hint: 'O mesmo trajeto, em menos tempo.' }),
      Object.freeze({ value: 'instant', label: 'Imediata', hint: 'Chega ao destino sem animação.' }),
    ]),
  }),
  Object.freeze({
    key: 'reducedMotion',
    legend: 'Movimento',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'system', label: 'Seguir o sistema' }),
      Object.freeze({ value: 'on', label: 'Movimento reduzido' }),
      Object.freeze({ value: 'off', label: 'Movimento completo' }),
    ]),
  }),
  Object.freeze({
    key: 'textSize',
    legend: 'Texto',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'default', label: 'Padrão' }),
      Object.freeze({ value: 'large', label: 'Maior' }),
    ]),
  }),
  Object.freeze({
    key: 'contrast',
    legend: 'Contraste',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'default', label: 'Padrão' }),
      Object.freeze({ value: 'high', label: 'Alto contraste' }),
    ]),
  }),
  Object.freeze({
    key: 'labels',
    legend: 'Rótulos',
    control: 'radio',
    options: Object.freeze([
      Object.freeze({ value: 'none', label: 'Ocultos' }),
      Object.freeze({ value: 'hover', label: 'Ao apontar' }),
      Object.freeze({ value: 'always', label: 'Sempre visíveis' }),
    ]),
  }),
])
