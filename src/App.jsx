import { useEffect, useState } from 'react'
import catalogo from './data/catalogo.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Fila from './components/Fila.jsx'
import Cuadricula from './components/Cuadricula.jsx'
import SelectorGenero from './components/SelectorGenero.jsx'
import ModalDetalle from './components/ModalDetalle.jsx'
import { generosDe, normalizar } from './utils.js'

// Título que aparece en el banner de cada vista.
const DESTACADO = { inicio: 'interstellar', series: 'stranger-things', peliculas: 'dune' }
const CLAVE_FAVORITOS = 'favoritos'

const porId = (id) => catalogo.find((item) => item.id === id)

// Mi lista se guarda en el navegador para que no se pierda al recargar.
function leerFavoritos() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS))
    return Array.isArray(guardados) ? guardados.filter(porId) : []
  } catch {
    return []
  }
}

function App() {
  // Estado de la aplicación
  const [vista, setVista] = useState('inicio') // inicio | series | peliculas | milista
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState('todos')
  const [favoritos, setFavoritos] = useState(leerFavoritos)
  const [abierto, setAbierto] = useState(null) // id del título en el detalle

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos))
    } catch {
      // Si el navegador no permite guardar, Mi lista funciona igual mientras la página esté abierta.
    }
  }, [favoritos])

  // Eventos
  const alternarFavorito = (id) =>
    setFavoritos((actuales) => (actuales.includes(id) ? actuales.filter((x) => x !== id) : [...actuales, id]))

  const cambiarVista = (nueva) => {
    setVista(nueva)
    setGenero('todos')
    setBusqueda('')
    window.scrollTo({ top: 0 })
  }

  // Props que comparten todas las tarjetas
  const tarjetas = { favoritos, onFavorito: alternarFavorito, onAbrir: setAbierto }

  let contenido
  const texto = normalizar(busqueda)

  if (texto) {
    // Búsqueda (R3): por título o por género
    const resultados = catalogo.filter(
      (item) => normalizar(item.title).includes(texto) || item.genres.some((g) => normalizar(g).includes(texto)),
    )
    contenido = (
      <Cuadricula
        titulo={`Resultados para «${busqueda.trim()}»`}
        items={resultados}
        vacio={
          <>
            <strong>Sin resultados</strong>
            Prueba con otro título o con un género, como “comedia”.
          </>
        }
        {...tarjetas}
      />
    )
  } else if (vista === 'milista') {
    // Mi lista (R7)
    contenido = (
      <Cuadricula
        titulo="Mi lista"
        items={favoritos.map(porId)}
        vacio={
          <>
            <strong>Tu lista está vacía</strong>
            Usa el botón + de cualquier título para guardarlo aquí.
          </>
        }
        {...tarjetas}
      />
    )
  } else {
    // Inicio, Series o Películas (R1, R4)
    const tipo = vista === 'series' ? 'series' : vista === 'peliculas' ? 'movie' : null
    const base = tipo ? catalogo.filter((item) => item.type === tipo) : catalogo
    const nombreTipo = tipo === 'movie' ? 'Películas' : 'Series'
    const selector = <SelectorGenero generos={generosDe(base)} valor={genero} onCambio={setGenero} />

    if (tipo && genero !== 'todos') {
      contenido = (
        <Cuadricula
          titulo={`${nombreTipo} de ${genero.toLowerCase()}`}
          items={base.filter((item) => item.genres.includes(genero))}
          extra={selector}
          {...tarjetas}
        />
      )
    } else {
      const destacado = porId(DESTACADO[vista])
      // Una fila por género, solo si tiene al menos 3 títulos
      const filasGenero = generosDe(base)
        .map((g) => ({ genero: g, items: base.filter((item) => item.genres.includes(g)) }))
        .filter((fila) => fila.items.length >= 3)

      contenido = (
        <>
          <Hero
            item={destacado}
            esFavorito={favoritos.includes(destacado.id)}
            onFavorito={alternarFavorito}
            onAbrir={setAbierto}
          />
          <div className="filas">
            {tipo && (
              <div className="barra-genero">
                <h2>{nombreTipo}</h2>
                {selector}
              </div>
            )}
            {!tipo && <Fila titulo="Mi lista" items={favoritos.map(porId)} {...tarjetas} />}
            {!tipo && <Fila titulo="Series" items={catalogo.filter((item) => item.type === 'series')} {...tarjetas} />}
            {!tipo && (
              <Fila
                titulo="Películas"
                items={catalogo.filter((item) => item.type === 'movie')}
                formato="poster"
                {...tarjetas}
              />
            )}
            {filasGenero.map((fila) => (
              <Fila
                key={fila.genero}
                titulo={fila.genero}
                items={fila.items}
                formato={tipo === 'movie' ? 'poster' : 'horizontal'}
                {...tarjetas}
              />
            ))}
          </div>
        </>
      )
    }
  }

  // Detalle (R5) y títulos que comparten algún género
  const itemAbierto = abierto ? porId(abierto) : null
  const parecidos = itemAbierto
    ? catalogo.filter((x) => x.id !== itemAbierto.id && x.genres.some((g) => itemAbierto.genres.includes(g))).slice(0, 6)
    : []

  return (
    <>
      <Navbar vista={vista} onVista={cambiarVista} busqueda={busqueda} onBusqueda={setBusqueda} />
      <main>{contenido}</main>
      <ModalDetalle
        item={itemAbierto}
        parecidos={parecidos}
        esFavorito={itemAbierto ? favoritos.includes(itemAbierto.id) : false}
        onFavorito={alternarFavorito}
        onAbrir={setAbierto}
        onCerrar={() => setAbierto(null)}
      />
    </>
  )
}

export default App
