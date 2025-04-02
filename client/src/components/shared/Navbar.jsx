import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import Flex from "../common/Flex";
import {
  FaBarsStaggered,
  FaCartShopping,
  FaShop,
  FaUser,
} from "react-icons/fa6";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import CartSidebar from "../reusable/CartSidebar";
import MenuSidebar from "../reusable/MenuSidebar";
import { useDispatch, useSelector } from "react-redux";
import { BannerReducer } from "../../redux/slices/BannerSlice";
import { CategoryReducer } from "../../redux/slices/CategorySlice";
import { allProducts } from "../../redux/slices/ProductSlice";
import { Link } from "react-router";
import { IoIosSearch } from "react-icons/io";
import logopurple from "../../assets/logopurple.png";
import logowhite from "../../assets/logowhite.png";
import { FaHome, FaTimes } from "react-icons/fa";
const Navbar = () => {
  const user = useSelector((state) => state.account.account); // user
  const cart = useSelector((state) => state.cart.cart); // cart
  const { handleLogout } = useAuth();
  const dispatch = useDispatch(); // dispatch instance
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    // console.log(offset);

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

  // fetch all banners
  const fetchBanners = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/banner/all`);
      dispatch(BannerReducer(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all categories
  const fetchCategories = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/category/all`);
      dispatch(CategoryReducer(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all products
  const fetchAllProducts = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/product/all`);
      dispatch(allProducts(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanners();
    fetchCategories();
    fetchAllProducts();
  }, []);

  return (
    <>
      <nav
        className={`${
          scrolled ? "bg-white" : "bg-black/20"
        } py-7 fixed w-full z-[999]`}
      >
        <Container>
          <Flex className="items-center justify-between lg:px-8">
            <div className=" w-1/2 lg:w-1/3 order-2 lg:order-1 text-right">
              <FaBarsStaggered
                onClick={() => setIsOpen(!isOpen)}
                className={`text-3xl cursor-pointer ml-auto lg:me-auto lg:ml-0 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            </div>
            <div className=" w-1/2 lg:w-1/3 order-1 lg:order-2">
              <Link to="/">
                <img
                  className=" w-[70%] md:w-[40%] lg:w-[40%] ml-0 lg:mx-auto"
                  src={scrolled ? logopurple : logowhite}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="hidden lg:block lg:w-1/3 order-3">
              <Flex className="items-center justify-end gap-3">
                <Flex className="items-center justify-end gap-2">
                  <div className="relative">
                    <IoIosSearch
                      className={` text-3xl ${
                        scrolled ? "text-black" : "text-white"
                      }`}
                    />
                  </div>
                  <div
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative cursor-pointer"
                  >
                    <span
                      className={`${
                        scrolled && "border-[2px] border-black"
                      } absolute top-[-10px] right-[-10px] inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-6 text-black bg-white rounded-full`}
                    >
                      {cart?.length}
                    </span>
                    <FaCartShopping
                      className={` text-2xl ${
                        scrolled ? "text-black" : "text-white"
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
                            ? user.photo
                            : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                        alt=""
                      />

                      <div className=" bg-white hidden group-hover:block p-2 rounded absolute top-8 right-0 min-w-[250px]">
                        <h2 className="text-black font-semibold text-xl">
                          {user.name}
                        </h2>
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
                          scrolled ? "text-black" : "text-white"
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

      <MenuSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <CartSidebar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />

      <section className=" block lg:hidden fixed w-full p-2 z-[99999999999999] left-0 bottom-0 bg-purple-800">
        <Flex className="items-center justify-center gap-10">
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
              Cart (1)
            </span>
          </Link>
          <Link
            to="/account"
            className=" flex flex-col items-center justify-center gap-2"
          >
            <FaUser className=" text-white text-lg" />
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
