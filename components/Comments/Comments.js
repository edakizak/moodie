import Comment from "../Comment/Comment";

export default function Comments({ comments }) {
  if (!Array.isArray(comments)) {
    console.error("comments is not an array", comments);
    return <p>No comments to display</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          name={comment.name}
          content={comment.comment}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
}
