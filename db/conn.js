const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mpen:Catchcash1@cluster0.9u3na.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

module.exports = {
  connect: (callback) => {
      client.connect((err, db) => {
          if (err || !db)
              return callback(err);

          dbConnection = db.db("clientComments");

          console.log("Connected to MongoDB Atlas");

          callback();
      });
  },
  getDB : () => {
      return dbConnection;
  },
  disconnect : () => {
      client.close();
  }
}
