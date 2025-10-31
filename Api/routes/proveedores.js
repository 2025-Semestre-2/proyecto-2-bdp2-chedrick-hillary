const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

// Obtener todos los proveedores
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_ConsultarProveedores");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener proveedores:", error);
    res.status(500).send("Error al obtener proveedores");
  }
});

// Obtener un proveedor específico por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("SupplierID", sql.Int, id)
      .execute("sp_ConsultarProveedorPorID");

    if (result.recordset.length === 0) {
      return res.status(404).send("Proveedor no encontrado");
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(" Error al obtener proveedor por ID:", error);
    res.status(500).send("Error al obtener proveedor por ID");
  }
});

module.exports = router;
