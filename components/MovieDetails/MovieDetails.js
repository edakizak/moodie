import styles from "./MovieDetails.module.css"; // Stil dosyasını import edin

export default function MovieDetails({ movie }) {
  if (!movie) return null;

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.overview}>{movie.overview}</p>
      <p className={styles.info}>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className={styles.info}>
        <strong>Genres:</strong>
        <span className={styles.genres}>
          {movie.genres?.map((genre) => genre.name).join(", ")}
        </span>
      </p>
    </div>
  );
}
