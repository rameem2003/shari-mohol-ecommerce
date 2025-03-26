import React, { useEffect, useState } from "react";
import Container from "../../common/Container";
import Flex from "../../common/Flex";
import Slider from "react-slick";
import ProductCard from "../../reusable/ProductCard";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router";
import Title from "../../common/Title";
import { useSelector } from "react-redux";
// import "slick-carousel/slick/slick-theme.css";

const PremiumCategories = () => {
  const categories = useSelector((state) => state.category.category);

  const [saree, setSaree] = useState([]);
  const [threePcs, setThreePcs] = useState([]);
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

  useEffect(() => {
    setSaree(
      categories.filter(
        (item) => item.name === "Sharee" || item.name === "Saree"
      )
    );
    setThreePcs(
      categories.filter((item) => item.name === "Ladies 3 piece dress")
    );
  }, [categories]);

  console.log(saree);

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
                  {saree[0]?.name}
                </h2>

                <h3 className=" text-4xl text-white font-hambra absolute right-[-50px] top-20 rotate-[-90deg]">
                  {saree[0]?.name}
                </h3>
              </div>
              <img
                className=" w-full h-full group-hover:scale-[1.2] duration-200"
                src={saree[0]?.thumb}
                alt={saree[0]?.name}
              />
            </div>

            <Link
              to={`/category/${saree[0]?._id}`}
              className="text-white inline-block mt-10 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View All
            </Link>
          </div>
          <div className=" w-full lg:w-8/12">
            <h2 className=" text-3xl font-bold text-black text-right">
              {saree[0]?.name}
            </h2>

            <div className=" mt-10">
              <div className="slider-container">
                <Slider {...settings}>
                  {saree[0]?.products.map((item) => (
                    <ProductCard
                      key={item._id}
                      className="w-full"
                      data={item}
                    />
                  ))}
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
                  {threePcs[0]?.name}
                </h2>

                <h3 className=" text-4xl text-white font-hambra absolute right-[-40px] top-20 rotate-[-90deg]">
                  {threePcs[0]?.name.slice(0, 7)}
                </h3>
              </div>
              <img
                className=" w-full h-full group-hover:scale-[1.2] duration-200"
                src={threePcs[0]?.thumb}
                alt={threePcs[0]?.name}
              />
            </div>

            <Link
              to={`/category/${threePcs[0]?._id}`}
              className="text-white inline-block mt-10 bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View All
            </Link>
          </div>
          <div className="w-full lg:w-8/12">
            <h2 className=" text-3xl font-bold text-black text-right">
              {threePcs[0]?.name}
            </h2>

            <div className=" mt-10">
              <div className="slider-container">
                <Slider {...settings}>
                  {threePcs[0]?.products.map((item) => (
                    <ProductCard
                      key={item._id}
                      className="w-full"
                      data={item}
                    />
                  ))}
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
