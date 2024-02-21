import styles from "./MovieDetailsMore.module.css";

export default function MovieDetailsMore({ movie }) {
  if (!movie) return null;

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.info}>
        <strong>Release Date:</strong>
        <span className={styles.date}>{movie.release_date}</span>
      </p>
      <p className={styles.info}>
        <strong>Genres:</strong>
        <span className={styles.genres}>
          {movie.genres?.map((genre) => genre.name).join(", ")}
        </span>
      </p>

      <p className={styles.overview}>{movie.overview}</p>
    </div>
  );
}
