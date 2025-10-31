import React, { useEffect, useState } from "react";
import ProveedorDetalle from "./ProveedorDetalle";
import "./proveedores.css";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [filteredProveedores, setFilteredProveedores] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchCategoria, setSearchCategoria] = useState("");
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  // Cargar proveedores desde backend
  const fetchProveedores = () => {
    fetch("http://localhost:8080/api/proveedores")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort((a, b) =>
          a.NombreProveedor.localeCompare(b.NombreProveedor)
        );
        setProveedores(ordenados);
        setFilteredProveedores(ordenados);
      })
      .catch((err) => console.error("Error cargando proveedores:", err));
  };

  // Cargar proveedores al montar
  useEffect(() => {
    fetchProveedores();
  }, []);

  // Filtros acumulativos 
  useEffect(() => {
    const filtrados = proveedores.filter((p) => {
      const nombreMatch = p.NombreProveedor.toLowerCase().includes(
        searchNombre.toLowerCase()
      );
      const categoriaMatch = p.Categoria.toLowerCase().includes(
        searchCategoria.toLowerCase()
      );
      return nombreMatch && categoriaMatch;
    });
    setFilteredProveedores(filtrados);
  }, [searchNombre, searchCategoria, proveedores]);

  // Restaurar búsqueda
  const handleReset = () => {
    setSearchNombre("");
    setSearchCategoria("");
    setFilteredProveedores(proveedores);
  };

  return (
    <div className="proveedores-container">
      <h2>Proveedores</h2>

      {/*Barra de búsqueda doble */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchNombre}
          onChange={(e) => setSearchNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por categoría..."
          value={searchCategoria}
          onChange={(e) => setSearchCategoria(e.target.value)}
        />
        <button className="reset" onClick={handleReset}>
          Restaurar
        </button>
        <button onClick={fetchProveedores}>Actualizar lista</button>
      </div>

      {/* Tabla de proveedores */}
      <table className="proveedores-table">
        <thead>
          <tr>
            <th>Nombre del Proveedor</th>
            <th>Categoría</th>
            <th>Método de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {filteredProveedores.map((prov) => (
            <tr
              key={prov.SupplierID}
              onClick={() => setSelectedProveedor(prov)}
              style={{ cursor: "pointer" }}
            >
              <td>{prov.NombreProveedor}</td>
              <td>{prov.Categoria}</td>
              <td>{prov.MetodoEntrega}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  Modal Detalle */}
      {selectedProveedor && (
        <ProveedorDetalle
          proveedor={selectedProveedor}
          onClose={() => {
            setSelectedProveedor(null);
            fetchProveedores();
          }}
        />
      )}
    </div>
  );
};

export default ProveedorList;
