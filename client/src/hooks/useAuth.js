import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AccountReducer } from "../redux/slices/AccountSlice";

const useAuth = () => {
  const [msg, setMsg] = useState(null); // error message
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
  const handleLogout = async (id) => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/logout/${id}`
      );

      console.log(res);
      Cookies.remove("accessToken");
      Cookies.remove("sessionToken");
      dispatch(AccountReducer(""));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { login, handleRegister, handleLogout, msg };
};

export default useAuth;
