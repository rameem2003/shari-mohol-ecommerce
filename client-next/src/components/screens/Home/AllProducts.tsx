import { getProducts } from "@/api/product-api";
import Container from "@/components/common/Container";
import React from "react";
import ProductListHome from "./ProductListHome";

const AllProducts = async () => {
  let { data } = await getProducts("", 1, 10, "", "asc");
  // console.log(data);

  return (
    <section className=" my-10">
      <Container>
        <div className="p-3">
          <h2 className=" text-3xl text-shari-mohol-primary font-semibold">
            All Products
          </h2>
          <div className=" w-full mt-3 h-0.5 bg-shari-mohol-primary"></div>

          <ProductListHome data={data} />
        </div>
      </Container>
    </section>
  );
};

export default AllProducts;
