import React from "react";

const CartCard = () => {
  return (
    <div className="w-full md:w-[80%] justify-center flex flex-col md:flex-row md:items-center gap-2.5 mb-2">
      <img
        alt="product/image"
        src="https://i.ibb.co.com/HHP2J04/7-jpg.png"
        className="w-20 rounded-md"
      />

      <div>
        <h3 className="text-base font-medium dark:text-[#abc2d3] line-clamp-2">
          Good Life Raw Peanuts
        </h3>

        {/* review area */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">
            x 3
          </span>
        </div>

        <p className="text-[1rem] font-medium text-shari-mohol-primary mt-1">
          $85.00
        </p>
      </div>
    </div>
  );
};

export default CartCard;
