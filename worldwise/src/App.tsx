/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from "react-router";

import PageNav from "./components/PageNav";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";

import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {
  // const location = useLocation();

  return (
    <>
      {/* <PageNav /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
