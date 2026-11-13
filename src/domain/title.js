/**
 * Modelo de dominio del catálogo.
 *
 * El proyecto usa JavaScript, así que los tipos se documentan con JSDoc: el editor los usa para
 * autocompletar y avisar de errores. Este archivo es el contrato entre la capa de datos y la UI.
 */

/** Tipos de contenido disponibles. */
export const TITLE_TYPES = Object.freeze({
  MOVIE: 'movie',
  SERIES: 'series',
})

/** Etiqueta en español de cada tipo, lista para mostrar en la interfaz. */
export const TITLE_TYPE_LABELS = Object.freeze({
  [TITLE_TYPES.MOVIE]: 'Película',
  [TITLE_TYPES.SERIES]: 'Serie',
})

/** Géneros permitidos. El catálogo solo puede usar estos valores. */
export const GENRES = Object.freeze({
  ACTION: 'Acción',
  ADVENTURE: 'Aventura',
  ANIMATION: 'Animación',
  COMEDY: 'Comedia',
  CRIME: 'Crimen',
  DRAMA: 'Drama',
  FANTASY: 'Fantasía',
  HISTORY: 'Historia',
  HORROR: 'Terror',
  MUSICAL: 'Musical',
  MYSTERY: 'Misterio',
  ROMANCE: 'Romance',
  SCI_FI: 'Ciencia ficción',
  THRILLER: 'Thriller',
})

/** Valor que representa "sin filtro" en los filtros de género y tipo. */
export const ALL = 'all'

/** Opciones listas para los botones de filtro por tipo ("Todas", "Películas", "Series"). */
export const TYPE_FILTER_OPTIONS = Object.freeze([
  Object.freeze({ value: ALL, label: 'Todas' }),
  Object.freeze({ value: TITLE_TYPES.MOVIE, label: 'Películas' }),
  Object.freeze({ value: TITLE_TYPES.SERIES, label: 'Series' }),
])

/**
 * @typedef {'movie' | 'series'} TitleType
 */

/**
 * Una película o serie del catálogo.
 *
 * @typedef {Object} Title
 * @property {string} id            Identificador único y estable (slug), p. ej. "interstellar".
 * @property {TitleType} type       "movie" o "series".
 * @property {string} title         Título que se muestra.
 * @property {string[]} genres      Uno o más valores de {@link GENRES}; el primero es el principal.
 * @property {number} year          Año de estreno.
 * @property {string} synopsis      Sinopsis breve.
 * @property {number} [durationMin] Duración en minutos (solo películas).
 * @property {number} [seasons]     Número de temporadas (solo series).
 * @property {string} poster        URL de la imagen del póster.
 * @property {string} posterAlt     Texto alternativo del póster (accesibilidad).
 */

/**
 * Criterios de búsqueda y filtrado del catálogo.
 *
 * @typedef {Object} CatalogFilters
 * @property {string} [query] Texto a buscar en el título.
 * @property {string} [genre] Género exacto o {@link ALL}.
 * @property {TitleType | typeof ALL} [type] Tipo de contenido o {@link ALL}.
 */

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const GENRE_VALUES = new Set(Object.values(GENRES))
const TYPE_VALUES = new Set(Object.values(TITLE_TYPES))
const MIN_YEAR = 1888 // primera película conocida

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0

/**
 * Valida que un objeto cumpla el modelo {@link Title}.
 *
 * @param {unknown} candidate
 * @returns {string[]} Lista de errores; vacía si el título es válido.
 */
export function validateTitle(candidate) {
  if (candidate === null || typeof candidate !== 'object') {
    return ['el título debe ser un objeto']
  }

  /** @type {Record<string, unknown>} */
  const t = /** @type {any} */ (candidate)
  const errors = []

  if (typeof t.id !== 'string' || !ID_PATTERN.test(t.id)) {
    errors.push('id debe ser un slug en minúsculas (a-z, 0-9 y guiones)')
  }
  if (!TYPE_VALUES.has(/** @type {string} */ (t.type))) {
    errors.push(`type debe ser "${TITLE_TYPES.MOVIE}" o "${TITLE_TYPES.SERIES}"`)
  }
  if (!isNonEmptyString(t.title)) errors.push('title es obligatorio')
  if (!isNonEmptyString(t.synopsis)) errors.push('synopsis es obligatoria')
  if (!isNonEmptyString(t.poster)) errors.push('poster es obligatorio')
  if (!isNonEmptyString(t.posterAlt)) errors.push('posterAlt es obligatorio')

  if (!Array.isArray(t.genres) || t.genres.length === 0) {
    errors.push('genres debe tener al menos un género')
  } else {
    for (const genre of t.genres) {
      if (!GENRE_VALUES.has(genre)) errors.push(`género desconocido: ${String(genre)}`)
    }
    if (new Set(t.genres).size !== t.genres.length) errors.push('genres tiene duplicados')
  }

  const maxYear = new Date().getFullYear() + 1
  if (!Number.isInteger(t.year) || t.year < MIN_YEAR || t.year > maxYear) {
    errors.push(`year debe ser un entero entre ${MIN_YEAR} y ${maxYear}`)
  }

  if (t.type === TITLE_TYPES.MOVIE) {
    if (!isPositiveInteger(t.durationMin)) errors.push('una película requiere durationMin > 0')
    if (t.seasons !== undefined) errors.push('una película no debe tener seasons')
  }
  if (t.type === TITLE_TYPES.SERIES) {
    if (!isPositiveInteger(t.seasons)) errors.push('una serie requiere seasons > 0')
    if (t.durationMin !== undefined) errors.push('una serie no debe tener durationMin')
  }

  return errors
}
