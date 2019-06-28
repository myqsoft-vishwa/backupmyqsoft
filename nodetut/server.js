const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

var url = "mongodb://localhost:27017/";
var dbo
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
   dbo = db.db("mydb");
  
});
app.post('/quotes', (req, res) => {
  
   dbo.collection("quotes").insertOne(req.body, function(err, res) {
    console.log('saved to database')
    //res.redirect('/show')
    
  });
})
app.get('/show', (req, res) => {
  dbo.collection('quotes').find().toArray(function(err, results) {
  if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: results})
  // send HTML file populated with quotes here
})
})
app.listen(3000, () => {
    console.log('listening on 3000')
})
