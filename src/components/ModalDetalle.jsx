import { useEffect, useRef } from 'react'
import BotonFavorito from './BotonFavorito.jsx'
import { IconoCerrar } from './Iconos.jsx'
import { duracion, tipoTexto } from '../utils.js'

// Ventana con el detalle de un título (R5): sinopsis, año, duración o temporadas y géneros.
// Usa el elemento <dialog> del navegador, que ya maneja el foco y la tecla Escape.
function ModalDetalle({ item, parecidos, esFavorito, onFavorito, onAbrir, onCerrar }) {
  const dialogo = useRef(null)

  useEffect(() => {
    const el = dialogo.current
    if (item && !el.open) el.showModal()
    if (!item && el.open) el.close()
    if (item) el.scrollTop = 0
  }, [item])

  return (
    <dialog
      ref={dialogo}
      className="detalle"
      aria-labelledby="detalle-titulo"
      onClose={onCerrar}
      onClick={(e) => {
        // Un clic en el fondo oscuro (fuera del contenido) cierra la ventana.
        if (e.target === e.currentTarget) onCerrar()
      }}
    >
      {item && (
        <>
          <button type="button" className="cerrar" onClick={onCerrar} aria-label="Cerrar">
            <IconoCerrar />
          </button>

          <div className="detalle-portada">
            <img src={item.imagen} alt="" width="1280" height="720" />
            <div className="detalle-encabezado">
              <h2 id="detalle-titulo">{item.title}</h2>
              <div className="acciones">
                <BotonFavorito item={item} esFavorito={esFavorito} onFavorito={onFavorito} conTexto />
              </div>
            </div>
          </div>

          <div className="detalle-cuerpo">
            <div className="detalle-columnas">
              <div className="detalle-principal">
                <div className="meta">
                  <span>{tipoTexto(item)}</span>
                  <span>{item.year}</span>
                  <span>{duracion(item)}</span>
                </div>
                <p>{item.synopsis}</p>
              </div>
              <dl className="detalle-datos">
                <div>
                  <dt>Géneros</dt>
                  <dd>{item.genres.join(', ')}</dd>
                </div>
                <div>
                  <dt>{item.type === 'movie' ? 'Duración' : 'Temporadas'}</dt>
                  <dd>{duracion(item)}</dd>
                </div>
                <div>
                  <dt>Estreno</dt>
                  <dd>{item.year}</dd>
                </div>
              </dl>
            </div>

            {parecidos.length > 0 && (
              <div>
                <h3>Títulos parecidos</h3>
                <div className="parecidos">
                  {parecidos.map((otro) => (
                    <button
                      key={otro.id}
                      type="button"
                      className="portada"
                      onClick={() => onAbrir(otro.id)}
                      aria-label={`Ver detalle de ${otro.title}`}
                    >
                      <img src={otro.imagen} alt="" width="1280" height="720" loading="lazy" />
                      <span className="portada-texto" aria-hidden="true">
                        <strong>{otro.title}</strong>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </dialog>
  )
}

export default ModalDetalle
