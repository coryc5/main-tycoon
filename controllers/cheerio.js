const cheerio = require('cheerio');
const rp = require('request-promise');
//rp is dependent on request and bluebird

// getData accepts a base url and an array of query objects
// the function returns a promise
function getData (url, queries) {

// test for bad url

const options = {
  uri: url,
  transform: body => cheerio.load(body)
}

const data = rp(options)
  .then($ => {
    const result = [];
    queries.forEach(query => {
      result[query.name] = [];
      //add error handling for bad query.string
      $(query.string).each((i, elem) => {
        if (query.text === 'true') {
          var tmpObj = {};
          tmpObj[query.name] = $(elem).text()
          result.push(tmpObj);
        } else {
          var tmpObj = {};
          tmpObj[query.name] = $(elem).attr(query.attr);
          result.push(tmpObj);
        }
      });
    });
    return result;
  })
  .catch(err => {
    // crawling failed or cheerio choked
    throw(err);
  })

return data;

}

// sample query objects
// need to remove html & body elements from the fron of the string
var testObj1 = {
  name: 'test',
  string: 'div:nth-of-type(2) p:nth-of-type(1) a:nth-of-type(1)',
  text: false,
  attr: 'href'
}

// var testObj2 = {
//   name: 'test2',
//   string: 'center:nth-of-type(1) table:nth-of-type(1) tbody:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2) ul:nth-of-type(1) li:nth-of-type(1) font',
//   text: false,
//   attr: 'size'
// }

// getData('http://www.reddit.com/', [testObj1])
//   .then(data => console.log(data));

module.exports = getData;
