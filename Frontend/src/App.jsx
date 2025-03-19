import "./App.css";
import { ImageSlider } from "./Components/ImageSlider";
import { Navbar } from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Add } from "./Page/adminPage/Add";
import { Admin } from "./Page/adminPage/Admin";
import { List } from "./Page/adminPage/List";
import { Order } from "./Page/adminPage/Order";
import { Toaster } from "react-hot-toast";
import { Product } from "./Components/Product";
import { FeautureProduct } from "./Components/FeautureProduct";
import { Fooder } from "./Components/Fooder";
import { Regiter } from "./Components/Regiter";
import { Card } from "./Components/Card";
import { Products } from "./Components/Products";
import { Address } from "./Components/Address";
import { Success } from "./Components/Success";
import { Orders } from "./Components/Orders";
import { Cancel } from "./Components/Cancel";
import { CodSuccess } from "./Components/CodSuccess";

function AppContent() {
  const location = useLocation();
  const hiddenNavbarRoutes = [
    "/admin",
    "/admin/add",
    "/admin/list",
    "/admin/order",
    "/success=true",
  ];

  return (
    <>
      <Toaster />
      <Regiter />
      {/* Hide Navbar on specific routes */}
      {!hiddenNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSlider />
              <Product />
              <FeautureProduct />
              <Fooder />
            </>
          }
        />
        <Route path="/product/:id" element={<Products />} />
        <Route
          path="/shop"
          element={
            <>
              <Product />
              <div className="w-[100%] flex items-center justify-center py-5 border-t border-gray-400">
                <h1 className="text-gray-500">
                  Copyright 2025 © Shopify All Right Reserved.
                </h1>
              </div>
            </>
          }
        />
        <Route path="/card" element={<Card />} />
        <Route path="/address" element={<Address />} />
        <Route path="/csuccess" element={<CodSuccess />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/order" element={<Orders />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
