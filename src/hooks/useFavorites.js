import { useContext } from 'react'
import { FavoritesContext } from '../state/FavoritesContext.js'

/**
 * Acceso al estado de favoritos.
 *
 * @example
 * const { isFavorite, toggleFavorite, favorites, count } = useFavorites()
 *
 * @returns {import('../state/FavoritesContext.js').FavoritesContextValue}
 */
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === null) {
    throw new Error('useFavorites() debe usarse dentro de <FavoritesProvider>.')
  }
  return context
}
