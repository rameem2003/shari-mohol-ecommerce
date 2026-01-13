import { getCategories } from "@/api/category-api";
import React from "react";
import Container from "./Container";
import { Category } from "@/types/category";
import Link from "next/link";
const CategoryList = async () => {
  let { data }: { data: Category[] } = await getCategories();

  return (
    <section className=" p-3 bg-shari-mohol-primary mb-4 hidden mt-0 md:mt-4 lg:mt-0 md:block">
      <Container>
        <div className=" flex items-center justify-between flex-wrap gap-5">
          {data.map((category: Category, index: number) => (
            <div className=" flex items-center gap-2" key={index}>
              <Link
                href={`/shop?category=${category._id}`}
                className=" text-white"
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryList;
