var express = require('express');

var app = express();
var admin = require('./routes/admin');
var user = require('./routes/user');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'));
app.use('/admin', admin);
app.use('/', user);
app.listen(process.env.PORT || 5000);
console.log('server run on port 5000');