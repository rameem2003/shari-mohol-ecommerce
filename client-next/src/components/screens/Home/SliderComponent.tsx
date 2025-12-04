"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BannerData {
  _id: number;
  banner: string;
  advertisementLink: string;
  description: string;
}

const SliderComponent = ({ data }: { data: BannerData[] }) => {
  const [slide, setSlide] = useState<number>(0);
  // slider settings
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev: number, next: number) => {
      setSlide(next);
    },
    appendDots: (dots: number) => (
      <div
        style={{
          transform: "translateY(-50px)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={
          i === slide
            ? {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "#663399",
                border: "2px solid white",
              }
            : {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "#fff",
              }
        }
      >
        {/* {i + 1} */}
      </div>
    ),

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item) => (
          <img
            src={`${process.env.NEXT_PUBLIC_MEDIA}${item.banner}`}
            className="w-full h-auto md:h-[400px] xl:h-[600px] rounded-md"
            alt="Banner Image"
          />
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
