import { describe, expect, it } from 'vitest'

import { CURIOSITY_TOPIC_IDS, getCuriosityTopicLabel } from './curiosityTopics.js'

describe('curiosity topics', () => {
  it('exposes the closed vocabulary in display order', () => {
    expect(CURIOSITY_TOPIC_IDS).toEqual([
      'discovery', 'naming', 'mythology', 'missions', 'records', 'phenomena',
    ])
  })

  it('labels each topic in pt-BR', () => {
    expect(getCuriosityTopicLabel('discovery')).toBe('Descoberta')
    expect(getCuriosityTopicLabel('missions')).toBe('Missões e observação')
  })

  it('returns undefined for an unknown topic', () => {
    expect(getCuriosityTopicLabel('gossip')).toBeUndefined()
  })
})
