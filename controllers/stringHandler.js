var str = 'id("undefined")/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/UL[1]/LI[1]/FONT[1]';



function strParse(str) {
  var jqArr = str.split('/');
  var id = jqArr.shift();
  jqArr.unshift('class("undefined")'); //remove once class added to output function
  var objClass = jqArr.shift();
  var retStr = "$('.container').contents().find('";
  jqArr.forEach(element => {
    retStr += parseObj(element);
  });
  retStr += "')"
  return retStr;
}


function parseObj(str) {
  var parsedStr = str.split('[');
  var element = parsedStr[0].toLowerCase();
  var nth = parsedStr[1].slice(0, -1);

  return (element === 'html' || element === 'body') ? element + ' ' : element + ':nth-of-type(' + nth + ') '

}


function adjustStr(str) {
  var strHistory = [];

  function shortenStr(option) {
    if (option === 'shorten') {

      if (str !== strHistory[strHistory.length -1]) {
        strHistory.push(str);
      }
      var elArr = str.split(' ');
      var endOfString = elArr.pop();
      var baseElement = elArr.pop().split(':');
      if (baseElement.length === 2) {
        baseElement = baseElement[0];
        str = elArr.concat(baseElement, endOfString).join(' ');
        return str;
      }
      var lastElement = elArr.pop();
      if (lastElement !== 'body') {
        if (lastElement.indexOf(':') > 0) {
          var last = lastElement.split(':');
          lastElement = last[0];
        } else {
          lastElement = [];
        }
        str = elArr.concat(lastElement, baseElement, endOfString).join(' ');
      }
    } else if (option === 'lengthen') {
      var temp = strHistory.pop();
      if (temp) {
        str = temp
      }
    }
    return str;
  }

  return shortenStr;
}


module.exports = {
  strParse: strParse,
  adjustStr: adjustStr
}
