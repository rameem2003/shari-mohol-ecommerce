import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import ForgetPassword from "./pages/ForgetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTP />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
