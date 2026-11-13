import { TITLE_TYPES } from './title.js'

/**
 * Convierte minutos a un texto legible.
 *
 * @example formatDuration(169) // "2 h 49 min"
 * @param {number} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return ''
  const hours = Math.floor(minutes / 60)
  const rest = Math.round(minutes % 60)
  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours} h`
  return `${hours} h ${rest} min`
}

/**
 * @example formatSeasons(1) // "1 temporada"
 * @param {number} seasons
 * @returns {string}
 */
export function formatSeasons(seasons) {
  if (!Number.isInteger(seasons) || seasons <= 0) return ''
  return `${seasons} ${seasons === 1 ? 'temporada' : 'temporadas'}`
}

/**
 * Devuelve la duración (películas) o las temporadas (series) de un título.
 *
 * @param {import('./title.js').Title} title
 * @returns {string}
 */
export function formatLength(title) {
  return title.type === TITLE_TYPES.MOVIE
    ? formatDuration(title.durationMin ?? 0)
    : formatSeasons(title.seasons ?? 0)
}
