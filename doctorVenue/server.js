var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
var api = require('./routes/api');
app.use('/api', api);

app.listen(process.env.PORT || 5000)
console.log('server run on port 5000')