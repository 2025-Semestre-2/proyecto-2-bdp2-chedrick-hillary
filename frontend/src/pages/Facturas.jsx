import { useState, useEffect } from "react";
import axios from "axios";

export default function Facturas() {
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        axios.get('/api/facturas/consolidado')
            .then(r => setFacturas(r.data));
    }, []);

    return (
        <div>
            <h1>Facturas Consolidadas</h1>
            <table>
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map(f => (
                        <tr key={f.idFactura}>
                            <td>{f.idFactura}</td>
                            <td>{f.fecha}</td>
                            <td>{f.idCliente}</td>
                            <td>{f.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
