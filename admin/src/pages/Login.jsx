import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
// react icons
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { adminLoginReducer } from "../redux/features/AdminSlice";

const Login = () => {
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // navigation instance
  const dispatch = useDispatch(); // dispatch instance

  console.log(accessToken, sessionToken);

  useEffect(() => {
    if (accessToken || sessionToken) {
      navigate("/");
    }
  }, []);

  // function for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let userData = {
      email,
      password,
    };

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/login`,
        userData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setLoading(false);

      if (res.data.user.role == "admin") {
        dispatch(adminLoginReducer(res.data.user));
        navigate("/");
      } else {
        setError("You are not an admin");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 p-2 dark:bg-slate-900">
      <div className="w-[500px] max-w-[500px] rounded-md bg-white p-3 shadow-lg dark:bg-slate-600">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Welcome Admin
        </h2>
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Login Here
        </h2>

        {/* login form */}
        <form className="mt-8" action="" onSubmit={handleSubmit}>
          {/* validation error */}
          {error && (
            <div className="flex items-center gap-3 rounded bg-[#fdeded] p-3">
              <MdErrorOutline className="text-[1.5rem] text-[#d74242]" />
              <p className="text-[1rem] text-[#d74242]">{error}</p>
            </div>
          )}
          <div className="mb-2 w-full">
            <label
              htmlFor="email"
              className="text-text text-[15px] font-[400] text-black dark:text-white"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
            />
          </div>

          <div className="mb-2 w-full">
            <label
              htmlFor="password"
              className="text-text text-[15px] font-[400] text-black dark:text-white"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border-border focus:border-primary peer mt-1 w-full rounded-md border py-3 pl-4 pr-12 outline-none transition-colors duration-300"
              />
              {isEyeOpen ? (
                <IoEyeOutline
                  className="absolute right-4 top-4 cursor-pointer text-[1.5rem] text-[#777777]"
                  onClick={() => setIsEyeOpen(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="absolute right-4 top-4 cursor-pointer text-[1.5rem] text-[#777777]"
                  onClick={() => setIsEyeOpen(true)}
                />
              )}
            </div>
          </div>

          <button className="bg-primary hover:bg-secondary w-full rounded border border-[#3B9DF8] bg-[#3B9DF8] px-6 py-2 text-[#fff] transition duration-300">
            Sign in
          </button>
        </form>
      </div>
      <p className="fixed bottom-2 right-2 font-semibold italic text-black dark:text-white">
        Developed by:{" "}
        <a
          href="https://www.facebook.com/rolstudiobangladesh"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          ROL Studio Bangladesh || Mahmood Hassan Rameem
        </a>
      </p>
    </main>
  );
};

export default Login;
