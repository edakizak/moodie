import { GrNext } from "react-icons/gr";
import styles from "./NextButton.module.css";

export default function NextButton({ handleNext, disabled }) {
  return (
    <button
      onClick={handleNext}
      disabled={disabled}
      className={styles.nextbutton}
    >
      <GrNext />
    </button>
  );
}
