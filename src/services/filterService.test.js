import { describe, expect, it } from 'vitest'
import { ALL, GENRES, TITLE_TYPES } from '../domain/title.js'
import {
  MAX_QUERY_LENGTH,
  applyFilters,
  filterByGenre,
  filterByType,
  normalizeText,
  sanitizeQuery,
  searchByTitle,
} from './filterService.js'

/** Mini catálogo de prueba, independiente de los datos reales. */
const titles = [
  { id: 'a', type: TITLE_TYPES.MOVIE, title: 'El viaje de Chihiro', genres: [GENRES.ANIMATION] },
  { id: 'b', type: TITLE_TYPES.MOVIE, title: 'Matrix', genres: [GENRES.SCI_FI, GENRES.ACTION] },
  { id: 'c', type: TITLE_TYPES.SERIES, title: 'Dark', genres: [GENRES.SCI_FI, GENRES.MYSTERY] },
  { id: 'd', type: TITLE_TYPES.SERIES, title: 'Acción Total', genres: [GENRES.ACTION] },
]
const ids = (list) => list.map((t) => t.id)

describe('normalizeText', () => {
  it('ignora mayúsculas, acentos y espacios extra', () => {
    expect(normalizeText('  ACCIÓN   Total ')).toBe('accion total')
  })

  it('devuelve "" para valores que no son texto', () => {
    expect(normalizeText(undefined)).toBe('')
    expect(normalizeText(42)).toBe('')
  })
})

describe('sanitizeQuery', () => {
  it('limita la longitud de la búsqueda', () => {
    expect(sanitizeQuery('x'.repeat(500))).toHaveLength(MAX_QUERY_LENGTH)
  })

  it('descarta valores que no son texto', () => {
    expect(sanitizeQuery({ toString: () => 'hack' })).toBe('')
  })
})

describe('searchByTitle (requisito 3)', () => {
  it('encuentra coincidencias parciales sin distinguir mayúsculas', () => {
    expect(ids(searchByTitle(titles, 'MAT'))).toEqual(['b'])
  })

  it('encuentra sin importar los acentos', () => {
    expect(ids(searchByTitle(titles, 'accion'))).toEqual(['d'])
    expect(ids(searchByTitle(titles, 'chíhiro'))).toEqual(['a'])
  })

  it('devuelve todo si la búsqueda está vacía', () => {
    expect(searchByTitle(titles, '   ')).toHaveLength(titles.length)
  })

  it('trata los caracteres especiales como texto normal', () => {
    expect(searchByTitle(titles, '.*')).toEqual([])
    expect(searchByTitle(titles, '<script>')).toEqual([])
  })

  it('no modifica la lista original', () => {
    const result = searchByTitle(titles, '')
    expect(result).not.toBe(titles)
  })
})

describe('filterByGenre (requisito 4)', () => {
  it('filtra por género', () => {
    expect(ids(filterByGenre(titles, GENRES.SCI_FI))).toEqual(['b', 'c'])
  })

  it.each([ALL, '', undefined])('no filtra con %s', (genre) => {
    expect(filterByGenre(titles, genre)).toHaveLength(titles.length)
  })
})

describe('filterByType (requisito 4)', () => {
  it('filtra películas y series', () => {
    expect(ids(filterByType(titles, TITLE_TYPES.MOVIE))).toEqual(['a', 'b'])
    expect(ids(filterByType(titles, TITLE_TYPES.SERIES))).toEqual(['c', 'd'])
  })

  it('devuelve vacío con un tipo desconocido', () => {
    expect(filterByType(titles, 'documental')).toEqual([])
  })

  it('no filtra con ALL', () => {
    expect(filterByType(titles, ALL)).toHaveLength(titles.length)
  })
})

describe('applyFilters', () => {
  it('combina búsqueda, género y tipo', () => {
    expect(ids(applyFilters(titles, { genre: GENRES.SCI_FI, type: TITLE_TYPES.SERIES }))).toEqual([
      'c',
    ])
    expect(ids(applyFilters(titles, { query: 'a', genre: GENRES.ACTION }))).toEqual(['b', 'd'])
  })

  it('sin filtros devuelve todo', () => {
    expect(applyFilters(titles)).toHaveLength(titles.length)
  })
})
