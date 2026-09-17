export const CURIOSITY_TOPICS = Object.freeze([
  Object.freeze({ id: 'discovery', label: 'Descoberta' }),
  Object.freeze({ id: 'naming', label: 'Nome e nomenclatura' }),
  Object.freeze({ id: 'mythology', label: 'Mitologia e cultura' }),
  Object.freeze({ id: 'missions', label: 'Missões e observação' }),
  Object.freeze({ id: 'records', label: 'Recordes' }),
  Object.freeze({ id: 'phenomena', label: 'Fenômenos notáveis' }),
])

export const CURIOSITY_TOPIC_IDS = Object.freeze(CURIOSITY_TOPICS.map(({ id }) => id))

export function getCuriosityTopicLabel(topicId) {
  return CURIOSITY_TOPICS.find(({ id }) => id === topicId)?.label
}
