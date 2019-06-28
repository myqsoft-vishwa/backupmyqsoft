var express = require('express')
var app = express()
app.set('view engine', 'ejs') 

var routes = require('./routes/Routes'); //importing route
routes(app);
 
app.listen(3000)
