var $ = require('jquery')

function buildGUI (str) {
  $('#gui').append(`<form id="guiSelector">
    <input id="propName" type='text' placeholder='Name of Property' name='propName'/><br/>
    <button id = "shorten"> More </button>
    <button id = "lengthen"> Less </button>
    <input type="submit">
    </form>
    <div id="dropDownMenu"></div>
  `)

  buildDropDown(str)
}

function buildDropDown (str) {
  $('#guiDropDown').remove()

  const jqueryString = "$('#api-window').contents().find('" + str + "')"
  var query = jqueryString + '.get(0).attributes'
  var attributes = eval(query)
  var attObj = {}
  for (var i = 0; i < attributes.length; i++) {
    attObj[attributes[i].nodeName] = attributes[i].nodeValue
  }

  // var textQuery = jqueryString + '.text()';
  // attObj.text = eval(textQuery);

  var attNames = Object.keys(attObj)
  var dropDown = '<select id="guiDropDown" name="attr" form="guiSelector"><option value="text">text</option>'

  attNames.forEach((att) => {
    dropDown += '<option value="' + att + '">' + att + '</option>'
  })

  dropDown += '</select>'

  $('#dropDownMenu').append(dropDown)
}

module.exports = {
  buildGUI: buildGUI,
  buildDropDown: buildDropDown
}
