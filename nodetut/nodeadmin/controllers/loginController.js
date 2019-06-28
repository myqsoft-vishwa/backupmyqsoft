var connection = require('./../config');
exports.index = function(req, res) {
  connection.query("SELECT * FROM users where id=1", function (err, result, fields) {
    res.render('index.ejs', {data: result})
  });
};