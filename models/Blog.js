const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }
  },
  {timestamps: true}
);

const Blog = mongoose.model('Blog',BlogSchema)
module.exports = Blog