import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useFavorites } from '../hooks/useFavorites.js'
import { STORAGE_KEY } from '../services/favoritesStorage.js'
import { FavoritesProvider } from './FavoritesProvider.jsx'

const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>
const renderFavorites = () => renderHook(() => useFavorites(), { wrapper })

describe('FavoritesProvider + useFavorites', () => {
  it('empieza sin favoritos', () => {
    const { result } = renderFavorites()
    expect(result.current.count).toBe(0)
    expect(result.current.favorites).toEqual([])
  })

  it('marca y desmarca favoritos (requisito 6)', () => {
    const { result } = renderFavorites()

    act(() => result.current.toggleFavorite('coco'))
    expect(result.current.isFavorite('coco')).toBe(true)
    expect(result.current.count).toBe(1)

    act(() => result.current.toggleFavorite('coco'))
    expect(result.current.isFavorite('coco')).toBe(false)
  })

  it('expone los títulos completos para la sección de favoritos (requisito 7)', () => {
    const { result } = renderFavorites()
    act(() => {
      result.current.toggleFavorite('dark')
      result.current.toggleFavorite('coco')
    })
    expect(result.current.favorites.map((t) => t.title)).toEqual(['Dark', 'Coco'])
  })

  it('persiste en localStorage y se recupera al recargar', () => {
    const first = renderFavorites()
    act(() => first.result.current.toggleFavorite('interstellar'))
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY))).toEqual(['interstellar'])
    first.unmount()

    const second = renderFavorites()
    expect(second.result.current.favoriteIds).toEqual(['interstellar'])
  })

  it('descarta datos manipulados en localStorage', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(['coco', 'falso', { x: 1 }]))
    const { result } = renderFavorites()
    expect(result.current.favoriteIds).toEqual(['coco'])
  })

  it('removeFavorite y clearFavorites', () => {
    const { result } = renderFavorites()
    act(() => {
      result.current.toggleFavorite('coco')
      result.current.toggleFavorite('dark')
    })
    act(() => result.current.removeFavorite('coco'))
    expect(result.current.favoriteIds).toEqual(['dark'])
    act(() => result.current.clearFavorites())
    expect(result.current.count).toBe(0)
  })

  it('se sincroniza con cambios hechos en otra pestaña', () => {
    const { result } = renderFavorites()
    act(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(['dune']))
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))
    })
    expect(result.current.favoriteIds).toEqual(['dune'])
  })

  it('funciona aunque no haya almacenamiento disponible', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => <FavoritesProvider storage={null}>{children}</FavoritesProvider>,
    })
    act(() => result.current.toggleFavorite('coco'))
    expect(result.current.isFavorite('coco')).toBe(true)
  })

  it('useFavorites lanza un error claro fuera del Provider', () => {
    expect(() => renderHook(() => useFavorites())).toThrow(/FavoritesProvider/)
  })
})
