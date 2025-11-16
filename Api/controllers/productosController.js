const { sql, getConnectionForUser } = require("../database/connections");

exports.getProductos = async (req, res) => {
    const user = req.body.user;

    try {
        const pool = await sql.connect(getConnectionForUser(user));
        const result = await pool.request().query("SELECT * FROM Productos");

        res.json(result.recordset);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.insertProducto = async (req, res) => {
    const { nombre, precio, categoria, stock } = req.body;
    const user = req.body.user;

    try {
        const pool = await sql.connect(getConnectionForUser(user));

        await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("precio", sql.Decimal(10,2), precio)
            .input("categoria", sql.VarChar, categoria)
            .input("stock", sql.Int, stock)
            .query(`
                INSERT INTO Productos (nombre, precio, categoria, stock)
                VALUES (@nombre, @precio, @categoria, @stock)
            `);

        res.json({ message: "Producto agregado (replicación automática activa)" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
