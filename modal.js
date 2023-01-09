import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie_id: String,
  text: String,
  date: Date,
});
export const Comment = mongoose.model("Comment", commentSchema);

