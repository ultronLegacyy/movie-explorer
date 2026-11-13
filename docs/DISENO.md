# Diseño de la interfaz: vista estilo streaming

La app usa la estructura de las plataformas de streaming: un banner destacado, filas horizontales
por categoría y el detalle en una ventana.

> Tomamos la estructura de Netflix, pero no su marca: no usamos su nombre, su logo ni su rojo. La
> app se llama *Movie Explorer* y su color de acento es ámbar.

## Partes de la página

| Parte              | Qué hace                                                                                             | Requisito | Componente       |
| ------------------ | ---------------------------------------------------------------------------------------------------- | --------- | ---------------- |
| Barra superior     | Logo, enlaces Inicio / Series / Películas / Mi lista y una lupa que despliega el buscador             | R3, R4, R7 | `Navbar`        |
| Banner destacado   | Foto grande de un título con tipo, año, duración, género, sinopsis y botones                          | R5, R6    | `Hero`           |
| Filas horizontales | Mi lista, Series, Películas y una fila por género (con 3 títulos o más), con scroll y flechas         | R1, R2    | `Fila`           |
| Tarjeta            | Foto con el título encima; abajo título, año, género y botón +                                        | R2, R6    | `Tarjeta`        |
| Series / Películas | Filtra por tipo y agrega una lista de géneros; al elegir uno, cambia a cuadrícula                     | R4        | `SelectorGenero` |
| Búsqueda           | Mientras se escribe, las filas se sustituyen por una cuadrícula de resultados (por título o género)   | R3        | `Cuadricula`     |
| Ventana de detalle | Foto, título, tipo, año, duración o temporadas, géneros, sinopsis, Mi lista y títulos parecidos       | R5, R6    | `ModalDetalle`   |
| Mi lista           | Cuadrícula con los favoritos y un mensaje cuando está vacía                                           | R7        | `Cuadricula`     |

## Componentes en React

```
App.jsx              estado con useState: vista, búsqueda, género, favoritos, título abierto
├─ Navbar            logo, enlaces y buscador
├─ Hero              título destacado de la vista
├─ Fila ×n           carril horizontal (se repite por categoría)
│  └─ Tarjeta        foto, título, año, género y BotonFavorito
├─ Cuadricula        resultados de búsqueda, un género o Mi lista
│  └─ Tarjeta
├─ SelectorGenero    lista de géneros en Series y Películas
└─ ModalDetalle      detalle del título abierto, con BotonFavorito y títulos parecidos
```

- **Los datos bajan por props:** `App` le pasa a cada componente lo que necesita mostrar (el título,
  si está en favoritos, la lista de géneros).
- **Los eventos suben con funciones:** `App` también pasa funciones como `onAbrir`, `onFavorito` u
  `onVista`; el componente las llama cuando el usuario hace clic y `App` actualiza su estado.
- Los favoritos se guardan en `localStorage` con `useEffect`, para que no se pierdan al recargar.

## Imágenes

- Cada título tiene una foto en `public/imagenes/<id>.jpg` (1280×720), indicada en el campo `imagen`
  de `src/data/catalogo.js`.
- Son fotografías de dominio público o CC0 que evocan cada título, no pósters oficiales (los pósters
  tienen derechos de autor). Los autores y licencias están en
  [`public/imagenes/CREDITOS.md`](../public/imagenes/CREDITOS.md).
- La misma foto sirve en dos formatos: **horizontal 16:9** en el banner, las filas, la cuadrícula y el
  detalle, y **póster vertical 2:3** en la fila de Películas (con tipo y año arriba y el título abajo).
- El título encima de la foto se ajusta al ancho de la tarjeta y pasa a otra línea si no cabe.

## Estilo

| Uso                  | Valor                                                  |
| -------------------- | ------------------------------------------------------ |
| Fondo                | `#0e1320`                                              |
| Superficies (detalle) | `#171e2e`                                             |
| Bordes               | `#232c40`                                              |
| Texto principal      | `#ece8df`                                              |
| Texto secundario     | `#98a1b3`                                              |
| Acento               | `#f0b13c`: punto del logo, enlace activo y Mi lista    |
| Logo, banner y títulos de sección | Big Shoulders Display (Google Fonts)      |
| Texto                | Instrument Sans (Google Fonts)                         |

### Detalles

- **Mi lista:** cada título guardado lleva una cinta ámbar en la esquina, visible sin pasar el cursor.
- **Tarjetas en las filas:** con mouse, la info aparece sobre la foto al pasar el cursor y la imagen
  se ilumina; en pantallas táctiles la info está siempre visible.
- **Barra superior:** pasa de transparente a sólida al bajar en la página.
- **Móvil:** los enlaces bajan a una segunda línea y las flechas de las filas se ocultan (se desliza
  con el dedo).
- Tema oscuro, carriles con `overflow-x: auto` y `scroll-snap`, y animaciones desactivadas si el
  sistema tiene "reducir movimiento".

## Bocetos

Antes de programar hicimos dos bocetos interactivos en HTML; se abren con doble clic:

- [`boceto-streaming.html`](boceto-streaming.html): primera versión, con la que elegimos la estructura.
- [`boceto-streaming-v2.html`](boceto-streaming-v2.html): propuesta de mejoras visuales (paleta "sala
  de cine" e imágenes generadas por género).

La app final toma la estructura de los bocetos, pero usa los colores originales del proyecto y las
fotos libres de `public/imagenes/` en lugar de imágenes generadas.
