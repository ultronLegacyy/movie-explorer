import { describe, expect, it, vi } from 'vitest'
import {
  MAX_FAVORITES,
  STORAGE_KEY,
  loadFavoriteIds,
  sanitizeFavoriteIds,
  saveFavoriteIds,
} from './favoritesStorage.js'

const known = new Set(['a', 'b', 'c'])
const isKnownId = (id) => known.has(id)

/** Almacenamiento en memoria con la misma interfaz que localStorage. */
function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  }
}

describe('sanitizeFavoriteIds', () => {
  it('conserva solo ids conocidos, sin duplicados y en orden', () => {
    expect(sanitizeFavoriteIds(['b', 'x', 'a', 'b', 42, null], isKnownId)).toEqual(['b', 'a'])
  })

  it.each([null, {}, 'a', 42])('devuelve [] si el valor no es un arreglo: %s', (value) => {
    expect(sanitizeFavoriteIds(value, isKnownId)).toEqual([])
  })

  it(`no acepta más de ${MAX_FAVORITES} elementos`, () => {
    const many = Array.from({ length: MAX_FAVORITES + 50 }, (_, i) => `id-${i}`)
    expect(sanitizeFavoriteIds(many, () => true)).toHaveLength(MAX_FAVORITES)
  })
})

describe('loadFavoriteIds', () => {
  it('lee los favoritos guardados', () => {
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify(['a', 'c']) })
    expect(loadFavoriteIds(isKnownId, storage)).toEqual(['a', 'c'])
  })

  it('devuelve [] si no hay nada guardado', () => {
    expect(loadFavoriteIds(isKnownId, memoryStorage())).toEqual([])
  })

  it('devuelve [] si el JSON está corrupto', () => {
    const storage = memoryStorage({ [STORAGE_KEY]: '{no es json' })
    expect(loadFavoriteIds(isKnownId, storage)).toEqual([])
  })

  it('ignora datos manipulados con ids inexistentes', () => {
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify(['a', '<img onerror=x>']) })
    expect(loadFavoriteIds(isKnownId, storage)).toEqual(['a'])
  })

  it('no falla si el almacenamiento lanza una excepción', () => {
    const storage = {
      getItem: () => {
        throw new Error('SecurityError')
      },
    }
    expect(loadFavoriteIds(isKnownId, /** @type {any} */ (storage))).toEqual([])
  })

  it('devuelve [] si no hay almacenamiento disponible', () => {
    expect(loadFavoriteIds(isKnownId, null)).toEqual([])
  })
})

describe('saveFavoriteIds', () => {
  it('guarda los ids como JSON', () => {
    const storage = memoryStorage()
    expect(saveFavoriteIds(['a', 'b'], storage)).toBe(true)
    expect(storage.getItem(STORAGE_KEY)).toBe('["a","b"]')
  })

  it('devuelve false si el almacenamiento falla (cuota llena)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const storage = {
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }
    expect(saveFavoriteIds(['a'], /** @type {any} */ (storage))).toBe(false)
    expect(warn).toHaveBeenCalled()
  })

  it('devuelve false si no hay almacenamiento', () => {
    expect(saveFavoriteIds(['a'], null)).toBe(false)
  })
})
