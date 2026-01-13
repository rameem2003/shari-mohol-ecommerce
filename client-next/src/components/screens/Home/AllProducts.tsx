import React from "react";
import Container from "@/components/common/Container";
import ProductListHome from "./ProductListHome";
import { getProducts } from "@/api/product-api";

const AllProducts = async () => {
  let { data } = await getProducts("", 1, 10, "", "asc");
  // console.log(data);

  return (
    <section className=" my-10">
      <Container>
        <div className="">
          <div className=" bg-shari-mohol-primary p-4 rounded-sm">
            <h2 className=" text-3xl text-white font-semibold">All Products</h2>
            <div className=" w-full mt-3 h-0.5 bg-white"></div>
          </div>

          <ProductListHome data={data} />
        </div>
      </Container>
    </section>
  );
};

export default AllProducts;
