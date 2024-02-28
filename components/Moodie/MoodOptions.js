import React, { useState } from "react";
import styles from "./MoodOptions.module.css";
import Tag from "../Tag/Tag";

export default function MoodOptions({ onMoodChange, genres }) {
  const [mood, setMood] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const moodOptions = [
    { value: "bored 😑", label: "bored 😑" },
    { value: "joyful 🥳", label: "joyful 🥳" },
    { value: "curious 🧐", label: "curious 🧐" },
    { value: "sad 😞", label: "sad 😞" },
    { value: "dreamy 🫠", label: "dreamy 🫠" },
    { value: "rhythmic 🕺🏼", label: "rhythmic 🕺🏼" },
    { value: "nostalgic 📜", label: "nostalgic 📜" },
    { value: "loving 🥰", label: "loving 🥰" },
    { value: "familial 🧸", label: "familial 🧸" },
  ];

  const handleMoodChange = (selectedMoodValue) => {
    setMood(selectedMoodValue);
    setIsOpen(false);
    onMoodChange(selectedMoodValue);
  };

  return (
    // <div className={styles.container}>
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.dropbtn}>
        {mood || "✨ mood ✨"}
      </button>
      {isOpen && (
        <ul className={styles.dropdownContent}>
          {moodOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                handleMoodChange(option.value);
                setIsOpen(false);
              }}
              className={styles.dropdownItem}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.tagsContainer}>
        {genres?.map((genre) => (
          <Tag key={genre.id} genre={genre.name} />
        ))}
      </div>
    </div>
  );
}
