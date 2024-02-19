import MenuItem from "../MenuItem/MenuItem";
import { GoHomeFill } from "react-icons/go";
import { BiCameraMovie } from "react-icons/bi";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <div>
      <div className={styles.header}>
        <MenuItem
          className={styles.home}
          title="Home"
          address="/"
          Icon={GoHomeFill}
        />
        <MenuItem
          className={styles.page}
          title="Page"
          address="/page"
          Icon={BiCameraMovie}
        />
      </div>
      <div>
        <Link href="/"></Link>
      </div>
    </div>
  );
}
