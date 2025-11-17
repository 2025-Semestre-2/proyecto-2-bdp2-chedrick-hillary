const sql = require("mssql");
const { poolCorporativa, poolSJ, poolLM } = require("../database/connections");


module.exports = {

    obtenerVentasSucursal: async (req, res) => {
        const { sucursal } = req.params;

        try {
            let pool;

            if (sucursal === "SJ") pool = await poolSJ;
            else if (sucursal === "LM") pool = await poolLM;
            else return res.status(400).json({ error: "Sucursal no válida" });

            const result = await pool.request().execute("sp_EstadisticasVentasSucursal");
            res.json(result.recordset);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    obtenerVentasConsolidadas: async (req, res) => {
        try {
            const pool = await poolCorporativa;
            const result = await pool.request().execute("sp_EstadisticasVentasConsolidado");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerTopProductos: async (req, res) => {
        try {
            const pool = await poolCorporativa;
            const result = await pool.request().execute("sp_Top10Productos");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerClientesConMasCompras: async (req, res) => {
        try {
            const pool = await poolCorporativa;
            const result = await pool.request().execute("sp_ClientesConMasCompras");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerFacturasConsolidado: async (req, res) => {
        try {
            const pool = await poolCorporativa;
            const result = await pool.request().query("SELECT * FROM vw_FacturasConsolidado");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    obtenerInventarioConsolidado: async (req, res) => {
        try {
            const pool = await poolCorporativa;
            const result = await pool.request().query("SELECT * FROM vw_InventarioConsolidado");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
