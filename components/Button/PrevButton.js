import { GrPrevious } from "react-icons/gr";
import styles from "./PrevButton.module.css";

export default function PrevButton({ handlePrev, disabled }) {
  return (
    <button
      className={styles.prevbutton}
      onClick={handlePrev}
      disabled={disabled}
    >
      <GrPrevious />
    </button>
  );
}
