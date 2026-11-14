// Pruebas de los datos y la lógica (sin navegador). Se corren con: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import catalogo from '../src/data/catalogo.js'
import { duracion, generosDe, normalizar } from '../src/utils.js'

test('R1: el catálogo tiene al menos 20 títulos con id único', () => {
  assert.ok(catalogo.length >= 20)
  assert.equal(new Set(catalogo.map((t) => t.id)).size, catalogo.length)
})

test('R2 y R5: cada título tiene los datos de la tarjeta y del detalle, y su foto existe', () => {
  for (const t of catalogo) {
    assert.ok(t.title && t.synopsis && t.year && t.genres.length > 0, t.id)
    assert.ok(t.type === 'movie' ? t.durationMin > 0 : t.seasons > 0, `${t.id}: duración o temporadas`)
    assert.ok(existsSync(`public${t.imagen}`), `${t.id}: falta la foto`)
  }
})

test('R3: la búsqueda ignora mayúsculas y acentos', () => {
  assert.equal(normalizar('  Película '), 'pelicula')
  const encontrados = catalogo.filter((t) => normalizar(t.title).includes(normalizar('CHIHIRO')))
  assert.deepEqual(encontrados.map((t) => t.id), ['spirited-away'])
})

test('R4: filtrar por tipo y por género', () => {
  const series = catalogo.filter((t) => t.type === 'series')
  const peliculas = catalogo.filter((t) => t.type === 'movie')
  assert.equal(series.length + peliculas.length, catalogo.length)
  assert.ok(series.length > 0 && peliculas.length > 0)
  const generos = generosDe(catalogo)
  assert.equal(new Set(generos).size, generos.length)
  assert.ok(catalogo.filter((t) => t.genres.includes('Comedia')).every((t) => t.genres.includes('Comedia')))
})

test('R5: la duración se muestra en horas o en temporadas', () => {
  assert.equal(duracion({ type: 'movie', durationMin: 169 }), '2 h 49 min')
  assert.equal(duracion({ type: 'series', seasons: 1 }), '1 temporada')
  assert.equal(duracion({ type: 'series', seasons: 5 }), '5 temporadas')
})
