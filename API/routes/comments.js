const express = require("express");
const router = express.Router();
const {deserializeUser} = require("../middlewares/deserializeUser");
const {sendComment , likeComment ,deleteComment, fetchComment}= require("../controllers/comments")


router.post("/comment/:id" , deserializeUser , sendComment);
router.post("/like/:commentId" , deserializeUser , likeComment);
router.post("/delete/comment/:commentId" , deserializeUser , deleteComment);
router.post("/fetch/:postId" , deserializeUser , fetchComment);

module.exports = router;