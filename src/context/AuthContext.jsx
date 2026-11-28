/*
 * AuthContext.jsx
 *
 * Qué es: Sesión global: usuario, token, login, logout y si es administrador.
 *
 * Guarda: token y usuario en localStorage con las llaves aurea_token y aurea_usuario
 *   (las constantes TOKEN_KEY y USUARIO_KEY viven en services/api.js para evitar un import circular)
 *
 * Reglas: al cargar la app lee esas llaves para mantener la sesión al recargar; exporta el
 *   hook useAuth
 *
 * Módulo / dueño: Sesión
 */

import { createContext, useContext, useState } from "react";
import { TOKEN_KEY, USUARIO_KEY } from "../services/api";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

function leerUsuario() {
  try {
    return JSON.parse(localStorage.getItem(USUARIO_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // Se leen al arrancar: así la sesión sobrevive a recargar la página
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [usuario, setUsuario] = useState(leerUsuario);

  const guardarUsuario = (nuevo) => {
    localStorage.setItem(USUARIO_KEY, JSON.stringify(nuevo));
    setUsuario(nuevo);
  };

  const login = async (email, password) => {
    const respuesta = await authService.login(email, password);
    localStorage.setItem(TOKEN_KEY, respuesta.token);
    setToken(respuesta.token);
    guardarUsuario(respuesta.usuario);
    return respuesta.usuario;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    setToken(null);
    setUsuario(null);
  };

  const value = {
    usuario,
    token,
    isAutenticado: Boolean(token && usuario),
    isAdministrador: usuario?.rol === "Administrador",
    login,
    logout,
    actualizarUsuario: guardarUsuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return contexto;
}
