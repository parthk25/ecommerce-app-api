const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:String,
    image:String
});

const CATEGORY = mongoose.model('category', categorySchema);

module.exports = CATEGORY;