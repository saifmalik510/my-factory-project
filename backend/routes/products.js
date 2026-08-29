const express = require('express');
const router  = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// GET /api/products        — list with filters/search/pagination
router.get('/', getProducts);

// GET /api/products/:id    — single product detail
router.get('/:id', getProductById);

module.exports = router;
