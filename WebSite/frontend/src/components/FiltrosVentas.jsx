import React, { useEffect, useState } from 'react';
import FiltrosVentas from '../components/FiltrosVentas';
import { useNavigate } from 'react-router-dom';

const VentasPage = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  const fetchVentas = async (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString();
    const res = await fetch(`http://localhost:8080/api/ventas?${params}`);
    const data = await res.json();
    setVentas(data);
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="ventas-page">
      <h2>Consulta de Ventas</h2>
      <FiltrosVentas onFilter={fetchVentas} onReset={() => fetchVentas()} />
      <table>
        <thead>
          <tr>
            <th>N° Factura</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Método de entrega</th>
            <th>Monto total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
            <tr key={v.NumeroFactura} onClick={() => navigate(`/venta/${v.NumeroFactura}`)}>
              <td>{v.NumeroFactura}</td>
              <td>{new Date(v.FechaFactura).toLocaleDateString()}</td>
              <td>{v.Cliente}</td>
              <td>{v.MetodoEntrega}</td>
              <td>{v.MontoTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasPage;
