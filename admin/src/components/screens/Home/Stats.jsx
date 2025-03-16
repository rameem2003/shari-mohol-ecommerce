import React from "react";
import Flex from "./../../common/Flex";

const Stats = () => {
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
                49.50
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                $
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
                49.50
              </h2>
              <span className="text-[1.2rem] font-[500] text-black dark:text-white">
                $
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
                49.50
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
                49.50
              </h2>
            </div>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default Stats;
