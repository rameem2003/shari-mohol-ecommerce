import React, { useContext, useEffect, useRef } from "react";
import { ToggleContext } from "../../context/ToggleContextProvider";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Flex from "../common/Flex";
import CartCard from "./CartCard";
import { FaTimes } from "react-icons/fa";

const CartSidebar = ({ isCartOpen, setIsCartOpen }) => {
  const { cartToggle, setCartToggle } = useContext(ToggleContext);
  const cartRef = useRef(null);
  const cart = useSelector((state) => state.cart.cart);
  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.discountPrice,
    0
  );

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartToggle(false);
      }
    };

    if (cartToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartToggle]);
  return (
    <aside
      ref={cartRef}
      className={` fixed h-screen w-full lg:w-3/12 2xl:w-2/12 duration-200 ${
        cartToggle ? "right-0" : "right-[-1500px]"
      } top-0 bg-white z-[999999] shadow-lg`}
    >
      <section className=" bg-purple-700 p-3 mb-2">
        <Flex className="items-center justify-between">
          <span className=" text-white text-xl font-bold">Cart</span>
          <span>
            <FaTimes
              onClick={() => setCartToggle(false)}
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
