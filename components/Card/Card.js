import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ movie }) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";
  const genreNames = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "No Genre";
  return (
    <div className={styles.container}>
      <li key={movie.id} className={styles.cardContainer}>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            layout="fill"
          />
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{movie.title}</h3>
            <p className={styles.cardInfo}>{releaseYear}</p>
          </div>
        </div>
      </li>
    </div>
  );
}
