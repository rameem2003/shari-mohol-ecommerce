"use client";
import React, { useState } from "react";
import { Product } from "@/types/product";
import { BadgeCheck, ExternalLink, Store, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

const DetailSection = ({ data }: { data: Product }) => {
  const { addCart, loading } = useCart();
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedStorage, setSelectedStorage] = useState("1TB");
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      {/* Right side - Product details */}
      <div className="flex flex-col gap-6">
        <div>
          <Link
            href={`/category/${data.category._id}`}
            className=" mb-2 flex items-center gap-2 text-gray-500 capitalize "
          >
            {data.category.name}{" "}
            <ExternalLink size={20} className=" text-shari-mohol-primary" />
          </Link>
          <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.9rem] font-bold text-gray-800">
            {data.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 md:mt-5">
            <span className="text-3xl dark:text-[#abc2d3] font-medium">
              BDT {data.discountPrice}
            </span>
            <span className="text-xl dark:text-slate-400 text-gray-500 line-through">
              BDT {data.sellingPrice}
            </span>
          </div>
        </div>

        {/* Color selection */}
        <div className="flex float-start md:items-center flex-col md:flex-row gap-2.5">
          <label className="text-sm dark:text-[#abc2d3] font-medium">
            Select color:
          </label>
          <div className="flex gap-3">
            {data.colors.map((color) => (
              <button
                key={color}
                style={{ border: `2px solid ${color}`, backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${color} ${
                  selectedColor === color
                    ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]"
                    : ""
                }`}
                aria-label={color}
              ></button>
            ))}
          </div>
        </div>

        <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">
          {data.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="flex-1 py-3 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">
                            <div className="flex items-center justify-center gap-2">
                                {
                                    isFavorite ? (
                                            <BsHeartFill className="w-5 h-5 text-red-500"/>
                                        )
                                        : (
                                            <BsHeart className="w-5 h-5"/>
                                        )
                                }
                                Add to Wishlist
                            </div>
                        </button> */}
          <button
            disabled={loading}
            onClick={() => addCart(data._id)}
            className="flex-1 py-3 px-4 rounded-lg cursor-pointer bg-shari-mohol-primary text-white hover:bg-shari-mohol-primary/90"
          >
            {loading ? "Adding to Cart..." : "Add to Cart"}
          </button>
        </div>

        {/* Delivery info */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">
          <div className="flex items-center gap-3">
            <Truck
              size={20}
              className="text-[3rem] text-shari-mohol-primary rounded-md"
            />
            <div>
              <p className="text-sm dark:text-[#abc2d3] text-gray-500">
                Free Delivery
              </p>
              <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">
                1-2 day
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Store className="text-[3rem] text-shari-mohol-primary rounded-md" />
            <div>
              <p className="text-sm dark:text-[#abc2d3] text-gray-500">
                In Stock
              </p>
              <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">
                Today
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BadgeCheck
              size={20}
              className="text-[3rem] text-shari-mohol-primary rounded-md"
            />
            <div>
              <p className="text-sm dark:text-[#abc2d3] text-gray-500">
                Guaranteed
              </p>
              <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">
                1 year
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSection;
