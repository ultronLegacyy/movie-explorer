# Política de seguridad

Este es un proyecto académico sin backend: todos los datos son locales y los favoritos
se guardan en el `localStorage` del navegador.

## Reportar una vulnerabilidad

No abras un issue público. Usa **Security → Report a vulnerability** (reporte privado
de GitHub) en este repositorio.

## Medidas aplicadas

- Rama `main` protegida: solo se integra mediante PR revisado y con CI en verde.
- Escaneo de secretos (GitHub secret scanning + push protection y gitleaks en CI).
- Dependabot y `npm audit` para dependencias vulnerables.
- Content-Security-Policy en el build de producción.
- Los datos leídos de `localStorage` se validan antes de usarse.
