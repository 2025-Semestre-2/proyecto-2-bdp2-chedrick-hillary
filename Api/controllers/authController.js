const crypto = require("crypto");
const { poolCorporativa } = require("../database/connections");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Login recibido:", username, password);

        const po = await poolCorporativa;

        // HASH EXACTO SHA256 (varbinary en SQL)
        const hash = crypto.createHash("sha256").update(password).digest();

        console.log("Hash generado:", hash);

        const result = await po.request()
            .input("username", username)
            .input("password", hash)
            .query(`
                SELECT 
                    iduser,
                    username,
                    fullname,
                    rol,
                    idsucursal
                FROM vw_UsuariosLogin
                WHERE username=@username AND password=@password
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }

        const u = result.recordset[0];

        res.json({
            mensaje: "Login exitoso",
            usuario: {
                id: u.iduser,
                username: u.username,
                fullname: u.fullname,
                rol: u.rol,
                idsucursal: u.idsucursal
            }
        });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Error interno" });
    }
};
