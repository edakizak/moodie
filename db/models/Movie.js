import mongoose from "mongoose";
// import { Comments } from "./Comments";
// import { ObjectId } from "mongodb";

const { Schema } = mongoose;

const movieSchema = new Schema({
  name: { type: String },
  title: { type: String },
  release_date: { type: String },
  genres: { type: String },
  runtime: { type: String },
  vote_average: { type: String },
  comments: { type: [Schema.Types.ObjectId], ref: "Comments" },
});
export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema, "movies");
