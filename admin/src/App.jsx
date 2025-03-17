import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Rootlayout from "./layouts/Rootlayout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import OrdersPage from "./pages/OrdersPage";
import AllCategory from "./pages/AllCategory";
import AllProducts from "./pages/AllProducts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/all-categories" element={<AllCategory />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
