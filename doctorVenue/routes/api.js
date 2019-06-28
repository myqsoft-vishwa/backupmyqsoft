var express = require('express');
var router = express.Router();
var adminControllers = require(process.cwd() + '/controllers/apiController');
router.route('/login').post(adminControllers.login);
module.exports = router;