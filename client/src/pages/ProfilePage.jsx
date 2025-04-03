import React, { useState } from "react";
import Container from "../components/common/Container";
import BreadCrumb from "../components/common/BreadCrumb";
import Flex from "../components/common/Flex";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AllOrders from "../components/screens/Account/AllOrders";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import EditProfile from "../components/screens/Account/EditProfile";
import ChangePassword from "../components/screens/Account/ChangePassword";

const ProfilePage = () => {
  const user = useSelector((state) => state.account.account); // user
  const [activeTab, setActiveTab] = useState(1); // active tab
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
              <div className="w-3/12 xl:w-1/12">
                <img
                  src={
                    user.photo
                      ? user.photo
                      : "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  className=" w-[80px] h-[80px] mx-auto lg:w-[120px] lg:h-[120px] rounded-full"
                  alt=""
                />
              </div>
              <div className="w-9/12 xl:w-11/12">
                <h4>Hello,</h4>
                <h2 className=" font-bold text-lg lg:text-xl text-black">
                  {user.name}
                </h2>
                <h2 className=" font-medium text-xs lg:text-lg text-black">
                  {user.email}
                </h2>
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
