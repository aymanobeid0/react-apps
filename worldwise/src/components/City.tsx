/* eslint-disable @typescript-eslint/no-unused-vars */

import styles from "./City.module.css";
import { useCities } from "../contexts/CityContext";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";
import { useEffect } from "react";
import { useParams } from "react-router";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
function City() {
  const { id } = useParams();
  const { currentCity, getCity } = useCities();

  useEffect(() => {
    if (id) getCity(+id); // تأكد من استدعاء getCity لعرض البيانات
  }, [id, getCity]);

  if (!currentCity) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <div>
          <p>{date ? formatDate(new Date(date)) : <Spinner />}</p>
        </div>
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

// function City() {
//   // const { cities, loading } = useCities();

//   const { currentCity } = useCities();
//   const { cityName, emoji, date, notes } = currentCity;
//   console.log("Date from currentCity:", currentCity?.date);

//   return (
//     // <div>City {+id!}</div>

//     <div className={styles.city}>
//       <div className={styles.row}>
//         <h6>City name</h6>
//         <h3>
//           <span>{emoji}</span> {cityName}
//         </h3>
//       </div>

//       <div className={styles.row}>
//         <h6>You went to {cityName} on</h6>
//         <div>
//           <p>{date ? formatDate(new Date(date!)) : <Spinner />}</p>
//         </div>
//       </div>

//       {notes && (
//         <div className={styles.row}>
//           <h6>Your notes</h6>
//           <p>{notes}</p>
//         </div>
//       )}

//       <div className={styles.row}>
//         <h6>Learn more</h6>
//         <a
//           href={`https://en.wikipedia.org/wiki/${cityName}`}
//           target="_blank"
//           rel="noreferrer"
//         >
//           Check out {cityName} on Wikipedia →
//         </a>
//       </div>

//       <div>
//         <ButtonBack />
//       </div>
//     </div>
//   );
// }

// export default City;
