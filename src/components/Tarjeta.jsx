import BotonFavorito from './BotonFavorito.jsx'
import { tipoTexto } from '../utils.js'

// Tarjeta de un título (R2): imagen, título y género.
// formato "horizontal" (16:9) para las filas y la cuadrícula, "poster" (2:3) para la fila de películas.
function Tarjeta({ item, formato = 'horizontal', esFavorito, onFavorito, onAbrir }) {
  return (
    <article className={`tarjeta tarjeta-${formato}${esFavorito ? ' guardado' : ''}`}>
      <button
        type="button"
        className="portada"
        onClick={() => onAbrir(item.id)}
        aria-label={`Ver detalle de ${item.title}`}
      >
        <img src={item.imagen} alt="" width="1280" height="720" loading="lazy" />
        <span className="portada-texto" aria-hidden="true">
          {formato === 'poster' && (
            <small>
              {tipoTexto(item)} · {item.year}
            </small>
          )}
          <strong>{item.title}</strong>
        </span>
      </button>

      <div className="info">
        <div className="info-texto">
          <h3>{item.title}</h3>
          <p>
            {item.year} · {item.genres[0]}
          </p>
        </div>
        <BotonFavorito item={item} esFavorito={esFavorito} onFavorito={onFavorito} />
      </div>
    </article>
  )
}

export default Tarjeta
