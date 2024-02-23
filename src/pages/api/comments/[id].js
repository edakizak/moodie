import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comment";
// import Movie from "../../../../db/models/Movie";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    console.log("route triggered+++++++++++++", typeof id, id);
    const comments = await Comment.find({ movieId: id });
    console.log("============================", comments);
    if (!comments) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(comments);
  }
  if (request.method === "POST") {
    try {
      const commentsData = request.body;
      await Comment.create(commentsData);

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
