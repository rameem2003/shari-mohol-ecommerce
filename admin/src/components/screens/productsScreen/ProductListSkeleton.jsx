import React from "react";
import Flex from "../../common/Flex";
import ProductSkeleton from "../../common/ProductSkeleton";

const ProductListSkeleton = () => {
  return (
    <Flex className="flex-wrap justify-between">
      <div className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]">
        <ProductSkeleton />
      </div>
      <div className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]">
        <ProductSkeleton />
      </div>
      <div className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]">
        <ProductSkeleton />
      </div>
      <div className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]">
        <ProductSkeleton />
      </div>
    </Flex>
  );
};

export default ProductListSkeleton;
