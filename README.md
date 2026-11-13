# Movie Explorer

Aplicación web para explorar un catálogo de películas y series: buscar por título, filtrar por
género o tipo, ver el detalle de cada título y guardar favoritos.

## Tecnología

- **React 19** con **Vite 8** (JavaScript)
- **Vitest** y **Testing Library** para las pruebas
- **oxlint** y **Prettier** para la calidad del código

No hay backend ni API externa: el catálogo vive en un arreglo de objetos dentro del proyecto y los
favoritos se guardan en el `localStorage` del navegador.

## Instalación y ejecución

Requisitos: Node.js 20.19 o superior (la versión recomendada está en `.nvmrc`).

```bash
git clone https://github.com/ultronLegacyy/movie-explorer.git
cd movie-explorer
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
```

| Comando           | Qué hace                                              |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente        |
| `npm run build`   | Genera la versión de producción en `dist/`            |
| `npm run preview` | Sirve localmente el build de producción               |
| `npm test`        | Ejecuta las pruebas                                   |
| `npm run lint`    | Revisa el código con oxlint                           |
| `npm run format`  | Formatea el código con Prettier                       |
| `npm run check`   | Lint + formato + pruebas + build (lo mismo que el CI) |

## Estructura

```
src/
├── data/        Catálogo de títulos, géneros y pósters        (capa de datos)
├── domain/      Definición del modelo (JSDoc) y validaciones  (capa de datos)
├── services/    Búsqueda, filtros y almacenamiento            (lógica)
├── state/       Estado global de favoritos (Context)          (lógica)
├── hooks/       Hooks que consumen los componentes            (lógica)
├── components/  Componentes de la interfaz                    (frontend)
└── App.jsx
```

La API que la capa de datos expone a los componentes está documentada en
[`docs/DATA_API.md`](docs/DATA_API.md).

## Flujo de trabajo del equipo

1. `main` está protegida: nadie hace push directo.
2. Cada integrante trabaja en su propia rama a partir de `main`
   (`feat/...`, `fix/...`, `docs/...`, `chore/...`).
3. Antes de abrir el PR: `npm run check`.
4. Se abre un Pull Request hacia `main`; el CI debe pasar y otro integrante lo aprueba.
5. Los mensajes de commit siguen [Conventional Commits](https://www.conventionalcommits.org/es/)
   (`feat: agrega filtro por género`).

## Seguridad

Ver [`SECURITY.md`](SECURITY.md).
