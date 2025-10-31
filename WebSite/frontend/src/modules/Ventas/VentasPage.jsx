import React, { useState, useEffect, useCallback } from "react";
import VentaDetalleModal from "./VentaDetalleModal.jsx";
import "./VentasPage.css";

function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [filtros, setFiltros] = useState({
    nombreCliente: "",
    fechaInicio: "",
    fechaFin: "",
    montoMin: "",
    montoMax: "",
  });
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const fetchVentas = useCallback(async () => {
    try {
      const params = new URLSearchParams(filtros);
      const response = await fetch(`http://localhost:8080/api/ventas?${params}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${errorText}`);
      }

      const data = await response.json();
      console.log(" Ventas recibidas:", data);
      setVentas(data);
    } catch (error) {
      console.error("Error al obtener ventas:", error.message);
    }
  }, [filtros]);

  useEffect(() => {
    fetchVentas();
  }, [fetchVentas]);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    fetchVentas();
  };

  const handleRestaurar = () => {
    setFiltros({
      nombreCliente: "",
      fechaInicio: "",
      fechaFin: "",
      montoMin: "",
      montoMax: "",
    });
  };

  return (
    <div className="ventas-page">
      <h1>Sales Module</h1>

      {/* Filtros */}
      <div className="filters-container">
        <input
          type="text"
          name="nombreCliente"
          placeholder="Customer Name"
          value={filtros.nombreCliente}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaInicio"
          value={filtros.fechaInicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaFin"
          value={filtros.fechaFin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="montoMin"
          placeholder="Min Amount"
          value={filtros.montoMin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="montoMax"
          placeholder="Max Amount"
          value={filtros.montoMax}
          onChange={handleChange}
        />

        <button onClick={handleBuscar}>Search</button>
        <button className="restore-btn" onClick={handleRestaurar}>
          Restore
        </button>
      </div>

      {/* Tabla de resultados */}
      <table className="ventas-table">
        <thead>
          <tr>
            <th>Invoice No.</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Delivery Method</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length > 0 ? (
            ventas.map((v) => (
              <tr
                key={v.NumeroFactura}
                onClick={() => setVentaSeleccionada(v)}
                className="clickable-row"
              >
                <td>{v.NumeroFactura}</td>
                <td>
                  {v.FechaFactura
                    ? new Date(v.FechaFactura).toLocaleDateString()
                    : "—"}
                </td>
                <td>{v.Cliente}</td>
                <td>{v.MetodoEntrega}</td>
                <td>${v.MontoTotal?.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#999" }}>
                No sales found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de detalle */}
      {ventaSeleccionada && (
        <VentaDetalleModal
          venta={ventaSeleccionada}
          onClose={() => setVentaSeleccionada(null)}
        />
      )}
    </div>
  );
}

export default VentasPage;
