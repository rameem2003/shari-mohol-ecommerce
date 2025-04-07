import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const PaymentFail = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center bg-red-50 py-40">
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
        <FaTimes className="mb-4 h-20 w-20 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Fail!</h1>
        <p className="mt-2 text-center text-gray-600">
          An error occurred while processing your payment. Please try again.
        </p>

        <button
          className="mt-6 rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition duration-200 hover:bg-red-600"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
