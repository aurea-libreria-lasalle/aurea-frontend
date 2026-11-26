# Áurea — Frontend

Tienda en línea de libros. Proyecto final de Desarrollo de Aplicaciones Web (React + Vite), Universidad La Salle Bajío. Consume la API de `aurea-backend`.

## Cómo correrlo

```
npm install
Copy-Item .env.example .env
npm run dev
```

En `.env` pon `VITE_API_URL` con la URL de la API. Para las rutas instala `react-router-dom`.

## Estructura (como en la práctica de clase)

| Carpeta | Qué contiene |
| --- | --- |
| `docs/` | Arquitectura, guía de Git y guía de estilo visual |
| `src/App.jsx` | Las rutas de la app (React Router) |
| `src/components/` | Piezas reutilizables, también las del panel admin y las rutas protegidas |
| `src/pages/` | Una página por ruta; las del panel empiezan con `Admin` |
| `src/context/` | Sesión (`AuthContext`) y carrito (`CarritoContext`) globales |
| `src/hooks/` | Hooks que regresan `{ datos, cargando, error }`, como `usePersonajes` en clase |
| `src/services/` | Todas las peticiones a la API (`api.js` + un archivo por módulo) |

Cada archivo trae arriba un comentario con qué es, qué usa y sus reglas. Los colores de la guía de estilo van como variables CSS en `src/index.css`.

## Reglas del equipo

Las reglas completas están en `docs/Documento_Arquitectura.pdf`. Lo mínimo:

- Nadie sube directo a `main`: rama `feature/<modulo>` y pull request revisado por otro integrante.
- Ningún componente usa `fetch`; todo pasa por `src/services/`.
- Los datos vienen de la API, nunca de arreglos fijos.
