const express = require("express");
const router = express.Router();

const {
    obtenerFacturas,
    crearFactura,
    eliminarFactura
} = require("../controllers/facturasController");

router.get("/:sucursal", obtenerFacturas);
router.post("/:sucursal", crearFactura);
router.delete("/:sucursal/:id", eliminarFactura);

module.exports = router;
