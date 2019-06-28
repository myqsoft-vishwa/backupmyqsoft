var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var flash=require('express-flash');
var app = express();
global.title = '';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'ssshhhhh', proxy: true, resave: true, saveUninitialized: true, cookie: { maxAge: 24 * 60 * 60 * 1000 } }));
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var admin = require('./routes/admin');
var user = require('./routes/user'); 
app.use('/admin', admin);
app.use('/', user);
app.listen(process.env.PORT || 5000)
console.log('server run on port 5000')