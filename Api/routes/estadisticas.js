// Api/routes/estadisticas.js
const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../db");

// Compras por proveedor y categoría
router.get("/compras", async (req, res) => {
  try {
    const { proveedor, categoria } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Proveedor", sql.NVarChar(100), proveedor || null)
      .input("Categoria", sql.NVarChar(100), categoria || null)
      .execute("sp_EstadisticasCompras");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en /compras:", error);
    res.status(500).json({ error: "Error al obtener estadísticas de compras" });
  }
});

// Ventas por cliente y categoría
router.get("/ventas", async (req, res) => {
  try {
    const { cliente, categoria } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Cliente", sql.NVarChar(100), cliente || null)
      .input("Categoria", sql.NVarChar(100), categoria || null)
      .execute("sp_EstadisticasVentas");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en /ventas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas de ventas" });
  }
});

// Top 5 productos por año
router.get("/top-productos", async (req, res) => {
  try {
    const { anio } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Anio", sql.Int, anio)
      .execute("sp_Top5ProductosPorAnio");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en /top-productos:", error);
    res.status(500).json({ error: "Error al obtener el top de productos" });
  }
});

// Top 5 clientes por rango de años
router.get("/top-clientes", async (req, res) => {
  try {
    const { anioInicio, anioFin } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("AnioInicio", sql.Int, anioInicio)
      .input("AnioFin", sql.Int, anioFin)
      .execute("sp_Top5ClientesFacturas");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en /top-clientes:", error);
    res.status(500).json({ error: "Error al obtener top de clientes" });
  }
});

// Top 5 proveedores por rango de años
router.get("/top-proveedores", async (req, res) => {
  try {
    const { anioInicio, anioFin } = req.query;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("AnioInicio", sql.Int, anioInicio)
      .input("AnioFin", sql.Int, anioFin)
      .execute("sp_Top5ProveedoresCompras");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en /top-proveedores:", error);
    res.status(500).json({ error: "Error al obtener top de proveedores" });
  }
});

module.exports = router;
