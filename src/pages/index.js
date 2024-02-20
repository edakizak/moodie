import { useState, useEffect } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "../../components/Card/Card";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

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
      <ul>
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => fetchMovieDetails(movie.id)}>
            <Card key={movie.id} movie={movie} />
          </div>
        ))}
      </ul>
      {selectedMovieDetails && <MovieDetails movie={selectedMovieDetails} />}
    </div>
  );
}
