// Api/routes/productos.js
const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

// =====================================================
// GET /api/productos  -> Lista todos los productos
// =====================================================
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_ConsultarProductos");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// =====================================================
// GET /api/productos/:id  -> Detalle de un producto
// =====================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    // Usa el procedimiento almacenado
    const result = await pool
      .request()
      .input("StockItemID", sql.Int, id)
      .execute("sp_ConsultarProductoPorID");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

module.exports = router;
