// Íconos SVG simples que se reutilizan en botones.
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'aria-hidden': true }

export const IconoMas = () => (
  <svg {...base} strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
)
export const IconoCheck = () => (
  <svg {...base} strokeWidth="2.6"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const IconoInfo = () => (
  <svg {...base} strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></svg>
)
export const IconoBuscar = () => (
  <svg {...base} strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></svg>
)
export const IconoCerrar = () => (
  <svg {...base} strokeWidth="2.4"><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const IconoIzquierda = () => (
  <svg {...base} strokeWidth="2.4"><path d="m15 5-7 7 7 7" /></svg>
)
export const IconoDerecha = () => (
  <svg {...base} strokeWidth="2.4"><path d="m9 5 7 7-7 7" /></svg>
)
