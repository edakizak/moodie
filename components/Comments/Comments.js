// import styles from "./Comments.module.css";

// export default function Comments({ name, content, timestamp }) {
//   return (
//     <div className={styles.container}>
//       <div className={styles.name}>{name}</div>
//       <div className={styles.content}>{content}</div>
//       <div className={styles.timestamp}>{timestamp}</div>
//     </div>
//   );
// }

import styles from "./Comments.module.css";

// Comments bileşeni tüm yorumları listelemek için
export default function Comments({ comments }) {
  // Comment bileşeni individual yorumlar için
  const Comment = ({ name, content, timestamp }) => {
    return (
      <div className={styles.container}>
        <div className={styles.name}>{name}</div>
        <div className={styles.content}>{content}</div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    );
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          name={comment.name}
          content={comment.comment}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
}
