import React from "react";
import { FaTrash } from "react-icons/fa";

const ProductCard = ({ className, data }) => {
  return (
    <div
      className={`${className} bg-white dark:bg-slate-800 boxShadow rounded-md mb-10`}
    >
      <div className="flex items-center justify-between w-full p-4">
        <h2 className="text-[1.4rem] font-semibold text-black dark:text-white">
          {data.name}
        </h2>
        <div className="flex items-center gap-[5px]">
          <FaTrash className="py-[4px] rounded-full text-[1.5rem] bg-red-300 text-red-800 cursor-pointer" />
        </div>
      </div>
      <img src={data.images[0]} alt="icecream" className="w-full" />

      <div className="p-4">
        <p className="text-[1rem] text-gray-700 dark:text-white">
          {data.description}
        </p>
        <p className="text-[1rem] text-gray-700 dark:text-white">
          Category: {data.category.name}, SubCategory : {data.subCategory}
        </p>

        <div className="mt-5 flex 640px:flex-row flex-col gap-[15px] 640px:gap-[5px] 640px:items-center justify-between w-full">
          <h3 className="text-[1.4rem] font-semibold flex items-center gap-[4px] text-black dark:text-white">
            BDT {data.discountPrice}
            <del className="text-[1rem] text-red-500 font-[300]">
              BDT {data.sellingPrice}
            </del>
          </h3>

          <button className="py-2 px-6 border border-gray-600 text-gray-700 dark:border-white dark:text-white rounded-md">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
