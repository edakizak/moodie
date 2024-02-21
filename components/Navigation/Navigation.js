import MenuItem from "../MenuItem/MenuItem";
import Link from "next/link";
import styles from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <nav>
      <div className={styles.navigation}>
        <MenuItem
          className={styles.home}
          title="home"
          address="/"
          showIcon={true}
        />
        <MenuItem
          className={styles.page}
          title="moodie"
          address="/moodie"
          showIcon={false}
        />
      </div>
      <div>
        <Link href="/"></Link>
      </div>
    </nav>
  );
}
