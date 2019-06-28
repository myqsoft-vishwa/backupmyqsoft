'use strict';
module.exports = function(app) {
  var controllers = require('../controllers/loginController');

  // todoList Routes
  app.route('/')
    .get(controllers.index);
};
