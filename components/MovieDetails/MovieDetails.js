import styles from "./MovieDetails.module.css";
import Link from "next/link";

export default function MovieDetails({ movie }) {
  if (!movie) return null;
  // Metni kelimeye göre böl ve ilk 200 kelimeyi al
  const words = movie.overview.split(" ");
  const limitedOverview = words.slice(0, 20).join(" ");
  // Eğer metin 200 kelimeden fazla ise "..." ekleyerek kısalt

  const shouldShowMore = words.length > 20;
  const displayedOverview = shouldShowMore
    ? `${limitedOverview}...`
    : limitedOverview;

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

      <p className={styles.overview}>{displayedOverview}</p>
      {shouldShowMore && (
        <Link href={`/movies/${movie.id}`}>
          <button className={styles.button}>More</button>
        </Link>
      )}
    </div>
  );
}
