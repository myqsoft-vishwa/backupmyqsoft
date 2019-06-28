'use strict';
module.exports = function(app) {
    var adminControllers = require(process.cwd() + '/controllers/adminController');
    var homeControllers = require(process.cwd() + '/controllers/homeController');

    // todoList Routes
    /*--------------------------admin rout---------------------*/
    app.route('/admin')
        .get(adminControllers.index);
    app.route('/admin/loginsubmit')
        .post(adminControllers.loginsubmit);
    app.route('/admin/dashbaord')
        .get(adminControllers.bootstrap, adminControllers.dashbaord);
    app.route('/admin/logout')
        .get(adminControllers.logout);
    app.route('/admin/editprofile/:objectId')
        .get(adminControllers.bootstrap, adminControllers.editprofile);
    app.route('/admin/updateprofile')
        .post(adminControllers.updateprofile);
    app.route('/admin/slidermanage')
        .get(adminControllers.bootstrap, adminControllers.slidermanage);
    app.route('/admin/addslide')
        .get(adminControllers.bootstrap, adminControllers.addslide);
    app.route('/admin/uploadslideimage')
        .post(adminControllers.bootstrap, adminControllers.uploadslideimage);
    app.route('/admin/deleteslide/:objectId')
        .get(adminControllers.bootstrap, adminControllers.deleteslide);
    /*---------------------------------------frontend--------------------*/
    app.route('/')
        .get(homeControllers.index);
    app.route('/register')
        .get(homeControllers.bootstrap, homeControllers.register);
    app.route('/signup')
        .post(homeControllers.signup);
        app.route('/login')
        .post(homeControllers.login);
};