const express = require("express");
const { deserializeUser } = require("../middlewares/deserializeUser");
const router = express.Router();
const {uploadBlog , getBlog , getAllBlogs} = require("../controllers/blogs")

router.post("/blog/:id" , deserializeUser , uploadBlog);
router.get("/blog" , deserializeUser , getBlog);
router.get("/allBlogs" , getAllBlogs);
router.post("/postBlog/:id" , )

module.exports = router;