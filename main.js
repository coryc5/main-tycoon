// add require dependencies
const outputView = require('./controllers/outputView.js');
const stringHandler = require('./controllers/stringHandler.js');
const $ = require('jquery');
let selFunc;

const trgElem = '#api-window';

// make post request but don't reload page
$(document).ready(function() {
  
  $('#submit-post').on('click', function(e) {
    e.preventDefault();
    
    console.log(selFunc('current'));
    
    $.ajax({
      url: 'apitest/',
      type: 'POST',
      data: {data: selFunc('current'), url: $('#api-location').val()},
      success: function(data) {
        alert(data);
      }
    })
  })
  
  
  $('#api-prevent').on('click', function(e) {
    e.preventDefault();
    $('#api-window').remove();

    $.ajax({
      url: 'apireqpost/post.stf',
      type: 'POST',
      data: {website: $('#api-location').val()},
      success: function(data) {
        $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="900px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

        $('#api-window').load(function() {
          
          console.log('loaded!');
          $('#api-window').contents().click(function(e) {
            console.log('click');
            e.preventDefault();
            
            selFunc = outputView.genOutput(e.target);
            console.log('fn', selFunc);
            selFunc('current');
            console.log('1', selFunc('current'));

          });
          
          $('#shorten').click(() => outputView.onShorten(selFunc));
          $('#lengthen').click(() => outputView.onLengthen(selFunc ));
        })
      }
      
    });
  });
});
