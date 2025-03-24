import React, { useState } from "react";
import Container from "../common/Container";
import Flex from "../common/Flex";
import { FaBarsStaggered, FaCartShopping, FaUser } from "react-icons/fa6";
import { Link } from "react-router";
import { IoIosSearch } from "react-icons/io";
import logowhite from "../../assets/logowhite.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = false;
  return (
    <nav className="bg-transparent py-7 fixed w-full z-50">
      <Container>
        <Flex className="items-center justify-between px-8">
          <FaBarsStaggered
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl cursor-pointer text-white"
          />

          <Link to="/">
            <img className=" w-16" src="/vite.svg" alt="logo" />
          </Link>

          <Flex className="items-center justify-end gap-3">
            <Flex className="items-center justify-end gap-2">
              <div className="relative">
                <IoIosSearch className=" text-3xl text-white" />
              </div>
              <div className="relative">
                <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-6 text-black bg-white rounded-full">
                  1
                </span>
                <FaCartShopping className=" text-2xl text-white" />
              </div>
            </Flex>

            <Flex>
              {user ? (
                <div className="text-white relative group">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                  />

                  <div className=" bg-white hidden group-hover:block p-2 rounded absolute top-8 right-0 min-w-[250px]">
                    <h2 className="text-black font-semibold text-xl">User</h2>
                    <h2 className="text-black font-medium text-base">
                      email@gamil.com
                    </h2>

                    <Link
                      to="/profile"
                      className="text-black p-2 rounded border-[2px] border-black block mt-2 text-center font-semibold"
                    >
                      Profile
                    </Link>

                    <button className="text-black p-2 rounded border-[2px] border-black w-full block mt-2 text-center font-semibold">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-white">
                  <FaUser className=" text-2xl text-white" />
                </Link>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>

      <aside
        className={` bg-white p-3 h-screen w-3/12 fixed top-0 duration-300 ease-in-out ${
          isOpen ? "left-0" : "left-[-200%]"
        } z-50`}
      >
        <div className="w-full">
          <img className=" w-60 mx-auto" src={logowhite} alt="" />
        </div>

        <ul className=" mt-10">
          <li className=" rounded-md mb-2 bg-purple-50">
            <Link
              className=" p-2 block text-black hover:text-purple-600 text-3xl font-semibold"
              to="/"
            >
              Shari
            </Link>
          </li>
          <li className=" rounded-md mb-2 bg-purple-50">
            <Link
              className=" p-2 block text-black hover:text-purple-600 text-3xl font-semibold"
              to="/"
            >
              Shari
            </Link>
          </li>
          <li className=" rounded-md mb-2 bg-purple-50">
            <Link
              className=" p-2 block text-black hover:text-purple-600 text-3xl font-semibold"
              to="/"
            >
              Shari
            </Link>
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Navbar;
