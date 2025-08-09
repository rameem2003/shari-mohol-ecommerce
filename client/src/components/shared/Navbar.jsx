import React, { useContext, useEffect, useState } from "react";
import Container from "../common/Container";
import Flex from "../common/Flex";
import useAuth from "../../hooks/useAuth";
import CartSidebar from "../reusable/CartSidebar";
import MenuSidebar from "../reusable/MenuSidebar";
import Search from "../common/Search";
import useProduct from "../../hooks/useProduct";
import { ToggleContext } from "../../context/ToggleContextProvider";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import {
  FaBarsStaggered,
  FaCartShopping,
  FaShop,
  FaUser,
} from "react-icons/fa6";
import logowhite from "../../assets/logowhite.png";
import logopurple from "../../assets/logopurple.png";
const Navbar = () => {
  const location = useLocation();
  let route = location.pathname;
  const { menuToggle, setMenuToggle, cartToggle, setCartToggle } =
    useContext(ToggleContext);
  const { handleLogout } = useAuth();
  const { fetchBanners, fetchCategories, fetchAllProducts } = useProduct();
  const [searchBox, setSearchBox] = useState(false);
  const user = useSelector((state) => state.account.account); // user
  const cart = useSelector((state) => state.cart.cart); // cart
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchBanners();
    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <>
      <nav
        className={`${
          scrolled || route !== "/" ? "bg-white" : "bg-black/20"
        } py-7 fixed w-full z-[999]`}
      >
        <Container>
          <Flex className="items-center justify-between lg:px-8">
            <div className=" w-1/2 lg:w-1/3 order-2 lg:order-1 text-right">
              <FaBarsStaggered
                onClick={() => setMenuToggle(!menuToggle)}
                className={`text-3xl cursor-pointer ml-auto lg:me-auto lg:ml-0 ${
                  scrolled || route !== "/" ? "text-black" : "text-white"
                }`}
              />
            </div>
            <div className=" w-1/2 lg:w-1/3 order-1 lg:order-2">
              <Link to="/">
                <img
                  className=" w-[70%] sm:w-[40%] lg:w-[40%] ml-0 lg:mx-auto"
                  src={scrolled || route !== "/" ? logopurple : logowhite}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="hidden lg:block lg:w-1/3 order-3">
              <Flex className="items-center justify-end gap-3">
                <Flex className="items-center justify-end gap-2">
                  <div className="relative">
                    <IoIosSearch
                      onClick={() => setSearchBox(true)}
                      className={` text-3xl cursor-pointer ${
                        scrolled || route !== "/" ? "text-black" : "text-white"
                      }`}
                    />
                  </div>
                  <div
                    onClick={() => setCartToggle(!cartToggle)}
                    className="relative cursor-pointer"
                  >
                    <span
                      className={`${
                        scrolled && "border-[2px] border-black"
                      } absolute  top-[-10px] right-[-10px] inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-6 text-black bg-white rounded-full`}
                    >
                      {cart?.length}
                    </span>
                    <FaCartShopping
                      className={` text-2xl ${
                        scrolled || route !== "/" ? "text-black" : "text-white"
                      }`}
                    />
                  </div>
                </Flex>

                <Flex>
                  {user ? (
                    <div className="text-white relative group cursor-pointer">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          user.photo
                            ? `${import.meta.env.VITE_MEDIA}/${user.photo}`
                            : "https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt=""
                      />

                      <div className=" bg-white hidden group-hover:block p-2 rounded absolute top-8 right-0 min-w-[250px]">
                        <Flex className="items-center gap-2">
                          <h2 className="text-black font-semibold text-xl">
                            {user.name}
                          </h2>
                          {user.verified ? (
                            <div className="px-4 py-1  text-white bg-[#18c964] rounded-full text-[0.7rem] font-[500] flex items-center gap-1">
                              <MdDone className="p-0.5 text-[1.1rem] rounded-full bg-white text-[#18c964]" />
                              Verified
                            </div>
                          ) : (
                            <div className="px-4 py-1  text-white bg-red-500 rounded-full text-[0.7rem] font-[500] flex items-center gap-1">
                              <FaTimes className="p-0.5 text-[1.1rem] rounded-full bg-white text-red-500" />
                              Not Verified
                            </div>
                          )}
                        </Flex>
                        <h2 className="text-black font-medium text-base">
                          {user.email}
                        </h2>

                        <Link
                          to="/account"
                          className="text-black p-2 rounded border-[2px] border-black block mt-2 text-center font-semibold"
                        >
                          Profile
                        </Link>

                        <button
                          onClick={() => handleLogout(user.id)}
                          className="text-black p-2 rounded border-[2px] border-black w-full block mt-2 text-center font-semibold"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login" className="text-white">
                      <FaUser
                        className={` text-2xl ${
                          scrolled || route !== "/"
                            ? "text-black"
                            : "text-white"
                        }`}
                      />
                    </Link>
                  )}
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Container>
      </nav>

      <MenuSidebar />

      <CartSidebar />

      {searchBox && (
        <Search setSearchBox={setSearchBox} searchBox={searchBox} />
      )}

      <section className=" block lg:hidden fixed w-full p-2 z-[99999999999999] left-0 bottom-0 bg-purple-800">
        <Flex className="items-center justify-center gap-8">
          <Link
            to="/"
            className=" flex flex-col items-center justify-center gap-2"
          >
            <FaHome className=" text-white text-lg" />
            <span className=" font-serif text-[10px] uppercase text-white">
              Home
            </span>
          </Link>
          <Link
            to="/shop"
            className=" flex flex-col items-center justify-center gap-2"
          >
            <FaShop className=" text-white text-lg" />
            <span className=" font-serif text-[10px] uppercase text-white">
              Shop
            </span>
          </Link>
          <Link
            to="/cart"
            className=" flex flex-col items-center justify-center gap-2"
          >
            <FaCartShopping className=" text-white text-lg" />
            <span className=" font-serif text-[10px] uppercase text-white">
              Cart ({cart?.length})
            </span>
          </Link>
          <div
            onClick={() => setSearchBox(true)}
            className=" flex flex-col items-center justify-center gap-2"
          >
            <FaSearch className=" text-white text-lg" />
            <span className=" font-serif text-[10px] uppercase text-white">
              Search
            </span>
          </div>
          <Link
            to="/account"
            className=" flex flex-col items-center justify-center gap-2"
          >
            {user ? (
              <img
                className=" w-5 h-5 rounded-full"
                src={`${import.meta.env.VITE_MEDIA}/${user.photo}`}
                alt=""
              />
            ) : (
              <FaUser className=" text-white text-lg" />
            )}
            <span className=" font-serif text-[10px] uppercase text-white">
              Account
            </span>
          </Link>
        </Flex>
      </section>
    </>
  );
};

export default Navbar;
