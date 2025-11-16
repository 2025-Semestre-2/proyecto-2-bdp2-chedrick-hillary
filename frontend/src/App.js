import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Clientes from "./pages/Clientes";
import Proveedores from "./pages/Proveedores";
import Facturas from "./pages/Facturas";
import Estadisticas from "./pages/Estadisticas";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/facturas" element={<Facturas />} />
              <Route path="/estadisticas" element={<Estadisticas />} />
            </Routes>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;
