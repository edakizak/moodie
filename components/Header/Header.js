import styles from "./Header.module.css";
import SearchBox from "../SearchBox/SearchBox";

export default function Header({ onSearch }) {
  return (
    <div className={styles.HeaderContainer}>
      <p className={styles.moodie}> moodie </p>
      <div className={styles.SearchBox}>
        <SearchBox onSearch={onSearch} />
      </div>
    </div>
  );
}
