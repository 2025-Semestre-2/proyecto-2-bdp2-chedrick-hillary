import { useState } from "react";
import api from "../services/api";

export default function ProductoForm({ data, onClose, onSaved }) {
  const [form, setForm] = useState(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await api.put(`/productos/${form.id}`, form);
    } else {
      await api.post("/productos", form);
    }

    onSaved();
    onClose();
  };

  return (
    <div className="modal-bg">
      <div className="modal glass">
        <h3>{form.id ? "Editar" : "Nuevo"} Producto</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Descripción"
            value={form.descripcion || ""}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Precio"
            value={form.precio || ""}
            onChange={(e) =>
              setForm({
                ...form,
                precio: parseFloat(e.target.value),
              })
            }
          />

          <div className="actions">
            <button className="btn-primary" type="submit">
              Guardar
            </button>
            <button
              className="btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
