# Netflis: documentación del proyecto

## 1. De qué trata

Netflis es un explorador de películas y series para el navegador, con el estilo de una plataforma de
streaming. Puedes ver el catálogo por filas, buscar por título o género, filtrar por tipo y género,
abrir el detalle de cada título y guardar tus favoritos en **Mi lista**.

Es el proyecto T3 de Programación Web. Funciona solo en el navegador: **no tiene backend, base de
datos ni API**. Los 20 títulos están en un arreglo de objetos dentro del código, y las fotos están
dentro del proyecto.

## 2. Requisitos que cumple

| Requisito | Cómo se ve en la app | Dónde está en el código |
| --- | --- | --- |
| R1. Catálogo de al menos 20 títulos en un arreglo | Filas de Inicio, Series y Películas | `src/data/catalogo.js` |
| R2. Tarjetas con imagen, título y género | Cada tarjeta de las filas y la cuadrícula | `Tarjeta.jsx` |
| R3. Búsqueda por título | Lupa de la barra superior (también busca por género) | `Navbar.jsx`, `App.jsx` |
| R4. Filtro por género y tipo | Enlaces Series / Películas y lista de géneros | `SelectorGenero.jsx`, `App.jsx` |
| R5. Detalle con sinopsis, año y duración o temporadas | Clic en una tarjeta o en "Más información" | `ModalDetalle.jsx` |
| R6. Marcar y desmarcar favoritos | Botón + de tarjetas, banner y detalle | `BotonFavorito.jsx` |
| R7. Sección de favoritos | Enlace Mi lista y fila Mi lista en Inicio | `App.jsx`, `Cuadricula.jsx` |

Además, la app tiene:

- El banner de Inicio es un carrusel que cambia de título cada 5 segundos.
- Las tarjetas crecen un poco al pasar el mouse.
- El detalle muestra títulos parecidos, que son los que comparten algún género.
- Mi lista se guarda en el navegador (`localStorage`), así que no se pierde al recargar.
- Al hacer clic en el logo, la app regresa a Inicio.

## 3. Tecnologías

| Tecnología | Para qué la usamos |
| --- | --- |
| **React 19** | Interfaz hecha con componentes; estado con `useState` y `useEffect` |
| **JavaScript** | Lógica: búsqueda, filtros, favoritos y carrusel |
| **HTML** | `index.html` y el elemento `<dialog>` para la ventana de detalle |
| **CSS** | Estilos propios en `src/App.css`, sin librerías de estilos |
| **Vite 8** | Servidor de desarrollo y compilación de la versión final |
| **Google Fonts** | Tipografías Big Shoulders Display (títulos) e Instrument Sans (texto) |
| **Git y GitHub** | Control de versiones, ramas y Pull Requests |
| **GitHub Actions** | Revisión automática en cada PR: compilación y búsqueda de secretos (gitleaks) |
| **Dependabot** | Avisa cuando hay versiones nuevas de las dependencias |

## 4. Cómo correr el proyecto

Necesitas [Node.js](https://nodejs.org) 20.19 o superior. Viene con `npm`.

```bash
git clone https://github.com/ultronLegacyy/movie-explorer.git
cd movie-explorer
npm install      # solo la primera vez o cuando cambian las dependencias
npm run dev      # inicia el servidor de desarrollo
```

Abre **http://localhost:5173** en el navegador. Cada vez que guardas un archivo, la página se
actualiza sola. Para detener el servidor, presiona `Ctrl + C` en la terminal.

Para ver la versión final, que es la que se publicaría:

```bash
npm run build    # genera la carpeta dist/
npm run preview  # la sirve en http://localhost:4173
```

| Comando | Qué hace |
| --- | --- |
| `npm install` | Descarga las dependencias en `node_modules/` |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Compila la app optimizada en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarla antes de publicar |

## 5. Estructura de carpetas

```
public/imagenes/      Foto de cada título (.jpg) y CREDITOS.md con autor y licencia
src/
├── data/catalogo.js  Arreglo con los 20 títulos
├── App.jsx           Estado de la app y qué vista se muestra
├── App.css           Todos los estilos
├── main.jsx          Punto de entrada: monta <App /> en la página
├── utils.js          Funciones de apoyo (normalizar texto, duración, géneros)
└── components/       Piezas de la interfaz (Navbar, Hero, Fila, Tarjeta, ModalDetalle, …)
docs/                 Diseño, guion de la demo y esta documentación
.github/              Revisión automática (CI) y Dependabot
index.html            Página base donde React dibuja la app
```

## 6. Cómo funciona por dentro

**Datos.** Cada título del arreglo tiene estos campos:

- `id`
- `type`: `'movie'` o `'series'`
- `title`
- `genres`
- `year`
- `durationMin` (solo películas) o `seasons` (solo series)
- `synopsis`

La ruta de la foto (`imagen`) se agrega sola a partir del `id`.

```js
{ id: 'dune', type: 'movie', title: 'Dune', genres: ['Ciencia ficción', 'Aventura'],
  year: 2021, durationMin: 155, synopsis: '…' }
```

**Estado.** Todo el estado vive en `App.jsx`:

| Estado | Qué guarda |
| --- | --- |
| `vista` | Inicio, Series, Películas o Mi lista |
| `busqueda` | Texto del buscador |
| `genero` | Género elegido en el filtro |
| `favoritos` | Lista de `id` guardados en Mi lista |
| `abierto` | `id` del título que se ve en el detalle |

`App` pasa los datos a los componentes como **props**. Los componentes avisan de lo que hace el
usuario con funciones que también reciben por props, por ejemplo `onFavorito` u `onAbrir`.

**Búsqueda y filtros.** La búsqueda ignora mayúsculas y acentos, así que "pelicula" encuentra
"Película". Lo hace la función `normalizar` de `utils.js`. Los filtros usan `filter` sobre el arreglo.

**Favoritos.** Marcar un título agrega su `id` a `favoritos`. Desmarcarlo lo quita. Un `useEffect`
guarda la lista en `localStorage` cada vez que cambia.

**Carrusel.** `Hero.jsx` usa `setInterval` para pasar al siguiente título cada 5 segundos. Se pausa
mientras hay un detalle abierto. Los puntos de abajo permiten saltar a cualquier título.

**Detalle.** Se usa el elemento `<dialog>` del navegador. Ya trae de fábrica el cierre con `Esc` y el
manejo del foco del teclado.

## 7. Imágenes

Las fotos no son pósters oficiales. Son fotografías de **dominio público o con licencia CC0** tomadas
de Wikimedia Commons, que se pueden usar libremente. El autor, la licencia y el enlace de cada una
están en [`public/imagenes/CREDITOS.md`](../public/imagenes/CREDITOS.md).

## 8. Cómo trabajamos en equipo

- **Roles.** Un integrante se encarga de los datos y la lógica; el otro, de la interfaz.
- **Ramas.** Cada quien trabaja en su propia rama (`feat/...`, `fix/...`) creada desde `main`.
- **Pull Requests.** Los cambios entran a `main` solo por Pull Request.
- **Rama protegida.** `main` pide la aprobación del otro integrante y que pasen las revisiones
  automáticas *Build* y *Escaneo de secretos*.
- **Archivos fuera del repositorio.** `.gitignore` deja fuera todo lo que no hace falta para que la
  app funcione: `node_modules/`, `dist/`, logs, variables de entorno, configuración de editores y el
  PDF del curso.

## 9. Limitaciones

- El catálogo está fijo en el código. Para agregar un título hay que editar `catalogo.js` y poner su
  foto en `public/imagenes/`.
- Mi lista se guarda solo en el navegador donde se usa: no se comparte entre dispositivos.
