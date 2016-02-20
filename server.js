var express = require('express');
var fs = require('fs');
var request = require('request');

var app = express();

app.get('/', function(req, res, next) {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});




app.get('/gogetberk/hi.htx', function(req, res, next) {
  request('http://www.berkshirehathaway.com/', function(err, response, body) {
    res.send(body);
  });
});

app.get('/gogetberk/*', function(req, res, next) {
  res.redirect('http://www.berkshirehathaway.com/' + req.originalUrl.slice(11));
});

app.listen(4000);
