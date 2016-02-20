// add require dependencies
const outputView = require('./controllers/outputView.js');
const stringHandler = require('./controllers/stringHandler.js');
const $ = require('jquery');
let selFunc;

const trgElem = '#api-window';

// make post request but don't reload page
$(document).ready(function() {
  
  
  $('#api-prevent').on('click', function(e) {
    e.preventDefault();
    $('#api-window').remove();

    $.ajax({
      url: 'apireqpost/post.stf',
      type: 'POST',
      data: {website: $('#api-location').val()},
      success: function(data) {
        $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="600px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

        $('#api-window').load(function() {
          $('#api-window').contents().click(function(e) {
            console.log('click');
            e.preventDefault();
            
            selFunc = outputView.genOutput(e.target);
            selFunc('current');

            $('#shorten').click(() => outputView.onShorten(selFunc));
            $('#lengthen').click(() => outputView.onLengthen(selFunc ));
          });
        })
      }
    });
  });
});
