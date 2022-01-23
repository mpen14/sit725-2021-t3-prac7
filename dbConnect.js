const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://manali:Mana%402127@cluster0.2dgu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoClient = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

let commentsCollection;

mongoClient.connect((err,db) => {
     if(!err){
       console.log('Database Connected')
     }else{
       console.log('[error]',err)
     }
 });
 
exports.mongoClient = mongoClient;