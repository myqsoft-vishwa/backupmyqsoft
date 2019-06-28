var mongoose = require(process.cwd() + '/config/config');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var adminSchema = {
	"name": String,
    "email": String,
    "password": String

};
// create model if not exists.
module.exports = mongoose.model('Admin', adminSchema, 'admin');