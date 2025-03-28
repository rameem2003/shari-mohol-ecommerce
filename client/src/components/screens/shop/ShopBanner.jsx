import React from "react";
import shopBanner from "../../../assets/shop.jpeg";

const ShopBanner = () => {
  return (
    <div className=" w-full h-[500px] bg-purple-700">
      <img
        src={shopBanner}
        alt="banner"
        className=" w-full h-full object-fill"
      />
    </div>
  );
};

export default ShopBanner;
