/*
 * RegistroPage.jsx
 *
 * Qué es: Registro de cliente: nombre, apellidos, correo, teléfono, contraseña y confirmación.
 *
 * Ruta: /registro
 *
 * Usa: authService (POST /api/auth/registro)
 *
 * Reglas: contraseñas iguales y correo válido antes de enviar
 *
 * Módulo / dueño: Sesión
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_INICIAL = {
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  password: "",
  confirmarPassword: "",
};

function RegistroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validar = () => {
    const nuevos = {};
    if (!form.nombre.trim()) nuevos.nombre = "El nombre es obligatorio.";
    if (!form.apellidos.trim()) nuevos.apellidos = "Los apellidos son obligatorios.";
    if (!form.email.trim()) nuevos.email = "El correo es obligatorio.";
    else if (!EMAIL_REGEX.test(form.email.trim())) nuevos.email = "Escribe un correo válido.";
    if (form.telefono && !/^\d{10}$/.test(form.telefono.trim()))
      nuevos.telefono = "El teléfono debe tener 10 dígitos.";
    if (!form.password) nuevos.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6)
      nuevos.password = "La contraseña debe tener al menos 6 caracteres.";
    if (!form.confirmarPassword) nuevos.confirmarPassword = "Confirma tu contraseña.";
    else if (form.password !== form.confirmarPassword)
      nuevos.confirmarPassword = "Las contraseñas no coinciden.";
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
      await authService.registro({
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        password: form.password,
      });
      navigate("/login", { state: { aviso: "Cuenta creada. Ya puedes iniciar sesión." } });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const clase = (campo) =>
    errores[campo] ? "campo__input campo__input--error" : "campo__input";

  return (
    <div className="auth">
      <div className="auth__tarjeta auth__tarjeta--ancha">
        <p className="etiqueta">Únete</p>
        <h1 className="auth__titulo">Crear cuenta</h1>
        <form className="formulario" onSubmit={handleSubmit} noValidate>
          {error && <p className="formulario__mensaje">{error}</p>}

          <div className="formulario__grid">
            <label className="campo">
              <span className="campo__label">Nombre</span>
              <input className={clase("nombre")} name="nombre" value={form.nombre} onChange={handleChange} autoComplete="given-name" />
              {errores.nombre && <span className="campo__error">{errores.nombre}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Apellidos</span>
              <input className={clase("apellidos")} name="apellidos" value={form.apellidos} onChange={handleChange} autoComplete="family-name" />
              {errores.apellidos && <span className="campo__error">{errores.apellidos}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Correo electrónico</span>
              <input className={clase("email")} type="email" name="email" value={form.email} onChange={handleChange} placeholder="nombre@correo.com" autoComplete="email" />
              {errores.email && <span className="campo__error">{errores.email}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Teléfono (opcional)</span>
              <input className={clase("telefono")} type="tel" name="telefono" value={form.telefono} onChange={handleChange} autoComplete="tel" />
              {errores.telefono && <span className="campo__error">{errores.telefono}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Contraseña</span>
              <input className={clase("password")} type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
              {errores.password && <span className="campo__error">{errores.password}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Confirmar contraseña</span>
              <input className={clase("confirmarPassword")} type="password" name="confirmarPassword" value={form.confirmarPassword} onChange={handleChange} autoComplete="new-password" />
              {errores.confirmarPassword && <span className="campo__error">{errores.confirmarPassword}</span>}
            </label>
          </div>

          <div className="formulario__acciones">
            <button type="submit" className="btn" disabled={enviando}>
              {enviando ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </div>
        </form>
        <p className="auth__pie">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistroPage;
