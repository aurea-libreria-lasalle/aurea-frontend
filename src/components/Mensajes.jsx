/*
 * Mensajes.jsx
 *
 * Qué es: Los tres mensajes de estado de cualquier pantalla con API: cargando, error (con Reintentar) y sin datos.
 *
 * Recibe (props): cargando, error, vacio, el texto de cada caso y onReintentar
 *
 * Uso:
 *   <Mensajes cargando={cargando} error={error} vacio={lista.length === 0}
 *     tituloVacio="Tu carrito está vacío" textoVacio="Cada estante empieza con un libro."
 *     enlaceVacio={{ to: "/catalogo", texto: "Explorar catálogo" }}
 *     onReintentar={recargar} />
 *   Regresa null si no aplica ningún caso (se pinta la lista normal).
 *
 * Módulo / dueño: Pieza compartida (cambios con aprobación de 2 integrantes)
 */

import { Link } from "react-router-dom";

function Mensajes({
  cargando,
  error,
  vacio,
  textoCargando = "Cargando…",
  tituloError = "No pudimos cargar la información",
  tituloVacio = "No hay nada por aquí",
  textoVacio,
  enlaceVacio,
  onReintentar,
}) {
  if (cargando) {
    return (
      <div className="mensaje" role="status">
        <div className="spinner" />
        <p className="mensaje__titulo">{textoCargando}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mensaje mensaje--error" role="alert">
        <p className="mensaje__titulo">{tituloError}</p>
        <p className="mensaje__texto">{error}</p>
        {onReintentar && (
          <button
            type="button"
            className="btn btn--secundario btn--chico"
            onClick={onReintentar}
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (vacio) {
    return (
      <div className="mensaje mensaje--vacio">
        <p className="mensaje__titulo">{tituloVacio}</p>
        {textoVacio && <p className="mensaje__texto">{textoVacio}</p>}
        {enlaceVacio && (
          <Link to={enlaceVacio.to} className="btn">
            {enlaceVacio.texto}
          </Link>
        )}
      </div>
    );
  }

  return null;
}

export default Mensajes;
