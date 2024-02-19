import MenuItem from "../MenuItem/MenuItem";
// import { GoHomeFill } from "react-icons/go";
// import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";
import styles from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <nav>
      <div className={styles.navigation}>
        <MenuItem
          className={styles.home}
          title="Home"
          address="/"
          // Icon={GoHomeFill}
          showIcon={true}
        />
        <MenuItem
          className={styles.page}
          title="Page"
          address="/page"
          // Icon={BiCameraMovie}
          showIcon={false}
        />
      </div>
      <div>
        <Link href="/"></Link>
      </div>
    </nav>
  );
}
