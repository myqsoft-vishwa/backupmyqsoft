var md5 = require('md5');
var _ = require('underscore');
var mongoose = require('mongoose');
var Category = require(process.cwd() + "/models/Category");
var User = require(process.cwd() + "/models/User");
var Slider = require(process.cwd() + "/models/Slider");
var Product = require(process.cwd() + "/models/Product");
exports.bootstrap = function(req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    Category.find({ "parent_id": null }).lean().exec(function(err, result) {
        var counter1 = 0;
        var len = result.length;
        _.each(result, function(sq) {
            var id = mongoose.Types.ObjectId(sq._id);
            Category.find({ "parent_id": id }, function(err, Tpic) {
                sq.sub_category = Tpic;
                if (++counter1 == len) {
                    res.locals.catdata = result;
                    next();
                }

            });

        });

    });


};
exports.index = function(req, res) {
    Slider.find({}, function(err, slider) {
        res.render('user/index.ejs', { slider: slider });
    });


}
exports.register = function(req, res) {

    res.render("user/register.ejs");
};
exports.submit_register = function(req, res) {
    var user = new User();
    user.username = req.body.Username;
    user.email = req.body.Email;
    user.password = md5(req.body.Password);
    user.save();
    req.flash('success_messages', 'Register successfully');
    res.redirect("/register")
};
exports.login = function(req, res) {
    res.render("user/login.ejs");
};
exports.submit_login = function(req, res) {
    var condition = {
        "email": req.body.Email,
        "password": md5(req.body.Password),
    }
    User.findOne(condition, function(err, result) {
        if (result) {
            res.redirect("/");
        } else {
            req.flash('error_messages', 'Invalid email or password');
            res.redirect("/login")
        }

    });
};
exports.product_list = function(req, res) {
    var id = req.params.objectId;

    Product.find({ "category_id": id }, function(err, result) {
        res.render("user/product_list.ejs", { data: result });
    });

};