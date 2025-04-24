import { useParams } from "react-router";
import styles from "./City.module.css";
import { useCities } from "../contexts/CityContext";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

// type city = {
//   cityName?: string;
//   country?: string;
//   emoji?: string;
//   date?: string; // أو يمكن استخدام نوع Date إذا كنت تريد التعامل مع التواريخ ككائنات تاريخية.
//   notes?: string;
//   position?: {
//     lat: number;
//     lng: number;
//   };
//   id?: number | undefined;
// };
const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { cities, loading } = useCities();
  const { id } = useParams();

  if (loading) return <Spinner />;
  const cityId = Number(id);
  const currentCity = cities.find((city) => city.id === cityId);
  if (!currentCity) return <p>City not found</p>;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    // <div>City {+id!}</div>

    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(new Date(date!))}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia →
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
