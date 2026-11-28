/*
 * NotFoundPage.jsx
 *
 * Qué es: Página 404 con enlace de regreso al catálogo.
 *
 * Ruta: *
 *
 * Módulo / dueño: Sesión
 */

import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="no-encontrado">
      <p className="no-encontrado__codigo">404</p>
      <h2>Esta página no existe</h2>
      <Link to="/catalogo" className="btn btn--secundario">
        Volver al catálogo
      </Link>
    </div>
  );
}

export default NotFoundPage;
