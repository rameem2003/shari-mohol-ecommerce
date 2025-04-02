import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const BreadCrumb = ({ path }) => {
  return (
    <p className=" flex items-center gap-2">
      <Link to="/">
        <FaHome className="text-2xl text-gray-400" />
      </Link>
      / <span className=" text-lg font-medium">{path}</span>
    </p>
  );
};

export default BreadCrumb;
