const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D'
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    }
}, { 
    timestamps: true 
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;