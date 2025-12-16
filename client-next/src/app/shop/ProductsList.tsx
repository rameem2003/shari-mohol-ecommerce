import ProductCard from "@/components/common/ProductCard";
import { ProductResponse } from "@/types/product";
import React from "react";

const ProductsList = ({ data }: { data: ProductResponse | null }) => {
  return (
    <div className=" w-full ">
      <div className="flex items-start justify-between flex-wrap">
        {data?.data?.map((item, i) => (
          <ProductCard className="w-[48%] md:w-[33%]" key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
