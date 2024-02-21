import { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "../../components/Card/Card";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import styles from "../../components/Card/Card.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Carousel state

  const searchMovies = async (searchTerm) => {
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setMovies(data.results);
    setSelectedMovieDetails(null); // Yeni aramada detayları temizle
  };

  const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`/api/movie/${movieId}`);
    const details = await response.json();
    setSelectedMovieDetails(details);
  };

  useEffect(() => {
    console.log("Selected movie details updated:", selectedMovieDetails);
  }, [selectedMovieDetails]);

  const cardWidth = 300; // Card'ın genişliği
  const cardMargin = 20; // Card arasındaki margin

  const handlePrev = () => {
    // Carousel Prev
    setActiveIndex((prevActiveIndex) => Math.max(prevActiveIndex - 1, 0));
  };

  const handleNext = () => {
    // Carousel Next
    setActiveIndex((nextActiveIndex) =>
      Math.min(nextActiveIndex + 1, movies.length - 3)
    );
  };

  return (
    <div>
      <SearchBox onSearch={searchMovies} />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={activeIndex === 0}>
          Prev
        </button>
        <ul
          style={{
            display: "flex",
            padding: 0,
            marginLeft: `-${activeIndex * (cardWidth + cardMargin * 2)}px`, // Carousel kaydırma
            transition: "margin-left 0.5s",
            overflowY: "hidden",
          }}
        >
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={styles.cardContainer}
              onClick={() => fetchMovieDetails(movie.id)}
              style={{
                marginRight: `${cardMargin}px`,
                flex: "0 0 auto",
                width: `${cardWidth}px`,
                cursor: "pointer",
              }}
            >
              <Card key={movie.id} movie={movie} />
              {selectedMovieDetails && (
                <MovieDetails movie={selectedMovieDetails} />
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={handleNext}
          disabled={activeIndex >= movies.length - 3}
        >
          Next
        </button>
      </div>
    </div>
  );
}
