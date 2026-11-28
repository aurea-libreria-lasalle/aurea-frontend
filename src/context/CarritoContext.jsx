/*
 * CarritoContext.jsx
 *
 * Qué es: Carrito global: artículos y contador del Header.
 *
 * Usa: carritoService; el carrito vive en la API
 *
 * Reglas: se recarga al iniciar sesión y se limpia al cerrarla; exporta el hook useCarrito
 *
 * Módulo / dueño: Catálogo y carrito
 *
 * PLACEHOLDER de la parte 1 para que el Header compile: solo expone cantidad = 0.
 * El dueño de Catálogo y carrito reemplaza este archivo conservando { cantidad } en el value.
 */

import { createContext, useContext } from "react";

const CarritoContext = createContext({ cantidad: 0 });

export function CarritoProvider({ children }) {
  return (
    <CarritoContext.Provider value={{ cantidad: 0 }}>{children}</CarritoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  return useContext(CarritoContext);
}
