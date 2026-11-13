import { GENRES as G, TITLE_TYPES, TITLE_TYPE_LABELS } from '../domain/title.js'
import { createPoster } from './posters.js'

const { MOVIE, SERIES } = TITLE_TYPES

/**
 * Datos base del catálogo. Las sinopsis son resúmenes propios del equipo.
 * `poster` y `posterAlt` se agregan abajo de forma automática.
 */
const RAW_TITLES = [
  // ───────────── Películas ─────────────
  {
    id: 'interstellar',
    type: MOVIE,
    title: 'Interstellar',
    genres: [G.SCI_FI, G.DRAMA, G.ADVENTURE],
    year: 2014,
    durationMin: 169,
    synopsis:
      'Con la Tierra al borde del colapso agrícola, un expiloto viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad, mientras el tiempo corre de forma distinta para su familia.',
  },
  {
    id: 'coco',
    type: MOVIE,
    title: 'Coco',
    genres: [G.ANIMATION, G.FANTASY, G.ADVENTURE],
    year: 2017,
    durationMin: 105,
    synopsis:
      'Miguel sueña con ser músico pese a la prohibición de su familia. En el Día de Muertos cruza a la Tierra de los Muertos y descubre la verdadera historia de sus antepasados.',
  },
  {
    id: 'inception',
    type: MOVIE,
    title: 'El origen',
    genres: [G.SCI_FI, G.ACTION, G.THRILLER],
    year: 2010,
    durationMin: 148,
    synopsis:
      'Un ladrón especializado en robar secretos desde los sueños recibe un encargo inverso: implantar una idea en la mente de un heredero, internándose en sueños dentro de sueños.',
  },
  {
    id: 'the-matrix',
    type: MOVIE,
    title: 'Matrix',
    genres: [G.SCI_FI, G.ACTION],
    year: 1999,
    durationMin: 136,
    synopsis:
      'Un programador descubre que la realidad que conoce es una simulación creada por máquinas y se une a un grupo de rebeldes para liberar a la humanidad.',
  },
  {
    id: 'parasite',
    type: MOVIE,
    title: 'Parásitos',
    genres: [G.THRILLER, G.DRAMA],
    year: 2019,
    durationMin: 132,
    synopsis:
      'Una familia sin recursos se infiltra poco a poco en la vida de una familia adinerada, hasta que un secreto escondido en la casa lo cambia todo.',
  },
  {
    id: 'spirited-away',
    type: MOVIE,
    title: 'El viaje de Chihiro',
    genres: [G.ANIMATION, G.FANTASY],
    year: 2001,
    durationMin: 125,
    synopsis:
      'Durante una mudanza, Chihiro queda atrapada en un mundo de espíritus y debe trabajar en una casa de baños para rescatar a sus padres y volver a casa.',
  },
  {
    id: 'the-godfather',
    type: MOVIE,
    title: 'El padrino',
    genres: [G.CRIME, G.DRAMA],
    year: 1972,
    durationMin: 175,
    synopsis:
      'El patriarca de una poderosa familia mafiosa de Nueva York intenta mantener su imperio mientras su hijo menor, que quería una vida distinta, se ve arrastrado al negocio.',
  },
  {
    id: 'mad-max-fury-road',
    type: MOVIE,
    title: 'Mad Max: Furia en el camino',
    genres: [G.ACTION, G.ADVENTURE, G.SCI_FI],
    year: 2015,
    durationMin: 120,
    synopsis:
      'En un desierto postapocalíptico, una guerrera huye de un tirano junto a un grupo de mujeres y un vagabundo, en una persecución sin descanso.',
  },
  {
    id: 'get-out',
    type: MOVIE,
    title: '¡Huye!',
    genres: [G.HORROR, G.MYSTERY, G.THRILLER],
    year: 2017,
    durationMin: 104,
    synopsis:
      'Un joven visita por primera vez a la familia de su novia. Lo que parece una bienvenida amable esconde algo mucho más inquietante.',
  },
  {
    id: 'la-la-land',
    type: MOVIE,
    title: 'La La Land',
    genres: [G.MUSICAL, G.ROMANCE, G.DRAMA],
    year: 2016,
    durationMin: 128,
    synopsis:
      'Una aspirante a actriz y un pianista de jazz se enamoran en Los Ángeles mientras persiguen sus sueños, que poco a poco los llevan por caminos distintos.',
  },
  {
    id: 'toy-story',
    type: MOVIE,
    title: 'Toy Story',
    genres: [G.ANIMATION, G.COMEDY, G.ADVENTURE],
    year: 1995,
    durationMin: 81,
    synopsis:
      'Woody, el juguete favorito de Andy, ve amenazado su lugar con la llegada de Buzz Lightyear, un astronauta que no sabe que es un juguete.',
  },
  {
    id: 'knives-out',
    type: MOVIE,
    title: 'Entre navajas y secretos',
    genres: [G.MYSTERY, G.COMEDY, G.CRIME],
    year: 2019,
    durationMin: 130,
    synopsis:
      'Tras la muerte de un famoso novelista, un excéntrico detective investiga a una familia en la que todos tenían motivos y nadie dice toda la verdad.',
  },
  {
    id: 'dune',
    type: MOVIE,
    title: 'Dune',
    genres: [G.SCI_FI, G.ADVENTURE, G.DRAMA],
    year: 2021,
    durationMin: 155,
    synopsis:
      'El heredero de una casa noble llega a Arrakis, un planeta desértico que produce la sustancia más valiosa del universo, y queda en medio de una guerra por controlarlo.',
  },

  // ───────────── Series ─────────────
  {
    id: 'stranger-things',
    type: SERIES,
    title: 'Stranger Things',
    genres: [G.MYSTERY, G.SCI_FI, G.HORROR],
    year: 2016,
    seasons: 5,
    synopsis:
      'En un pequeño pueblo de los años ochenta, la desaparición de un niño destapa experimentos secretos, fuerzas sobrenaturales y a una niña con poderes extraordinarios.',
  },
  {
    id: 'breaking-bad',
    type: SERIES,
    title: 'Breaking Bad',
    genres: [G.CRIME, G.DRAMA, G.THRILLER],
    year: 2008,
    seasons: 5,
    synopsis:
      'Un profesor de química con un diagnóstico terminal empieza a fabricar drogas para asegurar el futuro de su familia y se transforma en alguien irreconocible.',
  },
  {
    id: 'the-office',
    type: SERIES,
    title: 'The Office',
    genres: [G.COMEDY],
    year: 2005,
    seasons: 9,
    synopsis:
      'Falso documental sobre el día a día de los empleados de una distribuidora de papel y su peculiar jefe, que se cree el mejor del mundo.',
  },
  {
    id: 'dark',
    type: SERIES,
    title: 'Dark',
    genres: [G.MYSTERY, G.SCI_FI, G.DRAMA],
    year: 2017,
    seasons: 3,
    synopsis:
      'La desaparición de dos niños en un pueblo alemán revela las conexiones entre cuatro familias a lo largo de varias generaciones y un misterio sobre el tiempo.',
  },
  {
    id: 'the-crown',
    type: SERIES,
    title: 'The Crown',
    genres: [G.DRAMA, G.HISTORY],
    year: 2016,
    seasons: 6,
    synopsis:
      'Recorrido por el reinado de Isabel II, desde su juventud hasta las últimas décadas, y los acontecimientos políticos y personales que marcaron a la monarquía británica.',
  },
  {
    id: 'arcane',
    type: SERIES,
    title: 'Arcane',
    genres: [G.ANIMATION, G.ACTION, G.FANTASY],
    year: 2021,
    seasons: 2,
    synopsis:
      'Dos hermanas quedan en bandos opuestos del conflicto entre una ciudad próspera y los barrios bajos que se esconden bajo ella.',
  },
  {
    id: 'sherlock',
    type: SERIES,
    title: 'Sherlock',
    genres: [G.MYSTERY, G.CRIME, G.DRAMA],
    year: 2010,
    seasons: 4,
    synopsis:
      'Versión moderna del detective más famoso de la literatura, que resuelve casos en el Londres actual junto al doctor John Watson.',
  },
  {
    id: 'the-mandalorian',
    type: SERIES,
    title: 'The Mandalorian',
    genres: [G.SCI_FI, G.ADVENTURE, G.ACTION],
    year: 2019,
    seasons: 3,
    synopsis:
      'Un cazarrecompensas solitario recorre los confines de la galaxia mientras protege a una misteriosa criatura que muchos quieren capturar.',
  },
  {
    id: 'friends',
    type: SERIES,
    title: 'Friends',
    genres: [G.COMEDY, G.ROMANCE],
    year: 1994,
    seasons: 10,
    synopsis:
      'Seis amigos que viven en Nueva York comparten trabajos, amores y desamores, casi siempre alrededor de una taza de café.',
  },
  {
    id: 'chernobyl',
    type: SERIES,
    title: 'Chernobyl',
    genres: [G.DRAMA, G.HISTORY, G.THRILLER],
    year: 2019,
    seasons: 1,
    synopsis:
      'Miniserie sobre el accidente nuclear de 1986 y las personas que arriesgaron su vida para contener la catástrofe y entender sus causas.',
  },
  {
    id: 'game-of-thrones',
    type: SERIES,
    title: 'Juego de tronos',
    genres: [G.FANTASY, G.DRAMA, G.ADVENTURE],
    year: 2011,
    seasons: 8,
    synopsis:
      'Varias casas nobles luchan por el control de los Siete Reinos mientras una amenaza antigua despierta más allá del muro del norte.',
  },
]

/**
 * Catálogo completo: arreglo de objetos {@link import('../domain/title.js').Title}.
 * Está congelado para que ningún componente lo modifique por accidente.
 *
 * @type {ReadonlyArray<Readonly<import('../domain/title.js').Title>>}
 */
export const CATALOG = Object.freeze(
  RAW_TITLES.map((raw) => {
    const typeLabel = TITLE_TYPE_LABELS[raw.type]
    return Object.freeze({
      ...raw,
      genres: Object.freeze([...raw.genres]),
      poster: createPoster({
        id: raw.id,
        title: raw.title,
        label: `${typeLabel.toUpperCase()} · ${raw.year}`,
      }),
      posterAlt: `Póster de ${raw.title} (${typeLabel.toLowerCase()}, ${raw.year})`,
    })
  }),
)
