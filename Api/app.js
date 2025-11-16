const express = require("express");
const cors = require("cors");

require("./database/connections");

const authRoutes = require("./routes/authRoutes");
const productosRoutes = require("./routes/productosRoutes");
const estadisticasRoutes = require("./routes/estadisticasRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/estadisticas", estadisticasRoutes);

app.listen(3001, () => {
    console.log("API corriendo en puerto 3001");
});
