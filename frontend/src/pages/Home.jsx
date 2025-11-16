import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido</h1>

      {/* Mostrar rol en lugar de username */}
      {user && (
        <h3>Has iniciado sesión como: {user.role}</h3>
      )}

      {/* Contenido según rol */}

      {user?.role === "Administrador" && (
        <p>Puedes gestionar productos, clientes, proveedores y facturas.</p>
      )}

      {user?.role === "Corporativo" && (
        <p>Puedes consultar estadísticas por sucursal o consolidadas.</p>
      )}
    </div>
  );
};

export default Home;
