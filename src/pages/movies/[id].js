// pages/movies/[id].js
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import MovieDetails from "../../../components/MovieDetails/MovieDetails";

// export default function MovieDetails() {
//   const [movieDetails, setMovieDetails] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     async function fetchMovieDetails(movieId) {
//       if (!movieId) return;
//       const response = await fetch(`/api/movie?id=${movieId}`);
//       const details = await response.json();
//       setMovieDetails(details);
//     }

//     fetchMovieDetails(id);
//   }, [id]);

//   if (!movieDetails) return <div>Loading...</div>;

//   return <MovieDetails />;
// }
async function fetchMovieDetails(movieId) {
  try {
    if (!movieId) return;
    const response = await fetch(`/api/movie?id=${movieId}`);
    if (!response.ok) {
      throw new Error(`Data fetch failed with status ${response.status}`);
    }
    const details = await response.json();
    setMovieDetails(details);
  } catch (error) {
    console.error("Fetching movie details failed:", error);
  }
}
