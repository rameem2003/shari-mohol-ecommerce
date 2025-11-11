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
    } catch (error) {
      console.log(error);
    }
  };

  let today = new Date().toISOString().split("T")[0]; // get the current date

  let filterForToday = orders?.filter((order) =>
    order.createdAt.includes(today),
  ); // filter the orders for today
  console.log(filterForToday);

  let totalSold = orders?.reduce((total, order) => total + order.grandTotal, 0); // calculate the total sold
  let todaySold = filterForToday?.reduce(
    (total, order) => total + order.grandTotal,
    0,
  ); // calculate the total sold for today

  useEffect(() => {
    // fetchOrders();
  }, []); // fetch the orders when the component mounts
  return (
    <section>
      <Flex className="flex-col flex-wrap items-center justify-between gap-5 md:flex-row md:gap-0">
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="flex w-full flex-col items-center justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Today's Sell
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-[4rem] dark:text-white">
                {todaySold}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                ৳
              </span>
            </div>
          </div>
        </div>
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="flex w-full flex-col items-center justify-center p-6">
            <h2 className="ttext-xl xl:ext-[1.5rem] font-[600] text-[#3B9DF8]">
              Total Sell
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-[4rem] dark:text-white">
                {totalSold}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                ৳
              </span>
            </div>
          </div>
        </div>
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="flex w-full flex-col items-center justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Today's Order
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-[4rem] dark:text-white">
                {filterForToday?.length}
              </h2>
            </div>
          </div>
        </div>
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="flex w-full flex-col items-center justify-center p-6">
            <h2 className="ttext-xl xl:ext-[1.5rem] font-[600] text-[#3B9DF8]">
              Total Order
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-[4rem] dark:text-white">
                {orders?.length}
              </h2>
            </div>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Stats;
