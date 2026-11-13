import BotonFavorito from './BotonFavorito.jsx'
import { IconoInfo } from './Iconos.jsx'
import { duracion, tipoTexto } from '../utils.js'

// Banner grande con un título destacado.
function Hero({ item, esFavorito, onFavorito, onAbrir }) {
  return (
    <header className="hero">
      <img src={item.imagen} alt="" width="1280" height="720" />
      <div className="hero-texto">
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
          <BotonFavorito item={item} esFavorito={esFavorito} onFavorito={onFavorito} conTexto />
        </div>
      </div>
    </header>
  )
}

export default Hero
