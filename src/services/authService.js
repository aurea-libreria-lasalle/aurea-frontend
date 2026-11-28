/*
 * authService.js
 *
 * Qué es: Peticiones de autenticación.
 *
 * Endpoints: POST /api/auth/registro · POST /api/auth/login · GET y PUT /api/auth/perfil
 *
 * Módulo / dueño: Sesión
 */

import { api } from "./api";

// Regresa { token, usuario }
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const registro = (datos) => api.post("/auth/registro", datos);

export const obtenerPerfil = () => api.get("/auth/perfil");

export const actualizarPerfil = (datos) => api.put("/auth/perfil", datos);
