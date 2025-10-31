import React, { useEffect, useState } from "react";
import "./clientes.css";
import ClienteDetalle from "./ClienteDetalle.jsx";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroEntrega, setFiltroEntrega] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [detalleCliente, setDetalleCliente] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  // Cargar lista general de clientes
  useEffect(() => {
    fetch("http://localhost:8080/api/clientes")
      .then((res) => res.json())
      .then((data) => {
        const ordenados = data.sort((a, b) =>
          a.NombreCliente.localeCompare(b.NombreCliente)
        );
        setClientes(ordenados);
        setClientesFiltrados(ordenados);
      })
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  // Aplicar filtros acumulativos
  useEffect(() => {
    let filtrados = clientes.filter((c) => {
      return (
        (c.NombreCliente || "")
          .toLowerCase()
          .includes(filtroNombre.toLowerCase()) &&
        (c.Categoria || "")
          .toLowerCase()
          .includes(filtroCategoria.toLowerCase()) &&
        (c.MetodoEntrega || "")
          .toLowerCase()
          .includes(filtroEntrega.toLowerCase())
      );
    });
    setClientesFiltrados(filtrados);
  }, [filtroNombre, filtroCategoria, filtroEntrega, clientes]);

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroCategoria("");
    setFiltroEntrega("");
    setClientesFiltrados(clientes);
  };

  // Cargar detalle completo del cliente desde la BD
  const verDetalleCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setCargandoDetalle(true);

    fetch(`http://localhost:8080/api/clientes/${cliente.CustomerID}`)
      .then((res) => res.json())
      .then((data) => {
        setDetalleCliente(data);
        setCargandoDetalle(false);
      })
      .catch((err) => {
        console.error("Error al obtener detalle del cliente:", err);
        setCargandoDetalle(false);
      });
  };

  // Cerrar modal
  const cerrarModal = () => {
    setClienteSeleccionado(null);
    setDetalleCliente(null);
  };

  return (
    <div className="clientes-page">
      <h2 className="titulo">Gestión de Clientes</h2>

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por categoría..."
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por método de entrega..."
          value={filtroEntrega}
          onChange={(e) => setFiltroEntrega(e.target.value)}
        />
        <button className="btn-limpiar" onClick={limpiarFiltros}>
          Restaurar
        </button>
      </div>

      {/* Tabla de clientes */}
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nombre del Cliente</th>
            <th>Categoría</th>
            <th>Método de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <tr
                key={cliente.CustomerID}
                onClick={() => verDetalleCliente(cliente)}
                className="fila-clickable"
              >
                <td>{cliente.NombreCliente}</td>
                <td>{cliente.Categoria}</td>
                <td>{cliente.MetodoEntrega}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No se encontraron clientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal con información desde la base de datos */}
      {clienteSeleccionado && (
        <>
          {cargandoDetalle ? (
            <div className="modal">
              <div className="modal-content">
                <p>Cargando detalle del cliente...</p>
              </div>
            </div>
          ) : (
            detalleCliente && (
              <ClienteDetalle
                cliente={detalleCliente}
                onClose={cerrarModal}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
