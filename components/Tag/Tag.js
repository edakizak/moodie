import styles from "./Tag.module.css";
export default function Tag({ genre }) {
  return (
    <div>
      <p className={styles.tag}> {genre} </p>
    </div>
  );
}
