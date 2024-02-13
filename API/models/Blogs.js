const { number } = require("joi");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { Populate } = require("../utils/populate");

const blogSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: ObjectId,
      ref: "Comment",
    },
  ],
  likes: {
    type: Number,
  },
});

blogSchema.pre("findOne", Populate("author"));
blogSchema.pre("find", Populate("author"));
blogSchema.pre("findOne" , Populate("comments"));
blogSchema.pre("findOneAndUpdate", Populate("author"));
blogSchema.pre("findOneAndUpdate" , Populate("comments"));
blogSchema.pre("find" , Populate("comments"));


module.exports = mongoose.model("Blog" , blogSchema);