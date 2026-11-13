// Lista desplegable para filtrar por género (R4).
function SelectorGenero({ generos, valor, onCambio }) {
  return (
    <select className="genero" value={valor} onChange={(e) => onCambio(e.target.value)} aria-label="Filtrar por género">
      <option value="todos">Todos los géneros</option>
      {generos.map((genero) => (
        <option key={genero} value={genero}>
          {genero}
        </option>
      ))}
    </select>
  )
}

export default SelectorGenero
