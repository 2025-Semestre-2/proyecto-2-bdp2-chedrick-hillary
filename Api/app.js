const express = require("express");
const cors = require("cors");

require("./database/connections");

const authRoutes = require("./routes/authRoutes");
const productosRoutes = require("./routes/productosRoutes");
const estadisticasRoutes = require("./routes/estadisticasRoutes");
const facturasRoutes = require('./routes/facturasRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const clientesRoutes = require('./routes/clientesRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/api/estadisticas", estadisticasRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/clientes', clientesRoutes);

app.listen(3001, () => {
    console.log("API corriendo en puerto 3001");
});