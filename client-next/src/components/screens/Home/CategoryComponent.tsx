"use client";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/category";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const CategoryComponent = ({ data }: { data: Category[] }) => {
  return (
    <section className=" w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={false}
        loop={true}
        autoplay={{ delay: 800 }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {data.map((category, index) => (
          <SwiperSlide>
            <div className=" w-full " key={index}>
              <CategoryCard data={category} key={index} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoryComponent;
