import React, { useState } from "react";
import { stepsData } from "../libs/formStep";
import axios from "axios";
// react icons
import { MdDone, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); // email
  const [otp, setOtp] = useState(null); // otp
  const [msg, setMsg] = useState(null); // error message
  const [newPassword, setNewPassword] = useState(null); // new password

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  // otp verify
  const verifyOtp = async () => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API}/auth/otp-verify`,
        {
          email,
          otp,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      nextStep();
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
    }
  };

  // function to handle resend otp
  const otpResend = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/auth/otp-resend`,
        { email },
        { withCredentials: true }
      );
      nextStep();
    } catch (error) {
      // setLoading(false);
      setMsg(error.response?.data?.msg || "Failed to resend OTP");
    }
  };

  // function for password change
  const handleChangePassword = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API}/auth/forgetpassword/${email}`,
        { newPassword },
        { withCredentials: true }
      );
      nextStep();

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      // setLoading(false);
      setMsg(error.response?.data?.msg || "Failed to resend OTP");
    }
  };

  return (
    <main className="py-[150px]">
      <div className="w-full sm:w-full max-w-[700px] mx-auto">
        {/* error message */}
        {msg && (
          <div className="p-3 mb-5 flex items-center gap-3 border-[2px] border-[#d74242] rounded">
            <MdErrorOutline className="text-[#d74242] text-[1.5rem]" />
            <p className="text-[#d74242] text-[1rem]">{msg}</p>
          </div>
        )}
        <div className="w-full flex-row flex items-center gap-[20px] sm:gap-[10px] justify-between">
          {stepsData?.map((stepItem, index) => (
            <p
              key={index}
              className="flex items-center flex-col md:flex-row w-full gap-[10px]"
            >
              {step <= stepItem.id && (
                <p
                  className={`w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center text-[1.2rem] rounded-full bg-gray-50`}
                >
                  {stepItem?.id}
                </p>
              )}

              {step >= stepItem.id + 1 && (
                <div className="p-[10px] h-[40px] w-[40px] rounded-full bg-purple-500 text-white flex items-center justify-center">
                  <MdDone className="text-[3rem]" />
                </div>
              )}

              <p
                className={`${
                  step > stepItem.id ? "!text-purple-500" : "text-gray-600"
                } capitalize text-xs text-center md:text-[0.9rem] font-[400] sm:w-[75%] min-w-fit`}
              >
                {stepItem?.name}
              </p>

              {index < stepsData?.length - 1 && (
                <div
                  className={`${
                    step >= stepItem.id + 1 ? "bg-purple-500" : "bg-gray-300"
                  } w-full h-[5px] rounded-full`}
                ></div>
              )}
            </p>
          ))}
        </div>

        <form className="mt-16 w-full">
          {step === 1 && (
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
                placeholder="Enter Email"
              />

              <button
                disabled={!email}
                type="button"
                onClick={otpResend}
                className={` text-[1rem] rounded mt-5 ml-auto inline-block bg-purple-600 text-white px-6 py-2.5`}
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="text-sm text-slate-800 font-medium mb-2 block">
                OTP
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                name="otp"
                type="text"
                required
                className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-purple-600 focus:bg-transparent"
                placeholder="Enter OTP"
              />

              <button
                disabled={!otp}
                type="button"
                onClick={verifyOtp}
                className={` text-[1rem] rounded mt-5 ml-auto inline-block bg-purple-600 text-white px-6 py-2.5`}
              >
                Verify
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-[20px] w-full">
              <div className="w-full">
                <label className="text-[1rem] text-gray-600">
                  New Password
                </label>
                <br />
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="text"
                  placeholder="New password"
                  className="py-2.5 px-4 border border-gray-300 mt-1 w-full rounded-md outline-none"
                />

                <button
                  disabled={!newPassword}
                  type="button"
                  onClick={handleChangePassword}
                  className={` text-[1rem] rounded mt-5 ml-auto inline-block bg-purple-600 text-white px-6 py-2.5`}
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex items-center justify-center w-full flex-col">
              <img
                src="https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png"
                alt="vector"
                className="w-[200px]"
              />

              <h1 className="text-[1.4rem] font-[600] mt-4">
                Password Reset is successfull
              </h1>
              <p className="text-gray-500 text-[1rem] font-[400] mt-1">
                Redirecting to Login
              </p>
            </div>
          )}

          <div className="w-full flex items-end justify-end mt-12">
            <button
              disabled={step <= 1}
              type="button"
              onClick={prevStep}
              className={`${
                step <= 1 && "cursor-not-allowed"
              } text-[1rem] text-gray-500 px-6 py-2.5`}
            >
              Previous
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgetPassword;
