import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/shared/Sidebar";

const Rootlayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Rootlayout;
