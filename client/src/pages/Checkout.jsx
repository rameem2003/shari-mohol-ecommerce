import React, { useState } from "react";
import { useSelector } from "react-redux";
// data
import { countries, regions, cities } from "../libs/data";
// select component
import Select from "../components/screens/Checkout/Select";
import Container from "../components/common/Container";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.discountPrice,
    0
  );
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };
  return (
    <main className=" py-[120px]">
      <Container>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full">
          {/* Billing and Payment Form */}
          <div className="md:col-span-2 space-y-8 w-full">
            {/* Billing Information */}
            <div className="w-full">
              <h2 className="text-[1.5rem] font-medium text-gray-700 mb-6">
                Billing Information
              </h2>

              <div className=" flex flex-col gap-[16px]">
                <div className=" w-full">
                  <div className="w-full">
                    <label
                      htmlFor="firstName"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      placeholder="First name"
                      type="text"
                      id="firstName"
                      className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-[14px] font-[400] text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    placeholder="Address"
                    type="text"
                    id="address"
                    className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700"
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="country"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      Country
                    </label>
                    <Select items={countries} />
                  </div>
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="state"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      Region/State
                    </label>
                    <Select items={regions} />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="city"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      City
                    </label>
                    <Select items={cities} />
                  </div>
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="zipCode"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      Zip Code
                    </label>
                    <input
                      placeholder="Zip code"
                      type="text"
                      id="zipCode"
                      className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="email"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      placeholder="Email address"
                      type="email"
                      id="email"
                      className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700"
                    />
                  </div>
                  <div className="w-full md:w-[50%]">
                    <label
                      htmlFor="phone"
                      className="text-[14px] font-[400] text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      placeholder="Phone number"
                      type="tel"
                      id="phone"
                      className="border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="border border-gray-200 rounded-md">
              <h2 className="text-[1.2rem] font-medium text-gray-700 border-b border-gray-200 px-5 py-3">
                Payment Option
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-5">
                <button
                  onClick={() => setSelectedPayment("COD")}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                    selectedPayment === "COD"
                      ? "border-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-2xl">💵</span>
                  <span className="text-[0.9rem] text-gray-700 font-[500] mt-2">
                    Cash on Delivery
                  </span>
                </button>
                <button
                  onClick={() => setSelectedPayment("online")}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                    selectedPayment === "online"
                      ? "border-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-2xl">💳</span>
                  <span className="text-[0.9rem] text-gray-700 font-[500] mt-2">
                    Online Pay
                  </span>
                </button>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-[1.2rem] font-medium text-gray-700 mb-4">
                Additional Information
              </h2>
              <div>
                <label
                  htmlFor="notes"
                  className="text-[14px] font-[400] text-gray-700"
                >
                  Order Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Notes about your order e.g. special notes for delivery"
                  className={`border border-gray-200 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-purple-700 py-3`}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full">
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <h2 className="text-[1.2rem] font-medium text-gray-700 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item, i) => (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item?.images[0]}
                        alt={item?.name}
                        className="w-[50px] h-[50px] object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item?.name}
                      </p>
                      <div className="flex items-center gap-[5px] mt-0.5">
                        <p className="text-sm text-gray-500">
                          {item?.quantity} x
                        </p>
                        <p className="text-sm text-purple-700 font-[600]">
                          BDT {item?.discountPrice * item?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sub-total</span>
                    <span className="font-medium text-gray-800">
                      BDT {grandTotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-gray-800">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-800">0</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-800">
                      Total
                    </span>
                    <span className="text-base font-medium text-gray-800">
                      BDT {grandTotal} Taka
                    </span>
                  </div>
                </div>

                <button className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-700/90 transition-colors">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Checkout;
