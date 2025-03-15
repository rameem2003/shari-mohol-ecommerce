import React, { useState } from "react";

// react icons
import { GoHome, GoProjectSymlink, GoSidebarCollapse } from "react-icons/go";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { CiCalendar, CiLogout } from "react-icons/ci";
import { FiBarChart, FiPieChart } from "react-icons/fi";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from "react-router";

const ResponsiveSidebar = () => {
  const [isCollapse1, setIsCollapse1] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(true);

  return (
    <aside
      className={`bg-white dark:bg-slate-900 boxShadow transition-all duration-300 ease h-full flex flex-col justify-between  ${
        isCollapse1 ? "w-2/12" : "w-auto"
      }`}
    >
      <div>
        <div
          className={`mt-5 ${
            isCollapse1 ? "px-[20px]" : "px-[10px]"
          } transition-all duration-300 ease-in-out`}
        >
          {isCollapse1 ? (
            <div className="flex items-center justify-between">
              <img
                src="https://i.ibb.co/ZHYQ04D/footer-logo.png"
                alt="logo"
                className="w-[130px] cursor-pointer"
              />
              <div className="relative group">
                <GoSidebarCollapse
                  className="text-[1.5rem] text-gray-600 cursor-pointer"
                  onClick={() => setIsCollapse1(false)}
                />

                {/* tooltip */}
                <div
                  className={`absolute -top-1 right-[-115px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Collapse
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <img
              src="https://i.ibb.co/0BZfPq6/darklogo.png"
              alt="logo"
              className="w-[50px] mx-auto cursor-pointer"
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
                } flex items-center w-full  p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <div className="flex items-center gap-[8px]">
                  <GoHome className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white}`}
                  >
                    Dashboard
                  </p>
                </div>

                {/* tooltip */}
                <div
                  className={`${
                    isCollapse1 ? "hidden" : "inline"
                  } absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-slate-900 dark:text-white text-secondary rounded px-3 py-[5px]">
                    Dashboard
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/orders">
              <div
                className={`${
                  isCollapse1 ? "justify-between" : "justify-center"
                } flex items-center w-full p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
              >
                <div className="flex items-center gap-[8px]">
                  <CiCalendar className="text-[1.3rem] text-gray-500 dark:text-white" />
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
                  } absolute top-0 right-[-99px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
                >
                  <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                    Calendar
                  </p>
                </div>
              </div>
            </Link>

            <div
              className={`${
                isCollapse1 && "justify-center"
              } ${null}  flex w-full  p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group flex-col bg-white dark:bg-slate-900`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div
                className={`${
                  isCollapse1 ? " justify-between" : "justify-center"
                } flex items-center gap-[8px  w-full`}
              >
                <div className="flex items-center gap-[8px]">
                  <GoProjectSymlink className="text-[1.3rem] text-gray-500 dark:text-white" />
                  <p
                    className={`${
                      isCollapse1 ? "inline" : "hidden"
                    } text-[1rem] font-bold text-gray-500 dark:text-white`}
                  >
                    Product and Category
                  </p>
                </div>

                <IoIosArrowDown
                  className={`${
                    isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                  } ${
                    isCollapse1 ? "inline" : "hidden"
                  } transition-all duration-300 text-[1rem] text-gray-500 dark:text-white`}
                />
              </div>

              {!isCollapse1 && (
                <>
                  {/* hover projects dropdown */}
                  <ul className="translate-y-[20px] list-none opacity-0 z-[-1] dark:bg-slate-900 group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[70px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px] text-[1rem] text-gray-500 dark:text-white">
                    <li className="px-[20px] py-[5px] rounded-md">Google</li>
                    <li className="px-[20px] py-[5px] rounded-md">Facebook</li>
                    <li className="px-[20px] py-[5px] rounded-md">Twitter</li>
                    <li className="px-[20px] py-[5px] rounded-md">Linkedin</li>
                  </ul>
                </>
              )}
            </div>

            {/* active projects dropdown */}
            <ul
              className={`${
                isDropdownOpen
                  ? "h-auto my-3 opacity-100 z-[1]"
                  : "opacity-0 z-[-1] h-0"
              } ${
                isCollapse1 ? "inline" : "hidden"
              } transition-all duration-300 marker:text-blue-400 ml-[35px] flex flex-col gap-[3px] text-[1rem] text-gray-500 dark:text-white`}
            >
              <li className="px-[10px] py-[5px] rounded-md">Google</li>
              <li className="px-[10px] py-[5px] rounded-md">Facebook</li>
              <li className="px-[10px] py-[5px] rounded-md">Twitter</li>
              <li className="px-[10px] py-[5px] rounded-md">Linkedin</li>
            </ul>

            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <FiBarChart className="text-[1.3rem] text-gray-500" />
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
                } absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  Progress
                </p>
              </div>
            </div>
            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
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
                } absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
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
          } mt-6 border-t border-gray-200  transition-all duration-300 ease-in-out`}
        >
          <div className="mt-3 flex flex-col gap-[5px]">
            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
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
                } absolute top-0 right-[-98px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  Activity
                </p>
              </div>
            </div>

            <div
              className={`${
                isCollapse1 ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <IoSettingsOutline className="text-[1.3rem] text-gray-500" />
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
                } absolute top-0 right-[-96px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  Setting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* profile section */}
      <div
        className={`${
          isCollapse1 ? "justify-between" : "justify-center"
        } bg-gray-100 py-3 px-[20px] flex items-center mt-10 dark:bg-slate-900`}
      >
        <div className="flex items-center gap-[10px]">
          <img
            src="https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1724478146~exp=1724481746~hmac=7de91a5b9271ecb4309974122ae6f47d71c01f7fff840c69755f781a03d9e340&w=996"
            alt="avatar"
            className="w-[30px] h-[30px] cursor-pointer rounded-full object-cover"
          />
          <h3
            className={`${
              isCollapse1 ? "inline" : "hidden"
            } text-[0.9rem] text-gray-800 dark:text-white font-[500]`}
          >
            Jhon Deo
          </h3>
        </div>

        <div className={`${isCollapse1 ? "inline" : "hidden"} relative group`}>
          <BsThreeDots className="text-[1.2rem] text-gray-500 dark:text-white cursor-pointer" />

          <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-[-52px] left-[30px] bg-white dark:bg-slate-900 boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
            <li className="flex items-center gap-[7px] text-[0.9rem] text-gray-600 dark:text-white px-[8px] py-[4px] rounded-md cursor-pointer">
              <RiAccountCircleLine />
              Profile
            </li>
            <li className="flex items-center gap-[7px] text-[0.9rem] text-red-500 dark:text-red-300 px-[8px] py-[4px] rounded-md cursor-pointer">
              <CiLogout />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default ResponsiveSidebar;
