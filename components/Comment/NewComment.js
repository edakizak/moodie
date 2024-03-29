import React, { useState } from "react";
import styles from "./NewComment.module.css";
import { FaArrowUp, FaToggleOn, FaToggleOff } from "react-icons/fa6";

export default function NewComment({ addComment, movieId }) {
  const [commentText, setCommentText] = useState("");
  const [name, setName] = useState(""); // user name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !name.trim()) return;
    setIsSubmitting(true);
    try {
      await addComment(commentText, movieId, name, isSpoiler);
      setCommentText("");
      setName("");
      setIsSpoiler(false);
      alert("Comment added successfully! 🎬 ");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = () => {
    setIsSpoiler(!isSpoiler);
  };

  console.log("NewComment-isSpoiler:", isSpoiler);

  return (
    <div className={styles.container}>
      <form className={styles.newCommentContainer} onSubmit={handleSubmit}>
        <input type="hidden" value={movieId} name="movieId"></input>
        <input
          className={styles.userName}
          type="text"
          placeholder="Your Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          disabled={isSubmitting}
        ></input>
        <textarea
          className={styles.newCommentTextarea}
          type="text"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          name="comment"
          aria-label="Add a comment"
          disabled={isSubmitting}
        />
        <div className={styles.buttons}>
          <div className={styles.spoilerContainer}>Spoiler</div>
          <button
            type="button"
            className={`${styles.toggleButton} ${
              isSpoiler ? styles.isSpoilerOn : ""
            }`}
            onClick={handleToggle}
            aria-label="Toggle spoiler"
            disabled={isSubmitting}
          >
            {isSpoiler ? <FaToggleOn /> : <FaToggleOff />}
          </button>
          <button
            className={styles.newCommentButton}
            type="submit"
            disabled={isSubmitting}
          >
            <FaArrowUp />
          </button>
        </div>
      </form>
    </div>
  );
}
