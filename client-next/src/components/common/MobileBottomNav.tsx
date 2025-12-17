"use client";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import {
  CircleUserRound,
  Home,
  Menu,
  PhoneCall,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import UserMenu from "./UserMenu";

const MobileBottomNav = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  return (
    <section className=" block lg:hidden z-10 fixed bottom-0 w-full left-0 bg-shari-mohol-primary">
      <Container>
        <div className=" flex items-center justify-center gap-2">
          <Link
            href="/shop"
            className=" flex flex-col items-center justify-center gap-1 p-3"
          >
            <Store className=" text-white" size={20} />
            <span className=" text-[10px] font-bold text-white">Shop</span>
          </Link>
          <Link
            href="/"
            className=" flex flex-col items-center justify-center gap-1 p-3"
          >
            <PhoneCall className=" text-white" size={20} />
            <span className=" text-[10px] font-bold text-white">Call</span>
          </Link>
          <div className=" p-5 relative">
            <div className=" absolute left-[50%] translate-x-[-30%] -top-10 w-14 h-14 border-2 border-shari-mohol-primary bg-white rounded-full flex items-center justify-center">
              <Link href="/">
                <Home className=" text-shari-mohol-primary" size={30} />
              </Link>
            </div>
          </div>
          <Link
            href="/checkout"
            className=" flex flex-col items-center justify-center gap-1 p-3"
          >
            <ShoppingCart className=" text-white" size={20} />
            <span className=" text-[10px] font-bold text-white">
              Cart ({cart?.data?.length || 0})
            </span>
          </Link>
          {user ? (
            <UserMenu />
          ) : (
            <Link
              href="/login"
              className=" flex flex-col items-center justify-center gap-1 p-3"
            >
              <CircleUserRound className=" text-white" size={20} />
              <span className=" text-[10px] font-bold text-white">Login</span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default MobileBottomNav;
