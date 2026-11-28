/*
 * Header.jsx
 *
 * Qué es: Barra superior de toda la tienda: logo, navegación y contador del carrito.
 *
 * Muestra: Catálogo, Mis pedidos y Mi cuenta; sin sesión, Iniciar sesión y Registrarse; si
 *   el rol es Administrador, enlace al panel
 *
 * Lee de: AuthContext (usuario y rol) y CarritoContext (cantidad de artículos)
 *
 * Módulo / dueño: Pieza compartida (cambios con aprobación de 2 integrantes)
 */

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";

const claseEnlace = ({ isActive }) =>
  isActive ? "header__enlace header__enlace--activo" : "header__enlace";

function Header() {
  const { isAutenticado, isAdministrador, logout } = useAuth();
  const { cantidad } = useCarrito();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__contenido">
        <Link to="/catalogo" className="header__logo">
          ÁUREA
        </Link>
        <nav className="header__nav">
          <NavLink to="/catalogo" className={claseEnlace}>
            Catálogo
          </NavLink>
          {isAutenticado ? (
            <>
              <NavLink to="/mis-pedidos" className={claseEnlace}>
                Mis pedidos
              </NavLink>
              <NavLink to="/perfil" className={claseEnlace}>
                Mi cuenta
              </NavLink>
              {isAdministrador && (
                <NavLink to="/admin" className={claseEnlace}>
                  Administración
                </NavLink>
              )}
              <button type="button" className="header__boton" onClick={handleLogout}>
                Cerrar sesión
              </button>
              <Link to="/carrito" className="header__carrito">
                Carrito
                <span className="header__contador">{cantidad}</span>
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/login" className={claseEnlace}>
                Iniciar sesión
              </NavLink>
              <NavLink to="/registro" className={claseEnlace}>
                Registrarse
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
