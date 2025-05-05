import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Countries from "./pages/app/Countries";
import Cities from "./pages/app/Cities";
import AppLayout from "./components/AppLayout";
import CityInfo from "./pages/app/CityInfo";
import Form from "./pages/app/Form";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
      <Route
        path="app"
        element={
          <ProtectedRoutes>
            <AppLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Cities />} />
        <Route path="countries" element={<Countries />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cities/:id" element={<CityInfo />} />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
