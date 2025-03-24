import React from "react";
import Container from "../../common/Container";
import Slider from "react-slick";
import ProductCard from "../../reusable/ProductCard";
import "slick-carousel/slick/slick.css";
import Title from "../../common/Title";
// import "slick-carousel/slick/slick-theme.css";

const Hotsell = () => {
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

  return (
    <section className=" mt-10 mb-20">
      <Container>
        <Title title="Hotsell" />

        {/* <div className="mt-[31px]">
            {featured.length > 0 ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {featured.map((p, i) => (
                    <ItemCardProtrait
                      data={p}
                      key={p._id}
                      className="mx-auto w-[90%]"
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <ProductListSkeleton />
            )}
          </div> */}

        <div className="mt-[31px]">
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
      </Container>
    </section>
  );
};

export default Hotsell;
