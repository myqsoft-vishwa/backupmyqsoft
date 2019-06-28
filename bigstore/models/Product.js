var mongoose = require(process.cwd() + '/config/config');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var productSchema = {
    "category_id": {
        type: mongoose.Schema.Types.ObjectId
    },
    "name": String,
    "price": String,
    "discount": String,
    "short_description": String,
    "long_description": String,
    "pic": String

};
// create model if not exists.
module.exports = mongoose.model('Product', productSchema, 'product');