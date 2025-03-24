import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Flex from "../../common/Flex";
import { MdGppGood } from "react-icons/md";
import { ImPriceTags } from "react-icons/im";
import { FaTruck } from "react-icons/fa6";
const Service = () => {
  return (
    <section className=" mt-10 my-20">
      <Container>
        <Title title="Why we are different?" />

        <section className=" mt-10">
          <Flex className="items-center justify-between flex-col md:flex-row">
            <div className="w-[95%] mx-auto md:w-6/12 lg:w-[30%] p-3 shadow-xl flex items-center flex-col">
              <div className="w-[80px] h-[80px] flex bg-purple-600 items-center justify-center rounded-full">
                <MdGppGood className=" text-5xl text-white" />
              </div>

              <h3 className=" mt-5 text-2xl font-bold text-balance text-center">
                Premium Quality Products
              </h3>

              <p className=" mt-2 text-balance text-black text-center">
                We ensure the best quality of our products
              </p>
            </div>

            <div className="w-[95%] mx-auto md:w-6/12 lg:w-[30%] p-3 shadow-xl flex items-center flex-col">
              <div className="w-[80px] h-[80px] flex bg-purple-600 items-center justify-center rounded-full">
                <ImPriceTags className=" text-5xl text-white" />
              </div>

              <h3 className=" mt-5 text-2xl font-bold text-balance text-center">
                Affordable Price
              </h3>

              <p className=" mt-2 text-balance text-black text-center">
                We provide the best price in the market
              </p>
            </div>

            <div className="w-[95%] mx-auto md:w-6/12 lg:w-[30%] p-3 shadow-xl flex items-center flex-col">
              <div className="w-[80px] h-[80px] flex bg-purple-600 items-center justify-center rounded-full">
                <FaTruck className=" text-5xl text-white" />
              </div>

              <h3 className=" mt-5 text-2xl font-bold text-balance text-center">
                Fast Delivery
              </h3>

              <p className=" mt-2 text-balance text-black text-center">
                We ensure best delivery experience
              </p>
            </div>
          </Flex>
        </section>
      </Container>
    </section>
  );
};

export default Service;
