var User = require(process.cwd() + "/models/User");
var Post = require(process.cwd() + "/models/Post");
/*-----------------------login---------------------------------*/
exports.login = function(req, res) {


        Post.find({})
            .populate('postedBy')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            });
   

};