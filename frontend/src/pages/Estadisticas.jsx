import { useEffect, useState } from "react";
import api from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Estadisticas() {
    const [sj, setSJ] = useState([]);
    const [lm, setLM] = useState([]);
    const [topProductos, setTopProductos] = useState([]);
    const [topClientes, setTopClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    ventasSJ,
                    ventasLM,
                    productosTop,
                    clientesTop
                ] = await Promise.all([
                    api.get("/api/estadisticas/ventas/sucursal/SJ"),
                    api.get("/api/estadisticas/ventas/sucursal/LM"),
                    api.get("/api/estadisticas/top-productos"),
                    api.get("/api/estadisticas/clientes-top")
                ]);

                setSJ(ventasSJ.data);
                setLM(ventasLM.data);
                setTopProductos(productosTop.data);
                setTopClientes(clientesTop.data);
            } catch (err) {
                console.error(err);
                setError("Error cargando datos del dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <h2 style={{ padding: 40 }}>Cargando estadísticas...</h2>;
    if (error) return <h2 style={{ padding: 40, color: "red" }}>{error}</h2>;

    const totalSJ = sj.reduce((acc, f) => acc + f.total, 0);
    const totalLM = lm.reduce((acc, f) => acc + f.total, 0);
    const totalConsolidado = totalSJ + totalLM;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard Corporativo</h1>

            {/* TARJETAS */}
            <div className="cards">
                <div className="card">
                    <h3>Total San José</h3>
                    <p>₡{totalSJ.toLocaleString()}</p>
                </div>

                <div className="card">
                    <h3>Total Limón</h3>
                    <p>₡{totalLM.toLocaleString()}</p>
                </div>

                <div className="card">
                    <h3>Total Consolidado</h3>
                    <p>₡{totalConsolidado.toLocaleString()}</p>
                </div>
            </div>

            {/* GRAFICO DE BARRAS */}
            <div style={{ width: "60%", margin: "0 auto" }}>
                <h2>Ventas por Sucursal</h2>
                <Bar
                    data={{
                        labels: ["San José", "Limón"],
                        datasets: [
                            {
                                label: "Ventas",
                                data: [totalSJ, totalLM],
                                backgroundColor: ["#4F46E5", "#10B981"],
                            },
                        ],
                    }}
                />
            </div>

            {/* GRAFICO PIE */}
            <div style={{ width: "40%", margin: "30px auto" }}>
                <h2>Distribución</h2>
                <Pie
                    data={{
                        labels: ["San José", "Limón"],
                        datasets: [
                            {
                                data: [totalSJ, totalLM],
                                backgroundColor: ["#6366F1", "#34D399"],
                            },
                        ],
                    }}
                />
            </div>

            {/* TOP 5 PRODUCTOS */}
            <h2>Top 5 Productos Más Vendidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {topProductos.map((p) => (
                        <tr key={p.idProducto}>
                            <td>{p.nombre}</td>
                            <td>{p.totalVentas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* TOP CLIENTES */}
            <h2>Top Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total Comprado</th>
                    </tr>
                </thead>
                <tbody>
                    {topClientes.map((c) => (
                        <tr key={c.idCliente}>
                            <td>{c.nombre_cliente}</td>
                            <td>₡{Number(c.totalComprado).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
