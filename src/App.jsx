import catalogo from './data/catalogo.js'

// Tarjeta de una película o serie: imagen, título y género principal.
function Tarjeta({ item }) {
  return (
    <article className="tarjeta">
      <img src={item.poster} alt={`Póster de ${item.title}`} width="300" height="450" />
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
