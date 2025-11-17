const { poolSJ, poolLM } = require("../database/connections");

exports.obtenerFacturas = async (req, res) => {
    try {
        const { sucursal } = req.params;
        const pool = sucursal === "SJ" ? await poolSJ : await poolLM;

        const result = await pool.request().query("SELECT * FROM vwFacturas");
        res.json(result.recordset);

    } catch (error) {
        res.status(500).json({ mensaje: "Error obteniendo facturas" });
    }
};

exports.crearFactura = async (req, res) => {
    try {
        const { sucursal } = req.params;
        const { fecha, idCliente, total } = req.body;

        const pool = sucursal === "SJ" ? await poolSJ : await poolLM;

        await pool.request()
            .input("fecha", fecha)
            .input("idCliente", idCliente)
            .input("total", total)
            .query(`
                EXEC sp_Factura_Crear 
                    @fecha=@fecha,
                    @idCliente=@idCliente,
                    @total=@total
            `);

        res.json({ mensaje: "Factura creada correctamente" });

    } catch (error) {
        res.status(500).json({ mensaje: "Error creando factura" });
    }
};

exports.eliminarFactura = async (req, res) => {
    try {
        const { sucursal, id } = req.params;
        const pool = sucursal === "SJ" ? await poolSJ : await poolLM;

        const result = await pool.request()
            .input("idFactura", id)
            .query("EXEC sp_Factura_Eliminar @idFactura=@idFactura");

        res.json(result.recordset);

    } catch (error) {
        res.status(500).json({ mensaje: "Error eliminando factura" });
    }
};
