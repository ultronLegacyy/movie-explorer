/**
 * Persistencia de favoritos en localStorage.
 *
 * Todo lo que se lee de localStorage se trata como dato NO confiable: el usuario (o una extensión)
 * puede modificarlo desde las DevTools. Por eso se valida antes de usarlo y cualquier valor
 * inesperado se descarta en lugar de romper la aplicación.
 */

/** Clave versionada: si el formato cambia en el futuro, basta con subir la versión. */
export const STORAGE_KEY = 'movie-explorer:favorites:v1'

/** Límite defensivo de elementos guardados. */
export const MAX_FAVORITES = 500

/**
 * Obtiene localStorage de forma segura. En modo privado o con cookies bloqueadas, acceder a
 * `window.localStorage` puede lanzar una excepción.
 *
 * @returns {Storage | null}
 */
export function getDefaultStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

/**
 * Convierte un valor desconocido en una lista limpia de ids de favoritos.
 *
 * @param {unknown} value
 * @param {(id: string) => boolean} isKnownId Función que indica si el id existe en el catálogo.
 * @returns {string[]} Ids válidos, sin duplicados y respetando el orden original.
 */
export function sanitizeFavoriteIds(value, isKnownId) {
  if (!Array.isArray(value)) return []
  const unique = new Set()
  for (const id of value) {
    if (unique.size >= MAX_FAVORITES) break
    if (typeof id === 'string' && isKnownId(id)) unique.add(id)
  }
  return [...unique]
}

/**
 * Lee los favoritos guardados.
 *
 * @param {(id: string) => boolean} isKnownId
 * @param {Storage | null} [storage]
 * @returns {string[]}
 */
export function loadFavoriteIds(isKnownId, storage = getDefaultStorage()) {
  if (!storage) return []
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return []
    return sanitizeFavoriteIds(JSON.parse(raw), isKnownId)
  } catch {
    // JSON corrupto o almacenamiento inaccesible: se empieza sin favoritos.
    return []
  }
}

/**
 * Guarda los favoritos. Si el almacenamiento falla (cuota llena, modo privado) la app sigue
 * funcionando; solo se pierde la persistencia.
 *
 * @param {ReadonlyArray<string>} ids
 * @param {Storage | null} [storage]
 * @returns {boolean} `true` si se guardó correctamente.
 */
export function saveFavoriteIds(ids, storage = getDefaultStorage()) {
  if (!storage) return false
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_FAVORITES)))
    return true
  } catch (error) {
    console.warn('[favoritos] No se pudieron guardar los favoritos.', error)
    return false
  }
}
