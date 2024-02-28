import styles from "./MovieDetailsMore.module.css";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";

export default function MovieDetailsMore({ movie }) {
  const router = useRouter();
  if (!movie) return null;

  return (
    <div>
      <button onClick={() => router.back()} className={styles.backbutton}>
        <IoChevronBackOutline />
      </button>
      <div className={styles.container}>
        <div className={styles.gradient}></div>
        <Image
          className={styles.cardImage}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={200}
        />
        <div className={styles.detailsContainer}>
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
            {movie.runtime} min
          </p>
          <p className={styles.imdbRate}>
            <strong>Imdb Rating: </strong>
            {Math.floor(movie.vote_average * 10) / 10}
          </p>
          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
