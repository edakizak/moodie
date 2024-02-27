import MovieDetails from "../MovieDetails/MovieDetails";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import styles from "./TopRated.module.css";

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      const response = await fetch("/api/toprated");
      const data = await response.json();
      setTopRatedMovies(shuffleArray(data).slice(0, 3));
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
  const cardWidth = 460;
  const cardMargin = 20;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Top Rated Movies</p>
      <div className={styles.container2}>
        {topRatedMovies.length > 0 ? (
          <ul
            className={styles.ul}
            style={{
              display: "flex",
              padding: 0,
              transition: "margin-left 0.5s",
              overflowY: "hidden",
              position: "relative",
              zIndex: 0,
            }}
          >
            {topRatedMovies.map((movie, idx) => (
              <li
                key={movie.id}
                style={{
                  marginRight: `${cardMargin}px`,
                  flex: "0 0 auto",
                  width: `${cardWidth}px`,
                  cursor: "pointer",
                }}
                className={styles.li}
                onClick={() => fetchMovieDetails(movie.id, idx)}
              >
                <div className={styles.Image}>
                  <Card movie={movie} />
                  {activeMovie === idx && selectedMovieDetails && (
                    <MovieDetails movie={selectedMovieDetails} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading top rated movies...</p>
        )}
      </div>
    </div>
  );
}
