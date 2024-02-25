import styles from "./Comment.module.css";
import React, { useState } from "react";
import Image from "next/image";

function timeAgo(timestamp) {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - commentDate) / 1000);

  if (isNaN(commentDate.getTime())) {
    return "Invalid date";
  }

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  if (diffInSeconds < secondsInMinute) {
    return "now";
  } else if (diffInSeconds < secondsInHour) {
    return `${Math.floor(diffInSeconds / secondsInMinute)} min ago`;
  } else if (
    diffInSeconds < secondsInDay &&
    now.getDate() === commentDate.getDate()
  ) {
    return `${commentDate.getHours()}:${commentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (diffInSeconds < secondsInDay) {
    return "1 day ago";
  } else {
    return `${Math.floor(diffInSeconds / secondsInDay)} days ago`;
  }
}

export default function Comment({ name, content, timestamp, isSpoiler }) {
  const [showSpoiler, setShowSpoiler] = useState(false);
  const toggleSpoiler = () => setShowSpoiler(!showSpoiler);

  // const date = new Date(timestamp);
  // const dateString = isNaN(date.getTime()) ? "Invalid" : date.toLocaleString();
  // Format the date using the timeAgo function
  const dateString = timeAgo(timestamp);
  return (
    <div className={styles.container}>
      <Image
        src="/assets/moodie-icon.png"
        alt="User Icon"
        class={styles.userIcon}
        width={50}
        height={50}
      />
      <div lassName={styles.container2}>
        <div className={styles.name}>{name}</div>
        <div className={styles.timestamp}>{dateString}</div>
        <div
          className={`${styles.content} ${
            isSpoiler && !showSpoiler ? styles.blur : ""
          }`}
          onClick={isSpoiler ? toggleSpoiler : undefined}
        >
          {isSpoiler && !showSpoiler ? "Spoiler" : content}
        </div>
      </div>
    </div>
  );
}
