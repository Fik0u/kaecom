const Product = require('../models/Product');


// Add Product
exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body });
        await newProduct.save();
        res.status(201).json({ msg: "Product added successfully", newProduct });
    } catch (error) {
        res.status(400).json({ msg: "Error adding product", error });
    }
};

// Get Products 
exports.getProducts = async (req, res) => {
    try {
            const { category } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }
        const prodsList = await Product.find(filter);
        res.status(200).json({ msg: "Products fetched successfully", prodsList });
    } catch (error) {
        res.status(400).json({ msg: "Error fetching products", error });
    }
};

// Get One Product
exports.getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product fetched successfully", prod });
    } catch (error) {
        res.status(400).json({ msg: "Error fetching product", error });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const editedProd = req.body;

        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ msg: "Product not found" });
        }
        const updatedProd = await Product.findByIdAndUpdate(id, editedProd, { new: true });
        res.status(200).json({ msg: "Product updated successfully", updatedProd });
        
    } catch (error) {
        res.status(400).json({ msg: "Error updating product", error });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await Product.findById(id);
        if (!prod) {
            return res.status(404).json({ msg: "Product not found" });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ msg: "Product deleted successfully" });

    } catch (error) {
        res.status(400).json({ msg: "Error deleting product", error });
    }
};