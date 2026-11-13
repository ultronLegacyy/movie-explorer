import { describe, expect, it } from 'vitest'
import { createPoster, escapeXml, wrapText } from './posters.js'

const decode = (uri) => decodeURIComponent(uri.split(',')[1])

describe('escapeXml', () => {
  it('escapa los caracteres especiales de XML', () => {
    expect(escapeXml(`<a href="x">&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&amp;&apos;&lt;/a&gt;',
    )
  })
})

describe('wrapText', () => {
  it('divide el texto en líneas cortas', () => {
    expect(wrapText('Mad Max: Furia en el camino', 14)).toEqual(['Mad Max: Furia', 'en el camino'])
  })

  it('recorta con "…" si hay demasiadas líneas', () => {
    const lines = wrapText('uno dos tres cuatro cinco seis', 4, 2)
    expect(lines).toHaveLength(2)
    expect(lines[1].endsWith('…')).toBe(true)
  })

  it('mantiene palabras más largas que el límite en su propia línea', () => {
    expect(wrapText('Supercalifragilístico', 5)).toEqual(['Supercalifragilístico'])
  })
})

describe('createPoster', () => {
  it('genera un data URI de SVG', () => {
    const uri = createPoster({ id: 'x', title: 'Hola', label: 'PELÍCULA · 2020' })
    expect(uri.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true)
    expect(decode(uri)).toContain('Hola')
  })

  it('no permite inyectar marcado a través del título', () => {
    const svg = decode(createPoster({ id: 'x', title: '<script>alert(1)</script>', label: 'X' }))
    expect(svg).not.toContain('<script>')
    expect(svg).toContain('&lt;script&gt;')
  })

  it('es determinista para el mismo id', () => {
    const a = createPoster({ id: 'dune', title: 'Dune', label: 'X' })
    const b = createPoster({ id: 'dune', title: 'Dune', label: 'X' })
    expect(a).toBe(b)
  })
})
