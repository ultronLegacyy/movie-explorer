import { useEffect, useState } from 'react'
import BotonFavorito from './BotonFavorito.jsx'
import { IconoInfo } from './Iconos.jsx'
import { duracion, tipoTexto } from '../utils.js'

const INTERVALO = 5000

// Banner grande. Con varios títulos funciona como carrusel: cambia cada 5 s
// y se detiene mientras el teclado está sobre el banner o hay un detalle abierto.
function Hero({ items, pausado, favoritos, onFavorito, onAbrir }) {
  const [indice, setIndice] = useState(0)
  const [enfocado, setEnfocado] = useState(false)
  const actual = indice % items.length
  const item = items[actual]

  useEffect(() => {
    if (items.length < 2 || pausado || enfocado) return
    const id = setInterval(() => setIndice((i) => (i + 1) % items.length), INTERVALO)
    return () => clearInterval(id)
  }, [items.length, pausado, enfocado, indice])

  return (
    <header
      className="hero"
      // Solo el foco con teclado pausa; un clic con el mouse no lo deja detenido.
      onFocus={(e) => setEnfocado(e.target.matches(':focus-visible'))}
      onBlur={() => setEnfocado(false)}
    >
      {/* key hace que la imagen y el texto se vuelvan a animar en cada cambio */}
      <img key={`img-${item.id}`} src={item.imagen} alt="" width="1280" height="720" />
      <div className="hero-texto" key={item.id}>
        <h2>{item.title}</h2>
        <div className="meta">
          <span>{tipoTexto(item)}</span>
          <span>{item.year}</span>
          <span>{duracion(item)}</span>
          <span className="etiqueta">{item.genres[0]}</span>
        </div>
        <p>{item.synopsis}</p>
        <div className="acciones">
          <button type="button" className="btn btn-claro" onClick={() => onAbrir(item.id)}>
            <IconoInfo /> Más información
          </button>
          <BotonFavorito item={item} esFavorito={favoritos.includes(item.id)} onFavorito={onFavorito} conTexto />
        </div>
      </div>

      {items.length > 1 && (
        <div className="puntos">
          {items.map((otro, i) => (
            <button
              key={otro.id}
              type="button"
              aria-label={`Mostrar ${otro.title}`}
              aria-current={i === actual ? 'true' : undefined}
              onClick={() => setIndice(i)}
            />
          ))}
        </div>
      )}
    </header>
  )
}

export default Hero
