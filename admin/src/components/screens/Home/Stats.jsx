import React, { useEffect, useState } from "react";
import Flex from "./../../common/Flex";
import axios from "axios";

const Stats = () => {
  const [orders, setOrders] = useState([]); // set the initial state of orders

  // fetch the orders from the backend
  const fetchOrders = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/order/all`);
      setOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let today = new Date().toISOString().split("T")[0]; // get the current date

  let filterForToday = orders.filter((order) =>
    order.createdAt.includes(today)
  ); // filter the orders for today
  console.log(filterForToday);

  let totalSold = orders.reduce((total, order) => total + order.grandTotal, 0); // calculate the total sold
  let todaySold = filterForToday.reduce(
    (total, order) => total + order.grandTotal,
    0
  ); // calculate the total sold for today

  useEffect(() => {
    fetchOrders();
  }, []); // fetch the orders when the component mounts
  return (
    <section>
      <Flex className="items-center justify-between">
        <div className="w-full md:w-[48%] lg:w-[24%] rounded-md bg-gray-100 dark:bg-slate-800 shadow-lg">
          <div className="w-full flex items-center justify-center flex-col p-6">
            <h2 className="text-[1.5rem] text-[#3B9DF8] font-[600]">
              Today's Sell
            </h2>

            <div className="flex mt-6 gap-1">
              <h2 className="font-[800] text-[4rem] leading-[4rem] text-black dark:text-white">
                {todaySold}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                ৳
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[24%] rounded-md bg-gray-100 dark:bg-slate-800 shadow-lg">
          <div className="w-full flex items-center justify-center flex-col p-6">
            <h2 className="text-[1.5rem] text-[#3B9DF8] font-[600]">
              Total Sell
            </h2>

            <div className="flex mt-6 gap-1">
              <h2 className="font-[800] text-[4rem] leading-[4rem] text-black dark:text-white">
                {totalSold}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                ৳
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[24%] rounded-md bg-gray-100 dark:bg-slate-800 shadow-lg">
          <div className="w-full flex items-center justify-center flex-col p-6">
            <h2 className="text-[1.5rem] text-[#3B9DF8] font-[600]">
              Today's Order
            </h2>

            <div className="flex mt-6 gap-1">
              <h2 className="font-[800] text-[4rem] leading-[4rem] text-black dark:text-white">
                {filterForToday.length}
              </h2>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[48%] lg:w-[24%] rounded-md bg-gray-100 dark:bg-slate-800 shadow-lg">
          <div className="w-full flex items-center justify-center flex-col p-6">
            <h2 className="text-[1.5rem] text-[#3B9DF8] font-[600]">
              Total Order
            </h2>

            <div className="flex mt-6 gap-1">
              <h2 className="font-[800] text-[4rem] leading-[4rem] text-black dark:text-white">
                {orders.length}
              </h2>
            </div>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Stats;
