import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { getBodySurface } from './bodySurfaces.js'
import { PlanetSurface } from './PlanetSurface.jsx'

describe('PlanetSurface', () => {
  it('renders Europa fractures that span the globe without trying to fill them', () => {
    expect(() => renderToStaticMarkup(
      <PlanetSurface radius={1} {...getBodySurface('europa')} />,
    )).not.toThrow()
  })
})
