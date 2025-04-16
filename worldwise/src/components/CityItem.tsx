import { Link } from "react-router";
import styles from "./CityItem.module.css";
type City = {
  cityName?: string;
  country?: string;
  emoji?: string;
  date?: string; // أو يمكن استخدام نوع Date إذا كنت تريد التعامل مع التواريخ ككائنات تاريخية.
  notes?: string;
  position?: {
    lat: number;
    lng: number;
  };
  id?: number;
};

const formatDate = (date: string) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(newDate);
};

function CityItem({ city }: { city: City }) {
  const { cityName, emoji, date, id, position } = city;
  console.log(id);
  return (
    <li>
      <Link
        to={`cities/${id}?lat=${position?.lat}&lng=${position?.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date!)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
