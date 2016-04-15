const cheerio = require('cheerio')
const rp = require('request-promise')

// getData accepts a base url and an array of query objects
// the function returns a promise
function getData (url, queries) {
  const options = {
    uri: url,
    transform: (body) => cheerio.load(body)
  }

  const data = rp(options)
    .then(($) => {
      const result = []
      queries.forEach((query) => {
        result[query.name] = []
        // add error handling for bad query.string

        $(query.string).each((i, elem) => {
          if (query.text === 'true') {
            var tmpObj = {}

            tmpObj[query.name] = $(elem).text()
            result.push(tmpObj)
          } else {
            tmpObj = {}
            tmpObj[query.name] = $(elem).attr(query.attr)
            result.push(tmpObj)
          }
        })
      })
      return result
    })
    .catch((err) => {
      // crawling failed or cheerio choked
      throw err
    })

  return data
}

module.exports = getData
