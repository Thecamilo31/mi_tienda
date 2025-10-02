# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Integración Frontend - Backend

Este proyecto incluye un cliente API simple en `src/api` que usa la variable de entorno `VITE_API_URL` para construir las solicitudes al backend. Agrega un archivo `.env` en el root (no lo comitees) o usa el `.env.example` como referencia.

Variable esperada:
- `VITE_API_URL` — URL base del backend, por ejemplo `http://localhost:4000`.

Endpoints esperados (contracto mínimo):
- POST /auth/login
	- Request: { email: string, password: string }
	- Response (200): { token: string, user?: { email: string, name?: string } }

El frontend llamará a `/auth/login` cuando el usuario haga login. El token devuelto se guarda en `localStorage` y se añade automáticamente al header `Authorization: Bearer <token>` en las llamadas posteriores.

Si tu backend tiene rutas diferentes, ajusta `src/api/index.js` o la variable `VITE_API_URL` según sea necesario.
