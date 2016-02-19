var express = require('express');
var fs = require('fs');
var request = require('request');

var app = express();

app.get('/', function(req, res, next) {
  res.send(fs.readFileSync(__dirname + '/index.html', 'utf8'));
});




app.get('/gogetberk/hi.htx', function(req, res, next) {
  
  request('http://www.berkshirehathaway.com/', function(err, response, body) {
    // var arr = body.split('</head>');
    
    // var html = arr[0] + `<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    //   <script> var obj = {}
      
    //   $(document).ready(function(){
    //     $(window).trigger('HELLO');
        
    //     });
        
    //     $(document).on('HELLO', function() {alert('hiiii')})
    //       </script></head>` + arr[1];
    
    res.send(body);
  });
});

app.get('/gogetberk/*', function(req, res, next) {
  console.log('original', req.originalUrl, 'sliced', req.originalUrl.slice(11));
  res.redirect('http://www.berkshirehathaway.com/' + req.originalUrl.slice(11));  
});

app.listen(4000);