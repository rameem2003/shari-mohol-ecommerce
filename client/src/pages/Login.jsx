import React from "react";
import Container from "../components/common/Container";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, msg } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm(); // react hook form

  return (
    <main className=" py-[100px]">
      <Container>
        <div className=" flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
            <div>
              <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
                Welcome to Shari Mohol
              </h2>
              <p className="text-sm mt-6 text-slate-500 leading-relaxed">
                Your best choice for online shopping
              </p>
              <p className="text-sm mt-12 text-slate-500">
                Don't have an account{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
            </div>
            <form
              onSubmit={handleSubmit(login)}
              className="max-w-md md:ml-auto w-full"
            >
              <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
                Log In
              </h3>
              {msg && (
                <div className="p-3 mb-5 flex items-center gap-3 border-[2px] border-[#d74242] rounded">
                  <MdErrorOutline className="text-[#d74242] text-[1.5rem]" />
                  <p className="text-[#d74242] text-[1rem]">{msg}</p>
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                    name="email"
                    type="email"
                    required=""
                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-800 font-medium mb-2 block">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    name="password"
                    type="password"
                    required=""
                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm">
                    <Link
                      to="/forget-password"
                      className="text-black font-medium"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Login;
