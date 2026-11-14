import Tarjeta from './Tarjeta.jsx'

// Cuadrícula de tarjetas para resultados de búsqueda, un género o Mi lista.
// "extra" es contenido opcional junto al título (por ejemplo, el selector de género).
function Cuadricula({ titulo, items, extra, vacio, favoritos, onFavorito, onAbrir }) {
  return (
    <section className="vista-cuadricula">
      <div className="encabezado">
        <h2>{titulo}</h2>
        {extra}
      </div>

      {items.length > 0 ? (
        <div className="cuadricula">
          {items.map((item) => (
            <Tarjeta
              key={item.id}
              item={item}
              esFavorito={favoritos.includes(item.id)}
              onFavorito={onFavorito}
              onAbrir={onAbrir}
            />
          ))}
        </div>
      ) : (
        <div className="vacio">{vacio}</div>
      )}
    </section>
  )
}

export default Cuadricula
