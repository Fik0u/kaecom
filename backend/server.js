const express = require('express');
const cors = require('cors');

require('dotenv').config();

 //DataBase Connection
const connectDB = require('./config/connectDB');

const app = express();

//Middleware 
app.use(cors());

app.use(express.json());

connectDB();

// Routes
app.use('/api/products', require('./routes/product.route'));
app.use('/api/orders', require('./routes/order.route'));


const PORT = process.env.PORT || 3000;

// Server Setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🤖`);
});
