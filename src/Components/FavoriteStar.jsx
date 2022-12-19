import { FaStar } from "react-icons/fa";
import styles from "../Styles/PeliculasCard.module.css";

export const FavoriteStar = ({ active, onClick }) => {
  const color = active ? "#ffeb66" : "#e0e0e0";
  return (
    <>
      <FaStar
        color={color}
        size={18}
        className={styles.iconStar}
        onClick={onClick}
      />
    </>
  );
};
