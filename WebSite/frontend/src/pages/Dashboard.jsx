import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Clientes from "../modules/Clientes/ClientesList.jsx";
import ProductosList from "../modules/Productos/ProductosList.jsx";
import Proveedores from "../modules/Proveedores/ProveedorList.jsx";
import VentasList from "../modules/Ventas/VentasPage.jsx";
import EstadisticasPage from "../modules/Estadisticas/EstadisticasPage.jsx";
import "../theme.css";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "clientes":
        return <Clientes />;
      case "productos":
        return <ProductosList />;
      case "proveedores":
        return <Proveedores />;
      case "ventas":
        return <VentasList />;
      case "estadisticas":
        return <EstadisticasPage />;
      default:
        return (
          <div className="welcome-container">
            <h1 className="welcome-title">Bienvenido al Panel Principal</h1>
            <p className="welcome-subtitle">
              Usa el menú lateral para acceder a los módulos del sistema.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar onNavigate={setPage} currentPage={page} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Proyecto 1</h1>
        </header>
        <section className="dashboard-content">{renderPage()}</section>
      </main>
    </div>
  );
}

export default Dashboard;
