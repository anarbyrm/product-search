const mongoose = require('mongoose');

// create schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    barcode: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => value.length === 13,
            message: "Barcode must be 13 characters"
        },
        index: true
    },
    rating: {
        type: Number
    },
    category: {
        type: String
    },
    tags: [{
        type: String
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// create model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
