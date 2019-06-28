var express = require('express');
var router = express.Router();
var adminControllers = require(process.cwd() + '/controllers/adminController');
router.route('/').get(adminControllers.index);

module.exports = router;