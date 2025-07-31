import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const StartRatingInput = ({ setValue }) => {
  const [rating, setRating] = useState(0);
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <FaStar
            key={starRating}
            className={`cursor-pointer ${
              starRating <= rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-slate-700"
            }`}
            size={24}
            onClick={() => {
              setRating(starRating);
              setValue(starRating);
            }}
          />
        );
      })}
    </div>
  );
};

export default StartRatingInput;
