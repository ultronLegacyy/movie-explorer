import catalogo from './data/catalogo.js'

// Tarjeta de una película o serie: imagen, título y género principal.
function Tarjeta({ item }) {
  return (
    <article className="tarjeta">
      {/* La imagen es ilustrativa: el título va justo debajo, por eso el alt queda vacío. */}
      <img src={item.imagen} alt="" width="1280" height="720" loading="lazy" />
      <h3>{item.title}</h3>
      <p>{item.genres[0]}</p>
    </article>
  )
}

function App() {
  return (
    <>
      <header className="barra">
        <h1 className="logo">Netflis</h1>
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
