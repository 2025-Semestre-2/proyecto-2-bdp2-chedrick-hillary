import sql from "mssql";

// ==========================
//  CONFIGURACIONES
// ==========================
const configCorporativa = {
    user: "sa",
    password: "Admin25!",
    server: "MALESPIN",
    database: "Corporativa",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const configSucursalSJ = {
    user: "sa",
    password: "Admin25!",
    server: "MALESPIN\\SJ",
    port: 51433,
    database: "SucursalSJ",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const configSucursalLM = {
    user: "sa",
    password: "Admin25!",
    server: "MALESPIN\\LM",
    port: 51434,
    database: "SucursalLM",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// ==========================
//  POOLS
// ==========================
const poolCorporativa = new sql.ConnectionPool(configCorporativa)
    .connect()
    .then(pool => {
        console.log(" Conectado a Corporativa");
        return pool;
    })
    .catch(err => console.log(" Error conectando a Corporativa:", err));

const poolSJ = new sql.ConnectionPool(configSucursalSJ)
    .connect()
    .then(pool => {
        console.log(" Conectado a Sucursal San José");
        return pool;
    })
    .catch(err => console.log(" Error conectando a SJ:", err));

const poolLM = new sql.ConnectionPool(configSucursalLM)
    .connect()
    .then(pool => {
        console.log(" Conectado a Sucursal Limón");
        return pool;
    })
    .catch(err => console.log(" Error conectando a LM:", err));

export { sql, poolCorporativa, poolSJ, poolLM };
