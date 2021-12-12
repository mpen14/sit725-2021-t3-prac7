let Service = require("../services");

const getComments = (res) => {
    console.log('controller ')
    Service.CommentService.getAllComments(res)
}

const createComment = (data, res) => {
    Service.CommentService.insertComment(data,res)
}

module.exports = {
    getComments, createComment
}