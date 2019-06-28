var connection = require(process.cwd() + '/config/config');
var md5 = require('md5');
var multer = require('multer');
var fs = require('fs');

var sess;

exports.bootstrap = function(req, res, next) {

    res.locals.sessionUsername = req.session.username;
    sess = req.session;
    if (sess.username) {
        res.locals.success_messages = req.flash('success_messages');
        res.locals.error_messages = req.flash('error_messages');
    }
    next();

};

exports.index = function(req, res) {
    sess = req.session;
    if (sess.username) {

        res.redirect("/admin/dashbaord")
    } else {

        res.render('index.ejs');
    }

};
exports.loginsubmit = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var hash = md5(password);
    connection.query('SELECT * FROM users where username=?  AND password = ?', [username, hash], function(err, result, fields) {

        if (result.length > 0) {
            sess = req.session;
            sess.username = result[0].username;
            res.redirect("/admin/dashbaord")
        } else {
            var flashResponce = {
                "status": "error",
                "message": "invalid user id or password"
            };

            res.render('index.ejs', { title: flashResponce });
        }

    });
};
exports.dashbaord = function(req, res) {
    var ess = req.session.username;
    if (ess) {
        connection.query('SELECT * FROM users where username=?', ess, function(err, result, fields) {
            res.render('dashboard.ejs', { data: result });

        });
    } else {
        res.render('index.ejs');
    }



};
exports.logout = function(req, res) {
    sess = req.session;
    sess.username = null;
    var flashResponce = {
        "status": "success",
        "message": "logout successfully !"
    };

    res.render('index.ejs', { title: flashResponce })
};

exports.editprofile = function(req, res) {
    var id = req.params.objectId;
    connection.query('SELECT * FROM users where id=?', id, function(err, result, fields) {
        res.render('editprofile.ejs', { data: result });
    });
};
exports.updateprofile = function(req, res) {
    var id = req.body.id;
    var username = req.body.username;
    var email = req.body.email;
    var temp_password = req.body.temp_password;
    var password = md5(temp_password);
    connection.query('UPDATE  users SET username=?,email=?,password=?,temp_password=? where id=?', [username, email, password, temp_password, id], function(err, result, fields) {
        res.redirect("/admin/dashbaord");
    });
};
exports.slidermanage = function(req, res) {
    connection.query('SELECT * FROM slidemgt', function(err, result, fields) {
        res.render('slidermanage.ejs', { data: result });
    });

};
exports.addslide = function(req, res) {

    res.render('addslide.ejs');
};
exports.uploadslideimage = function(req, res) {
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
        fs.rename(oldFilePath, newFilePath, function(err) {});
        connection.query('INSERT INTO slidemgt (image_slide) VALUES (?)', imagename, function(err, result, fields) {
            req.flash('success_messages', 'Slider image added succesfully');
            res.redirect("/admin/slidermanage");
        });
    })
};
exports.deleteslide = function(req, res) {
    var id = req.params.objectId;
    connection.query('Delete from slidemgt where id = ?', id, function(err, result, fields) {
        req.flash('success_messages', 'Slider image deleted succesfully');
        res.redirect("/admin/slidermanage");
    });
};
