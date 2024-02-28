import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import TopRatedMovies from "../../components/TopRated/TopRated";
import Carousel from "../../components/Carousel/Carousel";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
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

  return (
    <div>
      <Header onSearch={searchMovies} />

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
