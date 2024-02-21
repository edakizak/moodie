import React, { useState } from "react";
import styles from "./OpenAiSearchBox.module.css";
import { CiSearch } from "react-icons/ci";

export default function OpenAiSearchBox({ onSearch }) {
  const [mood, setMood] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(mood);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your mood..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button className={styles.button} type="submit">
        <CiSearch />
      </button>
    </form>
  );
}
