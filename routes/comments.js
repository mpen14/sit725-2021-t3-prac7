var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.CommentsController.getComments(res);
})

router.post('/', (req, res) => {
    Controllers.CommentsController.createComment(req.body, res)
})


module.exports = router;