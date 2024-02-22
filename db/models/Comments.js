import mongoose from "mongoose";

const { Schema } = mongoose;

const commentsSchema = new Schema({
  name: { type: String },
  comment: { type: String },
});
export const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);
