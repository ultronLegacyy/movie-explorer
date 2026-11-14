# Netflis

Explorador de películas y series hecho con **React** (JavaScript, HTML y CSS) y **Vite**.

No usa backend ni API: el catálogo es un arreglo de objetos en `src/data/catalogo.js` y las fotos
están dentro del proyecto, en `public/imagenes/`. Son fotografías de dominio público o CC0, no pósters
oficiales (ver [`public/imagenes/CREDITOS.md`](public/imagenes/CREDITOS.md)). Cada tarjeta muestra la
foto con el título encima.

La interfaz sigue el estilo de una plataforma de streaming: banner con un título destacado, filas
horizontales por categoría y el detalle en una ventana.

## Qué hace

| Requisito | Dónde |
| --- | --- |
| R1. Catálogo de 20 títulos en un arreglo de objetos | `src/data/catalogo.js` |
| R2. Tarjeta con imagen, título y género | `Tarjeta` |
| R3. Buscar por título (también por género) | Lupa de la barra superior (`Navbar`) |
| R4. Filtrar por tipo y género | Enlaces Series / Películas y lista de géneros (`SelectorGenero`) |
| R5. Detalle: sinopsis, año, duración o temporadas | Clic en una tarjeta (`ModalDetalle`) |
| R6. Marcar y desmarcar favoritos | Botón + de cada tarjeta, del banner y del detalle (`BotonFavorito`) |
| R7. Sección de favoritos | Enlace Mi lista y fila Mi lista en Inicio |

Mi lista se guarda en `localStorage`, así que no se pierde al recargar la página.

## Instalación y ejecución

Requisito: Node.js 20.19 o superior.

```bash
git clone https://github.com/ultronLegacyy/movie-explorer.git
cd movie-explorer
npm install
npm run dev
```

Abre http://localhost:5173. Para generar la versión final: `npm run build`.

## Estructura y componentes

```
public/imagenes/          Foto de cada título y sus créditos
src/
├── data/catalogo.js      Catálogo: 20 películas y series
├── App.jsx               Estado (vista, búsqueda, género, favoritos, título abierto) y qué se muestra
├── components/
│   ├── Navbar.jsx        Logo, enlaces y buscador
│   ├── Hero.jsx          Banner; en Inicio rota cada 5 s por el catálogo
│   ├── Fila.jsx          Carril horizontal de tarjetas con flechas
│   ├── Tarjeta.jsx       Imagen, título, año, género y botón de Mi lista
│   ├── BotonFavorito.jsx Agrega o quita de Mi lista
│   ├── Cuadricula.jsx    Resultados de búsqueda, un género o Mi lista
│   ├── SelectorGenero.jsx Lista de géneros
│   ├── ModalDetalle.jsx  Ventana con el detalle y títulos parecidos
│   └── Iconos.jsx        Íconos SVG
├── utils.js              Funciones de apoyo (normalizar texto, duración, géneros)
├── App.css               Estilos
└── main.jsx              Punto de entrada
```

El estado vive en `App.jsx` con `useState` y baja a los componentes como props; los componentes avisan
de los eventos (abrir un título, marcar favorito, cambiar de vista) con funciones que reciben por props.

## Documentación

- [`docs/boceto-streaming.html`](docs/boceto-streaming.html) y [`docs/boceto-streaming-v2.html`](docs/boceto-streaming-v2.html): bocetos del diseño (se abren en el navegador).

## Cómo trabajamos

- `main` está protegida: los cambios entran por Pull Request con la aprobación del otro integrante.
- Cada quien trabaja en su propia rama (`feat/...`, `fix/...`) creada desde `main`.
