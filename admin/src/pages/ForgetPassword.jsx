import React, { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";

export default function ForgetPassword() {
  const { forgotPassword, msg, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setEmail("");
  };

  if (loading) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-white/70 dark:bg-slate-900/70">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-3 shadow-lg dark:bg-slate-600">
        <div className="mb-6 text-center">
          <FaEnvelope className="mx-auto mb-2 h-12 w-12 text-white" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Forgot Password?
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter your email address to reset your password.
          </p>
        </div>

        {msg?.success == false && (
          <div className="flex items-center gap-3 rounded bg-[#fdeded] p-3">
            <MdErrorOutline className="text-[1.5rem] text-[#d74242]" />
            <p className="text-[1rem] text-[#d74242]">{msg?.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-[15px] font-[400] text-black dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-secondary w-full cursor-pointer rounded-lg py-2 font-semibold text-white shadow-md transition-all duration-300"
          >
            Get OTP
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm font-medium text-black hover:underline dark:text-white"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
