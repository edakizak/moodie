import React, { useState } from "react";
import styles from "./OpenAiSearchBox.module.css";
import { CiSearch } from "react-icons/ci";

export default function OpenAiSearchBox() {
  const [mood, setMood] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const fetchRecommendation = async () => {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });

    const data = await response.json();
    if (data.success) {
      setRecommendation(data.data);
    } else {
      alert("Bir hata oluştu.");
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSearch(mood);

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your mood..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button
        className={styles.button}
        onClick={fetchRecommendation}
        type="submit"
      >
        <CiSearch />
      </button>
      {recommendation && <div>recommendation: {recommendation}</div>}
    </form>
  );
}
