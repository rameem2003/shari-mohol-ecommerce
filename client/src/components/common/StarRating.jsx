import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Flex from "./Flex";

const StarRating = ({ rating, className }) => {
  const clientRating = Array.from({ length: 5 }, (elm, index) => {
    const number = index + 0.5;

    return (
      <div key={index}>
        {rating >= index + 1 ? (
          <FaStar
            onClick={() => setRating(index + 1)}
            className={` text-yellow-500 ${className}`}
          />
        ) : rating > number ? (
          <FaStarHalfAlt className={` text-yellow-500 ${className}`} />
        ) : (
          <FaRegStar className={` text-yellow-500 ${className}`} />
        )}
      </div>
    );
  });

  return (
    <>
      <Flex className={`gap-1`}>{clientRating}</Flex>
    </>
  );
};

export default StarRating;
