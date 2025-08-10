import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AccountReducer } from "../redux/slices/AccountSlice";

const useAuth = () => {
  const [msg, setMsg] = useState(null); // error message
  const user = useSelector((state) => state.account.account); // user
  const dispatch = useDispatch(); // dispatch instance
  const navigate = useNavigate(); // navigation instance

  // function for login
  const login = async (data) => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/login`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(AccountReducer(res.data.user));
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  // function for register
  const handleRegister = async (data) => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/register`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/verify-otp", { state: { key: res.data.user } });
      console.log(res);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  // function for logout
  const handleLogout = async () => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/logout/${user.id}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(res);
      Cookies.remove("accessToken", {
        path: "/",
        domain: "shari-mohol-ecommerce-server.onrender.com",
      });
      Cookies.remove("sessionToken", {
        path: "/",
        domain: "shari-mohol-ecommerce-server.onrender.com",
      });
      dispatch(AccountReducer(""));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { login, handleRegister, handleLogout, msg };
};

export default useAuth;
