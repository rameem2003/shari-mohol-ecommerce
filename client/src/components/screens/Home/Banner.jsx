import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im from "../../../assets/test-banner.jpg";
import Container from "../../common/Container";
import { Link } from "react-router";

const Banner = () => {
  // const banners = useSelector((state) => state.banners.banners); // get all banners
  const [slide, setSlide] = useState(0);
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
    beforeChange: (prev, next) => {
      setSlide(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          transform: "translateY(-50px)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === slide
            ? {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "#fff",
                border: "2px solid white",
              }
            : {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "gray",
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
    <section>
      <div className="slider-container">
        {/* <Slider {...settings}>
            {banners.map((b, i) => (
              <Image src={b.banner} className="w-full" alt={b.description} />
            ))}
          </Slider> */}

        <Slider {...settings}>
          <div
            className="relative test flex items-center justify-center py-[120px] 2xl:py-[300px] bg-black"
            style={{
              background: `url('${im}') no-repeat center center /cover`,
            }}
          >
            <img
              src={im}
              className=" absolute top-0 left-0  h-full w-full"
              alt=""
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-[9999999]">
              <Container className="">
                <div className="text-center text-white">
                  <h1 className=" text-xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus, debitis?
                  </h1>

                  <Link className="bg-purple-600 rounded-lg text-white px-6 py-2 ">
                    Shop Now
                  </Link>
                </div>
              </Container>
            </div>
          </div>
          <div
            className="relative test flex items-center justify-center py-[120px] 2xl:py-[300px] bg-black"
            style={{
              background: `url('${im}') no-repeat center center /cover`,
            }}
          >
            <img
              src={im}
              className=" absolute top-0 left-0  h-full w-full"
              alt=""
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-[9999999]">
              <Container className="">
                <div className="text-center text-white">
                  <h1 className=" text-xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus, debitis?
                  </h1>

                  <Link className="bg-purple-600 rounded-lg text-white px-6 py-2 ">
                    Shop Now
                  </Link>
                </div>
              </Container>
            </div>
          </div>
          <div
            className="relative test flex items-center justify-center py-[120px] 2xl:py-[300px] bg-black"
            style={{
              background: `url('${im}') no-repeat center center /cover`,
            }}
          >
            <img
              src={im}
              className=" absolute top-0 left-0  h-full w-full"
              alt=""
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-[9999999]">
              <Container className="">
                <div className="text-center text-white">
                  <h1 className=" text-xl md:text-2xl lg:text-3xl 2xl:text-5xl font-bold mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus, debitis?
                  </h1>

                  <Link className="bg-purple-600 rounded-lg text-white px-6 py-2 ">
                    Shop Now
                  </Link>
                </div>
              </Container>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Banner;
