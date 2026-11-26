/*
 * api.js
 *
 * Qué es: Cliente HTTP único: todas las peticiones pasan por aquí.
 *
 * Hace: arma la URL con import.meta.env.VITE_API_URL y agrega Authorization: Bearer <token>
 *   si hay sesión
 *
 * Errores: en 401 borra la sesión y manda a /login; en otros lanza un Error con detail (o
 *   title) de la respuesta
 *
 * Módulo / dueño: Pieza compartida (cambios con aprobación de 2 integrantes)
 *
 * Este archivo solo está documentado: el código lo escribe el dueño del módulo.
 */
