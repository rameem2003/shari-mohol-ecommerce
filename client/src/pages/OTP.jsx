import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

const OTP = () => {
  const data = useLocation();
  const dispatch = useDispatch(); // dispatch instance
  const navigate = useNavigate(); // navigation instance
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm(); // react hook form
  const [msg, setMsg] = useState(null); // error message
  const [success, setSuccess] = useState(null); // success message
  const [timer, setTimer] = useState(60); // timer
  const [loading, setLoading] = useState(false);

  // timer formate
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // function to handle form submission
  const onSubmit = async (data) => {
    console.log(data);

    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/otp-verify`,
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMsg(null);
      setSuccess(res.data.msg);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.log(error);
      setSuccess(null);
      setMsg(error.response.data.msg);
    }
  };

  // function to handle resend otp
  const otpResend = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/auth/otp-resend`,
        { email: data.state.key.email },
        { withCredentials: true }
      );
      location.reload();
    } catch (error) {
      setLoading(false);
      setMsg(error.response?.data?.msg || "Failed to resend OTP");
    }
  };

  // timer function
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.state == null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main className=" py-[150px]">
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
              <p className="text-sm mt-12 text-slate-500">Let's Verify</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="max-w-md md:ml-auto w-full"
          >
            <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-8">
              Enter our OTP
            </h3>
            {success && (
              <div className="p-3 mb-5 flex items-center gap-3 border-[2px] border-green-500 rounded">
                <FaCheck className="text-green-500 text-[1.5rem]" />
                <p className="text-green-500 text-[1rem]">{success}</p>
              </div>
            )}
            {/* error message */}
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
                  })}
                  value={data?.state?.key?.email}
                  disabled
                  name="name"
                  type="text"
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
                  OTP
                </label>
                <input
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                  name="otp"
                  type="text"
                  required=""
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
                  placeholder="Enter Name"
                />

                {errors.otp && (
                  <p className="text-red-500">{errors.otp.message}</p>
                )}
              </div>
            </div>

            <p className="mb-4 text-gray-500">
              Time remaining: {formatTime(timer)}
            </p>

            <div className="!mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
              >
                Verify
              </button>
            </div>

            <div className="!mt-12">
              <button
                onClick={otpResend}
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default OTP;
