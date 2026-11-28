/*
 * App.jsx
 *
 * Qué es: Las rutas de la app (React Router).
 *
 * Estructura: las páginas del cliente van dentro de Layout (Header + main + Footer); las del
 *   panel admin no llevan Header ni Footer porque traen su propio AdminMenu.
 *
 * Rutas públicas: /login, /registro, /catalogo, /producto/:id
 * Rutas con sesión (RutaPrivada): /carrito, /checkout, /direcciones, /mis-pedidos,
 *   /mis-pedidos/:id, /perfil
 * Rutas de administrador (RutaAdmin): /admin, /admin/productos, /admin/categorias, /admin/pedidos
 *
 * Módulo / dueño: Pieza compartida (cambios con aprobación de 2 integrantes)
 */

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RutaAdmin from "./components/RutaAdmin";
import RutaPrivada from "./components/RutaPrivada";
import AdminCategoriasPage from "./pages/AdminCategoriasPage";
import AdminPedidosPage from "./pages/AdminPedidosPage";
import AdminProductosPage from "./pages/AdminProductosPage";
import AdminResumenPage from "./pages/AdminResumenPage";
import CarritoPage from "./pages/CarritoPage";
import CatalogoPage from "./pages/CatalogoPage";
import CheckoutPage from "./pages/CheckoutPage";
import DireccionesPage from "./pages/DireccionesPage";
import LoginPage from "./pages/LoginPage";
import MisPedidosPage from "./pages/MisPedidosPage";
import NotFoundPage from "./pages/NotFoundPage";
import PedidoDetallePage from "./pages/PedidoDetallePage";
import PerfilPage from "./pages/PerfilPage";
import ProductoDetallePage from "./pages/ProductoDetallePage";
import RegistroPage from "./pages/RegistroPage";

function Layout() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/catalogo" replace />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductoDetallePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route element={<RutaPrivada />}>
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/direcciones" element={<DireccionesPage />} />
          <Route path="/mis-pedidos" element={<MisPedidosPage />} />
          <Route path="/mis-pedidos/:id" element={<PedidoDetallePage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<RutaAdmin />}>
        <Route path="/admin" element={<AdminResumenPage />} />
        <Route path="/admin/productos" element={<AdminProductosPage />} />
        <Route path="/admin/categorias" element={<AdminCategoriasPage />} />
        <Route path="/admin/pedidos" element={<AdminPedidosPage />} />
      </Route>
    </Routes>
  );
}

export default App;
