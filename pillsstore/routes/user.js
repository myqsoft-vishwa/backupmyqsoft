var express = require('express');
var router = express.Router();
var userControllers = require(process.cwd() + '/controllers/userController');
router.route('/').get(userControllers.index);

module.exports = router;