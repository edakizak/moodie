import styles from "./Header.module.css";
import SearchBox from "../SearchBox/SearchBox";

export default function Header({ onSearch }) {
  return (
    <div className={styles.container}>
      <div className={styles.moodieContainer}>
        <p className={styles.moodie}> moodie </p>
      </div>
      <div className={styles.SearchBox}>
        <SearchBox onSearch={onSearch} />
      </div>
    </div>
  );
}
