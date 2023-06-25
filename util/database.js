const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hsqg5qy.mongodb.net/node_shop?retryWrites=true&w=majority`
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;