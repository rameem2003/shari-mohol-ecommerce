import React from "react";
import Link from "next/link";
import { Category } from "@/types/category";

const CategoryCard = ({ data }: { data: Category }) => {
  return (
    <Link
      href={`/shop?category=${data._id}`}
      className=" text-center  mx-2 p-4 flex gap-4 flex-col items-center"
    >
      <div className=" h-40 w-40 rounded-full border-2 border-shari-mohol-primary">
        <img
          src={`${process.env.NEXT_PUBLIC_MEDIA}${data.thumb}`}
          alt="Category"
          className=" w-full h-full object-cover rounded-full overflow-hidden"
        />
      </div>
      <h4 className=" text-lg text-shari-mohol-primary font-bold">
        {data.name}
      </h4>
    </Link>
  );
};

export default CategoryCard;
