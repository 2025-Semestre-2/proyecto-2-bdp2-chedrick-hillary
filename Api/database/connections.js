const sql = require("mssql");

// ==========================
//  CONFIGS DE CADA SERVIDOR
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
//  POOL CORPORATIVA
// ==========================
const poolCorporativa = new sql.ConnectionPool(configCorporativa)
    .connect()
    .then(pool => {
        console.log(" Conectado a Corporativa");
        return pool;
    })
    .catch(err => console.log(" Error conectando a Corporativa:", err));

// ==========================
//  POOL SJ
// ==========================
const poolSJ = new sql.ConnectionPool(configSucursalSJ)
    .connect()
    .then(pool => {
        console.log(" Conectado a Sucursal SJ");
        return pool;
    })
    .catch(err => console.log(" Error conectando a SJ:", err));

// ==========================
//  POOL LM
// ==========================
const poolLM = new sql.ConnectionPool(configSucursalLM)
    .connect()
    .then(pool => {
        console.log(" Conectado a Sucursal LM");
        return pool;
    })
    .catch(err => console.log(" Error conectando a LM:", err));

module.exports = {
    sql,
    poolCorporativa,
    poolSJ,
    poolLM
};
