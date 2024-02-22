import dbConnect from "../../../../lib/comments";
import CommentModel from "../../../../db/models/Comments";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const comments = await CommentModel.find({ movieId: id }).exec();
      res.status(200).json(comments);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
