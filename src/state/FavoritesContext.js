import { createContext } from 'react'

/**
 * Valor que expone el contexto de favoritos.
 *
 * @typedef {Object} FavoritesContextValue
 * @property {ReadonlyArray<string>} favoriteIds Ids de los favoritos en orden de alta.
 * @property {ReadonlyArray<Readonly<import('../domain/title.js').Title>>} favorites Títulos completos.
 * @property {number} count Cantidad de favoritos.
 * @property {(id: string) => boolean} isFavorite
 * @property {(id: string) => void} toggleFavorite Marca o desmarca un título.
 * @property {(id: string) => void} removeFavorite
 * @property {() => void} clearFavorites
 */

/** @type {import('react').Context<FavoritesContextValue | null>} */
export const FavoritesContext = createContext(/** @type {FavoritesContextValue | null} */ (null))
FavoritesContext.displayName = 'FavoritesContext'
