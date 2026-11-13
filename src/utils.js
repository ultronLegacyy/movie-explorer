// Funciones pequeñas que usan varios componentes.

// Quita acentos y mayúsculas para comparar textos ("Película" y "pelicula" coinciden).
export const normalizar = (texto) =>
  texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

// "2 h 49 min" para películas, "5 temporadas" para series.
export const duracion = (item) =>
  item.type === 'movie'
    ? `${Math.floor(item.durationMin / 60)} h ${item.durationMin % 60} min`
    : `${item.seasons} ${item.seasons === 1 ? 'temporada' : 'temporadas'}`

export const tipoTexto = (item) => (item.type === 'movie' ? 'Película' : 'Serie')

// Lista de géneros sin repetir, en orden alfabético.
export const generosDe = (items) =>
  [...new Set(items.flatMap((item) => item.genres))].sort((a, b) => a.localeCompare(b, 'es'))
