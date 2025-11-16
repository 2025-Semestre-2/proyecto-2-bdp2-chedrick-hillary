const express = require("express");
const router = express.Router();

const {
    getEstadisticasSucursal
} = require("../controllers/estadisticasController");

// ESTADÍSTICAS POR SUCURSAL
router.get("/sucursal/:sucursal", getEstadisticasSucursal);

module.exports = router;
