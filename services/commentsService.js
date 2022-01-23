let client = require("../dbConnect");
let commentsCollection;
setTimeout(() => {
    commentsCollection = client.mongoClient.db("clientComments").collection("comments");

}, 500)

const getAllComments = (res) => {
    commentsCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const insertComment = (comment, res) => {
    commentsCollection.insertOne(comment, (err, result) => {
        console.log('Comment Inserted', result)
        res.send({ result: 200 })
    })
}



module.exports = {
    getAllComments, insertComment
}