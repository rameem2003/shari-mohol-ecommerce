import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router";
import Flex from "../components/common/Flex";
import Loader from "../components/common/Loader";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token

  const navigate = useNavigate(); // navigation instance
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);

  /**
   * check admin is valid or not
   */
  const adminVerify = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/auth/verify-admin`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        },
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
    adminVerify();
  }, []);

  if (loading) {
    return (
      <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
        <Loader />
      </Flex>
    );
  }
  if (valid) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
