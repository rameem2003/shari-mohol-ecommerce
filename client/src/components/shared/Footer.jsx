import React from "react";
import logowhite from "../../assets/logowhite.png";
import Container from "../common/Container";
import { Link } from "react-router";
// react icons
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="bg-purple-900 boxShadow w-full p-6 md:p-9 pb-[120px] lg:pb-5">
      <Container>
        <div className="flex justify-center gap-[30px] flex-wrap w-full sm:px-20">
          <div className=" text-center">
            <img src={logowhite} className=" mx-auto" alt="logo" />

            <h3 className=" mt-8 text-xl font-bold text-white">
              That inspires your confidence and makes you feel good.
            </h3>
          </div>

          <div className="flex justify-center sm:justify-center gap-[30px] w-full flex-wrap">
            <Link
              to=""
              className="text-[0.9rem] text-white cursor-pointer transition-all duration-200"
            >
              FAQ
            </Link>
            <Link
              to=""
              className="text-[0.9rem] text-white cursor-pointer transition-all duration-200"
            >
              How To Buy
            </Link>
            <Link
              to=""
              className="text-[0.9rem] text-white cursor-pointer transition-all duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to=""
              className="text-[0.9rem] text-white cursor-pointer transition-all duration-200"
            >
              Account
            </Link>
          </div>

          <div className="flex items-center flex-wrap gap-[10px] text-white">
            <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#22023a] transition-all duration-300">
              <CgFacebook />
            </a>
            <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#22023a] transition-all duration-300">
              <BsTwitter />
            </a>
            <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#22023a] transition-all duration-300">
              <BsInstagram />
            </a>
            <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#22023a] transition-all duration-300">
              <BsLinkedin />
            </a>
          </div>

          <div className="border-t border-gray-200 pt-[20px] flex items-center w-full flex-wrap gap-[20px] justify-center">
            <a
              href="https://rolstudiobangladesh.vercel.app/"
              target="_blank"
              className="text-[0.8rem] sm:text-[0.9rem] text-gray-200 text-center"
            >
              © 2025 ROL Studio Bangladesh || Developer: Mahmood Hassan Rameem
              || All Rights Reserved
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
