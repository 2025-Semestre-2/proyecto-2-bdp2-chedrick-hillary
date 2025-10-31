import React from "react";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ onNavigate }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title"> Dashboard</h2>
      <ul className="sidebar-menu">
        <li onClick={() => onNavigate("dashboard")}>
          <FaHome /> <span>Inicio</span>
        </li>
        <li onClick={() => onNavigate("clientes")}>
          <FaUsers /> <span>Clientes</span>
        </li>
        <li onClick={() => onNavigate("productos")}>
          <FaBox /> <span>Inventario</span>
        </li>
        <li onClick={() => onNavigate("proveedores")}>
          <FaTruck /> <span>Proveedores</span>
        </li>
        <li onClick={() => onNavigate("ventas")}>
          <FaShoppingCart /> <span>Ventas</span>
        </li>
        <li onClick={() => onNavigate("estadisticas")}>
          <FaChartBar /> <span>Estadísticas</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
