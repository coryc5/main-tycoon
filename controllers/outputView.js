const stringHandler = require('./stringHandler.js');
const $ = require('jquery');

const trgElem = '#api-window';

function genOutput(target) {

  //parse initial string
  target = stringHandler.strParse(target);

  // create function that stores selected element
  // current --> returns current str
  // shorten --> returns str one element higher in the DOM
  // lengthen --> returns str one element lower in the DOM
  const adjStr = stringHandler.adjustStr(target);

  function inner(option) {
    const txt = $('#textSelect').is(':checked');
    const attr = $('#attrSelect').val();
    const name = $('#nameSelect').val();
    const result = {};
    result[name] = [];

    $(trgElem).contents().find(adjStr(option)).each((index, elem) => {
      result[name].push($(elem).text());
    });

    // console.log('result is', result)

    $('#gui-bottom').append(makePretty(result));
    return adjStr(option);
  }

  return inner;
}

function onShorten(selFunc) {
  selFunc('shorten');
}

function onLengthen(selFunc) {
  selFunc('lengthen');
}

function makePretty(obj) {
  var title = Object.keys(obj)[0];
  var contents = obj[title];
  var htmlArray = [];

  contents.forEach(function(input) {
    htmlArray.push[`<p><span>${title}</span>: <span>${input}</span><p>`]
  });


  var html =
    `<div>
      <p>{</p>
      ${htmlArray.join('')}
      <p>}</p>
    </div>`

  return html;

}

module.exports = {
  genOutput: genOutput,
  onShorten: onShorten,
  onLengthen: onLengthen
};
