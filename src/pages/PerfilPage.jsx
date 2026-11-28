/*
 * PerfilPage.jsx
 *
 * Qué es: Consulta y edición de los datos del cliente.
 *
 * Ruta: /perfil (requiere sesión)
 *
 * Usa: authService (GET y PUT /api/auth/perfil)
 *
 * Módulo / dueño: Sesión
 */

import { useEffect, useState } from "react";
import Mensajes from "../components/Mensajes";
import { useAuth } from "../context/AuthContext";
import * as authService from "../services/authService";

function PerfilPage() {
  const { usuario, actualizarUsuario } = useAuth();
  const [form, setForm] = useState({ nombre: "", apellidos: "", email: "", telefono: "" });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null); // { texto, exito }
  const [guardando, setGuardando] = useState(false);

  // Cambiar "intento" vuelve a pedir el perfil (botón Reintentar)
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    authService
      .obtenerPerfil()
      .then((perfil) => {
        if (cancelado) return;
        setForm({
          nombre: perfil.nombre ?? "",
          apellidos: perfil.apellidos ?? "",
          email: perfil.email ?? "",
          telefono: perfil.telefono ?? "",
        });
        setError("");
      })
      .catch((err) => !cancelado && setError(err.message))
      .finally(() => !cancelado && setCargando(false));
    return () => {
      cancelado = true;
    };
  }, [intento]);

  const handleReintentar = () => {
    setCargando(true);
    setError("");
    setIntento(intento + 1);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validar = () => {
    const nuevos = {};
    if (!form.nombre.trim()) nuevos.nombre = "El nombre es obligatorio.";
    if (!form.apellidos.trim()) nuevos.apellidos = "Los apellidos son obligatorios.";
    if (form.telefono && !/^\d{10}$/.test(form.telefono.trim()))
      nuevos.telefono = "El teléfono debe tener 10 dígitos.";
    return nuevos;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    setMensaje(null);
    if (Object.keys(nuevos).length > 0) return;

    setGuardando(true);
    try {
      const datos = {
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        telefono: form.telefono.trim(),
      };
      await authService.actualizarPerfil(datos);
      // Mantiene el nombre actualizado en la sesión guardada
      actualizarUsuario({ ...usuario, nombre: datos.nombre, apellidos: datos.apellidos });
      setMensaje({ texto: "Tus datos se guardaron.", exito: true });
    } catch (err) {
      setMensaje({ texto: err.message, exito: false });
    } finally {
      setGuardando(false);
    }
  };

  const clase = (campo) =>
    errores[campo] ? "campo__input campo__input--error" : "campo__input";

  return (
    <section className="pagina">
      <div className="pagina__encabezado">
        <p className="etiqueta">Mi cuenta</p>
        <h1 className="pagina__titulo">Mis datos</h1>
      </div>

      <Mensajes
        cargando={cargando}
        error={error}
        textoCargando="Cargando tus datos…"
        onReintentar={handleReintentar}
      />

      {!cargando && !error && (
        <form className="formulario" onSubmit={handleSubmit} noValidate>
          {mensaje && (
            <p className={mensaje.exito ? "formulario__mensaje formulario__mensaje--exito" : "formulario__mensaje"}>
              {mensaje.texto}
            </p>
          )}

          <div className="formulario__grid">
            <label className="campo">
              <span className="campo__label">Nombre</span>
              <input className={clase("nombre")} name="nombre" value={form.nombre} onChange={handleChange} />
              {errores.nombre && <span className="campo__error">{errores.nombre}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Apellidos</span>
              <input className={clase("apellidos")} name="apellidos" value={form.apellidos} onChange={handleChange} />
              {errores.apellidos && <span className="campo__error">{errores.apellidos}</span>}
            </label>

            <label className="campo">
              <span className="campo__label">Correo electrónico</span>
              <input className="campo__input" value={form.email} disabled />
              <span className="campo__ayuda">El correo no se puede cambiar.</span>
            </label>

            <label className="campo">
              <span className="campo__label">Teléfono</span>
              <input className={clase("telefono")} type="tel" name="telefono" value={form.telefono} onChange={handleChange} />
              {errores.telefono && <span className="campo__error">{errores.telefono}</span>}
            </label>
          </div>

          <div className="formulario__acciones">
            <button type="submit" className="btn" disabled={guardando}>
              {guardando ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default PerfilPage;
