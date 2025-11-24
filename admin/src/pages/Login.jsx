import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const { loading, login, msg } = useAuth();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100 p-2 dark:bg-slate-900">
      <div className="w-[500px] max-w-[500px] rounded-md bg-white p-3 shadow-lg dark:bg-slate-600">
        <h1 className="mb-2 text-center text-5xl font-semibold text-black dark:text-white">
          Shari Mohol
        </h1>
        <h2 className="text-center text-xl font-semibold text-black dark:text-white">
          Welcome Admin
        </h2>
        <h2 className="text-center text-xl font-semibold text-black dark:text-white">
          Login Here
        </h2>

        {/* login form */}
        <form className="mt-8" action="" onSubmit={handleSubmit}>
          {/* validation error */}
          {msg?.success == false && (
            <div className="flex items-center gap-3 rounded bg-[#fdeded] p-3">
              <MdErrorOutline className="text-[1.5rem] text-[#d74242]" />
              <p className="text-[1rem] text-[#d74242]">{msg?.message}</p>
            </div>
          )}
          <div className="mb-2 w-full">
            <label
              htmlFor="email"
              className="text-[15px] font-[400] text-black dark:text-white"
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
              className="mt-1 w-full rounded-md border border-border px-4 py-3 outline-none transition-colors duration-300 focus:border-primary"
            />
          </div>

          <div className="mb-2 w-full">
            <label
              htmlFor="password"
              className="text-[15px] font-[400] text-black dark:text-white"
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
                className="peer mt-1 w-full rounded-md border border-border py-3 pl-4 pr-12 outline-none transition-colors duration-300 focus:border-primary"
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

          <button
            disabled={loading}
            className="w-full rounded border border-primary bg-primary px-6 py-2 text-[#fff] transition duration-300 hover:bg-secondary"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <div className="mt-2">
            <Link
              to="/forgot"
              className="block text-right text-sm font-medium text-black hover:underline dark:text-white"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
      <p className="fixed bottom-2 right-2 font-semibold italic text-black dark:text-white">
        Developed by:{" "}
        <a
          href="https://rolstudiobangladesh.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ROL Studio Bangladesh || Mahmood Hassan Rameem
        </a>
      </p>
    </main>
  );
};

export default Login;
