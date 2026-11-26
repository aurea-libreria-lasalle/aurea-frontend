# Guía de clases CSS — Áurea

Los estilos ya están hechos en `src/index.css` (variables y base) y `src/App.css` (componentes). Ustedes solo ponen `className` en el JSX con los nombres de esta guía.

## Reglas

- **No escriban CSS nuevo ni `style={{ }}` en los componentes.** Si falta una clase, pídanla y se agrega a `App.css`, para que todo se vea igual.
- **Las clases se combinan:** primero la base y luego la variante, por ejemplo `className="btn btn--dorado"`.
- **Un botón deshabilitado** se marca con el atributo `disabled`, no con una clase. El CSS ya lo pinta gris.
- **Para clases que cambian según un dato**, como el estado de un pedido, armen el nombre con template string: `` className={`estado estado--${estado.toLowerCase()}`} ``.
- **Formato de los nombres:** `bloque__elemento--variante`, en español. `producto-card` es el bloque, `__titulo` una parte de él y `--activo` una variante.

Abajo, cada componente con su estructura. La sangría indica qué va dentro de qué; `elemento.clase` significa "esta etiqueta con esta clase".

---

## Estructura general (`App.jsx`)

```
div.app
  Header
  main.app__main
    (aquí van las rutas)
  Footer
```

Cada página del cliente:

```
section.pagina
  div.pagina__encabezado
    p.etiqueta                 texto chico dorado en mayúsculas (opcional)
    h1.pagina__titulo
    p.pagina__subtitulo        (opcional)
  ...contenido
```

Página con contenido + caja lateral (Carrito, Checkout):

```
div.dos-columnas
  div.dos-columnas__principal
  aside.dos-columnas__lateral
```

## Utilidades (`index.css`)

| Clase | Para qué |
| --- | --- |
| `contenedor` | Centra y limita el ancho a 1200 px |
| `etiqueta` | Texto chico dorado en mayúsculas espaciadas |
| `linea-dorada` | Línea decorativa de 120 px (úsenla en un `<hr>`) |
| `precio` | Precio en serif borgoña |
| `texto-secundario` | Texto gris de 14 px |
| `solo-lector` | Oculta un texto visualmente pero lo deja para lectores de pantalla (ej. el label del buscador) |

## Header y Footer

```
header.header
  div.header__contenido
    Link.header__logo                     "ÁUREA"
    nav.header__nav
      NavLink.header__enlace              agrega header__enlace--activo a la ruta actual
      button.header__boton                "Cerrar sesión"
      Link.header__carrito                "Carrito"
        span.header__contador             número de artículos

footer.footer
  div.footer__contenido
    span.footer__logo
    span                                  texto
```

## Botones

| Clase | Cuándo |
| --- | --- |
| `btn` | Acción principal (fondo tinta) |
| `btn btn--secundario` | Acción secundaria con contorno (Ver detalle, Cancelar, Reintentar) |
| `btn btn--dorado` | Solo la acción final de una pantalla (Confirmar pedido) |
| `btn btn--peligro` | Eliminar, cancelar pedido |
| `btn btn--claro` | Botón sobre fondo oscuro (dentro de `resumen`) |
| `btn--chico` | Se suma a cualquiera para hacerlo más bajo |
| `btn--bloque` | Se suma para que ocupe todo el ancho |
| `btn-texto` | Acción que parece enlace (Editar, Seguir comprando) |
| `btn-texto btn-texto--peligro` | Enlace rojo (Eliminar, Desactivar) |

`btn` también funciona en un `<Link>`.

## Formularios

```
form.formulario
  p.formulario__mensaje                   error de la API; con formulario__mensaje--exito si salió bien
  div.formulario__grid                    (opcional) campos en 2 columnas
    label.campo
      span.campo__label
      input.campo__input                  agrega campo__input--error si no es válido
      span.campo__error                   mensaje de validación (solo si hay error)
      span.campo__ayuda                   texto de ayuda (opcional)
    label.campo.campo--completo           ocupa las 2 columnas del grid
  label.campo.campo--check                checkbox con su texto
    input[type=checkbox]
    texto
  div.formulario__acciones
    button.btn
```

`campo__input` sirve igual para `<input>`, `<select>` y `<textarea>`.

## Mensajes (cargando, error, sin datos)

```
div.mensaje                               cargando
  div.spinner
  p.mensaje__titulo

div.mensaje.mensaje--error                error
  p.mensaje__titulo
  p.mensaje__texto
  button.btn.btn--secundario.btn--chico   "Reintentar"

div.mensaje.mensaje--vacio                sin datos (ya trae la línea dorada arriba)
  p.mensaje__titulo
  p.mensaje__texto
  Link.btn                                (opcional) "Explorar catálogo"
```

## Catálogo y Filtros

```
section.pagina
  div.catalogo__encabezado
    div.catalogo__intro
      p.etiqueta
      h1
      hr.linea-dorada
      p.pagina__subtitulo
  div.filtros                             (componente Filtros)
    div.filtros__categorias
      button.filtros__chip                agrega filtros__chip--activo a la categoría elegida
    label.campo.filtros__buscador
      span.solo-lector
      input.campo__input
    p.filtros__conteo                     "8 libros"
  div.grid-productos
    ProductoCard ...
```

## ProductoCard

```
article.producto-card
  Link.producto-card__portada             enlace al detalle
    img.producto-card__imagen             src = imagenUrl
    span.producto-card__sello             "Agotado" (solo si stock 0 o inactivo)
  p.producto-card__categoria
  h3.producto-card__titulo
    Link                                  nombre del libro
  p.producto-card__descripcion            se corta sola a 2 líneas
  p.producto-card__precio
  button.btn.btn--bloque                  disabled si no hay stock ("Sin stock")
```

## Detalle de libro y Cantidad

```
div.detalle
  div.detalle__portada
    img
  div.detalle__info
    p.etiqueta                            categoría
    h1.detalle__titulo
    hr.linea-dorada
    p.detalle__precio
    p.detalle__stock                      agrega detalle__stock--agotado si no hay
    p.detalle__descripcion
    div.detalle__acciones
      div.cantidad
      button.btn

div.cantidad                              (también en CarritoItem)
  button.cantidad__boton                  "−"  disabled en 1
  span.cantidad__valor
  button.cantidad__boton                  "+"  disabled al llegar al stock
```

## Carrito y ResumenCompra

```
div.dos-columnas
  div.dos-columnas__principal.carrito__lista
    div.carrito-item                      (componente CarritoItem)
      img.carrito-item__portada
      div.carrito-item__info
        p.carrito-item__titulo
        p.carrito-item__meta              "$459.00 c/u"
        button.btn-texto.btn-texto--peligro   "Eliminar"
      div.cantidad
      p.carrito-item__subtotal
  aside.dos-columnas__lateral.resumen     (componente ResumenCompra)
    p.resumen__titulo                     "Resumen"
    div.resumen__fila                     dos <span>: texto y monto
    div.resumen__fila.resumen__fila--gratis   cuando el envío es $0 (pinta el monto dorado)
    p.resumen__aviso                      "Te faltan <strong>$211.00</strong> para envío gratis"
    div.resumen__separador
    div.resumen__total
      span                                "Total"
      span.resumen__total-valor
    button.btn.btn--claro.btn--bloque     "Continuar al pago"
    Link.btn-texto                        "Seguir comprando"
```

## Checkout (opciones de dirección y de pago)

```
div.checkout__seccion
  h2
  div.opciones
    label.opcion                          agrega opcion--seleccionada a la elegida
      input[type=radio]
      span
        span.opcion__titulo
        span.opcion__texto
```

## Direcciones

```
div.direcciones__lista
  div.direccion-card                      agrega direccion-card--predeterminada a la predeterminada
    span.insignia                         "Predeterminada" (solo en esa)
    p                                     calle y número
    p.texto-secundario                    colonia, ciudad, CP
    div.direccion-card__acciones
      button.btn-texto                    "Editar" / "Marcar predeterminada"
      button.btn-texto.btn-texto--peligro "Eliminar"
```

El formulario de dirección usa las clases de **Formularios** con `formulario__grid`.

## Pedidos y EstadoPedido

```
div.pedidos__lista
  Link.pedido-card                        (componente PedidoCard)
    div
      p.pedido-card__folio
      p.pedido-card__fecha
    span.estado.estado--pendiente         (componente EstadoPedido)
    p.pedido-card__total

div.pedido-detalle__datos                 cuadrícula de datos en el detalle (fecha, dirección, método de pago)
```

Variantes de `estado`: `estado--pendiente`, `estado--pagado`, `estado--enviado`, `estado--entregado`, `estado--cancelado`.

## Tablas (admin y detalle de pedido)

```
div.tabla-contenedor                      hace scroll horizontal en celular
  table.tabla
    thead > tr > th                       agrega tabla__numero a columnas de números
    tbody
      tr                                  agrega tabla__fila--inactiva a productos desactivados
        td.tabla__numero
        td
          div.tabla__acciones
            button.btn-texto
```

## Login, Registro y 404

```
div.auth
  div.auth__tarjeta                       agrega auth__tarjeta--ancha en Registro
    p.etiqueta
    h1.auth__titulo
    form.formulario
    p.auth__pie                           "¿No tienes cuenta? <Link>Regístrate</Link>"

div.no-encontrado
  p.no-encontrado__codigo                 "404"
  h2
  Link.btn.btn--secundario
```

## Panel de administración

Las páginas admin no usan `Header` ni `Footer`, sino esta estructura:

```
div.admin
  nav.admin-menu                          (componente AdminMenu)
    Link.admin-menu__logo
    p.admin-menu__subtitulo               "Administración"
    NavLink.admin-menu__enlace            agrega admin-menu__enlace--activo a la actual
    button.admin-menu__enlace.admin-menu__enlace--salir   "Cerrar sesión"
  main.admin__contenido
    div.admin__encabezado
      h1
      button.btn                          (opcional) "Nuevo libro"
    ...contenido
```

Resumen:

```
div.kpis
  div.kpi                                 agrega kpi--alerta al de stock bajo
    p.kpi__etiqueta
    p.kpi__valor
```

Filtros arriba de una tabla y formulario de crear/editar:

```
div.barra-herramientas
  label.campo
    span.campo__label
    select.campo__input

div.panel                                 caja donde aparece ProductoForm o CategoriaForm
  h2
  form.formulario
```

## Responsivo

Ya está resuelto en `App.css` (cortes a 768 px y 480 px): el header se acomoda, el menú admin pasa arriba, las tarjetas bajan a 2 columnas en celular, las tablas hacen scroll y los formularios de 2 columnas pasan a 1. Pruébenlo con DevTools (Ctrl+Shift+M).
