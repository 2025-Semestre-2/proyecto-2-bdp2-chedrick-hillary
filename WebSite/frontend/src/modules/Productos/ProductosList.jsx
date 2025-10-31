import React, { useEffect, useState } from "react";
import ProductoDetalle from "./ProductoDetalle";
import "./producto.css";

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [selectedProducto, setSelectedProducto] = useState(null);

  // Cargar productos desde backend
  const fetchProductos = () => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort((a, b) =>
          a.NombreProducto.localeCompare(b.NombreProducto)
        );
        setProductos(ordenados);
        setFilteredProductos(ordenados);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtros acumulativos
  useEffect(() => {
    const filtrados = productos.filter((p) => {
      const nombreMatch = p.NombreProducto.toLowerCase().includes(searchNombre.toLowerCase());
      const colorMatch = (p.Color || "").toLowerCase().includes(searchColor.toLowerCase());
      return nombreMatch && colorMatch;
    });
    setFilteredProductos(filtrados);
  }, [searchNombre, searchColor, productos]);

  // Restaurar búsqueda
  const handleReset = () => {
    setSearchNombre("");
    setSearchColor("");
    setFilteredProductos(productos);
  };

  return (
    <div className="productos-container">
      <h2>Productos</h2>

      {/* Barra de búsqueda doble */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchNombre}
          onChange={(e) => setSearchNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por color..."
          value={searchColor}
          onChange={(e) => setSearchColor(e.target.value)}
        />
        <button className="reset" onClick={handleReset}>
          Restaurar
        </button>
        <button onClick={fetchProductos}>Actualizar lista</button>
      </div>

      {/* Tabla de productos */}
      <table className="productos-table">
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Color</th>
            <th>Precio Unitario</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((prod) => (
            <tr
              key={prod.StockItemID}
              onClick={() => setSelectedProducto(prod)}
              style={{ cursor: "pointer" }}
            >
              <td>{prod.NombreProducto}</td>
              <td>{prod.Color || "No disponible"}</td>
              <td>${parseFloat(prod.PrecioUnitario || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detalle */}
      {selectedProducto && (
        <ProductoDetalle
          producto={selectedProducto}
          onClose={() => {
            setSelectedProducto(null);
            fetchProductos();
          }}
        />
      )}
    </div>
  );
};

export default ProductosList;
