import React, { useState } from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FiBarChart, FiPieChart } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { PiBarcodeBold } from "react-icons/pi";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { FaCheckCircle, FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "../common/Loader";

const ResponsiveSidebar = () => {
  const { user: admin, logout, resendVerificationEmail, loading } = useAuth();
  const [isCollapse1, setIsCollapse1] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  return (
    <aside
      className={`boxShadow ease flex h-full flex-col justify-between bg-white transition-all duration-300 dark:bg-slate-900 ${
        isCollapse1 ? "w-6/12 md:w-3/12 2xl:w-3/12" : "w-auto"
      }`}
    >
      {/* {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-white/70 dark:bg-slate-900/70">
          <Loader />
        </div>
      )} */}
      <div>
        <div
          className={`mt-5 ${
            isCollapse1 ? "px-[20px]" : "px-[10px]"
          } transition-all duration-300 ease-in-out`}
        >
          {isCollapse1 ? (
            <div className="flex items-center justify-between">
              <img
                src="/fav.png"
                alt="logo"
                className="w-[50px] cursor-pointer"
              />
              <div className="group relative">
                <GoSidebarCollapse
                  className="cursor-pointer text-[1.5rem] text-gray-600 dark:text-white"
                  onClick={() => setIsCollapse1(false)}
                />

                {/* tooltip */}
                <div
                  className={`absolute -top-1 right-[-115px] z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-0 group-hover:opacity-100`}
                >
                  <p className="w-max rounded bg-gray-600 px-3 py-[5px] text-[0.9rem] text-secondary">
                    Collapse
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <img
              src="/fav.png"
              alt="logo"
              className="mx-auto w-[50px] cursor-pointer"
              onClick={() => setIsCollapse1(!isCollapse1)}
            />
          )}
        </div>

        {/* general section */}
        <div
          className={`mt-6 ${
            isCollapse1 ? "px-[20px]" : "px-[10px]"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="mt-3 flex flex-col gap-[5px]">
            <Link to="/">
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } group relative flex w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200`}
              >
                <div className="flex items-center gap-[8px]">
                  <FaHome className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Dashboard
                  </p>
                </div>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse1 ? "hidden" : "inline"
                  } absolute right-[-80px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-0 group-hover:opacity-100`}
                >
                  <p className="w-max rounded bg-slate-900 px-3 py-[5px] text-[0.9rem] text-secondary dark:text-white">
                    Dashboard
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/orders">
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } group relative flex w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200`}
              >
                <div className="flex items-center gap-[8px]">
                  <FaShoppingCart className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Order's
                  </p>
                </div>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse1 ? "hidden" : "inline"
                  } absolute right-[-99px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-[-20px] group-hover:opacity-100`}
                >
                  <p className="w-max rounded bg-slate-900 px-3 py-[5px] text-[0.9rem] text-white">
                    Order's
                  </p>
                </div>
              </div>
            </Link>

            {/* dropdown 1 product */}
            <div
              className={`${
                isCollapse1 && "justify-center"
              } ${null} group relative flex w-full cursor-pointer flex-col rounded-md bg-white p-[5px] transition-all duration-200 dark:bg-slate-900`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } gap-[8px flex w-full items-center`}
              >
                <div className="flex items-center gap-[8px]">
                  <MdCategory className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Product
                  </p>
                </div>

                <IoIosArrowDown
                  className={`${
                    isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                  } ${
                    isCollapse1 ? "inline" : "hidden"
                  } text-[1rem] text-gray-500 transition-all duration-300 dark:text-white`}
                />
              </div>

              {!isCollapse1 && (
                <>
                  {/* hover projects dropdown */}
                  <ul className="boxShadow absolute left-[70px] top-0 z-[-1] flex translate-y-[20px] list-none flex-col gap-[3px] rounded-md bg-white p-[8px] text-[1rem] text-gray-500 opacity-0 transition-all duration-300 group-hover:z-30 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900 dark:text-white">
                    <li className="rounded-md px-[20px] py-[5px]">
                      <Link to="/add-product">Add Product</Link>
                    </li>
                    <li className="rounded-md px-[20px] py-[5px]">
                      <Link to="/all-products">All Products</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* active projects dropdown product */}
            <ul
              className={`${
                isDropdownOpen
                  ? "z-[1] my-3 h-auto opacity-100"
                  : "z-[-1] h-0 opacity-0"
              } ${
                isCollapse1 ? "inline" : "hidden"
              } ml-[35px] flex flex-col gap-[3px] text-[1rem] text-gray-500 transition-all duration-300 marker:text-blue-400 dark:text-white`}
            >
              <li className="rounded-md px-[10px] py-1">
                <Link to="/add-product">Add Product</Link>
              </li>
              <li className="rounded-md px-[10px] py-1">
                <Link to="/all-products">All Products</Link>
              </li>
            </ul>

            {/* dropdown 2 category */}
            <div
              className={`${
                isCollapse1 && "justify-center"
              } ${null} group relative flex w-full cursor-pointer flex-col rounded-md bg-white p-[5px] transition-all duration-200 dark:bg-slate-900`}
              onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
            >
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } gap-[8px flex w-full items-center`}
              >
                <div className="flex items-center gap-[8px]">
                  <TbCategoryFilled className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Category
                  </p>
                </div>

                <IoIosArrowDown
                  className={`${
                    isDropdownOpen1 ? "rotate-[180deg]" : "rotate-0"
                  } ${
                    isCollapse1 ? "inline" : "hidden"
                  } text-[1rem] text-gray-500 transition-all duration-300 dark:text-white`}
                />
              </div>

              {!isCollapse1 && (
                <>
                  {/* hover projects dropdown */}
                  <ul className="boxShadow absolute left-[70px] top-0 z-[-1] flex translate-y-[20px] list-none flex-col gap-[3px] rounded-md bg-white p-[8px] text-[1rem] text-gray-500 opacity-0 transition-all duration-300 group-hover:z-30 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900 dark:text-white">
                    <li className="rounded-md px-[20px] py-[5px]">
                      <Link to="/add-category">Add Category</Link>
                    </li>
                    <li className="rounded-md px-[20px] py-[5px]">
                      <Link to="/all-categories">All Categories</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>

            {/* active projects dropdown category */}
            <ul
              className={`${
                isDropdownOpen1
                  ? "z-[1] my-3 h-auto opacity-100"
                  : "z-[-1] h-0 opacity-0"
              } ${
                isCollapse1 ? "inline" : "hidden"
              } ml-[35px] flex flex-col gap-[3px] text-[1rem] text-gray-500 transition-all duration-300 marker:text-blue-400 dark:text-white`}
            >
              <li className="rounded-md px-[10px] py-1">
                <Link to="/add-category">Add Category</Link>
              </li>
              <li className="rounded-md px-[10px] py-1">
                <Link to="/all-categories">All Categories</Link>
              </li>
            </ul>

            <Link to="/advertisement">
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } group relative flex w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200`}
              >
                <div className="flex items-center gap-[8px]">
                  <FiBarChart className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Advertisement
                  </p>
                </div>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse1 ? "hidden" : "inline"
                  } absolute right-[-100px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-0 group-hover:opacity-100`}
                >
                  <p className="w-max rounded bg-slate-900 px-3 py-[5px] text-[0.9rem] text-white">
                    Advertisement
                  </p>
                </div>
              </div>
            </Link>
            {/* optional */}
            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } group relative hidden w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200 hover:bg-gray-50`}
            >
              <div className="flex items-center gap-[8px]">
                <FiPieChart className="text-[1.3rem] text-gray-500" />
                <p
                  className={`${
                    isCollapse1 ? "inline" : "hidden"
                  } text-[1rem] font-[400] text-gray-500`}
                ></p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse1 ? "hidden" : "inline"
                } absolute right-[-76px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-0 group-hover:opacity-100`}
              >
                <p className="w-max rounded bg-gray-600 px-3 py-[5px] text-[0.9rem] text-secondary">
                  Goals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* setting section */}
        <div
          className={`${
            isCollapse1 ? "px-[20px]" : "px-[10px]"
          } mt-6 border-t border-gray-200 transition-all duration-300 ease-in-out`}
        >
          <div className="mt-3 flex flex-col gap-[5px]">
            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } group relative hidden w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200 hover:bg-gray-50`}
            >
              <div className="flex items-center gap-[8px]">
                <IoNotificationsOutline className="text-[1.3rem] text-gray-500" />
                <p
                  className={`${
                    isCollapse1 ? "inline" : "hidden"
                  } text-[1rem] font-[400] text-gray-500`}
                ></p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse1 ? "hidden" : "inline"
                } absolute right-[-98px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-0 group-hover:opacity-100`}
              >
                <p className="w-max rounded bg-gray-600 px-3 py-[5px] text-[0.9rem] text-secondary">
                  Activity
                </p>
              </div>
            </div>

            <Link to="/manageUsers">
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } group relative flex w-full cursor-pointer items-center rounded-md p-[5px] transition-all duration-200`}
              >
                <div className="flex items-center gap-[8px]">
                  <FaUsers className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Users Manage
                  </p>
                </div>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse1 ? "hidden" : "inline"
                  } absolute right-[-96px] top-0 z-[-1] translate-x-[20px] opacity-0 transition-all duration-500 group-hover:z-[1] group-hover:translate-x-[10px] group-hover:opacity-100`}
                >
                  <p className="w-max rounded bg-slate-900 px-3 py-[5px] text-[0.9rem] text-white">
                    Users Manage
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* profile section */}
      <div
        className={`${
          isCollapse1 ? "justify-between" : "justify-center"
        } mt-10 flex items-center bg-gray-100 px-[20px] py-3 dark:bg-slate-900`}
      >
        <div className="flex items-center gap-[10px]">
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_MEDIA}/${admin?.photo}`}
              alt="avatar"
              className="h-[30px] w-[30px] cursor-pointer rounded-full object-cover"
            />

            {admin?.isVerified ? (
              <FaCheckCircle className="absolute bottom-[-1px] right-[-2px] inline rounded-full border-2 border-white text-sm text-green-500" />
            ) : (
              <TbInfoTriangleFilled className="absolute bottom-[-1px] right-[-2px] inline rounded-full border-2 border-white text-sm text-yellow-500" />
            )}
          </div>
          <div>
            <h3
              className={`${
                isCollapse1 ? "inline" : "hidden"
              } text-[0.9rem] font-[500] text-gray-800 dark:text-white`}
            >
              {admin?.name}{" "}
            </h3>
            {/* <h5 className="text-xs font-normal text-gray-800 dark:text-white">
              {admin?.email}
            </h5> */}
          </div>
        </div>

        <div className={`${isCollapse1 ? "inline" : "hidden"} group relative`}>
          <BsThreeDots className="cursor-pointer text-[1.2rem] text-gray-500 dark:text-white" />

          <ul className="boxShadow absolute left-[30px] top-[-95px] z-[-1] flex min-w-[200px] translate-x-[20px] flex-col gap-[3px] rounded-md bg-white p-[8px] opacity-0 transition-all duration-300 group-hover:z-30 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-slate-900">
            <Link
              to="/my-account"
              className="flex cursor-pointer items-center gap-[7px] rounded-md px-[8px] py-[4px] text-[0.9rem] text-gray-600 dark:text-white"
            >
              <RiAccountCircleLine />
              Profile
            </Link>
            {!admin?.isVerified && (
              <button
                onClick={() => resendVerificationEmail(admin?.email)}
                className="flex cursor-pointer items-center gap-[7px] rounded-md bg-red-500 px-[8px] py-[4px] text-[0.9rem] text-gray-600 dark:text-white"
              >
                <PiBarcodeBold />
                Verify Your Account
              </button>
            )}
            <button
              onClick={logout}
              className="flex cursor-pointer items-center gap-[7px] rounded-md px-[8px] py-[4px] text-[0.9rem] text-red-500 dark:text-red-300"
            >
              <CiLogout />
              Logout
            </button>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ResponsiveSidebar;
