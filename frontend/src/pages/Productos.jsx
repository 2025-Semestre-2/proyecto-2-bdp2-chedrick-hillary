import { useState, useEffect } from "react";
import api from "../services/api";
import ProductoForm from "../components/ProductoForm";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const res = await api.get("/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      <button className="btn-primary" onClick={() => setEditing({})}>
        Nuevo Producto
      </button>

      {editing && (
        <ProductoForm
          data={editing}
          onClose={() => setEditing(null)}
          onSaved={load}
        />
      )}

      <table className="table glass">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio}</td>

              <td>
                <button
                  className="btn-secondary"
                  onClick={() => setEditing(p)}
                >
                  Editar
                </button>

                <button
                  className="btn-danger"
                  onClick={async () => {
                    await api.delete(`/productos/${p.id}`);
                    load();
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
