import { useState, useEffect } from "react";
import styles from "./TopRated.module.css";
import Carousel from "../Carousel/Carousel";

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      const response = await fetch("/api/toprated");
      const data = await response.json();
      setTopRatedMovies(shuffleArray(data).slice(0, 10));
    }

    fetchTopRatedMovies();
  }, []);

  function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  const fetchMovieDetails = async (movieId, idx) => {
    const response = await fetch(`/api/movie/${movieId}`);
    const details = await response.json();
    setSelectedMovieDetails(details);
    setActiveMovie(idx);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Top Rated Movies</p>
      {topRatedMovies.length > 0 ? (
        <Carousel
          movies={topRatedMovies}
          fetchMovieDetails={fetchMovieDetails}
          selectedMovieDetails={selectedMovieDetails}
          activeMovie={activeMovie}
        />
      ) : (
        <p>Loading top rated movies...</p>
      )}
    </div>
  );
}
