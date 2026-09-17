import { describe, expect, it } from 'vitest'

import { SCALE_NOTICE } from '../content/notices.js'
import { destinations } from '../content/destinations.js'
import { buildDestinationPanel, PANEL_SECTION_IDS } from './destinationPanel.js'

const byId = (id) => destinations.find((destination) => destination.id === id)

describe('buildDestinationPanel', () => {
  it('orders the sections as the product spec requires', () => {
    const panel = buildDestinationPanel(byId('mars'))

    expect(panel.sections.map(({ id }) => id)).toEqual(PANEL_SECTION_IDS)
    expect(panel.sections.map(({ title }) => title)).toEqual([
      'Conhecer', 'Entender a física', 'Curiosidades e história', 'Dados e fontes',
    ])
  })

  it('builds the header from the destination', () => {
    const mars = byId('mars')

    expect(buildDestinationPanel(mars).header).toEqual({
      name: mars.name, type: mars.type, region: mars.region, impact: mars.impact,
    })
  })

  it('exposes a formula only when the destination has one', () => {
    const physicsOf = (id) => buildDestinationPanel(byId(id)).sections[1]

    expect(physicsOf('mercury').formula).toBeNull()
    expect(physicsOf('sun').formula.expression).toBe('L = 4πR²σT⁴')
  })

  it('labels curiosities in pt-BR, after the history text', () => {
    const section = buildDestinationPanel(byId('pluto')).sections[2]

    expect(section.history).toBe(byId('pluto').history)
    expect(section.curiosities[0]).toEqual({
      topic: 'discovery',
      label: 'Descoberta',
      text: byId('pluto').curiosities[0].text,
    })
  })

  it('shows the illustrative scale notice in the data section of every destination', () => {
    for (const destination of destinations) {
      const data = buildDestinationPanel(destination).sections[3]

      expect(data.scaleNotice, destination.id).toBe(SCALE_NOTICE)
      expect(data.facts).toBe(destination.facts)
      expect(data.sources).toBe(destination.sources)
    }
  })

  it('does not mutate the catalogue', () => {
    const original = structuredClone(destinations)

    destinations.forEach(buildDestinationPanel)

    expect(destinations).toEqual(original)
  })
})
