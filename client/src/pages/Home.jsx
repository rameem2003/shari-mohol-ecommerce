import React, { useEffect } from "react";
import Banner from "../components/screens/Home/Banner";
import Hotsell from "../components/screens/Home/Hotsell";
import FeaturedProducts from "../components/screens/Home/FeaturedProducts";
import PremiumCategories from "../components/screens/Home/PremiumCategories";
import Service from "../components/screens/Home/Service";
import Conclusion from "../components/screens/Home/Conclusion";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main>
      <Banner />
      <Hotsell />
      <FeaturedProducts />
      <PremiumCategories />
      <Service />
      <Conclusion />
    </main>
  );
};

export default Home;
