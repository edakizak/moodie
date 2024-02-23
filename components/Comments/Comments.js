import Comment from "../Comment/Comment";

export default function Comments({ comments }) {
  console.log("comments:", comments);
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          name={comment.name}
          content={comment.comment}
          timestamp={comment.timestamp}
          isSpoiler={comment.isSpoiler}
        />
      ))}
    </div>
  );
}
