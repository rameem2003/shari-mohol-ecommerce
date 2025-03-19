import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";

const Rootlayout = () => {
  return (
    <div className="flex h-full w-full lg:h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Rootlayout;
