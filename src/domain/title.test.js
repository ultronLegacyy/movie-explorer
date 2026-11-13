import { describe, expect, it } from 'vitest'
import { GENRES, TITLE_TYPES, validateTitle } from './title.js'

const validMovie = {
  id: 'mi-pelicula',
  type: TITLE_TYPES.MOVIE,
  title: 'Mi película',
  genres: [GENRES.DRAMA],
  year: 2020,
  durationMin: 100,
  synopsis: 'Sinopsis.',
  poster: 'data:image/svg+xml,',
  posterAlt: 'Póster',
}

const validSeries = {
  ...validMovie,
  id: 'mi-serie',
  type: TITLE_TYPES.SERIES,
  durationMin: undefined,
  seasons: 2,
}

describe('validateTitle', () => {
  it('acepta una película y una serie válidas', () => {
    expect(validateTitle(validMovie)).toEqual([])
    expect(validateTitle(validSeries)).toEqual([])
  })

  it.each([null, undefined, 'texto', 42])('rechaza valores que no son objeto: %s', (value) => {
    expect(validateTitle(value)).not.toEqual([])
  })

  it('rechaza ids que no son slug', () => {
    expect(validateTitle({ ...validMovie, id: 'Mi Película' })).toContain(
      'id debe ser un slug en minúsculas (a-z, 0-9 y guiones)',
    )
  })

  it('rechaza géneros desconocidos o duplicados', () => {
    expect(validateTitle({ ...validMovie, genres: ['Inventado'] })).toContain(
      'género desconocido: Inventado',
    )
    expect(validateTitle({ ...validMovie, genres: [GENRES.DRAMA, GENRES.DRAMA] })).toContain(
      'genres tiene duplicados',
    )
  })

  it('exige duración en películas y temporadas en series', () => {
    expect(validateTitle({ ...validMovie, durationMin: 0 })).toContain(
      'una película requiere durationMin > 0',
    )
    expect(validateTitle({ ...validSeries, seasons: undefined })).toContain(
      'una serie requiere seasons > 0',
    )
    expect(validateTitle({ ...validMovie, seasons: 1 })).toContain(
      'una película no debe tener seasons',
    )
  })

  it('rechaza años fuera de rango', () => {
    expect(validateTitle({ ...validMovie, year: 1500 })).not.toEqual([])
    expect(validateTitle({ ...validMovie, year: 2020.5 })).not.toEqual([])
  })
})
