import { createContext, useEffect, useState, useContext } from "react";
import { BaseUrl } from "../constants";
import { data, cities, city } from "./types";

const CityContext = createContext<data>({
  cities: [],
  loading: false,
  getCity: async () => {},
  currentCity: {},
});

function CityProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<cities>([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<city>({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BaseUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("error loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCity(id: number) {
    try {
      setLoading(true);
      const res = await fetch(`${BaseUrl}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      console.log("error loading data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CityContext.Provider value={{ cities, loading, getCity, currentCity }}>
      {children}
    </CityContext.Provider>
  );
}
function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used outside of CityProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCities };
