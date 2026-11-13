// Catálogo de películas y series: un arreglo de objetos.
//
// Cada objeto tiene:
//   id          identificador único (también es el nombre del póster)
//   type        'movie' (película) o 'series' (serie)
//   title       título
//   genres      lista de géneros; el primero es el principal
//   year        año de estreno
//   durationMin duración en minutos (solo películas)
//   seasons     número de temporadas (solo series)
//   synopsis    sinopsis breve
//   imagen      ruta de la foto (carpeta public/imagenes)

const catalogo = [
  {
    id: 'interstellar',
    type: 'movie',
    title: 'Interstellar',
    genres: ['Ciencia ficción', 'Drama'],
    year: 2014,
    durationMin: 169,
    synopsis:
      'Con la Tierra al borde del colapso, un expiloto cruza un agujero de gusano en busca de un nuevo hogar para la humanidad.',
  },
  {
    id: 'coco',
    type: 'movie',
    title: 'Coco',
    genres: ['Animación', 'Fantasía'],
    year: 2017,
    durationMin: 105,
    synopsis:
      'Miguel sueña con ser músico. En Día de Muertos cruza a la Tierra de los Muertos y descubre la historia de su familia.',
  },
  {
    id: 'stranger-things',
    type: 'series',
    title: 'Stranger Things',
    genres: ['Misterio', 'Ciencia ficción'],
    year: 2016,
    seasons: 5,
    synopsis:
      'En un pueblo de los años ochenta, la desaparición de un niño destapa experimentos secretos y fuerzas sobrenaturales.',
  },
  {
    id: 'inception',
    type: 'movie',
    title: 'El origen',
    genres: ['Ciencia ficción', 'Acción'],
    year: 2010,
    durationMin: 148,
    synopsis:
      'Un ladrón que roba secretos desde los sueños recibe el encargo contrario: implantar una idea en la mente de alguien.',
  },
  {
    id: 'breaking-bad',
    type: 'series',
    title: 'Breaking Bad',
    genres: ['Crimen', 'Drama'],
    year: 2008,
    seasons: 5,
    synopsis:
      'Un profesor de química con un diagnóstico terminal empieza a fabricar drogas para asegurar el futuro de su familia.',
  },
  {
    id: 'spirited-away',
    type: 'movie',
    title: 'El viaje de Chihiro',
    genres: ['Animación', 'Fantasía'],
    year: 2001,
    durationMin: 125,
    synopsis:
      'Chihiro queda atrapada en un mundo de espíritus y trabaja en una casa de baños para rescatar a sus padres.',
  },
  {
    id: 'dark',
    type: 'series',
    title: 'Dark',
    genres: ['Misterio', 'Drama'],
    year: 2017,
    seasons: 3,
    synopsis:
      'La desaparición de dos niños revela las conexiones entre cuatro familias a lo largo de varias generaciones.',
  },
  {
    id: 'the-matrix',
    type: 'movie',
    title: 'Matrix',
    genres: ['Ciencia ficción', 'Acción'],
    year: 1999,
    durationMin: 136,
    synopsis:
      'Un programador descubre que la realidad es una simulación creada por máquinas y se une a la resistencia.',
  },
  {
    id: 'the-office',
    type: 'series',
    title: 'The Office',
    genres: ['Comedia'],
    year: 2005,
    seasons: 9,
    synopsis:
      'Falso documental sobre los empleados de una distribuidora de papel y su peculiar jefe.',
  },
  {
    id: 'parasite',
    type: 'movie',
    title: 'Parásitos',
    genres: ['Thriller', 'Drama'],
    year: 2019,
    durationMin: 132,
    synopsis:
      'Una familia sin recursos se infiltra en la vida de una familia adinerada hasta que un secreto lo cambia todo.',
  },
  {
    id: 'arcane',
    type: 'series',
    title: 'Arcane',
    genres: ['Animación', 'Acción'],
    year: 2021,
    seasons: 2,
    synopsis:
      'Dos hermanas quedan en bandos opuestos del conflicto entre una ciudad próspera y los barrios bajos.',
  },
  {
    id: 'the-godfather',
    type: 'movie',
    title: 'El padrino',
    genres: ['Crimen', 'Drama'],
    year: 1972,
    durationMin: 175,
    synopsis:
      'El patriarca de una familia mafiosa intenta mantener su imperio mientras su hijo menor es arrastrado al negocio.',
  },
  {
    id: 'sherlock',
    type: 'series',
    title: 'Sherlock',
    genres: ['Misterio', 'Crimen'],
    year: 2010,
    seasons: 4,
    synopsis:
      'Versión moderna del detective más famoso, que resuelve casos en el Londres actual junto a John Watson.',
  },
  {
    id: 'toy-story',
    type: 'movie',
    title: 'Toy Story',
    genres: ['Animación', 'Comedia'],
    year: 1995,
    durationMin: 81,
    synopsis:
      'Woody ve amenazado su lugar como juguete favorito con la llegada de Buzz Lightyear.',
  },
  {
    id: 'friends',
    type: 'series',
    title: 'Friends',
    genres: ['Comedia', 'Romance'],
    year: 1994,
    seasons: 10,
    synopsis:
      'Seis amigos en Nueva York comparten trabajos, amores y desamores alrededor de una taza de café.',
  },
  {
    id: 'get-out',
    type: 'movie',
    title: '¡Huye!',
    genres: ['Terror', 'Misterio'],
    year: 2017,
    durationMin: 104,
    synopsis:
      'Un joven visita a la familia de su novia. La bienvenida amable esconde algo inquietante.',
  },
  {
    id: 'chernobyl',
    type: 'series',
    title: 'Chernobyl',
    genres: ['Drama', 'Historia'],
    year: 2019,
    seasons: 1,
    synopsis:
      'Miniserie sobre el accidente nuclear de 1986 y quienes arriesgaron su vida para contenerlo.',
  },
  {
    id: 'la-la-land',
    type: 'movie',
    title: 'La La Land',
    genres: ['Romance', 'Musical'],
    year: 2016,
    durationMin: 128,
    synopsis:
      'Una actriz y un pianista de jazz se enamoran mientras persiguen sus sueños en Los Ángeles.',
  },
  {
    id: 'the-mandalorian',
    type: 'series',
    title: 'The Mandalorian',
    genres: ['Ciencia ficción', 'Aventura'],
    year: 2019,
    seasons: 3,
    synopsis:
      'Un cazarrecompensas recorre la galaxia mientras protege a una misteriosa criatura.',
  },
  {
    id: 'dune',
    type: 'movie',
    title: 'Dune',
    genres: ['Ciencia ficción', 'Aventura'],
    year: 2021,
    durationMin: 155,
    synopsis:
      'El heredero de una casa noble llega a Arrakis, un planeta desértico en disputa por su recurso más valioso.',
  },
].map((item) => ({ ...item, imagen: `/imagenes/${item.id}.jpg` }))

export default catalogo
