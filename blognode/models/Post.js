var mongoose = require(process.cwd() + '/config/config');
var PostSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
   
});

module.exports = mongoose.model("Post", PostSchema);