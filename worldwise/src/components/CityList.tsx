import CityItem from "./CityItem";
import { useCities } from "../contexts/CityContext";
import { city } from "../contexts/types";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, loading } = useCities();
  console.log(...cities);
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <div className={styles.cityList}>
      {cities.map((city: city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
