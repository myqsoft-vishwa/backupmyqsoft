var adminControllers = require(process.cwd() + '/controllers/adminController');
var express = require('express')
var router = express.Router()
router.route('/login').get(adminControllers.login);
module.exports = router;