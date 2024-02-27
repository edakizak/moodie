import React, { useState } from "react";
import Image from "next/image";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function SearchBox({ movie }) {
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <p>Hey there! How&apos;s your vibe today? 🎬🍿 Choose your current</p>
      <select value={mood} onChange={handleMoodChange}>
        <option value="">mood✨</option>
        <option value="bored">bored😑</option>
        <option value="joyful">joyful🥳</option>
        <option value="curious">curious🧐</option>
        <option value="sad">sad😞</option>
        <option value="dreamy">dreamy🫠</option>
        <option value="rhythmic">rhythmic🕺🏼</option>
        <option value="nostalgic">nostalgic📜</option>
        <option value="loving">loving🥰</option>
        <option value="familial">familial🧸</option>
      </select>
      <p>Let the movie magic begin!Your film fest awaits!</p>
      <div>
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <p>{movie.title}</p>
                {movie.poster_path && (
                  <Image
                    src={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title + " poster"}
                    width={500}
                    height={750}
                    layout="responsive"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found. Try selecting a mood!</p>
        )}
      </div>
    </div>
  );
}
