import { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import styles from "../../components/Card/Card.module.css";
import PrevButton from "../../components/Button/PrevButton";
import NextButton from "../../components/Button/NextButton";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // Carousel state
  const [activeMovie, setActiveMovie] = useState(null);
  const searchMovies = async (searchTerm) => {
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setMovies(data.results);
    setSelectedMovieDetails(null);
  };

  const fetchMovieDetails = async (movieId, idx) => {
    const response = await fetch(`/api/movie/${movieId}`);
    const details = await response.json();
    setSelectedMovieDetails(details);
    setActiveMovie(idx);
  };

  useEffect(() => {
    console.log("Selected movie details updated:", selectedMovieDetails);
  }, [selectedMovieDetails]);

  const cardWidth = 500;
  const cardMargin = 20;

  const handlePrev = () => {
    // Carousel Prev
    console.log("Prev clicked");
    setActiveIndex((prevActiveIndex) => Math.max(prevActiveIndex - 1, 0));
  };

  const handleNext = () => {
    // Carousel Next
    setActiveIndex((nextActiveIndex) =>
      Math.min(nextActiveIndex + 1, movies.length - 2)
    );
  };

  return (
    <div>
      <Header onSearch={searchMovies} />
      {/* <SearchBox onSearch={searchMovies} /> */}
      <div style={{ display: "flex", marginTop: "20px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <PrevButton handlePrev={handlePrev} disabled={activeIndex === 0} />
        </div>
        <ul
          style={{
            display: "flex",
            padding: 0,
            marginLeft: `-${activeIndex * (cardWidth + cardMargin * 2)}px`, // Carousel slide
            transition: "margin-left 0.5s",
            overflowY: "hidden",
            position: "relative",
            zIndex: 0,
          }}
        >
          {movies.map((movie, idx) => {
            console.log("selectedMovieDetails", selectedMovieDetails);
            console.log("index", idx);
            return (
              <li
                key={movie.id}
                className={styles.cardContainer}
                onClick={() => fetchMovieDetails(movie.id, idx)}
                style={{
                  marginRight: `${cardMargin}px`,
                  flex: "0 0 auto",
                  width: `${cardWidth}px`,
                  cursor: "pointer",
                }}
              >
                <Card key={movie.id} movie={movie} />
                {activeMovie === idx && selectedMovieDetails && (
                  <MovieDetails movie={selectedMovieDetails} />
                )}
              </li>
            );
          })}
        </ul>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
        >
          <NextButton
            handleNext={handleNext}
            disabled={activeIndex >= movies.length - 2}
          />
        </div>
      </div>
    </div>
  );
}
