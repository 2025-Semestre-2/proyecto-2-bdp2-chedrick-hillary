// Api/server.js
const express = require("express");
const cors = require("cors");

const estadisticasRoutes = require("./routes/estadisticas");
const clientesRoute = require("./routes/clientes");
const proveedoresRoute = require("./routes/proveedores");
const productosRoute = require("./routes/productos");
const ventasRoute = require("./routes/ventas");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/clientes", clientesRoute);
app.use("/api/proveedores", proveedoresRoute);
app.use("/api/productos", productosRoute);
app.use("/api/ventas", ventasRoute);
app.use("/api/estadisticas", estadisticasRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(` Servidor ejecutándose en http://localhost:${PORT}`);
});
