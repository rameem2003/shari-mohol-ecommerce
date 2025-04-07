import React, { useEffect } from "react";
import Container from "../components/common/Container";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import CartMainCard from "../components/screens/Cart/CartMainCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.discountPrice,
    0
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className=" py-[120px]">
      <Container>
        <section className=" py-8 antialiased  md:py-16">
          <div className="mx-auto">
            <h2 className="text-xl font-semibold sm:text-2xl">Shopping Cart</h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cart.length == 0 && (
                    <h2 className=" text-2xl text-red-600">Cart is Empty</h2>
                  )}
                  {cart.map((item, i) => (
                    <CartMainCard data={item} key={i} />
                  ))}
                </div>
              </div>
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900">
                    Order summary
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Original price
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          BDT {grandTotal}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Savings
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          0
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Store Pickup
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          0
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Tax
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          0
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                      <dt className="text-base font-bold text-gray-900 ">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 ">
                        BDT {grandTotal}
                      </dd>
                    </dl>
                  </div>
                  <Link
                    to="/checkout"
                    href="#"
                    className="flex w-full items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 "
                  >
                    Proceed to Checkout
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 ">
                      or
                    </span>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium text-gray-900 "
                      >
                        {" "}
                        Do you have a voucher or gift card?{" "}
                      </label>
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        placeholder=""
                        required=""
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                    >
                      Apply Code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Cart;
