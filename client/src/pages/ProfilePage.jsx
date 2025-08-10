import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import Container from "../components/common/Container";
import BreadCrumb from "../components/common/BreadCrumb";
import Flex from "../components/common/Flex";
import AllOrders from "../components/screens/Account/AllOrders";
import EditProfile from "../components/screens/Account/EditProfile";
import ChangePassword from "../components/screens/Account/ChangePassword";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCartShopping } from "react-icons/fa6";
import { FaTimes, FaUserEdit } from "react-icons/fa";
import { MdDone, MdPassword } from "react-icons/md";

const ProfilePage = () => {
  const user = useSelector((state) => state.account.account); // user
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState(1); // active tab

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className=" py-[120px]">
      <Container>
        <BreadCrumb path={"Profile"} />

        <section className=" mt-10">
          {!user ? (
            <div>
              <Skeleton inline={true} className="h-[200px]" />
            </div>
          ) : (
            <Flex className="items-center gap-5">
              <div className="w-4/12 md:w-2/12  xl:w-[10%]">
                <img
                  src={
                    user.photo
                      ? `${import.meta.env.VITE_MEDIA}/${user.photo}`
                      : "https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  className=" w-[80px] h-[80px] mx-auto lg:w-[120px] lg:h-[120px] rounded-full"
                  alt=""
                />
              </div>
              <div className="w-8/12 md:w-10/12 xl:w-[90%]">
                <h4>Hello,</h4>
                <Flex className="items-center gap-2">
                  <h2 className=" font-bold text-lg lg:text-xl text-black">
                    {user.name}
                  </h2>

                  {user.verified ? (
                    <div className="px-4 py-1  text-white bg-[#18c964] rounded-full text-[0.7rem] font-[500] flex items-center gap-1">
                      <MdDone className="p-0.5 text-[1.1rem] rounded-full bg-white text-[#18c964]" />
                      <span className=" hidden md:block">Verified</span>
                    </div>
                  ) : (
                    <div className="px-4 py-1  text-white bg-red-500 rounded-full text-[0.7rem] font-[500] flex items-center gap-1">
                      <FaTimes className="p-0.5 text-[1.1rem] rounded-full bg-white text-red-500" />
                      <span className=" hidden md:block">Not Verified</span>
                    </div>
                  )}
                </Flex>
                <h2 className=" font-medium text-xs lg:text-lg text-black">
                  {user.email}
                </h2>

                <button
                  onClick={handleLogout}
                  className=" mt-2 px-4 py-1 rounded-full bg-red-500 text-white"
                >
                  Logout
                </button>
              </div>
            </Flex>
          )}
        </section>

        <section className=" mt-10">
          <div className=" mb-4 flex items-center gap-5 justify-center w-full">
            <ul className="flex items-center w-full">
              <li
                className={`${
                  activeTab === 1
                    ? "border border-b-transparent rounded-tr rounded-tl"
                    : "border-b"
                } px-6 py-2 border-[#d1d1d1] text-text transition duration-300 cursor-pointer`}
                onClick={() => setActiveTab(1)}
              >
                <span className=" block md:hidden">
                  <FaCartShopping />
                </span>
                <span className=" hidden md:block">Orders</span>
              </li>
              <li
                className={`${
                  activeTab === 2
                    ? "border border-b-transparent rounded-tr rounded-tl"
                    : "border-b"
                } px-6 py-2 border-[#d1d1d1] text-text transition duration-300 cursor-pointer`}
                onClick={() => setActiveTab(2)}
              >
                <span className=" block md:hidden">
                  <FaUserEdit />
                </span>
                <span className=" hidden md:block">Edit Profile</span>
              </li>
              <li
                className={`${
                  activeTab === 3
                    ? "border border-b-transparent rounded-tr rounded-tl"
                    : "border-b"
                } px-6 py-2 border-[#d1d1d1] text-text transition duration-300 cursor-pointer`}
                onClick={() => setActiveTab(3)}
              >
                <span className=" block md:hidden">
                  <MdPassword />
                </span>
                <span className=" hidden md:block">Change Password</span>
              </li>
            </ul>
          </div>

          <div className=" mt-10">{activeTab === 1 && <AllOrders />}</div>
          <div className=" mt-10">{activeTab === 2 && <EditProfile />}</div>
          <div className=" mt-10">{activeTab === 3 && <ChangePassword />}</div>
        </section>
      </Container>
    </main>
  );
};

export default ProfilePage;
