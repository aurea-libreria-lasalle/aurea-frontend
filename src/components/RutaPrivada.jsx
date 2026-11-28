/*
 * RutaPrivada.jsx
 *
 * Qué es: Envuelve las rutas que exigen sesión; sin sesión manda a /login.
 *
 * Módulo / dueño: Sesión
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaPrivada() {
  const { isAutenticado } = useAuth();
  const location = useLocation();

  // Se guarda la ruta pedida para volver a ella después de iniciar sesión
  if (!isAutenticado) return <Navigate to="/login" replace state={{ desde: location }} />;
  return <Outlet />;
}

export default RutaPrivada;
