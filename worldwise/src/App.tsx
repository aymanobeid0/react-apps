/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes } from "react-router";

// import PageNav from "./components/PageNav";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { useParams } from "react-router";
import Form from "./components/Form";

const BaseUrl = "http://localhost:4000";
type city = {
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
type cities = city[];
function App() {
  // const location = useLocation();

  const [cities, setCities] = useState<cities>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {/* <PageNav /> */}
      <Routes>
        <Route index element={<Homepage />} />

        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={loading} />}
          />
          {/* <Route index element={<Navigate replace to="cities" />} /> */}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={loading} />}
          />
          <Route path="cities/:id" element={<City />} />

          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={loading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default App;
