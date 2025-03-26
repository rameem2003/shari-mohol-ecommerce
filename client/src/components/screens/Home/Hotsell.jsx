import React, { useEffect, useState } from "react";
import Title from "../../common/Title";
import Container from "../../common/Container";
import Slider from "react-slick";
import axios from "axios";
import ProductCard from "../../reusable/ProductCard";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Hotsell = () => {
  const [hotsell, setHotsell] = useState([]);

  // fetch hotsell products from the backend
  const fetchHotSell = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_API}/product/hotsell`);
      setHotsell(res.data.data);
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
    fetchHotSell();
  }, []);

  return (
    <section className=" mt-10 mb-20">
      <Container>
        <Title title="Hotsell" />

        <div className="mt-[31px]">
          <div className="slider-container">
            <Slider {...settings}>
              {hotsell.map((p, i) => (
                <ProductCard className="w-full" data={p} key={p._id} />
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hotsell;
