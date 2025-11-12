import React from "react";

const ListSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-[20px]">
      <div className="boxShadow mx-auto w-full animate-pulse rounded-md border border-[e5eaf2] bg-secondary px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-[20px]">
          <div className="w-[40%] sm:w-[20%]">
            <div className="h-[80px] w-[80px] rounded-full bg-[#e5eaf2] dark:bg-slate-800"></div>
          </div>

          <div className="flex w-[80%] flex-col gap-[10px]">
            <h1 className="h-[25px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></h1>

            <div className="flex flex-col gap-2">
              <p className="h-[7px] w-[90%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[50%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="boxShadow mx-auto w-full animate-pulse rounded-md border border-[e5eaf2] bg-secondary px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-[20px]">
          <div className="w-[40%] sm:w-[20%]">
            <div className="h-[80px] w-[80px] rounded-full bg-[#e5eaf2] dark:bg-slate-800"></div>
          </div>

          <div className="flex w-[80%] flex-col gap-[10px]">
            <h1 className="h-[25px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></h1>

            <div className="flex flex-col gap-2">
              <p className="h-[7px] w-[90%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[50%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="boxShadow mx-auto w-full animate-pulse rounded-md border border-[e5eaf2] bg-secondary px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-[20px]">
          <div className="w-[40%] sm:w-[20%]">
            <div className="h-[80px] w-[80px] rounded-full bg-[#e5eaf2] dark:bg-slate-800"></div>
          </div>

          <div className="flex w-[80%] flex-col gap-[10px]">
            <h1 className="h-[25px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></h1>

            <div className="flex flex-col gap-2">
              <p className="h-[7px] w-[90%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[80%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
              <p className="h-[7px] w-[50%] rounded-md bg-[#e5eaf2] dark:bg-slate-800"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSkeleton;
