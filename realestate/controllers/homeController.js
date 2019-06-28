var connection = require(process.cwd() + '/config/config');
var md5 = require('md5');
exports.bootstrap = function(req, res, next) {

    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');

    next();

};
exports.index = function(req, res) {
    connection.query('SELECT * FROM slidemgt', function(err, result, fields) {
        res.render('home/index.ejs', { data: result });
    });


};
exports.register = function(req, res) {
    res.render('home/register.ejs');
};
exports.signup = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var temp_password = req.body.temp_password;
    var password_hash = md5(temp_password);
    connection.query('INSERT INTO member (name,email,password,temp_password) VALUES (?,?,?,?)', [name, email, password_hash, temp_password], function(err, result, fields) {
        req.flash('success_messages', 'Signup Successfully');
        res.redirect("/register");
    });
};
exports.login = function(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var password_hash = md5(password);
    connection.query('SELECT * FROM member where email=? And password=? ', [email, password_hash], function(err, result, fields) {
        res.redirect("/dashboard");
    });
};
exports.dashboard = function() {
	
};