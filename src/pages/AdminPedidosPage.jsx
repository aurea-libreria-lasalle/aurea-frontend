/*
 * AdminPedidosPage.jsx
 *
 * Qué es: Todos los pedidos, filtro por estado y cambio de estado.
 *
 * Ruta: /admin/pedidos
 *
 * Usa: adminService (GET /api/admin/pedidos?estado= y PUT /api/admin/pedidos/{id}/estado),
 *   EstadoPedido, AdminMenu
 *
 * Reglas: solo ofrece el siguiente estado válido: Pendiente → Pagado → Enviado → Entregado,
 *   o Cancelado
 *
 * Módulo / dueño: Administración
 *
 * Este archivo solo está documentado: el código lo escribe el dueño del módulo.
 */
