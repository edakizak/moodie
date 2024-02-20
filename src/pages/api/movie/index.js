// import { useState, useEffect } from "react";
// import Card from "../../../components/Card/Card";
// import MovieDetails from "../../../components/MovieDetails/MovieDetails";

// export default function Movie() {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   // Örnek olarak, statik bir film listesi kullanıldı.
//   // Gerçek bir uygulamada, bu veriyi bir API'den çekebilirsiniz.
//   useEffect(() => {
//     const fetchMovies = async () => {
//       const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setMovies(data.results);
//       } catch (error) {
//         console.error("fetch error", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const handleSelectMovie = async (movieId) => {
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//     const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

//     try {
//       const response = await fetch(url);
//       const details = await response.json();
//       setSelectedMovie(details);
//     } catch (error) {
//       console.error("film error", error);
//     }
//   };

//   return (
//     <div>
//       {movies.map((movie) => (
//         <Card key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
//       ))}
//       {selectedMovie && (
//         <div>
//           <MovieDetails movie={selectedMovie} />
//         </div>
//       )}
//     </div>
//   );
// }
