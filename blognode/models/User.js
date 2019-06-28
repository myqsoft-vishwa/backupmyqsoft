var mongoose = require(process.cwd() + '/config/config');

var UserSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("User", UserSchema);