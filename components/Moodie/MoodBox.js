import React, { useState } from "react";
import styles from "./MoodBox.module.css";
import TopRatedMovies from "../TopRated/TopRated";
import Carousel from "../Carousel/Carousel";

export default function SearchBox() {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

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

  const handleMoodChange = (event) => {
    const selectedMood = event.target.value;
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
          <select
            value={mood}
            onChange={handleMoodChange}
            className={styles.select}
          >
            <option value="" className={styles.option1}>
              ✨mood✨
            </option>
            <option value="bored" className={styles.option2}>
              bored 😑
            </option>
            <option value="joyful" className={styles.option3}>
              joyful 🥳
            </option>
            <option value="curious" className={styles.option4}>
              curious 🧐
            </option>
            <option value="sad" className={styles.option5}>
              sad 😞
            </option>
            <option value="dreamy" className={styles.option6}>
              dreamy 🫠
            </option>
            <option value="rhythmic" className={styles.option7}>
              rhythmic 🕺🏼
            </option>
            <option value="nostalgic" className={styles.option8}>
              nostalgic 📜
            </option>
            <option value="loving" className={styles.option9}>
              loving 🥰
            </option>
            <option value="familial" className={styles.option10}>
              familial 🧸
            </option>
          </select>
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
