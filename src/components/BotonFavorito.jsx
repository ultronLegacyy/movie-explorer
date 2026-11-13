import { IconoCheck, IconoMas } from './Iconos.jsx'

// Botón para agregar o quitar un título de Mi lista (R6).
// "conTexto" muestra la etiqueta junto al ícono (banner y detalle); sin ella es un botón redondo.
function BotonFavorito({ item, esFavorito, onFavorito, conTexto = false }) {
  const etiqueta = esFavorito ? 'Quitar de Mi lista' : 'Agregar a Mi lista'
  return (
    <button
      type="button"
      className={conTexto ? 'btn btn-velo' : 'fav'}
      aria-pressed={esFavorito}
      aria-label={conTexto ? undefined : `${etiqueta}: ${item.title}`}
      onClick={(e) => {
        e.stopPropagation()
        onFavorito(item.id)
      }}
    >
      {esFavorito ? <IconoCheck /> : <IconoMas />}
      {conTexto && (esFavorito ? 'En Mi lista' : 'Mi lista')}
    </button>
  )
}

export default BotonFavorito
