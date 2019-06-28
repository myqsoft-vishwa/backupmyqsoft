var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/doctorvenue', { useNewUrlParser: true });
module.exports = mongoose;