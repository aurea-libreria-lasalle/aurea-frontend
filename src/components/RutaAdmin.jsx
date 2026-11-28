/*
 * RutaAdmin.jsx
 *
 * Qué es: Envuelve las rutas del panel; si el rol no es Administrador manda al catálogo.
 *
 * Módulo / dueño: Sesión
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaAdmin() {
  const { isAutenticado, isAdministrador } = useAuth();
  const location = useLocation();

  if (!isAutenticado) return <Navigate to="/login" replace state={{ desde: location }} />;
  if (!isAdministrador) return <Navigate to="/catalogo" replace />;
  return <Outlet />;
}

export default RutaAdmin;
