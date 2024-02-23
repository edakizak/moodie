import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";
import Comments from "../../../components/Comments/Comments";
import NewComment from "../../../components/Comment/NewComment";

export default function DetailsMore() {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetailsMore, setMovieDetailsMore] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const fetchMovieDetailsMore = async (movieId) => {
    try {
      if (!movieId) return;
      const response = await fetch(`/api/movie/${movieId}`);
      if (!response.ok) throw new Error("Movie details could not be fetched.");
      const data = await response.json();
      setMovieDetailsMore(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchComments = async (movieId) => {
    try {
      if (!movieId) return;
      const response = await fetch(`/api/comments/${movieId}`);
      if (!response.ok) throw new Error("Comments could not be fetched.");
      const data = await response.json();
      console.log(data);
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMovieDetailsMore(id);
    fetchComments(id);
  }, [id]);

  const addComment = async (commentText, movieId, name = "Anonymous") => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/comments/${movieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          comment: commentText,
          movieId,
        }),
      });
      if (!response.ok) throw new Error("Failed to add comment.");
      const newComment = { name, comment: commentText, timestamp };
      // const newComment = await response.json();
      setComments((prevComments) => [
        ...prevComments,
        { ...newComment, timestamp },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };
  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MovieDetailsMore movie={movieDetailsMore} />
      {/* <Comments comments={comments} /> */}
      <Comments
        comments={comments.map((comment) => ({
          ...comment,
          isSpoiler: comment.isSpoiler,
        }))}
      />

      <NewComment addComment={addComment} movieId={id} />
    </div>
  );
}
