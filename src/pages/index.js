import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import TopRatedMovies from "../../components/TopRated/TopRated";
import Carousel from "../../components/Carousel/Carousel";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [searchError, setSearchError] = useState("");

  const searchMovies = async (searchTerm) => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setSearchError(
          "🕵️‍♂️ Oops! No results. Maybe you want to check out top rated movies👇"
        );
        setMovies([]);
      } else {
        setMovies(data.results);
        setSearchError("");
      }
    } catch (error) {
      setSearchError(
        "😕 Something went wrong on our end. Please try searching again"
      );
    }
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

  return (
    <div>
      <Header onSearch={searchMovies} />
      {searchError && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", margin: "40px" }}>
          {searchError}
        </p>
      )}
      {!searchError && movies.length > 0 && (
        <p style={{ textAlign: "center", fontSize: "1.2rem", margin: "40px" }}>
          🎬 Here are all the movies. Grab your popcorn! 🍿
        </p>
      )}
      {movies.length > 0 ? (
        <Carousel
          movies={movies}
          fetchMovieDetails={fetchMovieDetails}
          selectedMovieDetails={selectedMovieDetails}
          activeMovie={activeMovie}
        />
      ) : (
        <TopRatedMovies />
      )}
    </div>
  );
}
