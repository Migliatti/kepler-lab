import { getCuriosityTopicLabel } from '../content/curiosityTopics.js'
import { getAppearanceNotice, SCALE_NOTICE } from '../content/notices.js'

export const PANEL_SECTION_IDS = Object.freeze(['overview', 'physics', 'curiosities', 'data'])

export function buildDestinationPanel(destination) {
  return {
    header: {
      name: destination.name,
      type: destination.type,
      region: destination.region,
      impact: destination.impact,
    },
    sections: [
      { id: 'overview', title: 'Conhecer', overview: destination.overview },
      {
        id: 'physics',
        title: 'Entender a física',
        explanation: destination.physics.explanation,
        formula: destination.physics.formula ?? null,
      },
      {
        id: 'curiosities',
        title: 'Curiosidades e história',
        history: destination.history,
        curiosities: destination.curiosities.map(({ topic, text }) => ({
          topic,
          label: getCuriosityTopicLabel(topic),
          text,
        })),
      },
      {
        id: 'data',
        title: 'Dados e fontes',
        facts: destination.facts,
        sources: destination.sources,
        scaleNotice: SCALE_NOTICE,
        // Duplicado de propósito com o readout da cena: no celular o readout
        // não aparece e o aviso precisa continuar ao alcance.
        appearanceNotice: getAppearanceNotice(destination.id),
      },
    ],
  }
}
