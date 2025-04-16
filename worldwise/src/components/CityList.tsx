import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

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

type CityList = City[]; // أو يمكنك استخدام Array<City>

function CityList({
  cities,
  isLoading,
}: {
  cities: CityList;
  isLoading: boolean;
}) {
  console.log(...cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <div className={styles.cityList}>
      {cities.map((city: City) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
