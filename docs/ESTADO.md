# Áurea Frontend: estado de la Parte 1 (Base y sesión)

Actualizado el 28 de noviembre de 2026. La Parte 1 está programada y compila (`npm run lint` y `npm run build` pasan), pero todavía no está en `main`: falta commit, push y PR.

## Estado por parte

| Parte | Alcance | Estado |
| --- | --- | --- |
| 1. Base y sesión | Rutas, Header, Footer, 404, api.js, Mensajes, AuthContext, Login, Registro, Perfil, RutaPrivada, RutaAdmin | Programada, falta PR |
| 2. Catálogo y carrito | Catálogo, detalle, CarritoContext, carrito | Por reportar |
| 3. Compra | Direcciones, checkout, mis pedidos | Por reportar |
| 4. Administración | Panel, productos, categorías, pedidos | Por reportar |

## Qué incluye la Parte 1

- **Base compartida:** rutas con React Router en `App.jsx`, Header con enlaces según sesión y rol y contador del carrito, Footer y página 404.
- **Cliente HTTP:** `api.js` toma la URL de `VITE_API_URL`, manda el token en cada petición y convierte los errores en mensajes.
- **Mensajes:** un solo componente para cargando, error con Reintentar y sin datos.
- **Sesión:** AuthContext con login, logout, sesión que sobrevive a recargar y `isAdministrador`.
- **Pantallas:** Login, Registro con confirmación de contraseña y Perfil, todas con validación.
- **Protección de rutas:** RutaPrivada manda a `/login`; RutaAdmin manda al catálogo si el rol no es Administrador.

## Rutas definidas

| Tipo | Rutas |
| --- | --- |
| Públicas | `/catalogo`, `/producto/:id`, `/login`, `/registro` |
| Con sesión | `/carrito`, `/checkout`, `/direcciones`, `/mis-pedidos`, `/mis-pedidos/:id`, `/perfil` |
| Administrador | `/admin`, `/admin/productos`, `/admin/categorias`, `/admin/pedidos` |

## Cómo se consume la API

1. **Dónde se guarda el token:** en `localStorage`, con las llaves `aurea_token` y `aurea_usuario`.
2. **Cómo se envía:** `api.js` agrega `Authorization: Bearer <token>` en cada petición cuando hay sesión.
3. **Error 401 con token:** `api.js` borra la sesión y manda a `/login`. Sin token (login fallido) solo muestra el mensaje.
4. **Otros errores:** `api.js` lanza un Error con `detail` de la respuesta, o `title` si no viene.
5. **Páginas:** ninguna usa `fetch`; todo pasa por `services/`.

## Pendientes y decisiones abiertas

- [ ] Hacer commit, push y abrir el PR de la base.
- [ ] Unir antes la rama `docs/estructura` a `main`: ahí está el CSS que usa la base.
- [ ] Las otras partes reemplazan los placeholders de sus páginas y de `CarritoContext` (hoy solo expone `cantidad = 0`).
- [ ] Confirmar con backend los campos de registro (`nombre, apellidos, email, telefono, password`) y de perfil (`nombre, apellidos, telefono`).
- [ ] Poner la URL real de la API en `.env` (`VITE_API_URL`).
- [ ] Corregir el documento de arquitectura: `TOKEN_KEY` y `USUARIO_KEY` viven en `api.js`, no en `AuthContext.jsx`.
- [ ] Revisar los PRs de las demás partes y completar el reporte (estructura de carpetas y consumo de la API).
