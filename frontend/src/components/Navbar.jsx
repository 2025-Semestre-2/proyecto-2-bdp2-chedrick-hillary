import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">Wide World Importers</div>

      <div className="menu">
        <Link to="/">Inicio</Link>

        {/* SOLO ADMINISTRADOR */}
        {user?.role === "Administrador" && (
          <>
            <Link to="/productos">Productos</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/proveedores">Proveedores</Link>
            <Link to="/facturas">Facturas</Link>
          </>
        )}

        {/* SOLO CORPORATIVO */}
        {user?.role === "Corporativo" && (
          <>
            <Link to="/estadisticas">Estadísticas</Link>
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
