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
 */

const API_URL = import.meta.env.VITE_API_URL;

// Llaves de localStorage donde vive la sesión (las usa también AuthContext)
export const TOKEN_KEY = "aurea_token";
export const USUARIO_KEY = "aurea_usuario";

async function peticion(metodo, ruta, cuerpo) {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {};
  if (cuerpo !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;

  let respuesta;
  try {
    respuesta = await fetch(API_URL + ruta, {
      method: metodo,
      headers,
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Revisa tu conexión.");
  }

  // 401 con token enviado = sesión vencida. Sin token es un login fallido:
  // en ese caso el mensaje lo muestra la página.
  if (respuesta.status === 401 && token) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    window.location.assign("/login");
    throw new Error("Tu sesión expiró. Inicia sesión de nuevo.");
  }

  if (respuesta.status === 204) return null;

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    // ProblemDetails: detail, o title; en validaciones, el primer mensaje de errors
    const primerError = datos?.errors && Object.values(datos.errors).flat()[0];
    throw new Error(
      datos?.detail || primerError || datos?.title || "Ocurrió un error inesperado."
    );
  }

  return datos;
}

export const api = {
  get: (ruta) => peticion("GET", ruta),
  post: (ruta, cuerpo) => peticion("POST", ruta, cuerpo),
  put: (ruta, cuerpo) => peticion("PUT", ruta, cuerpo),
  delete: (ruta) => peticion("DELETE", ruta),
};
