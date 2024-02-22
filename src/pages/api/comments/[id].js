import dbConnect from "../../../../db/connect";
import Comments from "../../../../db/models/Comments";

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
}
