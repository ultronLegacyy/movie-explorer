import { CATALOG } from '../data/catalog.js'

/** @typedef {import('../domain/title.js').Title} Title */

const BY_ID = new Map(CATALOG.map((title) => [title.id, title]))

/**
 * Lista de géneros que realmente aparecen en el catálogo, ordenada alfabéticamente.
 * Se calcula una sola vez porque el catálogo es inmutable.
 */
const GENRES_IN_USE = Object.freeze(
  [...new Set(CATALOG.flatMap((title) => title.genres))].sort((a, b) => a.localeCompare(b, 'es')),
)

/** @returns {ReadonlyArray<Readonly<Title>>} Todos los títulos del catálogo. */
export function getAllTitles() {
  return CATALOG
}

/**
 * @param {string} id
 * @returns {Readonly<Title> | null} El título o `null` si no existe.
 */
export function getTitleById(id) {
  if (typeof id !== 'string') return null
  return BY_ID.get(id) ?? null
}

/**
 * @param {Iterable<string>} ids
 * @returns {Readonly<Title>[]} Los títulos existentes, en el mismo orden que `ids`.
 */
export function getTitlesByIds(ids) {
  const result = []
  for (const id of ids) {
    const title = getTitleById(id)
    if (title) result.push(title)
  }
  return result
}

/** @returns {ReadonlyArray<string>} Géneros presentes en el catálogo. */
export function getGenres() {
  return GENRES_IN_USE
}

/**
 * @param {string} id
 * @returns {boolean}
 */
export function titleExists(id) {
  return BY_ID.has(id)
}
