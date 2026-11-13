# Diseño elegido para Netflis: vista estilo streaming

Elegimos una vista inspirada en las plataformas de streaming (tipo Netflix): un banner destacado,
filas horizontales por categoría y el detalle en una ventana modal.

**Para verlo:** abre [`boceto-streaming-v2.html`](boceto-streaming-v2.html) en el navegador (doble
clic en el archivo). La primera versión sigue en [`boceto-streaming.html`](boceto-streaming.html) para
comparar. Es interactivo, así que puedes buscar, filtrar, abrir el detalle y guardar en Mi lista.

> La app se llama **Netflis**. Tomamos la estructura de Netflix, pero no su logo ni su rojo: el
> nombre va en texto con el color ámbar de la marquesina.

## Partes de la página

| Parte              | Qué hace                                                                                      | Requisito |
| ------------------ | --------------------------------------------------------------------------------------------- | --------- |
| Barra superior     | Logo, enlaces Inicio / Series / Películas / Mi lista y una lupa que despliega el buscador      | R3, R4    |
| Banner destacado   | Imagen grande de un título con año, duración, género, sinopsis y botones                       | —         |
| Filas horizontales | Mi lista, Series, Películas y una fila por género, con scroll horizontal y flechas             | R1, R2    |
| Tarjeta            | Imagen horizontal (16:9) con el título; al pasar el cursor muestra año, género y el botón +    | R2, R6    |
| Series / Películas | Filtra por tipo y agrega un selector de género que cambia a cuadrícula                         | R4        |
| Búsqueda           | Mientras se escribe, las filas se sustituyen por una cuadrícula de resultados                  | R3        |
| Modal de detalle   | Imagen, título, año, duración o temporadas, géneros, sinopsis, Mi lista y títulos parecidos    | R5, R6    |
| Mi lista           | Cuadrícula con los favoritos y un mensaje cuando está vacía                                    | R7        |

## Componentes en React

```
App.jsx            estado con useState: vista, búsqueda, género, favoritos, título abierto
├─ Navbar          logo, enlaces y buscador
├─ Hero            título destacado
├─ Fila            carril horizontal (se repite por categoría)
│  └─ Tarjeta      imagen, título, género y botón de Mi lista
├─ Cuadricula      resultados de búsqueda, género o Mi lista
└─ ModalDetalle    detalle del título abierto
```

Los favoritos se guardan en `localStorage` para que no se pierdan al recargar.

## Cambios en los datos

- Cada título tiene una **fotografía real 16:9** en `public/imagenes/<id>.jpg` y el campo `imagen` en
  `src/data/catalogo.js`. Son fotos de dominio público o CC0 (no pósters oficiales); los créditos
  están en `public/imagenes/CREDITOS.md`.
- La misma imagen sirve para las tarjetas, el banner y el modal. Para la fila de Películas en 2:3 se
  recorta con CSS: `aspect-ratio: 2 / 3; object-fit: cover;`.
- Todo lo demás (`title`, `type`, `genres`, `year`, `durationMin`, `seasons`, `synopsis`) ya existe.

## Estilo (v2)

La idea central es una **sala de cine**: el fondo es el terciopelo oscuro de la sala y el ámbar es la
luz de la marquesina y del proyector. Lo único llamativo es el haz del proyector sobre el banner; el
resto de la página es sobrio.

| Uso                  | Valor                                                  |
| -------------------- | ------------------------------------------------------ |
| Fondo (sala)         | `#140e0d`                                              |
| Superficies (butaca) | `#1f1715`                                              |
| Bordes (pasillo)     | `#33261f`                                              |
| Texto principal      | `#f3ebe0`                                              |
| Texto secundario     | `#a89a8c` (contraste 7:1 sobre el fondo)               |
| Luz (marquesina)     | `#f0b13c`: logo, haz del proyector, Mi lista           |
| Logo y banner        | Big Shoulders Display, en mayúsculas                   |
| Todo lo demás        | Instrument Sans, en minúsculas normales                |

### Motivo de las imágenes por género (solo en el boceto)

El boceto usa imágenes generadas como relleno. En la app se usan las fotografías reales de
`public/imagenes/`.

| Género principal               | Motivo                                  |
| ------------------------------ | --------------------------------------- |
| Ciencia ficción                | Planeta con órbitas y estrellas         |
| Aventura, Acción               | Dunas bajo un sol                       |
| Crimen, Thriller               | Luz de persiana con una franja roja     |
| Animación, Fantasía            | Formas suaves de colores                |
| Misterio, Terror               | Luna, silueta, grano y viñeta           |
| Comedia, Romance, Musical      | Bloques de color planos                 |
| Drama, Historia                | Horizonte con un brillo                 |

### Detalles

- **Haz del proyector:** un cono de luz ámbar entra al banner desde la esquina superior izquierda y
  se enciende una vez al cargar la página (se desactiva con "reducir movimiento").
- **Mi lista:** cada título guardado lleva una cinta ámbar en la esquina, visible sin pasar el cursor.
- **Tarjetas:** al pasar el cursor la imagen se ilumina y aparece la info; sin zoom ni sombras.
- **Búsqueda:** por título o por género.
- **Filas de género:** solo las que tienen 3 títulos o más.
- Tema oscuro, carriles con `overflow-x: auto` y `scroll-snap`, y la barra superior que pasa de
  transparente a sólida al hacer scroll.
