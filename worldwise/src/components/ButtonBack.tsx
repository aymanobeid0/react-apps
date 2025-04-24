import { useNavigate } from "react-router";
import styles from "./ButtonBack.module.css";

function ButtonBack() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.back}>
      ← Go back
    </button>
  );
}

export default ButtonBack;
