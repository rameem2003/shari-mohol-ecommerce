import React from "react";
import Container from "../../common/Container";
import Flex from "../../common/Flex";
import Slider from "react-slick";
import ProductCard from "../../reusable/ProductCard";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router";
import Title from "../../common/Title";
// import "slick-carousel/slick/slick-theme.css";

const PremiumCategories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,

    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className=" mt-10 my-20">
      <Container>
        <Title title="Explore Our Premium Categories" />

        {/* saree section */}
        <Flex className="mt-20 flex-col lg:flex-row rounded-lg p-2 shadow-xl gap-5">
          <div className=" w-full lg:w-4/12">
            <div className=" rounded-lg overflow-hidden group relative">
              <div className=" absolute top-0 left-0 bg-black/40 w-full h-full z-50">
                <h2 className=" text-3xl font-medium text-white  absolute bottom-2 left-2">
                  Sharee
                </h2>

                <h3 className=" text-4xl text-white font-hambra absolute right-[-50px] top-20 rotate-[-90deg]">
                  Sharee
                </h3>
              </div>
              <img
                className=" w-full h-full group-hover:scale-[1.2] duration-200"
                src="https://media.wired.com/photos/65382632fd3d190c7a1f5c68/1:1/w_1800,h_1800,c_limit/Google-Image-Search-news-Gear-GettyImages-824179306.jpg"
                alt="category"
              />
            </div>

            <Link
              to=""
              className="text-white inline-block mt-10 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View All
            </Link>
          </div>
          <div className=" w-full lg:w-8/12">
            <h2 className=" text-3xl font-bold text-black text-right">
              Sharee
            </h2>

            <div className=" mt-10">
              <div className="slider-container">
                <Slider {...settings}>
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                </Slider>
              </div>
            </div>
          </div>
        </Flex>

        {/* 3 pcs section */}
        <Flex className="mt-20 flex-col lg:flex-row rounded-lg p-2 shadow-xl gap-5">
          <div className="w-full lg:w-4/12">
            <div className=" rounded-lg overflow-hidden group relative">
              <div className=" absolute top-0 left-0 bg-black/40 w-full h-full z-50">
                <h2 className=" text-3xl font-medium text-white  absolute bottom-2 left-2">
                  Sharee
                </h2>

                <h3 className=" text-4xl text-white font-hambra absolute right-[-50px] top-20 rotate-[-90deg]">
                  Sharee
                </h3>
              </div>
              <img
                className=" w-full h-full group-hover:scale-[1.2] duration-200"
                src="https://media.wired.com/photos/65382632fd3d190c7a1f5c68/1:1/w_1800,h_1800,c_limit/Google-Image-Search-news-Gear-GettyImages-824179306.jpg"
                alt="category"
              />
            </div>

            <Link
              to=""
              className="text-white inline-block mt-10 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View All
            </Link>
          </div>
          <div className="w-full lg:w-8/12">
            <h2 className=" text-3xl font-bold text-black text-right">
              Sharee
            </h2>

            <div className=" mt-10">
              <div className="slider-container">
                <Slider {...settings}>
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                  <ProductCard className="w-full" />
                </Slider>
              </div>
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default PremiumCategories;
