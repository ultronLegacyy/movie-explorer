# Diseño elegido: vista estilo streaming

Elegimos una vista inspirada en las plataformas de streaming (tipo Netflix): un banner destacado,
filas horizontales por categoría y el detalle en una ventana modal.

**Para verlo:** abre [`boceto-streaming.html`](boceto-streaming.html) en el navegador (doble clic
en el archivo). Es interactivo, así que puedes buscar, filtrar, abrir el detalle y guardar en Mi lista.

> Tomamos la estructura de Netflix, pero no su marca: no usamos su nombre, su logo ni su rojo. La
> app se llama *Movie Explorer* y su color de acento es ámbar.

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

- Las tarjetas y el banner usan imágenes **horizontales 16:9**. Hay que generar
  `public/banners/<id>.svg` (con el mismo estilo de los pósters) y agregar el campo `banner` a cada
  título en `src/data/catalogo.js`.
- Todo lo demás (`title`, `type`, `genres`, `year`, `durationMin`, `seasons`, `synopsis`) ya existe.

## Estilo

| Uso                  | Valor                                                  |
| -------------------- | ------------------------------------------------------ |
| Fondo                | `#0b0e15`                                              |
| Superficies (modal)  | `#161b27`                                              |
| Bordes               | `#262e40`                                              |
| Texto principal      | `#f1ede4`                                              |
| Texto secundario     | `#9aa2b2`                                              |
| Acento (Mi lista)    | `#f0b13c`                                              |
| Títulos y logo       | Big Shoulders Display (Google Fonts)                   |
| Texto                | Instrument Sans (Google Fonts)                         |

Tema oscuro, carriles con `overflow-x: auto` y `scroll-snap`, y la barra superior que pasa de
transparente a sólida al hacer scroll.
