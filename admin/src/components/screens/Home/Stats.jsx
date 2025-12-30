import React, { useEffect, useState } from "react";
import Flex from "./../../common/Flex";
import { fetchAllOrdersRequest } from "../../../api/order";
import { FaSackDollar } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi";
import { TbShoppingCartCopy } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";

const Stats = () => {
  const [orders, setOrders] = useState([]); // set the initial state of orders

  // fetch orders
  const fetchOrders = async () => {
    let res = await fetchAllOrdersRequest();
    setOrders(res);
  };

  let today = new Date().toISOString().split("T")[0]; // get the current date

  let filterForToday = orders?.data?.filter((order) =>
    order.createdAt.includes(today),
  ); // filter the orders for today
  console.log(filterForToday);

  let todaySold = filterForToday?.reduce(
    (total, order) => total + order.grandTotal,
    0,
  ); // calculate the total sold for today

  useEffect(() => {
    fetchOrders();
  }, []); // fetch the orders when the component mounts
  return (
    <section>
      <Flex className="flex-col flex-wrap items-center justify-between gap-5 md:flex-row md:gap-0">
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="relative flex w-full flex-col items-start justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Today's Sell
            </h2>

            <div className="mt-6 flex items-center gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-3xl 2xl:text-[4rem] dark:text-white">
                {todaySold || 0}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                BDT
              </span>
            </div>

            <FaSackDollar className="absolute bottom-4 right-4 text-[3rem] text-[#3B9DF8] opacity-50" />
          </div>
        </div>
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="relative flex w-full flex-col items-start justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Today's Order
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-3xl 2xl:text-[4rem] dark:text-white">
                {filterForToday?.length || 0}
              </h2>
            </div>
            <TbShoppingCartCopy className="absolute bottom-4 right-4 text-[3rem] text-[#3B9DF8] opacity-50" />
          </div>
        </div>
        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="relative flex w-full flex-col items-start justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Total Sell
            </h2>

            <div className="mt-6 flex items-center gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-3xl 2xl:text-[4rem] dark:text-white">
                {orders?.totalRevenue || 0}
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                BDT
              </span>
            </div>
            <HiCurrencyDollar className="absolute bottom-4 right-4 text-[3rem] text-[#3B9DF8] opacity-50" />
          </div>
        </div>

        <div className="mb-2 w-full rounded-md bg-gray-100 shadow-lg md:w-[48%] lg:w-[24%] dark:bg-slate-800">
          <div className="relative flex w-full flex-col items-start justify-center p-6">
            <h2 className="text-xl font-[600] text-[#3B9DF8] xl:text-[1.5rem]">
              Total Order
            </h2>

            <div className="mt-6 flex gap-1">
              <h2 className="text-2xl font-[800] leading-[4rem] text-black xl:text-3xl 2xl:text-[4rem] dark:text-white">
                {orders?.totalOrders || 0}
              </h2>
            </div>
            <FaCartShopping className="absolute bottom-4 right-4 text-[3rem] text-[#3B9DF8] opacity-50" />
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Stats;
