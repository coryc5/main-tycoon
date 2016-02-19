const cheerio = require('cheerio');
const rp = require('request-promise');
//rp is dependent on request and bluebird

// getData accepts a base url and an array of query objects
// the function returns a promise
function getData (url, queries) {

const options = {
  uri: url,
  transform: body => cheerio.load(body)
}

const data = rp(options)
  .then($ => {
    const result = {};
    queries.forEach(query => {
      result[query.name] = [];
      $(query.string).each((i, elem) => {
        if (query.text) {
          result[query.name].push($(elem).text());
        } else {
          result[query.name].push($(elem).attr(query.attr));
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
  string: 'center:nth-of-type(1) table:nth-of-type(1) tbody:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2) ul:nth-of-type(1) li:nth-of-type(1) font',
  text: true,
  attr: ''
}

var testObj2 = {
  name: 'test2',
  string: 'center:nth-of-type(1) table:nth-of-type(1) tbody:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2) ul:nth-of-type(1) li:nth-of-type(1) font',
  text: false,
  attr: 'size'
}

getData('http://www.berkshirehathaway.com/', [testObj1, testObj2])
  .then(data => console.log(data));

module.exports = getData;
