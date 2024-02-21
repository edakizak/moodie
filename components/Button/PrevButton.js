import { GrPrevious } from "react-icons/gr";

export default function PrevButton({ handlePrev, disabled }) {
  return (
    <button onClick={handlePrev} disabled={disabled}>
      <GrPrevious />
    </button>
  );
}
