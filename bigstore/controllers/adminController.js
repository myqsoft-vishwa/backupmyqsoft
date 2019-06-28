var md5 = require('md5');
var _ = require('underscore');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

var Admin = require(process.cwd() + "/models/Admin");
var Category = require(process.cwd() + "/models/Category");
var Slider = require(process.cwd() + "/models/Slider");
var Product = require(process.cwd() + "/models/Product");
exports.bootstrap = function(req, res, next) {

    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.sessionname = req.session.name;
    if (req.session.name == undefined) {
        res.render('index.ejs');
    } else {
        next();
    }

};
exports.login = function(req, res) {
    res.render('index.ejs');
}
exports.loginsubmit = function(req, res) {
    var condition = {
        "email": req.body.email,
        "password": md5(req.body.password),
    }
    Admin.findOne(condition, function(err, result) {
        if (result) {
            req.session.name = result.name;
            res.redirect("/admin/dashbaord");
        } else {
            req.flash('error_messages', 'Invalid email or password');
            res.redirect("/admin")
        }
    });

}
exports.dashbaord = function(req, res) {
    global.title = "Dashbaord";
    res.render('dashbaord.ejs');
}
exports.logout = function(req, res) {

    req.session.name = null;
    req.flash('success_messages', 'You have successfully logged out');
    res.redirect("/admin")
}
exports.category_list = function(req, res) {
    global.title = "Category List";
    Category.find({}).lean().exec(function(err, result) {
        if (result.length > 0) {
            var counter1 = 0;
            var len = result.length;
            _.each(result, function(sq) {
                var id = mongoose.Types.ObjectId(sq.parent_id);
                Category.findOne({ "_id": id }, function(err, Tpic) {
                    if (Tpic) {
                        sq.parent_category = Tpic.name;
                    } else {
                        sq.parent_category = "Root";
                    }
                    if (++counter1 == len) {
                        res.render('category_list.ejs', { data: result });
                    }

                });

            });
        } else {
            res.render('category_list.ejs', { data: result });
        }

    });

}
exports.addCategory = function(req, res) {
    global.title = "Add Category";
    Category.find({}, function(err, result) {
        res.render('addCategory.ejs', { data: result });
    });

}
exports.add_category = function(req, res) {
    var category = new Category();
    category.parent_id = req.body.main_category ? req.body.main_category : null;
    category.name = req.body.categoryName;
    category.save();
    req.flash('success_messages', 'Category has been added successfully');
    res.redirect("/admin/category_list")
}
exports.delete_category = function(req, res) {
    var id = req.params.objectId;
    var query = Category.remove({ _id: id }).exec();
    req.flash('success_messages', 'Category has been deleted successfully');
    res.redirect("/admin/category_list")
};
exports.slider_list = function(req, res) {
    Slider.find({}, function(err, result) {
        res.render('slider_list.ejs', { data: result });
    });
};
exports.addSlider = function(req, res) {
    res.render('addSlider.ejs');
};
exports.add_slider = function(req, res) {
    var upload = multer({
        dest: 'public/img/slider/',
        limits: { fileSize: 10000000, files: 1 },
        fileFilter: (req, file, callback) => {
            callback(null, true);
        }
    }).single('pic');
    upload(req, res, function(err) {
        var oldFilePath = 'public/img/slider/' + req.file.filename;
        var newFilePath = 'public/img/slider/' + req.file.originalname;
        var imagename = req.file.originalname;
        fs.rename(oldFilePath, newFilePath);
        var slider = new Slider();
        slider.pic = imagename;
        slider.save();
        req.flash('success_messages', 'Slider has been deleted successfully');
        res.redirect('/admin/slider_list');
    })
};
exports.delete_slider = function(req, res) {
    var id = req.params.objectId;
    var query = Slider.remove({ _id: id }).exec();
    req.flash('success_messages', 'Slider has been deleted successfully');
    res.redirect("/admin/slider_list")
};
exports.product_list = function(req, res) {

    Product.find({}).lean().exec(function(err, result) {
        if (result.length > 0) {
            var counter1 = 0;
            var len = result.length;
            _.each(result, function(sq) {
                var id = mongoose.Types.ObjectId(sq.category_id);
                Category.findOne({ "_id": id }, function(err, Tpic) {
                    sq.category_name = Tpic.name;
                    if (++counter1 == len) {
                        res.render('product_list.ejs', { data: result });
                    }
                });
            });
        } else {
            var result = {};
            res.render('product_list.ejs', { data: result });
        }
        
    });

}
exports.addProduct = function(req, res) {
    Category.find({ 'parent_id': { $ne: null } }).sort([
        ['parent_id', 1]
    ]).exec(function(err, category) {
        res.render('addProduct.ejs', { category: category });
    });

}
exports.add_product = function(req, res) {
    var upload = multer({
        dest: 'public/img/product/',
        limits: { fileSize: 10000000, files: 1 },
        fileFilter: (req, file, callback) => {
            callback(null, true);
        }
    }).single('pic');
    upload(req, res, function(err) {
        var oldFilePath = 'public/img/product/' + req.file.filename;
        var newFilePath = 'public/img/product/' + req.file.originalname;
        var imagename = req.file.originalname;
        fs.rename(oldFilePath, newFilePath);
        var product = new Product();
        product.category_id = req.body.category_id;
        product.name = req.body.productName;
        product.price = req.body.productPrice;
        product.discount = req.body.productDiscount;
        product.short_description = req.body.short_desc;
        product.long_description = req.body.long_desc;
        product.pic = req.file.originalname;
        product.save();
        req.flash('success_messages', 'Product has been deleted successfully');
        res.redirect('/admin/product_list');
    })
};