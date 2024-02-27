import React, { useState } from "react";
import Image from "next/image";
import styles from "./MoodBox.module.css";
import PrevButton from "../Button/PrevButton";
import NextButton from "../Button/NextButton";

export default function SearchBox({ movie }) {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const handlePrev = () => {
    // Carousel Prev
    setActiveIndex((prevActiveIndex) => Math.max(prevActiveIndex - 1, 0));
  };

  const handleNext = () => {
    // Carousel Next
    setActiveIndex((nextActiveIndex) =>
      Math.min(nextActiveIndex + 1, movies.length - 1)
    );
  };
  const cardWidth = 500;
  const cardMargin = 20;
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
        {movies.length > 0 ? (
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
            {movies.map((movie) => (
              <li
                key={movie.id}
                className={styles.movieli}
                style={{
                  marginRight: `${cardMargin}px`,
                  flex: "0 0 auto",
                  width: `${cardWidth}px`,
                  cursor: "pointer",
                }}
              >
                {movie.poster_path && (
                  <div className={styles.imageWrapper}>
                    <Image
                      className={styles.movieImage}
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      layout="fill"
                    />
                  </div>
                )}
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found. Try selecting a mood!</p>
        )}
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
            disabled={activeIndex >= movies.length - 3}
          />
        </div>
      </div>
    </div>
  );
}
