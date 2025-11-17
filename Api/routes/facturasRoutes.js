const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');

router.get('/consolidado', facturasController.getFacturasConsolidado);
router.get('/sucursal/:id', facturasController.getFacturasBySucursal);
router.get('/detalle/:idFactura', facturasController.getDetalleFactura);

module.exports = router;
