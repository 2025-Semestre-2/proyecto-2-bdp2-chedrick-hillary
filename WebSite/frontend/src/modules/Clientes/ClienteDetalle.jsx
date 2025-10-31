import React from 'react';
import './ClienteDetalleModal.css';

const ClienteDetalle = ({ cliente, onClose }) => {
  if (!cliente) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Detalle del Cliente</h2>

        <p><strong>ID Cliente:</strong> {cliente.IDCliente}</p>
        <p><strong>Nombre:</strong> {cliente.NombreCliente}</p>
        <p><strong>Categoría:</strong> {cliente.Categoria}</p>
        <p><strong>Grupo de Compra:</strong> {cliente.GrupoCompra || 'No especificado'}</p>

        <h3>Contactos</h3>
        <p><strong>Teléfono (Primario):</strong> {cliente.Telefono}</p>
        <p><strong>Fax (Alternativo):</strong> {cliente.Fax || 'No disponible'}</p>

        <p><strong>Cliente para Facturar (BillToCustomerID):</strong> {cliente.ClienteFacturar}</p>
        <p><strong>Método de Entrega:</strong> {cliente.MetodoEntrega}</p>
        <p><strong>Ciudad de Entrega:</strong> {cliente.CiudadEntrega}</p>
        <p><strong>Código Postal:</strong> {cliente.CodigoPostal}</p>
        <p><strong>Días de Gracia para Pagar:</strong> {cliente.DiasPago}</p>

        <p>
          <strong>Sitio Web:</strong>{' '}
          <a href={cliente.SitioWeb} target="_blank" rel="noopener noreferrer">
            {cliente.SitioWeb}
          </a>
        </p>

        <h3>Dirección</h3>
        <p><strong>Dirección de Entrega:</strong> {cliente.DireccionEntrega}</p>
        <p><strong>Dirección Postal:</strong> {cliente.DireccionPostal}</p>

        <h3>Ubicación</h3>
        <p><strong>Latitud:</strong> {cliente.Latitud}</p>
        <p><strong>Longitud:</strong> {cliente.Longitud}</p>

        {cliente.Latitud && cliente.Longitud && (
          <iframe
            title="Ubicación del cliente"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '10px' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${cliente.Latitud},${cliente.Longitud}&output=embed`}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default ClienteDetalle;
