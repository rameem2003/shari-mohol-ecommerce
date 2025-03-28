import React from "react";
import Flex from "../../common/Flex";

const PrizeRangeSlider = ({ handleFilter, range }) => {
  return (
    <div className="mt-5 rounded-md p-10 shadow-md">
      <h2 className="mb-5 text-xl font-bold">Price</h2>

      <div className="mt-2">
        <input
          onChange={handleFilter}
          type="range"
          className="custom-range w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          min={0}
          max={500000}
          defaultValue={range}
          name=""
          id=""
        />
      </div>

      <Flex className="mt-1 items-center justify-between">
        <span className="font-semibold text-red-600">BDT 0</span>
        <span className="font-semibold text-red-600">BDT {range}</span>
      </Flex>
    </div>
  );
};

export default PrizeRangeSlider;
