const { sql, configCorporativa } = require("../database/connections");

// -----------------------------
// LOGIN BÁSICO SIN TOKEN
// -----------------------------
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        // Conexión a Corporativa
        const pool = await sql.connect(configCorporativa);

        // Consulta a la vista de login
        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarBinary, Buffer.from(password)) // lo convertimos a binario
            .query(`
                SELECT iduser, username, fullname, rol, active
                FROM vw_UsuariosLogin
                WHERE username = @username
                  AND password = HASHBYTES('SHA2_256', @password)
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = result.recordset[0];

        if (user.active !== 1) {
            return res.status(403).json({ message: "El usuario está inactivo" });
        }

        return res.json({
            message: "Login exitoso",
            user
        });

    } catch (err) {
        console.error(" Error en login:", err);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { login };
