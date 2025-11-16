import { useState } from "react";
import api from "../services/api";

export default function Estadisticas() {
  const [stats, setStats] = useState(null);

  const load = async (tipo) => {
    const res = await api.get(`/estadisticas?filtro=${tipo}`);
    setStats(res.data);
  };

  return (
    <div>
      <h1>Estadísticas</h1>

      <button className="btn-primary" onClick={() => load("sucursal")}>
        Por sucursal
      </button>

      <button className="btn-secondary" onClick={() => load("consolidado")}>
        Consolidado
      </button>

      {stats && (
        <pre className="glass" style={{ padding: "20px", marginTop: "20px" }}>
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}
    </div>
  );
}
