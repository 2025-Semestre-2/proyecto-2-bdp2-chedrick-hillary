import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventario() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('/api/inventario/consolidado')
            .then(r => setItems(r.data));
    }, []);

    return (
        <div>
            <h1>Inventario Consolidado</h1>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i.idProducto}>
                            <td>{i.nombre}</td>
                            <td>{i.totalCantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
