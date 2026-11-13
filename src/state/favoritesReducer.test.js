import { describe, expect, it } from 'vitest'
import { FAVORITES_ACTIONS as A, favoritesReducer } from './favoritesReducer.js'

describe('favoritesReducer', () => {
  it('TOGGLE agrega un título que no es favorito (requisito 6)', () => {
    expect(favoritesReducer([], { type: A.TOGGLE, id: 'coco' })).toEqual(['coco'])
  })

  it('TOGGLE quita un título que ya es favorito (requisito 6)', () => {
    expect(favoritesReducer(['coco', 'dark'], { type: A.TOGGLE, id: 'coco' })).toEqual(['dark'])
  })

  it('TOGGLE ignora ids que no existen en el catálogo', () => {
    const state = ['coco']
    expect(favoritesReducer(state, { type: A.TOGGLE, id: 'inventado' })).toBe(state)
  })

  it('no muta el estado anterior', () => {
    const state = Object.freeze(['coco'])
    expect(() => favoritesReducer(state, { type: A.TOGGLE, id: 'dark' })).not.toThrow()
  })

  it('REMOVE quita el id y devuelve el mismo estado si no estaba', () => {
    expect(favoritesReducer(['coco'], { type: A.REMOVE, id: 'coco' })).toEqual([])
    const state = ['coco']
    expect(favoritesReducer(state, { type: A.REMOVE, id: 'dark' })).toBe(state)
  })

  it('CLEAR vacía la lista', () => {
    expect(favoritesReducer(['coco', 'dark'], { type: A.CLEAR })).toEqual([])
  })

  it('REPLACE reemplaza el estado y conserva la referencia si es igual', () => {
    const state = ['coco']
    expect(favoritesReducer(state, { type: A.REPLACE, ids: ['coco'] })).toBe(state)
    expect(favoritesReducer(state, { type: A.REPLACE, ids: ['dark'] })).toEqual(['dark'])
  })

  it('ignora acciones desconocidas', () => {
    const state = ['coco']
    expect(favoritesReducer(state, /** @type {any} */ ({ type: 'otra' }))).toBe(state)
  })
})
