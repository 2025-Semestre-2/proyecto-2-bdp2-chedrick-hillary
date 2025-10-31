import React, { useState } from "react";
import "./producto.css";
import ProveedorDetalle from "../Proveedores/ProveedorDetalle";

const ProductoDetalle = ({ producto, onClose }) => {
  const [mostrarProveedor, setMostrarProveedor] = useState(false);
  const [proveedor, setProveedor] = useState(null);

  if (!producto) return null;

  // Función para abrir la ventana del proveedor
  const handleOpenProveedor = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/proveedores/${producto.ProveedorID}`);
      if (!res.ok) throw new Error("Error al obtener el proveedor");
      const data = await res.json();
      setProveedor(data);
      setMostrarProveedor(true);
    } catch (err) {
      console.error("Error al cargar detalle del proveedor:", err);
    }
  };

  // Función para cerrar la ventana del proveedor
  const handleCloseProveedor = () => {
    setMostrarProveedor(false);
    setProveedor(null);
  };

  return (
    <>
      {/* MODAL DEL PRODUCTO */}
      <div className="custom-modal-overlay">
        <div className="custom-modal-dialog">
          <div className="custom-modal-content">
            {/* HEADER */}
            <div className="custom-modal-header">
              <h5 className="modal-title fw-bold">Detalle del Producto</h5>
              <button type="button" className="close-button" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="custom-modal-body">
              <h6 className="section-title">Información general</h6>
              <p>
                <strong>Nombre del producto:</strong>{" "}
                {producto.NombreProducto || "No disponible"}
              </p>

              <p>
                <strong>Proveedor:</strong>{" "}
                {producto.NombreProveedor ? (
                  <button
                    className="link-proveedor"
                    onClick={handleOpenProveedor}
                  >
                    {producto.NombreProveedor}
                  </button>
                ) : (
                  "No disponible"
                )}
              </p>

              <p><strong>Color:</strong> {producto.Color || "No disponible"}</p>
              <p><strong>Unidad de empaquetamiento:</strong> {producto.UnidadEmpaquetamiento || "No disponible"}</p>
              <p><strong>Empaquetamiento:</strong> {producto.Empaquetamiento || "No disponible"}</p>
              <p><strong>Cantidad de empaquetamiento:</strong> {producto.CantidadEmpaque || "No disponible"}</p>
              <p><strong>Marca:</strong> {producto.Marca || "No disponible"}</p>
              <p><strong>Talla / Tamaño:</strong> {producto.Talla || "No disponible"}</p>

              <h6 className="section-title">Detalles de precios</h6>
              <p><strong>Impuesto:</strong> {producto.Impuesto ? `${producto.Impuesto}%` : "No disponible"}</p>
              <p><strong>Precio unitario:</strong> ${parseFloat(producto.PrecioUnitario || 0).toFixed(2)}</p>
              <p><strong>Precio venta:</strong> ${parseFloat(producto.PrecioVenta || 0).toFixed(2)}</p>

              <h6 className="section-title">Detalles adicionales</h6>
              <p><strong>Peso:</strong> {producto.Peso || "No disponible"}</p>
              <p><strong>Palabras clave:</strong> {producto.PalabrasClave || "No disponible"}</p>
              <p><strong>Cantidad disponible:</strong> {producto.CantidadDisponible || "No disponible"}</p>
              <p><strong>Ubicación:</strong> {producto.Ubicacion || "No disponible"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DEL PROVEEDOR (si se abre) */}
      {mostrarProveedor && (
        <ProveedorDetalle proveedor={proveedor} onClose={handleCloseProveedor} />
      )}
    </>
  );
};

export default ProductoDetalle;
