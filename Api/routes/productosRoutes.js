const express = require("express");
const router = express.Router();

const {
    getProductos,
    insertProducto
} = require("../controllers/productosController");

// OBTENER PRODUCTOS
router.post("/listar", getProductos);

// INSERTAR PRODUCTO
router.post("/insertar", insertProducto);

module.exports = router;
