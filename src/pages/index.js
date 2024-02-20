import { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "../../components/Card/Card";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import styles from "../../components/Card/Card.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

  const searchMovies = async (searchTerm) => {
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`/api/movie/${movieId}`);
    const details = await response.json();
    setSelectedMovieDetails(details);
  };

  useEffect(() => {
    console.log("Selected movie details updated:", selectedMovieDetails);
  }, [selectedMovieDetails]);

  return (
    <div>
      <SearchBox onSearch={searchMovies} />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: 0,
            margin: "0 20px 0 0",
            maxWidth: "70%",
            gap: "20px",
            overflowY: "auto",
          }}
        >
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={styles.cardContainer}
              onClick={() => fetchMovieDetails(movie.id)}
              style={{ cursor: "pointer" }}
            >
              <Card key={movie.id} movie={movie} />
            </li>
          ))}
        </ul>
        <div style={{ flex: 1 }}>
          {selectedMovieDetails && (
            <MovieDetails movie={selectedMovieDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
