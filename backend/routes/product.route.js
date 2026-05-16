const express = require('express');
const { getProducts, addProduct, getOneProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ message: "Product route is working!" });
});

// Add Product Route
router.post('/add', addProduct);

// All Products Route
router.get('/allProds', getProducts);

// Get One Product Route
router.get('/:id', getOneProduct);

// Update Product Route
router.put('/:id', updateProduct);

// Delete Product Route
router.delete('/:id', deleteProduct);

module.exports = router;