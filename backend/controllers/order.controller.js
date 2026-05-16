const Order = require('../models/Order');
const Product = require('../models/Product');

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { customerName, email, phone, address, items } = req.body;
        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order({ ...req.body, totalPrice });
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully!", order: newOrder });
    } catch (error) {
        res.status(400).json({ message: "Error creating order", error });
    }
};

// Get All Orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Orders retrieved successfully!", orders });
    } catch (error) {
        res.status(400).json({ message: "Error retrieving orders", error });
    }
};