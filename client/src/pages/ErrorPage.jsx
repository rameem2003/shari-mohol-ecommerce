import React, { useEffect } from "react";
import errorImage from "../assets/undraw_groceries_4via.png";
import Title from "../components/common/Title";
import { Link } from "react-router";

const ErrorPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main className=" flex items-center justify-center flex-col gap-5 h-screen">
      <img src={errorImage} className="w-[400px]" alt="" />
      <Title className="w-full text-center" title={"404 || Page Not Found"} />

      <Link
        to={"/"}
        className="text-white inline-block mt-10 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Back Home
      </Link>
    </main>
  );
};

export default ErrorPage;
