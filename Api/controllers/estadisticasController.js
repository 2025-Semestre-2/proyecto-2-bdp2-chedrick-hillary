const sql = require("mssql");
const { corporativaPool, sucursalSJPool, sucursalLMPool } = require("../database/connections");

// Estadísticas por sucursal
exports.getEstadisticasSucursal = async (req, res) => {
    const sucursal = req.params.sucursal;  // "SJ" o "LM"

    try {
        let pool;

        if (sucursal === "SJ") pool = await sucursalSJPool;
        else if (sucursal === "LM") pool = await sucursalLMPool;
        else
            return res.status(400).json({ error: "Sucursal inválida" });

        const result = await pool.request().query(`
            SELECT
                (SELECT COUNT(*) FROM Productos) AS totalProductos,
                (SELECT COUNT(*) FROM Facturas) AS totalFacturas,
                (SELECT COUNT(*) FROM Clientes) AS totalClientes
        `);

        res.json(result.recordset[0]);

    } catch (err) {
        res.status(500).json({ error: "Error obteniendo estadísticas", detalles: err.message });
    }
};
