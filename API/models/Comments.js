const { number } = require("joi");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const { Populate } = require("../utils/populate");

const commentSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "User",
  },
  data: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

commentSchema.pre("find", Populate("replies"));
commentSchema.pre("findOne", Populate("replies"));
commentSchema.pre("find", Populate("author"));
commentSchema.pre("findOneAndUpdate", Populate("replies"));
commentSchema.pre("findOneAndUpdate", Populate("author"));
commentSchema.pre("findOne", Populate("author"));
commentSchema.pre("findOneAndDelete", async function (next) {
  const conditions = this.getQuery();
  console.log("Here");
  console.log(conditions);
  try {
    const currentDoc = await this.model.findOne(conditions);
    const {model} = this;
    const deletedComment =  await currentDoc?.replies?.forEach(async function(e){
      const eachDeletion = await model.findByIdAndDelete(e._id);
      // console.log(e);
    })
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model("Comment", commentSchema);
