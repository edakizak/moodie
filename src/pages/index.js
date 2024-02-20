import { useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Card from "../../components/Card/Card";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (searchTerm) => {
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  return (
    <div>
      <SearchBox onSearch={searchMovies} />
      <ul>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
