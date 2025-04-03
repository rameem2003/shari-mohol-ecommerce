import React, { useContext, useEffect, useRef } from "react";
import { ToggleContext } from "../../context/ToggleContextProvider";
import { Link } from "react-router";
import Flex from "../common/Flex";
import logopurple from "../../assets/logopurple.png";
import { FaInfo, FaTimes, FaUserAlt } from "react-icons/fa";
import { FaCartShopping, FaShop } from "react-icons/fa6";

const MenuSidebar = () => {
  const { menuToggle, setMenuToggle } = useContext(ToggleContext);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuToggle(false);
      }
    };

    if (menuToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuToggle]);

  return (
    <aside
      ref={sidebarRef}
      className={` bg-white p-3 h-screen w-full lg:w-3/12 xl:w-2/12 fixed top-0 duration-300 ease-in-out ${
        menuToggle ? "left-0" : "left-[-200%]"
      } z-[99999999999999]`}
    >
      <Flex>
        <FaTimes
          className=" text-3xl cursor-pointer text-purple-600"
          onClick={() => setMenuToggle(!menuToggle)}
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
