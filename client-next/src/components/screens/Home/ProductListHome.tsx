import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product";

const ProductListHome = ({ data }: { data: Product[] }) => {
  return (
    <section className=" mt-10">
      <div className=" flex items-start justify-between flex-wrap ">
        {data?.map((item, i) => (
          <ProductCard
            className="w-[48%] md:w-[30%] lg:w-[24%]"
            key={i}
            data={item}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductListHome;
