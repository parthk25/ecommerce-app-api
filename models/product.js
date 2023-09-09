const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    description: String,
    price: String,
    discountPercentage: String,
    rating: String,
    stock: String,
    brand: String,
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    thumbnail: String,
    images: [String]
});

const PRODUCT = mongoose.model('product', productSchema);

module.exports = PRODUCT;