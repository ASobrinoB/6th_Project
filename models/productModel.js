const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        sku: {
            type: String, 
            required: true
            },
        description: {
            type: String, 
            required: true
            },
        price: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;