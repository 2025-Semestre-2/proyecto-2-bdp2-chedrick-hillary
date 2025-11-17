const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

router.get('/consolidado', inventarioController.getInventarioConsolidado);

module.exports = router;
