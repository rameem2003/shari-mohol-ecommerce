import React from "react";
import Flex from "../../common/Flex";
import PriceSelect from "./PriceSelect";
import CategorySelect from "./CategorySelect";
import SegmentSelect from "./SegmentSelect";

const ProductFIlter = ({ setPrice, setCategory, setSegment }) => {
  return (
    <Flex className="mb-4 w-full items-center justify-between">
      <div className="w-[30%]">
        <h2 className="mb-2 text-base font-medium text-white">By Category</h2>
        <CategorySelect setCategory={setCategory} />
      </div>
      <div className="w-[30%]">
        <h2 className="mb-2 text-base font-medium text-white">By Segment</h2>
        <SegmentSelect setSegment={setSegment} />
      </div>
      <div className="w-[30%]">
        <h2 className="mb-2 text-base font-medium text-white">By Price</h2>
        <PriceSelect setPrice={setPrice} />
      </div>
    </Flex>
  );
};

export default ProductFIlter;
