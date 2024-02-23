import styles from "./Comment.module.css";
import React, { useState } from "react";

export default function Comment({ name, content, timestamp, isSpoiler }) {
  const [showSpoiler, setShowSpoiler] = useState(false);
  const toggleSpoiler = () => setShowSpoiler(!showSpoiler);

  const date = new Date(timestamp);
  const dateString = isNaN(date.getTime()) ? "Invalid" : date.toLocaleString();
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      {/* <div className={styles.content}>{content}</div> */}
      <div
        className={`${styles.content} ${
          isSpoiler && !showSpoiler ? styles.blur : ""
        }`}
        onClick={isSpoiler ? toggleSpoiler : undefined}
      >
        {isSpoiler && !showSpoiler ? "Spoiler" : content}
      </div>
      <div className={styles.timestamp}>{dateString}</div>
    </div>
  );
}
