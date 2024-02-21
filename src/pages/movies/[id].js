// pages/movies/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";

export default function DetailsMore() {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetailsMore, setMovieDetailsMore] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchMovieDetailsMore = async (movieId) => {
      if (id) {
        const response = await fetch(`/api/movie/${movieId}`);
        const data = await response.json();
        setMovieDetailsMore(data);
      }
    };
    fetchMovieDetailsMore(id);
  }, [id]);

  console.log("fetchMovieDetailsMore", movieDetailsMore);

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return <MovieDetailsMore movie={movieDetailsMore} />;
}
