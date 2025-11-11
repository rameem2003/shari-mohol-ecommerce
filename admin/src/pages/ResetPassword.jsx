import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import Loader from "../components/common/Loader";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let token = searchParams.get("token");

  const { passwordReset, verifyResetPasswordToken, msg, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await passwordReset(token, formData.newPassword, formData.confirmPassword);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    verifyResetPasswordToken(token);
  }, [token]);

  if (loading) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-white/70 dark:bg-slate-900/70">
        <Loader />
      </div>
    );
  } else if (msg?.success === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <div className="mb-2 flex justify-center">
              <FaLock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Token Invalid
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              The password reset link is invalid or has expired.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-slate-900">
      <div className="bbg-white w-full max-w-md rounded-2xl p-3 shadow-lg dark:bg-slate-600">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <FaLock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Create New Password
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your new password.
          </p>
        </div>

        <div className="mt-6">
          {msg?.success == false && (
            <div className="flex items-center gap-3 rounded bg-[#fdeded] p-3">
              <MdErrorOutline className="text-[1.5rem] text-[#d74242]" />
              <p className="text-[1rem] text-[#d74242]">{msg?.message}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password */}
            <div className="relative">
              <label
                className="text-[15px] font-[400] text-black dark:text-white"
                htmlFor="newPassword"
              >
                Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                required
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* confirm Password */}
            <div className="relative">
              <label
                className="text-[15px] font-[400] text-black dark:text-white"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
                className="border-border focus:border-primary mt-1 w-full rounded-md border px-4 py-3 outline-none transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="bg-primary hover:bg-secondary w-full cursor-pointer rounded-lg py-2 font-semibold text-white shadow-md transition-all duration-300"
            >
              Reset Password
            </button>

            {/* Resend Link */}
            <Link
              to="/forgot"
              className="block px-3 py-2 text-center text-sm text-black hover:underline dark:text-white"
            >
              Try Again.
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
