import React from "react";
import { FaArrowRight, FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router";
import StarRating from "../common/StarRating";

const ProductCard = ({ className, data }) => {
  console.log(data);

  return (
    <div
      className={`${className} bg-white border border-gray-200  shadow-sm duration-150 hover:bg-purple-300 `}
    >
      <Link to={`/product/${data?._id}`}>
        <img
          className="p-8 rounded-t-lg h-[450px] w-full duration-[0.5s] hover:scale-[1.05] object-top"
          src={`${import.meta.env.VITE_MEDIA}/${data?.images[0]}`}
          alt={data?.name}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={`/product/${data?._id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {data?.name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <StarRating rating={data?.ratingAverage} />
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {data?.ratingAverage}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-lg xl:text-3xl font-bold text-gray-900">
            BDT {data?.discountPrice}{" "}
            <del className=" text-sm text-gray-500">{data?.sellingPrice}</del>
          </span>
          <Link
            to={`/product/${data?._id}`}
            className="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
