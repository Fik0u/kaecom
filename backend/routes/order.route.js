const express = require('express');
const { createOrder, getOrders } = require('../controllers/order.controller');

const router = express.Router();

// Test Route
router.get('/test', (req, res) => {
    res.status(200).json({ message: "Order route is working!" });
});

// Create Order Route
router.post('/create', createOrder);

// Get All Orders Route
router.get('/all', getOrders);

module.exports = router;