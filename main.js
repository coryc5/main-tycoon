// add require dependencies
const outputView = require('./controllers/outputView.js');

// make post request but don't reload page
$('#api-prevent').on('click', function(e) {
  e.preventDefault();
  console.log($('#api-location').val());
  $('#api-window').remove();

  $.ajax({
    url: 'apireqpost/post.stf',
    type: 'POST',
    data: {website: $('#api-location').val()},
    success: function(data) {
      $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="600px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

      $('#api-window').load(function() {
        $('#api-window').contents().click(function(e) {
          console.log(getPathTo(e.target));
        });
      })
    }
  });
});
