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
import AdvertisementPage from "./pages/AdvertisementPage";
import UsersManage from "./pages/UsersManage";
import ViewProfile from "./pages/ViewProfile";
import ViewOrder from "./pages/ViewOrder";
import ProfilePage from "./pages/ProfilePage";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

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
          <Route
            path="/advertisement"
            element={
              <ProtectedRoute>
                <AdvertisementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageUsers"
            element={
              <ProtectedRoute>
                <UsersManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <ViewOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
