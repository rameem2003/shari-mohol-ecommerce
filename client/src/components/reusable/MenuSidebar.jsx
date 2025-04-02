import React from "react";
import Flex from "../common/Flex";
import { Link } from "react-router";
import logopurple from "../../assets/logopurple.png";
import { FaInfo, FaTimes, FaUserAlt } from "react-icons/fa";
import { FaCartShopping, FaShop } from "react-icons/fa6";

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={` bg-white p-3 h-screen w-full lg:w-2/12 fixed top-0 duration-300 ease-in-out ${
        isOpen ? "left-0" : "left-[-200%]"
      } z-[99999999999999]`}
    >
      <Flex>
        <FaTimes
          className=" text-3xl cursor-pointer text-purple-600"
          onClick={() => setIsOpen(!isOpen)}
        />
      </Flex>
      <ul className=" mt-10">
        <li className=" rounded-md mb-2 bg-purple-50">
          <Link
            className=" flex items-center gap-4  duration-150 hover:ml-2 p-2 text-black hover:text-purple-600 text-lg font-medium hover:font-semibold"
            to="/shop"
          >
            <FaShop />
            Shop
          </Link>
        </li>
        <li className=" rounded-md mb-2 bg-purple-50">
          <Link
            className=" flex items-center gap-4  duration-150 hover:ml-2 p-2 text-black hover:text-purple-600 text-lg font-medium hover:font-semibold"
            to="/cart"
          >
            <FaCartShopping />
            Cart
          </Link>
        </li>
        <li className=" rounded-md mb-2 bg-purple-50">
          <Link
            className=" flex items-center gap-4 duration-150 hover:ml-2  p-2 text-black hover:text-purple-600 text-lg font-medium hover:font-semibold"
            to="/account"
          >
            <FaUserAlt />
            Profile
          </Link>
        </li>
        <li className=" rounded-md mb-2 bg-purple-50">
          <Link
            className=" flex items-center gap-4 duration-150 hover:ml-2  p-2 text-black hover:text-purple-600 text-lg font-medium hover:font-semibold"
            to="/account"
          >
            <FaInfo />
            Contact
          </Link>
        </li>
      </ul>

      <div className="w-full absolute left-0 bottom-20 lg:bottom-5">
        <img className="w-[60%] mx-auto" src={logopurple} alt="" />
      </div>
    </aside>
  );
};

export default MenuSidebar;
