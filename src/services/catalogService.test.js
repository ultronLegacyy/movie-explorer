import { describe, expect, it } from 'vitest'
import { CATALOG } from '../data/catalog.js'
import { GENRES } from '../domain/title.js'
import {
  getAllTitles,
  getGenres,
  getTitleById,
  getTitlesByIds,
  titleExists,
} from './catalogService.js'

describe('catalogService', () => {
  it('getAllTitles devuelve el catálogo completo', () => {
    expect(getAllTitles()).toBe(CATALOG)
  })

  it('getTitleById encuentra un título existente (requisito 5)', () => {
    const title = getTitleById('interstellar')
    expect(title).toMatchObject({ title: 'Interstellar', year: 2014, durationMin: 169 })
    expect(title?.synopsis).toBeTruthy()
  })

  it.each(['no-existe', '', undefined, null, 42, '__proto__', 'constructor'])(
    'getTitleById devuelve null para %s',
    (id) => {
      expect(getTitleById(/** @type {any} */ (id))).toBeNull()
    },
  )

  it('getTitlesByIds respeta el orden y omite ids inexistentes', () => {
    expect(getTitlesByIds(['dark', 'nope', 'coco']).map((t) => t.id)).toEqual(['dark', 'coco'])
  })

  it('getGenres devuelve géneros únicos, ordenados y válidos', () => {
    const genres = getGenres()
    expect(new Set(genres).size).toBe(genres.length)
    expect([...genres]).toEqual([...genres].sort((a, b) => a.localeCompare(b, 'es')))
    const allowed = new Set(Object.values(GENRES))
    for (const genre of genres) expect(allowed.has(genre)).toBe(true)
  })

  it('titleExists', () => {
    expect(titleExists('coco')).toBe(true)
    expect(titleExists('nope')).toBe(false)
  })
})
