"use client";
import CartCard from "@/components/common/CartCard";
import { useCart } from "@/hooks/useCart";
import { CartItemType } from "@/types/Cart";
import React from "react";

const ShoppingCart = () => {
  const { cart } = useCart();
  return (
    <div className=" w-full">
      {cart?.data?.length == 0 && (
        <p className=" text-gray-500">Your cart is empty.</p>
      )}

      {cart?.data?.map((item: CartItemType) => (
        <CartCard key={item._id} data={item} />
      ))}
    </div>
  );
};

export default ShoppingCart;
