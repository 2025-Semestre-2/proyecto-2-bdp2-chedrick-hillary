// Api/routes/clientes.js
const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute("sp_ConsultarClientes");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).send("Error al obtener clientes");
  }
});

// Obtener cliente por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("CustomerID", sql.Int, id) // 
      .execute("sp_ConsultarClientePorID"); 
    if (result.recordset.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error(" Error al obtener cliente por ID:", error);
    res.status(500).send("Error al obtener cliente");
  }
});

module.exports = router;
