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

  const fetchMovieDetailsMore = async (movieId) => {
    if (!movieId) return;
    const response = await fetch(`/api/movie/${movieId}`);
    const data = await response.json();
    setMovieDetailsMore(data);
  };

  const fetchComments = async (movieId) => {
    if (!movieId) return;
    const response = await fetch(`/api/comments/${movieId}`);
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetailsMore(id);
      fetchComments(id);
    }
  }, [id]);

  console.log("movieDetailsMore", movieDetailsMore);
  console.log("comments", comments);

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MovieDetailsMore movie={movieDetailsMore} />
      <Comments comments={comments} />
    </div>
  );
}
