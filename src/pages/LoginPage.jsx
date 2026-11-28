/*
 * LoginPage.jsx
 *
 * Qué es: Inicio de sesión con correo y contraseña.
 *
 * Ruta: /login
 *
 * Usa: AuthContext (login)
 *
 * Reglas: valida formato de correo y campos obligatorios
 *
 * Módulo / dueño: Sesión
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Mensaje de éxito que manda la pantalla de registro
  const aviso = location.state?.aviso;

  const validar = () => {
    const nuevos = {};
    if (!email.trim()) nuevos.email = "El correo es obligatorio.";
    else if (!EMAIL_REGEX.test(email.trim())) nuevos.email = "Escribe un correo válido.";
    if (!password) nuevos.password = "La contraseña es obligatoria.";
    return nuevos;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    setError("");
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    try {
      const usuario = await login(email.trim(), password);
      const destinoPorDefecto = usuario.rol === "Administrador" ? "/admin" : "/catalogo";
      navigate(location.state?.desde?.pathname || destinoPorDefecto, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__tarjeta">
        <p className="etiqueta">Bienvenido</p>
        <h1 className="auth__titulo">Iniciar sesión</h1>
        <form className="formulario" onSubmit={handleSubmit} noValidate>
          {aviso && <p className="formulario__mensaje formulario__mensaje--exito">{aviso}</p>}
          {error && <p className="formulario__mensaje">{error}</p>}

          <label className="campo">
            <span className="campo__label">Correo electrónico</span>
            <input
              className={errores.email ? "campo__input campo__input--error" : "campo__input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
              autoComplete="email"
            />
            {errores.email && <span className="campo__error">{errores.email}</span>}
          </label>

          <label className="campo">
            <span className="campo__label">Contraseña</span>
            <input
              className={errores.password ? "campo__input campo__input--error" : "campo__input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {errores.password && <span className="campo__error">{errores.password}</span>}
          </label>

          <div className="formulario__acciones">
            <button type="submit" className="btn btn--bloque" disabled={enviando}>
              {enviando ? "Entrando…" : "Entrar"}
            </button>
          </div>
        </form>
        <p className="auth__pie">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
