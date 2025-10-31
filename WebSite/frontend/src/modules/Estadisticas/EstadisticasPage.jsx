import React, { useState, useEffect } from "react";
import "./EstadisticasPage.css";

function EstadisticasPage() {
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState("compras");
  const [filtro1, setFiltro1] = useState("");
  const [filtro2, setFiltro2] = useState("");

  const fetchData = async () => {
    try {
      let endpoint = "http://localhost:8080/api/estadisticas/";
      let params = [];

      switch (tipo) {
        case "compras":
          endpoint += "compras";
          if (filtro1) params.push(`proveedor=${filtro1}`);
          if (filtro2) params.push(`categoria=${filtro2}`);
          break;

        case "ventas":
          endpoint += "ventas";
          if (filtro1) params.push(`cliente=${filtro1}`);
          if (filtro2) params.push(`categoria=${filtro2}`);
          break;

        case "top-productos":
          endpoint += "top-productos";
          if (filtro1) params.push(`anio=${filtro1}`);
          break;

        case "top-clientes":
          endpoint += "top-clientes";
          if (filtro1) params.push(`anioInicio=${filtro1}`);
          if (filtro2) params.push(`anioFin=${filtro2}`);
          break;

        case "top-proveedores":
          endpoint += "top-proveedores";
          if (filtro1) params.push(`anioInicio=${filtro1}`);
          if (filtro2) params.push(`anioFin=${filtro2}`);
          break;

        default:
          return;
      }

      if (params.length > 0) endpoint += "?" + params.join("&");

      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipo]);

  const handleClear = () => {
    setFiltro1("");
    setFiltro2("");
    fetchData();
  };

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas del Sistema</h2>

      <div className="estadisticas-filtros">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="compras">Compras por Proveedor</option>
          <option value="ventas">Ventas por Cliente</option>
          <option value="top-productos">Top 5 Productos</option>
          <option value="top-clientes">Top 5 Clientes</option>
          <option value="top-proveedores">Top 5 Proveedores</option>
        </select>

        <input
          type="text"
          placeholder={
            tipo === "top-productos"
              ? "Año"
              : tipo.includes("top")
              ? "Año Inicio"
              : tipo === "ventas"
              ? "Cliente"
              : "Proveedor"
          }
          value={filtro1}
          onChange={(e) => setFiltro1(e.target.value)}
        />

        <input
          type="text"
          placeholder={
            tipo === "top-productos"
              ? ""
              : tipo.includes("top")
              ? "Año Fin"
              : "Categoría"
          }
          value={filtro2}
          onChange={(e) => setFiltro2(e.target.value)}
          disabled={tipo === "top-productos"}
        />

        <button onClick={fetchData}>Buscar</button>
        <button onClick={handleClear}>Limpiar</button>
      </div>

      <table className="estadisticas-table">
        <thead>
          {tipo === "compras" || tipo === "ventas" ? (
            <tr>
              <th>{tipo === "compras" ? "Proveedor" : "Cliente"}</th>
              <th>Categoría</th>
              <th>Máxima</th>
              <th>Mínima</th>
              <th>Promedio</th>
            </tr>
          ) : tipo === "top-productos" ? (
            <tr>
              <th>Año</th>
              <th>Producto</th>
              <th>Ganancia Total</th>
            </tr>
          ) : (
            <tr>
              <th>Año</th>
              <th>{tipo === "top-clientes" ? "Cliente" : "Proveedor"}</th>
              <th>{tipo === "top-clientes" ? "Facturas" : "Órdenes"}</th>
              <th>Monto Total</th>
            </tr>
          )}
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i}>
                {tipo === "compras" || tipo === "ventas" ? (
                  <>
                    <td>{item.Proveedor || item.Cliente}</td>
                    <td>{item.Categoria}</td>
                    <td>{item.CompraMaxima || item.VentaMaxima}</td>
                    <td>{item.CompraMinima || item.VentaMinima}</td>
                    <td>{item.PromedioCompras || item.PromedioVentas}</td>
                  </>
                ) : tipo === "top-productos" ? (
                  <>
                    <td>{item.Anio}</td>
                    <td>{item.Producto}</td>
                    <td>{item.GananciaTotal}</td>
                  </>
                ) : (
                  <>
                    <td>{item.Anio}</td>
                    <td>{item.Cliente || item.Proveedor}</td>
                    <td>{item.CantFacturas || item.CantOrdenes}</td>
                    <td>{item.MontoTotal}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron resultados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EstadisticasPage;
