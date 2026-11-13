import { describe, expect, it } from 'vitest'
import { formatDuration, formatLength, formatSeasons } from './format.js'

describe('formatDuration', () => {
  it.each([
    [169, '2 h 49 min'],
    [120, '2 h'],
    [45, '45 min'],
    [0, ''],
    [-5, ''],
    [Number.NaN, ''],
  ])('%s → "%s"', (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected)
  })
})

describe('formatSeasons', () => {
  it.each([
    [1, '1 temporada'],
    [5, '5 temporadas'],
    [0, ''],
  ])('%s → "%s"', (seasons, expected) => {
    expect(formatSeasons(seasons)).toBe(expected)
  })
})

describe('formatLength', () => {
  it('usa duración para películas y temporadas para series', () => {
    expect(formatLength({ type: 'movie', durationMin: 90 })).toBe('1 h 30 min')
    expect(formatLength({ type: 'series', seasons: 3 })).toBe('3 temporadas')
  })
})
