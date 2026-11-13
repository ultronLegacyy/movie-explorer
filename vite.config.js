import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Content-Security-Policy aplicada solo al build de producción.
 * En desarrollo no se inyecta porque el HMR de Vite usa scripts inline.
 * Todos los recursos (incluidos los pósters) son locales, por eso basta con 'self'.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

/** @returns {import('vite').Plugin} */
function cspPlugin() {
  return {
    name: 'inject-csp',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
          injectTo: 'head-prepend',
        },
        {
          tag: 'meta',
          attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cspPlugin()],
  build: {
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/data/**', 'src/domain/**', 'src/services/**', 'src/state/**', 'src/hooks/**'],
    },
  },
})
