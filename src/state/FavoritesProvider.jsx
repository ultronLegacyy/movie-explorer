import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { getTitlesByIds, titleExists } from '../services/catalogService.js'
import {
  STORAGE_KEY,
  getDefaultStorage,
  loadFavoriteIds,
  saveFavoriteIds,
} from '../services/favoritesStorage.js'
import { FavoritesContext } from './FavoritesContext.js'
import { FAVORITES_ACTIONS, favoritesReducer } from './favoritesReducer.js'

const defaultStorage = getDefaultStorage()

/**
 * Provee el estado de favoritos a toda la aplicación y lo guarda en localStorage.
 * Debe envolver a los componentes que usen `useFavorites()` (normalmente en `main.jsx`).
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {Storage | null} [props.storage] Permite inyectar otro almacenamiento (útil en pruebas).
 */
export function FavoritesProvider({ children, storage = defaultStorage }) {
  const [favoriteIds, dispatch] = useReducer(favoritesReducer, storage, (initialStorage) =>
    loadFavoriteIds(titleExists, initialStorage),
  )

  // Persistir cada cambio.
  useEffect(() => {
    saveFavoriteIds(favoriteIds, storage)
  }, [favoriteIds, storage])

  // Sincronizar si los favoritos cambian en otra pestaña del mismo navegador.
  useEffect(() => {
    if (!storage) return undefined
    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      dispatch({ type: FAVORITES_ACTIONS.REPLACE, ids: loadFavoriteIds(titleExists, storage) })
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storage])

  const toggleFavorite = useCallback((id) => dispatch({ type: FAVORITES_ACTIONS.TOGGLE, id }), [])
  const removeFavorite = useCallback((id) => dispatch({ type: FAVORITES_ACTIONS.REMOVE, id }), [])
  const clearFavorites = useCallback(() => dispatch({ type: FAVORITES_ACTIONS.CLEAR }), [])

  const value = useMemo(() => {
    const idSet = new Set(favoriteIds)
    return {
      favoriteIds,
      favorites: getTitlesByIds(favoriteIds),
      count: favoriteIds.length,
      isFavorite: (id) => idSet.has(id),
      toggleFavorite,
      removeFavorite,
      clearFavorites,
    }
  }, [favoriteIds, toggleFavorite, removeFavorite, clearFavorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
