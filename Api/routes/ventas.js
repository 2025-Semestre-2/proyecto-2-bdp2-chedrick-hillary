const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

// Obtener todas las ventas (sp_ConsultarVentas)
router.get("/", async (req, res) => {
  try {
    const { nombreCliente, fechaInicio, fechaFin, montoMin, montoMax } = req.query;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("NombreCliente", sql.NVarChar(100), nombreCliente || null)
      .input("FechaInicio", sql.Date, fechaInicio || null)
      .input("FechaFin", sql.Date, fechaFin || null)
      .input("MontoMin", sql.Decimal(18, 2), montoMin || null)
      .input("MontoMax", sql.Decimal(18, 2), montoMax || null)
      .execute("sp_ConsultarVentas");

    res.status(200).json(result.recordset || []);
  } catch (error) {
    console.error(" Error al obtener ventas:", error.message);
    res.status(500).json({ message: "Error al obtener ventas", error: error.message });
  }
});

// Obtener detalle de una venta (sp_ConsultarDetalleVenta)
router.get("/:numeroFactura", async (req, res) => {
  try {
    const { numeroFactura } = req.params;

    if (!numeroFactura || isNaN(numeroFactura)) {
      return res.status(400).json({ message: "Número de factura inválido" });
    }

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("NumeroFactura", sql.Int, parseInt(numeroFactura))
      .execute("sp_ConsultarDetalleVenta");

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({ message: "No se encontró el detalle de la venta" });
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(" Error al obtener detalle de venta:", error.message);
    res.status(500).json({ message: "Error al obtener detalle de venta", error: error.message });
  }
});

module.exports = router;
