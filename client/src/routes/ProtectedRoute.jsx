import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);

  /**
   * check user is valid or not
   */
  const userVerify = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/auth/verify-user`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        }
      );
      if (res.status == 200) {
        setValid(true);
      }
    } catch (error) {
      console.log(error);
      setValid(false);
    } finally {
      setLoading(false); // Stop loading after verification
    }
  };

  useEffect(() => {
    userVerify();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (valid) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
