import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">Wide World Importers</div>

      <div className="menu">
        <Link to="/">Inicio</Link>

        {user?.rol === "Admin" && (
          <>
            <Link to="/productos">Productos</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/facturas">Facturas</Link>
          </>
        )}

        {user?.rol === "Corporativo" && (
          <>
            <Link to="/estadisticas">Dashboard</Link>
            <Link to="/inventario">Inventario</Link>
            <Link to="/facturas">Facturas</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/productos">Productos</Link>
          </>
        )}
      </div>

      <button className="logout-btn" onClick={logout}>
        Salir
      </button>
    </nav>
  );
};

export default Navbar;
