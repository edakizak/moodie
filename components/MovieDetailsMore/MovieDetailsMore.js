import styles from "./MovieDetailsMore.module.css";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/router";

export default function MovieDetailsMore({ movie }) {
  const router = useRouter();
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Image
        className={styles.cardImage}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={200}
      />
      <div className={styles.detailsContainer}>
        <button onClick={() => router.back()} className={styles.backbutton}>
          Back
        </button>

        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.info}>
          <strong>Release Date: </strong>
          <span className={styles.date}>{movie.release_date}</span>
        </p>
        <p className={styles.info}>
          <strong>Genres: </strong>
          <span className={styles.genres}>
            {movie.genres?.map((genre) => genre.name).join(", ")}
          </span>
        </p>
        <p className={styles.runtime}>
          <strong>Runtime: </strong>
          {movie.runtime} dk
        </p>
        <p className={styles.imdbRate}>
          <strong>Imdb Rate: </strong>
          {movie.vote_average}
        </p>
        <p className={styles.overview}>{movie.overview}</p>
      </div>
    </div>
  );
}
