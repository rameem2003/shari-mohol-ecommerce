import React, { useEffect, useState } from "react";
import Title from "../../common/Title";
import Flex from "../../common/Flex";
import Container from "../../common/Container";
import Slider from "react-slick";
import axios from "axios";
import ProductCard from "../../reusable/ProductCard";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);

  // fetch featured products from the backend
  const fetchFeatured = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/product/featured`);
      setFeatured(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,

    slidesToShow: 2,
    slidesToScroll: 2,
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
    fetchFeatured();
  }, []);

  return (
    <section className=" mt-10 mb-20">
      <Container>
        <Title title="Featured Products" />

        <div className="mt-[31px]">
          {featured.length == 0 && (
            <Flex className="gap-4">
              <div className=" w-full md:w-1/2">
                <Skeleton inline={true} className="h-[400px]" />
              </div>
              <div className="hidden md:block md:w-1/2">
                <Skeleton inline={true} className="h-[400px]" />
              </div>
            </Flex>
          )}
          <div className="slider-container">
            <Slider {...settings}>
              {featured.map((p, i) => (
                <ProductCard className="w-full" data={p} key={p._id} />
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
