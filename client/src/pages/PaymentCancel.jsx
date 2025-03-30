import React from "react";
import { FaTimes } from "react-icons/fa";

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-50 py-40">
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
        <FaTimes className="mb-4 h-20 w-20 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800">Payment Cancel!</h1>
        <p className="mt-2 text-center text-gray-600">
          Your payment has been canceled.
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

export default PaymentCancel;
