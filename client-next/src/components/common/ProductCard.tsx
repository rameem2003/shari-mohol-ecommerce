"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({
  data,
  className,
}: {
  data: Product;
  className?: string;
}) => {
  // console.log(data);

  const { addCart, loading } = useCart();
  return (
    <div
      className={`relative rounded-md overflow-hidden mb-5 shadow-lg p-2 hover:shadow-2xl border-2 border-transparent  hover:border-shari-mohol-primary duration-300 ${className}`}
    >
      {/* badge */}

      <span className="bg-red-500 rounded-sm px-3 py-1 text-[0.9rem] text-white absolute top-3 left-3">
        Best
      </span>

      {/* product image */}
      <div className=" overflow-hidden">
        <img
          alt="product/image"
          src={`${process.env.NEXT_PUBLIC_MEDIA}${data?.images[0]}`}
          className="w-full h-[150px] lg:h-[400px] object-cover rounded-md hover:scale-105 duration-300"
        />
      </div>

      {/* product details */}
      <div className="mt-2">
        <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">
          {data?.category?.name}
        </span>
        <Link
          href={`/product/${data?._id}`}
          className="text-[1.1rem] block dark:text-[#abc2d3] font-medium mt-2"
        >
          {data?.name}
        </Link>
        <del className="text-[0.9rem] dark:text-slate-400 text-gray-400 mt-1">
          {data?.sellingPrice} BDT
        </del>
        <p className="text-[1.1rem] font-semibold mt-1 text-shari-mohol-primary">
          {data?.discountPrice} BDT
        </p>

        <Button
          disabled={loading}
          onClick={() => addCart(data?._id)}
          className="w-full mt-3 bg-shari-mohol-primary hover:bg-purple-800 text-white cursor-pointer"
          asChild
        >
          <span>
            <ShoppingCart className=" text-white" />
            Add To Cart
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
