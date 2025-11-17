const express = require("express");
const {
    obtenerVentasSucursal,
    obtenerVentasConsolidadas,
    obtenerTopProductos,
    obtenerClientesConMasCompras,
    obtenerFacturasConsolidado,
    obtenerInventarioConsolidado
} = require("../controllers/estadisticasController");

const router = express.Router();

router.get("/ventas/sucursal/:sucursal", obtenerVentasSucursal);
router.get("/ventas/consolidadas", obtenerVentasConsolidadas);
router.get("/top-productos", obtenerTopProductos);
router.get("/clientes-top", obtenerClientesConMasCompras);
router.get("/facturas-consolidado", obtenerFacturasConsolidado);
router.get("/inventario-consolidado", obtenerInventarioConsolidado);

module.exports = router;
