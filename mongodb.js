var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://apityc:qwerty5@ds037175.mongolab.com:37175/apityc5', function(err, db) {
  db.createCollection('api-collection', { validator: 
    { $or: {
      apiURL: { $type: 'string'},
      }
    }
  }, function(err, result) {
    db.close();
  });
});

module.exports = MongoClient.connect.bind(null, 'mongodb://apityc:qwerty5@ds037175.mongolab.com:37175/apityc5');