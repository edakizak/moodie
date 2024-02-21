// pages/movies/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieDetailsMore from "../../../components/MovieDetailsMore/MovieDetailsMore";

export default function DetailsMore() {
  const router = useRouter();
  const { id } = router.query;
  const [movieDetailsMore, setMovieDetailsMore] = useState(null);

  useEffect(() => {
    const fetchMovieDetailsMore = async () => {
      if (id) {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();
        setMovieDetailsMore(data);
      }
    };

    fetchMovieDetailsMore();
  }, [id]);

  if (!movieDetailsMore) {
    return <p>Loading...</p>;
  }

  return <MovieDetailsMore movie={movieDetailsMore} />;
}
