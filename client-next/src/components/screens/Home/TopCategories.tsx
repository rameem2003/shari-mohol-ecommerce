import React from "react";
import Container from "@/components/common/Container";
import CategoryComponent from "./CategoryComponent";
import { getCategories } from "@/api/category-api";

const TopCategories = async () => {
  let { data } = await getCategories();

  return (
    <section className=" my-10">
      <Container>
        <div className=" bg-shari-mohol-primary p-3 rounded-md">
          <h2 className=" text-3xl text-white font-semibold">All Categories</h2>
          <div className=" w-full mt-3 h-0.5 bg-white"></div>

          <div className=" mt-10 w-full">
            <CategoryComponent data={data} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
