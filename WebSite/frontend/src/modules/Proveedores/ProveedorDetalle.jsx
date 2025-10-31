import React from "react";
import "./ProveedorDetalle.css";

const ProveedorDetalle = ({ proveedor, onClose }) => {
  if (!proveedor) return null;

  // Extraer latitud/longitud si vienen dentro de "Ubicacion"
  const lat = proveedor.Ubicacion?.points?.[0]?.lat;
  const lng = proveedor.Ubicacion?.points?.[0]?.lng;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-dialog">
        <div className="custom-modal-content">
          {/* HEADER */}
          <div className="custom-modal-header">
            <h5 className="modal-title fw-bold">Detalle del Proveedor</h5>
            <button type="button" className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="custom-modal-body">
            <p><strong>Código del Proveedor:</strong> {proveedor.SupplierID}</p>
            <p><strong>Nombre:</strong> {proveedor.NombreProveedor}</p>
            <p><strong>Categoría:</strong> {proveedor.Categoria}</p>

            <h6 className="section-title">Contactos</h6>
            <p><strong>Contacto Primario:</strong> {proveedor.ContactoPrimario || "No disponible"}</p>
            <p><strong>Contacto Alternativo:</strong> {proveedor.ContactoAlternativo || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {proveedor.Telefono || "No disponible"}</p>
            <p><strong>Fax:</strong> {proveedor.Fax || "No disponible"}</p>
            <p>
              <strong>Sitio Web:</strong>{" "}
              {proveedor.SitioWeb ? (
                <a href={proveedor.SitioWeb} target="_blank" rel="noreferrer">
                  {proveedor.SitioWeb}
                </a>
              ) : (
                "No disponible"
              )}
            </p>

            <h6 className="section-title">Ubicación</h6>
            <p><strong>Ciudad de Entrega:</strong> {proveedor.CiudadEntrega || "No disponible"}</p>
            <p><strong>Código Postal:</strong> {proveedor.CodigoPostal || "No disponible"}</p>
            <p><strong>Dirección de Entrega:</strong> {proveedor.DireccionEntrega || "No disponible"}</p>
            <p><strong>Dirección Postal:</strong> {proveedor.DireccionPostal || "No disponible"}</p>

            {/* Mostrar mapa si existen coordenadas */}
            {lat && lng ? (
              <iframe
                title="Mapa del proveedor"
                width="100%"
                height="250"
                className="map-frame"
                src={`https://www.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`}
              ></iframe>
            ) : (
              <p>No hay ubicación disponible.</p>
            )}

            <h6 className="section-title">Finanzas</h6>
            <p><strong>Nombre del Banco:</strong> {proveedor.NombreBanco || "No disponible"}</p>
            <p><strong>Sucursal del Banco:</strong> {proveedor.SucursalBanco || "No disponible"}</p>
            <p><strong>Número de Cuenta Corriente:</strong> {proveedor.NumeroCuenta || "No disponible"}</p>
            <p><strong>Días de Gracia para Pagar:</strong> {proveedor.DiasPago ? `${proveedor.DiasPago} días` : "No disponible"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorDetalle;
