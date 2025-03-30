import React from "react";
import Flex from "../common/Flex";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";
import { Link } from "react-router";

const CartSidebar = ({ isCartOpen, setIsCartOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.discountPrice,
    0
  );
  return (
    <aside
      className={` fixed h-screen w-full lg:w-3/12 2xl:w-2/12 duration-200 ${
        isCartOpen ? "right-0" : "right-[-1500px]"
      } top-0 bg-white z-[999999] shadow-lg`}
    >
      <section className=" bg-purple-700 p-3 mb-2">
        <Flex className="items-center justify-between">
          <span className=" text-white text-xl font-bold">Cart</span>
          <span>
            <FaTimes
              onClick={() => setIsCartOpen(false)}
              className=" text-white cursor-pointer"
            />
          </span>
        </Flex>
      </section>

      {cart.length === 0 && (
        <h1 className=" text-center text-2xl font-bold">Cart is Empty</h1>
      )}
      <div className=" h-[700px] overflow-y-scroll ">
        {cart.map((item, i) => (
          <CartCard key={i} data={item} />
        ))}
      </div>

      <section className=" absolute bottom-14 lg:bottom-0 w-full left-0 p-2 bg-purple-700 md">
        <Flex className="items-center justify-between">
          <div className="w-7/12">
            <p className=" text-white text-base">Grand Total: </p>
            <h2 className=" text-white text-2xl font-bold">BDT {grandTotal}</h2>
          </div>

          <div className="w-5/12 text-right">
            <Link
              to="/cart"
              className=" text-lg text-white px-3 py-2 bg-purple-600 rounded"
            >
              Go Cart
            </Link>
          </div>
        </Flex>
      </section>
    </aside>
  );
};

export default CartSidebar;
