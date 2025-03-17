import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Rootlayout from "./layouts/Rootlayout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import OrdersPage from "./pages/OrdersPage";
import AllCategory from "./pages/AllCategory";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootlayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-category"
            element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-categories"
            element={
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-products"
            element={
              <ProtectedRoute>
                <AllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
