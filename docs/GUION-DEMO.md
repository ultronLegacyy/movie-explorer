# Guion de la demostración

Duración sugerida: **8 a 10 minutos**. El PDF pide mostrar las funcionalidades y explicar brevemente
cómo se implementaron con React. Las partes están repartidas entre los dos integrantes; cámbienlas
si les acomoda otra división.

## Antes de la clase

- [ ] Tener el proyecto clonado y actualizado: `git pull`.
- [ ] Correr `npm install` **antes de llegar** (necesita internet).
- [ ] Probar `npm run dev` y dejar la app abierta en http://localhost:5173.
- [ ] Tener 2 o 3 títulos en Mi lista para que la sección no salga vacía (por ejemplo Dark, Coco y
      Matrix), y dejar uno sin marcar para mostrar cómo se agrega.
- [ ] Abrir en el editor: `src/App.jsx`, `src/components/Tarjeta.jsx`, `src/components/BotonFavorito.jsx`
      y `src/data/catalogo.js`.
- [ ] Tener abierto el repositorio en GitHub, en la pestaña de Pull Requests.
- [ ] Si en el salón no hay internet, la app funciona igual; solo cambia la tipografía por una genérica.

## 1. Presentación (Integrante 1, 1 min)

- "Hicimos **Movie Explorer**, un explorador de películas y series con **React** y **Vite**."
- "No usa backend, base de datos ni API: los 20 títulos están en un arreglo de objetos y las fotos
  están dentro del proyecto."
- "La interfaz sigue el estilo de las plataformas de streaming: banner, filas por categoría y el
  detalle en una ventana."

## 2. Recorrido por la app (Integrante 1, 3 min)

Ir requisito por requisito, en este orden:

| Paso | Qué hacer en la app | Qué decir |
| --- | --- | --- |
| R1, R2 | Mostrar Inicio y deslizar una fila | "Cada tarjeta tiene imagen, título y género; los 20 títulos salen del arreglo." |
| R3 | Clic en la lupa y escribir "mat" | "La búsqueda filtra mientras escribes, por título o por género." |
| R4 | Ir a **Series** y elegir **Misterio** en la lista | "Filtramos por tipo con los enlaces y por género con la lista." |
| R5 | Clic en una tarjeta | "El detalle muestra sinopsis, año y duración o temporadas, y títulos parecidos." |
| R6 | En el detalle, clic en **Mi lista** | "Con el + marcamos y desmarcamos favoritos; aparece una cinta ámbar." |
| R7 | Cerrar e ir a **Mi lista** | "Aquí están los favoritos. Si recargo la página, siguen ahí." (recargar con F5) |
| Responsive | Achicar la ventana o abrir el modo móvil del navegador (F12) | "La interfaz se adapta a pantallas chicas." |

## 3. Cómo se creó y se ejecuta (Integrante 2, 1 min)

- "Creamos el proyecto con Vite y la plantilla de React."
- "Para correrlo: `npm install` y luego `npm run dev`. Está en el README."
- Mostrar la estructura de carpetas: `src/components/`, `src/data/catalogo.js`, `public/imagenes/`.

## 4. Componentes y comunicación (Integrante 2, 2 min)

Mostrar el árbol del README o de `docs/DISENO.md`:

```
App
├─ Navbar
├─ Hero
├─ Fila → Tarjeta → BotonFavorito
├─ Cuadricula → Tarjeta
├─ SelectorGenero
└─ ModalDetalle
```

- **Datos hacia abajo (props):** abrir `Tarjeta.jsx`. "Tarjeta recibe por props el título (`item`),
  si es favorito (`esFavorito`) y dos funciones: `onAbrir` y `onFavorito`."
- **Eventos hacia arriba (funciones):** abrir `BotonFavorito.jsx`. "Cuando das clic, el botón llama a
  `onFavorito(item.id)`. Esa función viene de App, que es quien cambia el estado."
- "Así un mismo componente, como Tarjeta, se reutiliza en las filas, la cuadrícula y Mi lista."

## 5. Estado y eventos (Integrante 1, 2 min)

Abrir `App.jsx`:

- "Todo el estado vive en App con `useState`: la vista actual, el texto de búsqueda, el género
  elegido, la lista de favoritos y el título abierto en el detalle."
- "Cuando cambia el estado, React vuelve a dibujar la página: por eso la búsqueda filtra en cuanto
  escribes."
- Mostrar `alternarFavorito`: "si el id ya está en la lista lo quitamos y si no, lo agregamos. Creamos
  un arreglo nuevo en lugar de modificar el anterior, porque así React detecta el cambio."
- Mostrar el `useEffect` de favoritos: "cada vez que cambian los favoritos, los guardamos en
  `localStorage`; al abrir la app los leemos de ahí."

## 6. Cierre (Integrante 2, 30 s)

- Mostrar la pestaña de Pull Requests en GitHub: "trabajamos con ramas y Pull Requests; `main` está
  protegida y cada cambio lo aprueba el otro integrante. El CI compila el proyecto en cada PR."
- "Las fotos son de dominio público o CC0; los créditos están en `public/imagenes/CREDITOS.md`."

## Preguntas que pueden hacer

**¿Por qué React y no Vue o Angular?**
Por los componentes como funciones y el manejo de estado con hooks, que es poco código para una app
de este tamaño. Además tiene mucha documentación en español (es.react.dev).

**¿Qué es una prop y qué es el estado?**
Una prop es un dato que un componente recibe de su padre y no cambia por sí mismo. El estado es un
dato que el propio componente guarda y puede cambiar con `useState`; cuando cambia, React vuelve a
dibujar.

**¿Por qué el estado está en App y no en cada Tarjeta?**
Porque varios componentes necesitan los mismos datos: los favoritos se ven en la tarjeta, en el
banner, en el detalle y en Mi lista. Si los guarda App, todos ven siempre la misma lista.

**¿Para qué sirve `key` en las listas?**
Para que React identifique cada elemento cuando la lista cambia. Usamos el `id` de cada título.

**¿Qué hace `useEffect`?**
Ejecuta código después de dibujar cuando cambia algo. Lo usamos para guardar los favoritos en
`localStorage` y para que la barra superior se vuelva sólida al bajar.

**¿Cómo funciona la búsqueda sin acentos?**
La función `normalizar` de `utils.js` quita acentos y mayúsculas, así "pelicula" encuentra
"Película".

**¿Por qué no usan los pósters oficiales?**
Tienen derechos de autor y el repositorio es público. El PDF solo pide una imagen por tarjeta, así que
usamos fotos libres que evocan cada título.
