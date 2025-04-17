import CountryItem from "./CountryItem";
import { city } from "../contexts/types";
import { useCities } from "../contexts/CityContext";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

type Country = {
  country: string;
  emoji: string;
};

function CountryList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr: Country[], city: city) => {
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
      {countries.map((country: Country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
