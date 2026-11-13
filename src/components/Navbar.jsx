import { useEffect, useRef, useState } from 'react'
import { IconoBuscar } from './Iconos.jsx'

const ENLACES = [
  { vista: 'inicio', texto: 'Inicio' },
  { vista: 'series', texto: 'Series' },
  { vista: 'peliculas', texto: 'Películas' },
  { vista: 'milista', texto: 'Mi lista' },
]

// Barra superior: logo, enlaces (R4, R7) y buscador (R3).
function Navbar({ vista, onVista, busqueda, onBusqueda }) {
  const [buscadorAbierto, setBuscadorAbierto] = useState(false)
  const [solida, setSolida] = useState(false)
  const campo = useRef(null)

  // La barra pasa de transparente a sólida al bajar en la página.
  useEffect(() => {
    const alHacerScroll = () => setSolida(window.scrollY > 40)
    window.addEventListener('scroll', alHacerScroll, { passive: true })
    return () => window.removeEventListener('scroll', alHacerScroll)
  }, [])

  const alternarBuscador = () => {
    if (buscadorAbierto) {
      onBusqueda('')
      setBuscadorAbierto(false)
    } else {
      setBuscadorAbierto(true)
      campo.current.focus()
    }
  }

  return (
    <nav className={`nav${solida ? ' solida' : ''}`}>
      <h1 className="logo">
        Movie<b>·</b>Explorer
      </h1>

      <div className="enlaces">
        {ENLACES.map((enlace) => (
          <button
            key={enlace.vista}
            type="button"
            aria-current={vista === enlace.vista && !busqueda ? 'page' : undefined}
            onClick={() => onVista(enlace.vista)}
          >
            {enlace.texto}
          </button>
        ))}
      </div>

      <div className={`buscador${buscadorAbierto || busqueda ? ' abierto' : ''}`}>
        <button type="button" onClick={alternarBuscador} aria-label={buscadorAbierto ? 'Cerrar búsqueda' : 'Buscar'}>
          <IconoBuscar />
        </button>
        <input
          ref={campo}
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onBusqueda('')
              setBuscadorAbierto(false)
            }
          }}
          placeholder="Busca un título o género"
          aria-label="Buscar por título o género"
          maxLength={100}
        />
      </div>
    </nav>
  )
}

export default Navbar
