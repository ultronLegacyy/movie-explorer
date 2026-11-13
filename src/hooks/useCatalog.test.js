import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CATALOG } from '../data/catalog.js'
import { ALL, GENRES, TITLE_TYPES } from '../domain/title.js'
import { MAX_QUERY_LENGTH } from '../services/filterService.js'
import { useCatalog, useCatalogFilters } from './useCatalog.js'
import { useTitle } from './useTitle.js'

describe('useCatalog', () => {
  it('sin filtros devuelve todo el catálogo', () => {
    const { result } = renderHook(() => useCatalog())
    expect(result.current.total).toBe(CATALOG.length)
    expect(result.current.totalInCatalog).toBe(CATALOG.length)
    expect(result.current.genres.length).toBeGreaterThan(0)
  })

  it('aplica los filtros recibidos', () => {
    const { result } = renderHook(() =>
      useCatalog({ query: 'stranger', genre: GENRES.MYSTERY, type: TITLE_TYPES.SERIES }),
    )
    expect(result.current.titles.map((t) => t.id)).toEqual(['stranger-things'])
  })

  it('indica cuando no hay resultados', () => {
    const { result } = renderHook(() => useCatalog({ query: 'zzzz' }))
    expect(result.current.isEmpty).toBe(true)
  })

  it('memoriza el resultado mientras los filtros no cambien', () => {
    const { result, rerender } = renderHook((filters) => useCatalog(filters), {
      initialProps: { query: 'a' },
    })
    const first = result.current
    rerender({ query: 'a' })
    expect(result.current).toBe(first)
  })
})

describe('useCatalogFilters', () => {
  it('maneja el estado de búsqueda y filtros', () => {
    const { result } = renderHook(() => useCatalogFilters())

    act(() => result.current.setType(TITLE_TYPES.MOVIE))
    expect(result.current.titles.every((t) => t.type === TITLE_TYPES.MOVIE)).toBe(true)

    act(() => result.current.setGenre(GENRES.ANIMATION))
    act(() => result.current.setQuery('coco'))
    expect(result.current.titles.map((t) => t.id)).toEqual(['coco'])

    act(() => result.current.resetFilters())
    expect(result.current.filters).toEqual({ query: '', genre: ALL, type: ALL })
    expect(result.current.total).toBe(CATALOG.length)
  })

  it('limita la longitud del texto de búsqueda', () => {
    const { result } = renderHook(() => useCatalogFilters())
    act(() => result.current.setQuery('x'.repeat(1000)))
    expect(result.current.filters.query).toHaveLength(MAX_QUERY_LENGTH)
  })
})

describe('useTitle', () => {
  it('devuelve el detalle de un título (requisito 5)', () => {
    const { result } = renderHook(() => useTitle('breaking-bad'))
    expect(result.current).toMatchObject({ title: 'Breaking Bad', seasons: 5 })
  })

  it('devuelve null si no hay id o no existe', () => {
    expect(renderHook(() => useTitle(null)).result.current).toBeNull()
    expect(renderHook(() => useTitle('nope')).result.current).toBeNull()
  })
})
