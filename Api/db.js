// Api/db.js
const sql = require("mssql");

const dbConfig = {
  user: "sa",
  password: "Escuela63",
  server: "localhost",
  database: "WideWorldImporters",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log(" Conectado a la base de datos WideWorldImporters");
    return pool;
  })
  .catch((err) => {
    console.error(" Error de conexión:", err);
  });

module.exports = { sql, poolPromise };
