import React, { useState, useEffect } from "react";
import styles from "./MoodBox.module.css";
import TopRatedMovies from "../TopRated/TopRated";
import Carousel from "../Carousel/Carousel";
import MoodOptions from "./MoodOptions";

export default function MoodBox() {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

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
        <p className={styles.paragraph2}>
          {moodPrefix}
          <MoodOptions onMoodChange={handleMoodSelection} />
          {moodSuffix}
        </p>
        <p className={styles.paragraph3}>Your film fest awaits!</p>
      </div>
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
