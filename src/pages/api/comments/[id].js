import dbConnect from "../../../../db/connect";
import Comments from "../../../../db/models/Comments";
// import Movie from "../../../../db/models/Movie";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const comments = await Comments.find({ movieId: id });

    if (!comments) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(comments);
  }
  if (request.method === "POST") {
    try {
      const commentsData = request.body;
      await Comments.create(commentsData);

      response.status(201).json({ status: "Comment created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
