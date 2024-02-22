// pages/movies/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";
import Comments from "../../../components/Comments/Comments";

export default function DetailsMore() {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetailsMore, setMovieDetailsMore] = useState(null);
  const [comments, setComments] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchMovieDetailsMore = async (movieId) => {
      if (id) {
        const response = await fetch(`/api/movie/${movieId}`);
        const data = await response.json();
        setMovieDetailsMore(data);
      }
    };
    const fetchComments = async () => {
      if (id) {
        const response = await fetch(`/api/comments/${id}`);
        const data = await response.json();
        setComments(data);
      }
    };
    if (id) {
      fetchMovieDetailsMore(id);
      fetchComments(id);
    }
  }, [id]);

  console.log("fetchMovieDetailsMore", movieDetailsMore);

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MovieDetailsMore movie={movieDetailsMore} />
      {comments.map((comment) => (
        <Comments
          key={comment._id}
          name={comment.name}
          content={comment.comment}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
}
