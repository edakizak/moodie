import React, { useState, useEffect } from "react";
import styles from "./MoodBox.module.css";
import TopRatedMovies from "../TopRated/TopRated";
import Carousel from "../Carousel/Carousel";
import MoodOptions from "./MoodOptions";
import Image from "next/image";

export default function MoodBox() {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [movieGenre, setMovieGenre] = useState("");

  useEffect(() => {
    if (mood) {
      fetchMovies(mood);
    }
  }, [mood]);

  const fetchMovieDetails = async (movieId, idx) => {
    const response = await fetch(`/api/movie/${movieId}`);
    const details = await response.json();
    setSelectedMovieDetails(details);
    setActiveMovie(idx);
  };

  const genreNames = {
    28: "Action",
    35: "Comedy",
    16: "Fantasy",
    12: "Adventure",
    14: "Fantasy",
    10402: "Music",
    36: "History",
    10749: "Romance",
    10751: "Family",
  };

  const fetchMovies = async (selectedMood) => {
    const response = await fetch("/api/moodie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: selectedMood }),
    });

    if (!response.ok) {
      console.error("Something went wrong");
      return;
    }

    const data = await response.json();

    setMovies(data);
    if (data.length > 0 && data[0].genre_ids) {
      const filteredGenres = data[0].genre_ids
        .filter((id) => genreNames[id])
        .map((id) => genreNames[id]);
      setMovieGenre(filteredGenres.join(" | "));
    }
  };

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    fetchMovies(selectedMood);
  };

  const moodPrefix = mood ? "I feel" : "How's your";
  const moodSuffix = mood ? "today." : "today?";

  return (
    <div className={styles.container}>
      <div className={styles.headercontainer}>
        <p className={styles.paragraph1}>Hey there! 🎬 🍿</p>
        {!mood && (
          <span className={styles.arrowIcon}>
            <Image
              src="/assets/arrow.png"
              alt="Arrow Icon"
              width={200}
              height={200}
            />
          </span>
        )}
        {!mood && <p className={styles.click}>click</p>}
        <p className={styles.paragraph2}>
          {moodPrefix}
          <MoodOptions onMoodChange={handleMoodSelection} />
          {moodSuffix}
        </p>
        <p className={styles.paragraph3}>Your film fest awaits!</p>
      </div>
      {movies.length > 0 ? (
        <div>
          <h1 className={styles.genre}>{movieGenre}</h1>
          <Carousel
            movies={movies}
            fetchMovieDetails={fetchMovieDetails}
            selectedMovieDetails={selectedMovieDetails}
            activeMovie={activeMovie}
          />
        </div>
      ) : (
        <TopRatedMovies />
      )}
    </div>
  );
}
