var express = require('express')
var bodyParser = require("body-parser");
var validator = require('express-validator');
var dotenv = require('dotenv').config();
var app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());

var routes = require('./routes/Routes'); //importing route
//routes(app);
app.use('/', routes)
 
app.listen(8000)