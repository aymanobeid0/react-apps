/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router";

// import PageNav from "./components/PageNav";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { CityProvider } from "./contexts/CityContext";
import Form from "./components/Form";

function App() {
  // const location = useLocation();

  return (
    <>
      {/* <PageNav /> */}
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />

            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<CityList />} />
              {/* <Route index element={<Navigate replace to="cities" />} /> */}
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </>
  );
}
export default App;
