var express = require('express')
var session = require('express-session');
var bodyParser = require("body-parser");
var app = express();
var flash=require('express-flash');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'ssshhhhh', proxy: true, resave: true, saveUninitialized: true, cookie: { maxAge: 600000 } }));
app.use(flash());
var routes = require('./routes/Routes'); //importing route
routes(app);
app.listen(3000)