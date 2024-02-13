const Blogs = require("../models/Blogs");
const blogSchema = require("../models/Blogs");
const userSchema = require("../models/users");
module.exports = {
  uploadBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      const blog = new blogSchema({ author: id, title, body });
      const savedBlog = await blog.save();
      const updatedUser = await userSchema.findByIdAndUpdate(
        { _id: id },
        { $push: { posts: savedBlog._id } }
      );
      res.send({ success: true, user: updatedUser, blog: savedBlog });
    } catch (e) {
      next(e);
    }
  },
  getBlog: async (req, res, next) => {
    try {
      const { blogId } = req.query;
      const blog = await blogSchema.findById(blogId);
      res.send({ success: true, blog: blog });
    } catch (e) {
      next(e);
    }
  },
  getAllBlogs: async (req, res, next) => {
    try {
      const blogs = await blogSchema.find();
      return res.send({ success: true, blogs: blogs });
    } catch (e) {
      next(e);
    }
  },
  addBlog: async (req, res, next) => {
    try {
      const { author } = req.params;
      const { body, title } = req.body;
      const newBlog = new blogSchema({ author, body, title });
      await newBlog.save();
      res.send({ success: true, newBlog });
    } catch (e) {
      next(e);
    }
  },
};
