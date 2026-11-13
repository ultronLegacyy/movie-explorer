import { useRef } from 'react'
import Tarjeta from './Tarjeta.jsx'
import { IconoDerecha, IconoIzquierda } from './Iconos.jsx'

// Carril horizontal de tarjetas (R1), con flechas para avanzar en pantallas con mouse.
function Fila({ titulo, items, formato = 'horizontal', favoritos, onFavorito, onAbrir }) {
  const pista = useRef(null)

  if (items.length === 0) return null

  const mover = (direccion) => {
    const el = pista.current
    el.scrollBy({ left: direccion * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section className="fila">
      <h2>
        {titulo} <small>{items.length}</small>
      </h2>
      <div className="carril">
        <button type="button" className="flecha izq" onClick={() => mover(-1)} aria-label={`Anteriores en ${titulo}`}>
          <IconoIzquierda />
        </button>
        <div className={`pista pista-${formato}`} ref={pista}>
          {items.map((item) => (
            <Tarjeta
              key={item.id}
              item={item}
              formato={formato}
              esFavorito={favoritos.includes(item.id)}
              onFavorito={onFavorito}
              onAbrir={onAbrir}
            />
          ))}
        </div>
        <button type="button" className="flecha der" onClick={() => mover(1)} aria-label={`Siguientes en ${titulo}`}>
          <IconoDerecha />
        </button>
      </div>
    </section>
  )
}

export default Fila
