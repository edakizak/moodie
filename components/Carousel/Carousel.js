import React, { useState } from "react";
import Card from "../Card/Card";
import MovieDetails from "../MovieDetails/MovieDetails";
import PrevButton from "../Button/PrevButton";
import NextButton from "../Button/NextButton";
import styles from "../Card/Card.module.css";

export default function Carousel({
  movies,
  fetchMovieDetails,
  selectedMovieDetails,
  activeMovie,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevActiveIndex) => Math.max(prevActiveIndex - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) =>
      Math.min(prevActiveIndex + 1, movies.length - 1)
    );
  };

  const cardWidth = 460;
  const cardMargin = 20;

  return (
    <div style={{ display: "flex", marginTop: "20px", position: "relative" }}>
      <PrevButton handlePrev={handlePrev} disabled={activeIndex === 0} />
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <ul
          style={{
            display: "flex",
            padding: 0,
            marginLeft: `-${activeIndex * (cardWidth + cardMargin * 2)}px`, // Carousel slide
            transition: "margin-left 0.5s",
            position: "relative",
          }}
        >
          {movies.map((movie, idx) => (
            <li
              key={movie.id}
              className={styles.cardContainer}
              onClick={() => fetchMovieDetails(movie.id, idx)}
              style={{
                marginRight: `${cardMargin}px`,
                flex: "0 0 auto",
                width: `${cardWidth}px`,
              }}
            >
              <Card movie={movie} />
              {activeMovie === idx && selectedMovieDetails && (
                <MovieDetails movie={selectedMovieDetails} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <NextButton
        handleNext={handleNext}
        disabled={activeIndex >= movies.length - 1}
      />
    </div>
  );
}
