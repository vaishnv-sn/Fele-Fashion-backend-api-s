const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    brand: { type: String, required: true },
    categoryId: { type: Number, required: true }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;