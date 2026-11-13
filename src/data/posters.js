/**
 * Genera pósters genéricos (placeholders) como SVG en data URI.
 *
 * Así el proyecto no incluye imágenes con derechos de autor ni depende de internet durante la
 * demostración. Si después quieren usar imágenes propias, basta con cambiar el campo `poster` del
 * título por la ruta de la imagen.
 */

const WIDTH = 300
const HEIGHT = 450
const MAX_CHARS_PER_LINE = 14
const MAX_LINES = 4

/** Pares de colores [inicio, fin] para el degradado de fondo. */
const PALETTES = [
  ['#1e3a8a', '#0f172a'],
  ['#7c2d12', '#1c1917'],
  ['#14532d', '#052e16'],
  ['#581c87', '#1e1b4b'],
  ['#831843', '#1f2937'],
  ['#0e7490', '#082f49'],
  ['#854d0e', '#1c1917'],
  ['#3f6212', '#1a2e05'],
]

const XML_ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }

/**
 * Escapa texto para insertarlo de forma segura dentro de un SVG/XML.
 *
 * @param {string} text
 * @returns {string}
 */
export function escapeXml(text) {
  return String(text).replace(/[&<>"']/g, (char) => XML_ENTITIES[char])
}

/**
 * Hash simple y determinista (djb2) para elegir siempre la misma paleta para un mismo id.
 *
 * @param {string} value
 * @returns {number}
 */
function hash(value) {
  let h = 5381
  for (let i = 0; i < value.length; i++) h = (h * 33) ^ value.charCodeAt(i)
  return h >>> 0
}

/**
 * Divide el título en líneas cortas para que quepa en el póster.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function wrapText(text, maxChars = MAX_CHARS_PER_LINE, maxLines = MAX_LINES) {
  const words = String(text).trim().split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)

  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines)
    visible[maxLines - 1] = `${visible[maxLines - 1].slice(0, maxChars - 1)}…`
    return visible
  }
  return lines
}

/**
 * Crea el data URI de un póster placeholder.
 *
 * @param {Object} params
 * @param {string} params.id
 * @param {string} params.title
 * @param {string} params.label  Texto superior, p. ej. "PELÍCULA · 2014".
 * @returns {string}
 */
export function createPoster({ id, title, label }) {
  const [from, to] = PALETTES[hash(id) % PALETTES.length]
  const lines = wrapText(title)
  const lineHeight = 38
  const firstLineY = HEIGHT / 2 - ((lines.length - 1) * lineHeight) / 2

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="${WIDTH / 2}" y="${firstLineY + i * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join('')

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>` +
    `</linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/>` +
    `<rect x="16" y="16" width="${WIDTH - 32}" height="${HEIGHT - 32}" fill="none" stroke="#ffffff" stroke-opacity="0.25" rx="8"/>` +
    `<text x="${WIDTH / 2}" y="52" fill="#ffffff" fill-opacity="0.75" font-family="system-ui, sans-serif" font-size="14" letter-spacing="3" text-anchor="middle">${escapeXml(label)}</text>` +
    `<text fill="#ffffff" font-family="system-ui, sans-serif" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="middle">${titleTspans}</text>` +
    `</svg>`

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
