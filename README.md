# Movie Explorer

Explorador de películas y series hecho con **React** (JavaScript, HTML y CSS) y **Vite**.

No usa backend ni API: el catálogo es un arreglo de objetos en `src/data/catalogo.js` y las fotos
están dentro del proyecto, en `public/imagenes/`. Son fotografías de dominio público o CC0, no pósters
oficiales (ver [`public/imagenes/CREDITOS.md`](public/imagenes/CREDITOS.md)). Cada tarjeta muestra la
foto como póster vertical con el tipo, el año y el título encima.

## Instalación y ejecución

Requisito: Node.js 20.19 o superior.

```bash
git clone https://github.com/ultronLegacyy/movie-explorer.git
cd movie-explorer
npm install
npm run dev
```

Abre http://localhost:5173. Para generar la versión final: `npm run build`.

## Estructura

```
public/imagenes/     Foto de cada título y sus créditos
src/
├── data/catalogo.js Catálogo: 20 películas y series
├── App.jsx          Página principal y componentes Tarjeta y Poster
├── App.css          Estilos
└── main.jsx         Punto de entrada
```

## Cómo trabajamos

- `main` está protegida: los cambios entran por Pull Request con la aprobación del otro integrante.
- Cada quien trabaja en su propia rama (`feat/...`, `fix/...`) creada desde `main`.
