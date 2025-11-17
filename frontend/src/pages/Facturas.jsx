import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useEffect, useState } from "react";

export default function Facturas() {
    const { user } = useAuth();
    const [facturas, setFacturas] = useState([]);

    // Traducir idSucursal -> código del backend
    const sucMap = {
        1: "SJ",
        2: "LM"
    };

    useEffect(() => {
        if (!user || user.rol !== "Admin") return;

        const sucursal = sucMap[user.idsucursal];

        api.get(`/api/facturas/${sucursal}`)
            .then(r => setFacturas(r.data))
            .catch(err => console.error(err));
    }, [user]);

    if (!user) return <h2>No autenticado</h2>;
    if (user.rol !== "Admin") return <h2>No tiene permisos</h2>;

    return (
        <div>
            <h1>Facturas de Sucursal {sucMap[user.idsucursal]}</h1>
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
                            <td>{new Date(f.fecha).toLocaleString()}</td>
                            <td>{f.idCliente}</td>
                            <td>{f.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
