import { describe, expect, it } from 'vitest'
import { TITLE_TYPES, validateTitle } from '../domain/title.js'
import { CATALOG } from './catalog.js'

describe('catálogo', () => {
  it('tiene al menos 20 títulos (requisito 1)', () => {
    expect(CATALOG.length).toBeGreaterThanOrEqual(20)
  })

  it('incluye películas y series', () => {
    const types = new Set(CATALOG.map((t) => t.type))
    expect(types).toEqual(new Set([TITLE_TYPES.MOVIE, TITLE_TYPES.SERIES]))
  })

  it('no repite ids', () => {
    const ids = CATALOG.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(CATALOG.map((t) => [t.id, t]))('"%s" cumple el modelo de datos', (_id, title) => {
    expect(validateTitle(title)).toEqual([])
  })

  it('cada título tiene imagen, título y género para la tarjeta (requisito 2)', () => {
    for (const title of CATALOG) {
      expect(title.poster).toMatch(/^data:image\/svg\+xml/)
      expect(title.title).not.toBe('')
      expect(title.genres.length).toBeGreaterThan(0)
    }
  })

  it('está congelado para evitar mutaciones accidentales', () => {
    expect(Object.isFrozen(CATALOG)).toBe(true)
    expect(Object.isFrozen(CATALOG[0])).toBe(true)
    expect(Object.isFrozen(CATALOG[0].genres)).toBe(true)
  })
})
