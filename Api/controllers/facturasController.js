const sql = require('mssql');
const db = require('../database/connections');

module.exports = {
    async getFacturasConsolidado(req, res) {
        try {
            const pool = await db;
            const result = await pool.request().execute('sp_EstadisticasVentasConsolidado');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getFacturasBySucursal(req, res) {
        try {
            const { id } = req.params;
            const pool = await db;

            const result = await pool.request()
                .input('sucursal', sql.VarChar, id)
                .execute('sp_EstadisticasVentasSucursal');

            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getDetalleFactura(req, res) {
        try {
            const { idFactura } = req.params;
            const pool = await db;

            const result = await pool.request()
                .input('idFactura', sql.Int, idFactura)
                .execute('sp_DetalleFactura');

            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
