import styles from "./Comment.module.css";

export default function Comment({ name, content, timestamp }) {
  console.log(timestamp);
  const date = new Date(timestamp);
  const dateString = isNaN(date.getTime()) ? "Invalid" : date.toLocaleString();
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.timestamp}>
        {/* {new Date(timestamp).toLocaleString()} */}
        {dateString}
      </div>
    </div>
  );
}
