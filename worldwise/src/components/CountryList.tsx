import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
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
type Country = {
  country: string;
  emoji: string;
};

function CountryList({
  cities,
  isLoading,
}: {
  cities: CityList;
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr: Country[], city: City) => {
    if (
      city.country &&
      city.emoji &&
      !arr.some((el) => el.country === city.country)
    ) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
