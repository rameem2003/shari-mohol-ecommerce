import React from "react";
import useCart from "../../hooks/useCart";

const CartCard = ({ data }) => {
  const { updateCart, removeProductCart } = useCart(); // cart hook
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm mb-5 mx-2">
      <div className="  flex items-center gap-5">
        <a href="#" className="shrink-0">
          <img
            className="h-20 w-20 "
            src={`${import.meta.env.VITE_MEDIA}/${data.images[0]}`}
            alt={data.name}
          />
        </a>
        <a
          href="#"
          className="text-base font-medium text-gray-900 hover:underline "
        >
          {data.name}
        </a>
        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
      </div>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="flex items-center justify-between  md:justify-end">
          <div className="flex items-center">
            <button
              onClick={() => updateCart(data._id, -1)}
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  "
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <button className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900">
              {data.quantity}
            </button>
            <button
              onClick={() => updateCart(data._id, 1)}
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
            >
              <svg
                className="h-2.5 w-2.5 text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900">
              BDT {data.quantity * data.discountPrice}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4  md:max-w-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => removeProductCart(data._id)}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
