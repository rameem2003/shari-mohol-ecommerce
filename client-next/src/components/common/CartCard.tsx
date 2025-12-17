"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { CartItemType } from "@/types/Cart";
import { Minus, Plus, Trash } from "lucide-react";

const CartCard = ({ data }: { data: CartItemType }) => {
  const { addCart, decrementCart, deleteCart } = useCart();
  return (
    <div className="w-full md:w-[80%] justify-start flex flex-col md:flex-row md:items-center gap-2.5 mb-2">
      <img
        alt="product/image"
        src={process.env.NEXT_PUBLIC_MEDIA + data.item.images[0]}
        className="w-20 rounded-md"
      />

      <div>
        <Link
          href={`/product/${data.item._id}`}
          className="text-base font-normal dark:text-[#abc2d3] line-clamp-2"
        >
          {/* {data.item.name.length > 15
            ? data.item.name.slice(0, 15) + "..."
            : } */}
          {data.item.name}
        </Link>

        {/* review area */}
        <div className="flex items-center gap-2.5 my-2">
          <button
            onClick={() => deleteCart(data._id)}
            className=" cursor-pointer"
          >
            <Trash size={15} className=" text-red-600" />
          </button>
        </div>

        <div className=" flex items-center gap-2">
          <button
            onClick={() => decrementCart(data._id)}
            className=" h-5 w-5 flex items-center justify-center rounded-full bg-red-600 cursor-pointer"
          >
            <Minus size={15} className=" text-white" />
          </button>
          <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">
            x {data.quantity}
          </span>
          <button
            onClick={() => addCart(data.item._id)}
            className=" h-5 w-5 flex items-center justify-center rounded-full bg-shari-mohol-primary cursor-pointer"
          >
            <Plus size={15} className=" text-white" />
          </button>
        </div>

        <p className="text-[1rem] font-medium text-shari-mohol-primary mt-1">
          BDT {data.item.discountPrice * data.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
