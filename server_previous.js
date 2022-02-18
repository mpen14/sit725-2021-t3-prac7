let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const dummyComment={
  name:'Protractor',
  description:'New tool to learn'
}

let dummyData=[dummyComment,dummyComment]

app.get("/api/comments", function (request, response) {
  console.log('commentsrequested')
  getComments(response)
 // response.end("Hello " + user_name + "!");
});

app.post('/api/comments',function (request, response){
  console.log('New Comment posted')
  console.log('body',req.body)
  let comment = request.body;
  //dummyData.push(comment)
  //res.send({result:200})
  insertComment(comment,response)
})

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
});

//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();

//Data base Connection
const uri = "mongodb+srv://manali:Mana%402127@cluster0.2dgu3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});


let commentsCollection;

//this function is used to open the connection
const openConnection = (message)=> {
    client.connect((err,db) => {
        commentsCollection = client.db("clientComments").collection("comments");
        if(!err){
            console.log('Database Connected')
        }
        else{
            console.log('error in if',err)
        }
    });
}

//insert comment into the db
const insertComment = (comment,res)=>{
    //insert into collection
    commentsCollection.insertOne(comment,(err,result)=>{
        console.log('Comment Inserted',result)
        res.send({result:200})
    })
}

//retrieve all comments
const getComments=(res)=>{
    commentsCollection.find({}).toArray(function(err,result){
        if(err) throw err;
        res.send(result)
    })
}

openConnection()

http.listen(port,()=>{
    console.log("listening on port",port);
});


