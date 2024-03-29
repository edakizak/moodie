// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  movieId: { type: String, required: true },
  // movieId: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
  isSpoiler: { type: Boolean, default: false },
  timestamp: { type: Date, required: true, default: Date.now() },
});
const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
