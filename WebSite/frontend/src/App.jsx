import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas principales
import Dashboard from "./pages/Dashboard";

// Clientes
import ClientesList from "./modules/Clientes/ClientesList.jsx";
import ClienteDetalle from "./modules/Clientes/ClienteDetalle.jsx";

// Productos
import ProductosList from "./modules/Productos/ProductosList.jsx";
import ProductoDetalle from "./modules/Productos/ProductoDetalle.jsx";

// Ventas
import VentasPage from "./modules/Ventas/VentasPage.jsx";
import VentaDetalle from "./modules/Ventas/VentaDetalleModal.jsx";

//Estadisticas
import EstadisticasPage from "./modules/Estadisticas/EstadisticasPage.jsx";


// Estilos globales
import "./theme.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard principal (página raíz) */}
        <Route path="/" element={<Dashboard />} />

        {/* Clientes */}
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/clientes/:id" element={<ClienteDetalle />} />

        {/* Productos */}
        <Route path="/productos" element={<ProductosList />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />

        {/* Ventas */}
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/venta/:numeroFactura" element={<VentaDetalle />} />

        {/* Estadísticas */}
        <Route path="/estadisticas" element={<EstadisticasPage />} />

        {/* Ruta por defecto para cualquier otra URL */}
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
