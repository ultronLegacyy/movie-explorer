import { useCallback, useMemo, useState } from 'react'
import { ALL } from '../domain/title.js'
import { getAllTitles, getGenres } from '../services/catalogService.js'
import { applyFilters, sanitizeQuery } from '../services/filterService.js'

/** @typedef {import('../domain/title.js').Title} Title */
/** @typedef {import('../domain/title.js').CatalogFilters} CatalogFilters */

/**
 * @typedef {Object} CatalogResult
 * @property {Readonly<Title>[]} titles   Títulos que cumplen los filtros.
 * @property {number} total               Cantidad de resultados.
 * @property {number} totalInCatalog      Cantidad total de títulos en el catálogo.
 * @property {ReadonlyArray<string>} genres Géneros disponibles para el filtro.
 * @property {boolean} isEmpty            `true` si no hay resultados.
 */

/**
 * Devuelve los títulos que cumplen los filtros dados. No guarda estado: el componente decide
 * dónde vive el estado de los filtros.
 *
 * @example
 * const { titles, genres } = useCatalog({ query, genre, type })
 *
 * @param {CatalogFilters} [filters]
 * @returns {CatalogResult}
 */
export function useCatalog({ query = '', genre = ALL, type = ALL } = {}) {
  return useMemo(() => {
    const all = getAllTitles()
    const titles = applyFilters(all, { query, genre, type })
    return {
      titles,
      total: titles.length,
      totalInCatalog: all.length,
      genres: getGenres(),
      isEmpty: titles.length === 0,
    }
  }, [query, genre, type])
}

const DEFAULT_FILTERS = Object.freeze({ query: '', genre: ALL, type: ALL })

/**
 * Igual que {@link useCatalog}, pero además maneja el estado de los filtros.
 *
 * @example
 * const { filters, setQuery, setGenre, setType, resetFilters, titles } = useCatalogFilters()
 * <input value={filters.query} onChange={(e) => setQuery(e.target.value)} />
 *
 * @param {CatalogFilters} [initialFilters]
 */
export function useCatalogFilters(initialFilters = DEFAULT_FILTERS) {
  const [filters, setFilters] = useState(() => ({ ...DEFAULT_FILTERS, ...initialFilters }))

  const setQuery = useCallback(
    (query) => setFilters((prev) => ({ ...prev, query: sanitizeQuery(query) })),
    [],
  )
  const setGenre = useCallback((genre) => setFilters((prev) => ({ ...prev, genre })), [])
  const setType = useCallback((type) => setFilters((prev) => ({ ...prev, type })), [])
  const resetFilters = useCallback(() => setFilters({ ...DEFAULT_FILTERS }), [])

  const result = useCatalog(filters)

  return { ...result, filters, setQuery, setGenre, setType, resetFilters }
}
