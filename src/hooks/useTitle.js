import { useMemo } from 'react'
import { getTitleById } from '../services/catalogService.js'

/**
 * Devuelve un título por id para la vista de detalle.
 *
 * @example
 * const title = useTitle(selectedId)
 * if (!title) return <p>No encontrado</p>
 *
 * @param {string | null | undefined} id
 * @returns {Readonly<import('../domain/title.js').Title> | null}
 */
export function useTitle(id) {
  return useMemo(() => (id ? getTitleById(id) : null), [id])
}
