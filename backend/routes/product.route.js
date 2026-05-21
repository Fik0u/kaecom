const express = require('express');
const auth = require('../middleware/auth');
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
router.put('/:id', auth, updateProduct);

// Delete Product Route
router.delete('/:id', auth, deleteProduct);

module.exports = router;