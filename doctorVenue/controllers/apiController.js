var md5 = require('md5');
var Admin = require(process.cwd() + "/models/Admin");
exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var condition = {
        "email": email,
        "password": md5(password)
    }
    var selectedField = {
        email: true,
        password: false
    };
    Admin.findOne(condition, { "email": 1, "name": 1 }, function(err, result) {
        if (result) {
            var responce = {
                success: true,
                data: result

            }

        } else {
            var responce = {
                success: false,
                message: "invalid id or password"

            }

        }
        res.json(responce);

    });


}