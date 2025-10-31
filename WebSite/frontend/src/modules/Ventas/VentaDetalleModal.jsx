import React, { useEffect, useState } from "react";
import "./VentaDetalleModal.css";

function VentaDetalleModal({ venta, onClose }) {
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      if (!venta?.NumeroFactura) {
        console.error(" No se recibió un número de factura válido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/ventas/${venta.NumeroFactura}`);

        if (!res.ok) throw new Error("No se pudo cargar el detalle");
        const data = await res.json();
        setDetalles(data);
      } catch (error) {
        console.error(" Error al obtener detalle de venta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [venta]);

  const totalVenta = detalles.reduce((acc, d) => acc + (d.TotalLinea || 0), 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sale Details – Invoice #{venta.NumeroFactura}</h2>
        <p><strong>Customer:</strong> {venta.Cliente}</p>
        <p>
          <strong>Date:</strong>{" "}
          {venta.FechaFactura ? new Date(venta.FechaFactura).toLocaleDateString() : "—"}
        </p>
        <p><strong>Delivery Method:</strong> {venta.MetodoEntrega}</p>

        {loading ? (
          <p>Loading...</p>
        ) : detalles.length > 0 ? (
          <>
            <table className="detalle-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.Producto}</td>
                    <td>{d.Cantidad}</td>
                    <td>${d.PrecioUnitario?.toFixed(2)}</td>
                    <td>${d.TotalLinea?.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="3"><strong>Total</strong></td>
                  <td><strong>${totalVenta.toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>No details available.</p>
        )}

        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default VentaDetalleModal;
