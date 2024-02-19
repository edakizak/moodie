import Link from "next/link";
import styles from "./MenuItem.module.css";
import Image from "next/image";

export default function MenuItem({ title, address, Icon }) {
  return (
    <div className={styles.menuItem}>
      <Image
        src="/assets/moodie-icon.png"
        alt="Moodie Icon"
        width={50}
        height={50}
      />
      <Link className={styles.link} href={address}>
        <Icon className={styles.icon} />
        <p>{title}</p>
      </Link>
    </div>
  );
}
