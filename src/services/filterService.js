import { ALL, TITLE_TYPES } from '../domain/title.js'

/** @typedef {import('../domain/title.js').Title} Title */
/** @typedef {import('../domain/title.js').CatalogFilters} CatalogFilters */

/** Longitud máxima aceptada para el texto de búsqueda. */
export const MAX_QUERY_LENGTH = 100

const VALID_TYPES = new Set(Object.values(TITLE_TYPES))

/**
 * Normaliza texto para comparar sin importar mayúsculas, acentos ni espacios extra.
 *
 * @example normalizeText('  Acción ') // "accion"
 * @param {unknown} text
 * @returns {string}
 */
export function normalizeText(text) {
  if (typeof text !== 'string') return ''
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Limpia el texto de búsqueda: descarta valores que no sean texto y limita su longitud.
 *
 * @param {unknown} query
 * @returns {string}
 */
export function sanitizeQuery(query) {
  if (typeof query !== 'string') return ''
  return query.slice(0, MAX_QUERY_LENGTH)
}

/**
 * Busca títulos cuyo nombre contenga el texto (sin distinguir mayúsculas ni acentos).
 * Si el texto está vacío devuelve la lista completa.
 *
 * @param {ReadonlyArray<Title>} titles
 * @param {unknown} query
 * @returns {Title[]}
 */
export function searchByTitle(titles, query) {
  const needle = normalizeText(sanitizeQuery(query))
  if (!needle) return [...titles]
  return titles.filter((title) => normalizeText(title.title).includes(needle))
}

/**
 * @param {ReadonlyArray<Title>} titles
 * @param {unknown} genre Género exacto, o `ALL` / vacío para no filtrar.
 * @returns {Title[]}
 */
export function filterByGenre(titles, genre) {
  if (typeof genre !== 'string' || genre === '' || genre === ALL) return [...titles]
  return titles.filter((title) => title.genres.includes(genre))
}

/**
 * @param {ReadonlyArray<Title>} titles
 * @param {unknown} type "movie", "series", o `ALL` / vacío para no filtrar.
 * @returns {Title[]}
 */
export function filterByType(titles, type) {
  if (typeof type !== 'string' || type === '' || type === ALL) return [...titles]
  if (!VALID_TYPES.has(type)) return []
  return titles.filter((title) => title.type === type)
}

/**
 * Aplica búsqueda, género y tipo al mismo tiempo. Es una función pura: no modifica la lista.
 *
 * @param {ReadonlyArray<Title>} titles
 * @param {CatalogFilters} [filters]
 * @returns {Title[]}
 */
export function applyFilters(titles, filters = {}) {
  const { query = '', genre = ALL, type = ALL } = filters
  return searchByTitle(filterByType(filterByGenre(titles, genre), type), query)
}
