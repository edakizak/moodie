// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  movieId: { type: String, required: true },
});
const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);

export default Comments;
