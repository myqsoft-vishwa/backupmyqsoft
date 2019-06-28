var mongoose = require(process.cwd() + '/config/config');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var categorySchema = {
    "parent_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    "name": String

};
// create model if not exists.
module.exports = mongoose.model('Category', categorySchema, 'category');