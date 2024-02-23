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
    setIsSubmitting(true); // Gönderim işlemi başladığında UI'ı kilitle
    try {
      await addComment(commentText, movieId, name, isSpoiler);
      // Başarılı gönderim sonrası formu temizle
      setCommentText("");
      setName("");
      setIsSpoiler(false);
      alert("Comment added successfully! 🎬 ");
    } catch (error) {
      // Hata yönetimi
      console.error("Failed to add comment:", error);
      alert("Failed to add comment.");
    } finally {
      setIsSubmitting(false); // Her durumda UI kilidini aç
    }
  };
  const handleToggle = () => {
    setIsSpoiler(!isSpoiler);
  };

  return (
    <form className={styles.newCommentContainer} onSubmit={handleSubmit}>
      {/* <img src="path-to-profile-icon.png" alt="Profile Icon" class="profileIcon" /> */}
      <input type="hidden" value={movieId} name="movieId"></input>
      <input
        className={styles.userName}
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Your name"
        disabled={isSubmitting}
      ></input>
      <textarea
        className={styles.newCommentTextarea}
        placeholder="Add a comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        name="comment"
        aria-label="Add a comment"
        disabled={isSubmitting}
      />
      <button
        className={styles.newCommentButton}
        type="submit"
        disabled={isSubmitting}
      >
        <FaArrowUp />
      </button>
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
    </form>
  );
}
