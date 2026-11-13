# API de la capa de datos

Esta guía es para quien construye los componentes de la interfaz. Explica qué datos hay y qué hooks
usar para cada requisito del proyecto. No necesitas tocar `data/`, `services/` ni `state/`: todo se
consume a través de los hooks de `src/hooks/`.

## Configuración

`src/main.jsx` ya envuelve `<App />` con `<FavoritesProvider>`, así que cualquier componente dentro
de `App` puede usar `useFavorites()`.

## El modelo `Title`

Cada película o serie es un objeto con esta forma (definida en `src/domain/title.js`):

| Campo         | Tipo                  | Ejemplo                                     |
| ------------- | --------------------- | ------------------------------------------- |
| `id`          | `string`              | `"interstellar"`                            |
| `type`        | `"movie" \| "series"` | `"movie"`                                   |
| `title`       | `string`              | `"Interstellar"`                            |
| `genres`      | `string[]`            | `["Ciencia ficción", "Drama", "Aventura"]`  |
| `year`        | `number`              | `2014`                                      |
| `synopsis`    | `string`              | `"Con la Tierra al borde del colapso…"`     |
| `durationMin` | `number` (películas)  | `169`                                       |
| `seasons`     | `number` (series)     | `5`                                         |
| `poster`      | `string` (URL)        | `"data:image/svg+xml;…"` (úsalo como `src`) |
| `posterAlt`   | `string`              | `"Póster de Interstellar (película, 2014)"` |

El primer elemento de `genres` es el género principal (el que va en la tarjeta).

Los objetos están **congelados**: no se pueden modificar. Para cambiar algo, se edita
`src/data/catalog.js`.

## Hooks

### `useCatalogFilters()`: catálogo, búsqueda y filtros (requisitos 1, 3 y 4)

Maneja el estado de los filtros y devuelve los resultados ya filtrados.

```jsx
import { useCatalogFilters } from '../hooks/useCatalog.js'
import { ALL, TYPE_FILTER_OPTIONS } from '../domain/title.js'

function CatalogPage() {
  const { titles, genres, filters, setQuery, setGenre, setType, isEmpty } = useCatalogFilters()

  return (
    <>
      <input
        type="search"
        value={filters.query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar películas o series..."
      />

      {TYPE_FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setType(opt.value)}
          aria-pressed={filters.type === opt.value}
        >
          {opt.label}
        </button>
      ))}

      <select value={filters.genre} onChange={(e) => setGenre(e.target.value)}>
        <option value={ALL}>Todos los géneros</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {isEmpty ? <p>Sin resultados</p> : titles.map((t) => <TitleCard key={t.id} title={t} />)}
    </>
  )
}
```

| Devuelve         | Descripción                                    |
| ---------------- | ---------------------------------------------- |
| `titles`         | Títulos que cumplen los filtros                |
| `total`          | Cantidad de resultados                         |
| `totalInCatalog` | Cantidad total del catálogo                    |
| `genres`         | Géneros disponibles (ordenados) para el filtro |
| `isEmpty`        | `true` si no hay resultados                    |
| `filters`        | `{ query, genre, type }` actuales              |
| `setQuery(text)` | Cambia la búsqueda (máx. 100 caracteres)       |
| `setGenre(g)`    | Cambia el género (`ALL` para todos)            |
| `setType(t)`     | `"movie"`, `"series"` o `ALL`                  |
| `resetFilters()` | Vuelve a los valores iniciales                 |

La búsqueda no distingue mayúsculas ni acentos: `"accion"` encuentra `"Acción"`.

> Si prefieres guardar el estado de los filtros en tu propio componente, usa
> `useCatalog({ query, genre, type })`, que devuelve lo mismo pero sin estado.

### `useTitle(id)`: detalle de un título (requisito 5)

```jsx
import { useTitle } from '../hooks/useTitle.js'
import { formatLength } from '../domain/format.js'
import { TITLE_TYPE_LABELS } from '../domain/title.js'

function TitleDetail({ id }) {
  const title = useTitle(id)
  if (!title) return <p>Título no encontrado</p>

  return (
    <article>
      <img src={title.poster} alt={title.posterAlt} />
      <h2>{title.title}</h2>
      <p>
        {TITLE_TYPE_LABELS[title.type]} · {title.year} · {formatLength(title)}
      </p>
      <p>{title.genres.join(', ')}</p>
      <p>{title.synopsis}</p>
    </article>
  )
}
```

Devuelve `null` si el id no existe o es `null`.

### `useFavorites()`: favoritos (requisitos 6 y 7)

```jsx
import { useFavorites } from '../hooks/useFavorites.js'

function FavoriteButton({ id }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)
  return (
    <button onClick={() => toggleFavorite(id)} aria-pressed={active}>
      {active ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
    </button>
  )
}

function FavoritesPage() {
  const { favorites, count } = useFavorites()
  if (count === 0) return <p>Aún no tienes favoritos</p>
  return favorites.map((t) => <TitleCard key={t.id} title={t} />)
}
```

| Devuelve             | Descripción                               |
| -------------------- | ----------------------------------------- |
| `favorites`          | Títulos completos marcados como favoritos |
| `favoriteIds`        | Solo los ids                              |
| `count`              | Cantidad de favoritos                     |
| `isFavorite(id)`     | `true` si el título es favorito           |
| `toggleFavorite(id)` | Marca o desmarca                          |
| `removeFavorite(id)` | Quita de favoritos                        |
| `clearFavorites()`   | Vacía la lista                            |

Los favoritos se guardan solos en `localStorage` y se mantienen al recargar la página. También se
sincronizan si la app está abierta en varias pestañas.

## Utilidades

| Import                | Uso                                                  |
| --------------------- | ---------------------------------------------------- |
| `ALL`                 | Valor de "sin filtro" para género y tipo             |
| `TITLE_TYPES`         | `{ MOVIE: 'movie', SERIES: 'series' }`               |
| `TITLE_TYPE_LABELS`   | `{ movie: 'Película', series: 'Serie' }`             |
| `TYPE_FILTER_OPTIONS` | Opciones para los botones Todas / Películas / Series |
| `formatDuration(min)` | `169` → `"2 h 49 min"`                               |
| `formatSeasons(n)`    | `1` → `"1 temporada"`                                |
| `formatLength(title)` | Duración o temporadas según el tipo                  |

Las constantes vienen de `src/domain/title.js` y los formatos de `src/domain/format.js`.

## Reglas de seguridad para la UI

- **No uses `dangerouslySetInnerHTML`.** El lint lo marca como error. Muestra el texto con `{title.synopsis}`
  y React lo escapa automáticamente.
- No guardes en `localStorage` por tu cuenta: usa `useFavorites()`.
- Las imágenes deben ser locales (CSP de producción: `img-src 'self' data:`). Si se agregan imágenes
  reales, ponlas en `public/` o en `src/assets/`, no enlaces sitios externos.

## Agregar un título

1. Abre `src/data/catalog.js` y agrega un objeto a `RAW_TITLES` (sin `poster` ni `posterAlt`, que se
   generan solos).
2. Usa solo géneros de `GENRES` (`src/domain/title.js`).
3. Ejecuta `npm test`: la prueba del catálogo valida que el nuevo título cumpla el modelo.
