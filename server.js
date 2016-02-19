var express = require('express');
var fs = require('fs');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var phantom = require('phantom');
var MongoClient = require('./mongodb');

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res, next) {
    if (!req.cookies.userId) {
      MongoClient(function(err, db) {
        db.collection('api-collection').insert({}, function(err, doc) {
          res.cookie('userId', doc._id);
        })
      });
    }
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});




app.post('/apireq/get.stf', function(req, res, next) {
  request(req.body.website, function(err, response, body) {
    res.cookie('website', req.body.website);
    res.send(body);
  });
});

app.get('/gogetberk/hi.htx', function(req, res, next) {
  // console.log(req.cookies.website);
  
  phantom.create().then(function(ph) {
     ph.createPage().then(function(page) {
       page.setting('userAgent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.256');
       page.open(req.cookies.website).then(function(status) {
         page.property('content').then(function(content) {
           res.send(content);
           page.close();
           ph.exit();
         });
       });
     });
   });
 
});

app.get('/gogetberk/*', function(req, res, next) { 
  res.redirect(req.cookies.website + '/' + req.originalUrl.slice(10));
});

app.get('/tycooned/:id', function(req, res, next) {
  
});

app.get('*', function(req, res, next) {  
  res.redirect(req.cookies.website + req.originalUrl);
});


app.listen(4000);