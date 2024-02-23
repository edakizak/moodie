import styles from "./Comment.module.css";

export default function Comment({ name, content, timestamp }) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.timestamp}>
        {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
}
