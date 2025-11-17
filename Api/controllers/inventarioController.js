const sql = require('mssql');
const db = require('../database/connections');

module.exports = {
    async getInventarioConsolidado(req, res) {
        try {
            const pool = await db;
            const result = await pool.request().execute('sp_InventarioConsolidado');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};
