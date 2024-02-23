import styles from "./Header.module.css";
import SearchBox from "../SearchBox/SearchBox";

export default function Header({ onSearch }) {
  return (
    <header className={styles.HeaderContainer}>
      <SearchBox className={styles.SearchBox} onSearch={onSearch} />
    </header>
  );
}
