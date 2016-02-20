var $ = require('jquery');


function buildGUI(str) {
  const jqueryString = str;
  console.log(jqueryString);
  var query = jqueryString + '.get(0).attributes'
  var attributes = eval(query);
  var attObj = {};
  for (var i in attributes) {
    attObj[attributes[i].nodeName] = attributes[i].nodeValue;
  }
  var textQuery = jqueryString + '.text()';
  attObj.text = eval(textQuery);

  var attNames = Object.keys(attObj);

  var radioButtonArray = '';

  attNames.forEach(att => {
    radioButtonArray += '<input class="radioButton" type="radio" name="att" value="' + att + '">' + att + '<br/>'
  })

  var adjust = adjustStr(jqueryString);

  $('.radioButton').remove();

  function shorten() {
    console.log(adjust("shorten"));
  }

  $('#gui').append(`<form id="guiSelector">
    <input type='text' placeholder='Name of Property' name='propName'/><br/>
    ${radioButtonArray}
    <button id = "shorten"> <= </button>
    <button id = "lengthen"> => </button>
    <br/> <button name="submit">Submit</button>
  `)

}


module.exports = buildGUI;
