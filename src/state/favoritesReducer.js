import { titleExists } from '../services/catalogService.js'

export const FAVORITES_ACTIONS = Object.freeze({
  TOGGLE: 'favorites/toggle',
  REMOVE: 'favorites/remove',
  CLEAR: 'favorites/clear',
  /** Reemplaza el estado completo (p. ej. al sincronizar con otra pestaña). */
  REPLACE: 'favorites/replace',
})

/**
 * @typedef {string[]} FavoritesState Ids de favoritos en el orden en que se agregaron.
 *
 * @typedef {{ type: typeof FAVORITES_ACTIONS.TOGGLE, id: string }
 *   | { type: typeof FAVORITES_ACTIONS.REMOVE, id: string }
 *   | { type: typeof FAVORITES_ACTIONS.CLEAR }
 *   | { type: typeof FAVORITES_ACTIONS.REPLACE, ids: string[] }} FavoritesAction
 */

const sameIds = (a, b) => a.length === b.length && a.every((id, i) => id === b[i])

/**
 * Reducer puro de favoritos. Nunca modifica el estado anterior: siempre devuelve uno nuevo, o el
 * mismo si no hubo cambios (así React evita renderizados innecesarios).
 *
 * @param {FavoritesState} state
 * @param {FavoritesAction} action
 * @returns {FavoritesState}
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE: {
      if (!titleExists(action.id)) return state
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    }
    case FAVORITES_ACTIONS.REMOVE:
      return state.includes(action.id) ? state.filter((id) => id !== action.id) : state
    case FAVORITES_ACTIONS.CLEAR:
      return state.length === 0 ? state : []
    case FAVORITES_ACTIONS.REPLACE:
      return sameIds(state, action.ids) ? state : action.ids
    default:
      return state
  }
}
