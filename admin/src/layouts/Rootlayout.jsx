import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";

const Rootlayout = () => {
  return (
    <div className=" flex w-full h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Rootlayout;
