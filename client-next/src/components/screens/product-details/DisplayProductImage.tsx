"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";

const DisplayProductImage = ({ data }: { data: Product }) => {
  let images = data?.images;
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    // setSelectedImage(0);
    images = data?.images;
  }, [data]);

  return (
    <>
      {/* Left side - Image gallery */}
      <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">
        {/* Thumbnails */}
        <div className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">
          {data?.images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                selectedImage === index
                  ? "border-shari-mohol-primary"
                  : "border-transparent dark:border-slate-700"
              }`}
            >
              <img
                src={process.env.NEXT_PUBLIC_MEDIA + image}
                alt={`Product ${index + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="w-full md:w-[80%] dark:bg-slate-900 bg-gray-100 rounded-sm h-full relative flex items-center justify-center">
          <img
            src={process.env.NEXT_PUBLIC_MEDIA + images[selectedImage]}
            alt="Product main image"
            className="object-cover w-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default DisplayProductImage;
