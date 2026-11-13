import catalogo from './data/catalogo.js'

// Póster: la foto de fondo con el tipo, el año y el título encima.
function Poster({ item }) {
  return (
    <div className="poster">
      <img src={item.imagen} alt="" width="1280" height="720" loading="lazy" />
      <div className="poster-texto" aria-hidden="true">
        <span>
          {item.type === 'movie' ? 'Película' : 'Serie'} · {item.year}
        </span>
        <strong>{item.title}</strong>
      </div>
    </div>
  )
}

// Tarjeta de una película o serie: imagen, título y género principal.
function Tarjeta({ item }) {
  return (
    <article className="tarjeta">
      <Poster item={item} />
      <h3>{item.title}</h3>
      <p>{item.genres[0]}</p>
    </article>
  )
}

function App() {
  return (
    <>
      <header className="barra">
        <h1 className="logo">
          Movie<b>·</b>Explorer
        </h1>
      </header>

      <main className="contenido">
        <p className="conteo">{catalogo.length} títulos</p>
        <div className="cuadricula">
          {catalogo.map((item) => (
            <Tarjeta key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
