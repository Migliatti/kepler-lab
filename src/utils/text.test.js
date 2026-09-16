import { describe, expect, it } from 'vitest'

import { normalizeText } from './text.js'

describe('normalizeText', () => {
  it('removes accents, lowercases and trims', () => {
    expect(normalizeText('  Vênus ')).toBe('venus')
  })

  it('collapses internal whitespace', () => {
    expect(normalizeText('buraco   negro')).toBe('buraco negro')
  })

  it('returns an empty string for non-string values', () => {
    expect(normalizeText(undefined)).toBe('')
    expect(normalizeText(null)).toBe('')
    expect(normalizeText(42)).toBe('')
  })
})
