var express = require('express');
var router = express.Router();
var userControllers = require(process.cwd() + '/controllers/userController');
router.route('/').get(userControllers.bootstrap,userControllers.index);
router.route('/register').get(userControllers.bootstrap,userControllers.register);
router.route('/submit_register').post(userControllers.submit_register);
router.route('/login').get(userControllers.bootstrap,userControllers.login);
router.route('/submit_login').post(userControllers.submit_login);
router.route('/product_list/:objectId').get(userControllers.bootstrap,userControllers.product_list);

module.exports = router;