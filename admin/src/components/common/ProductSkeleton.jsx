import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="rounded-md border-2 border-gray-800 p-3">
      <Skeleton
        baseColor="#0F172A"
        highlightColor="#ddd"
        count={1}
        height={250}
        className="mb-1 w-1/2 rounded-md"
      />
      <div className="mt-5">
        <Skeleton
          baseColor="#0F172A"
          highlightColor="#ddd"
          count={1}
          className="mb-1 w-1/2 rounded-md"
        />
        <Skeleton
          baseColor="#0F172A"
          highlightColor="#ddd"
          count={1}
          className="mb-1 w-full rounded-md"
        />
        <Skeleton
          baseColor="#0F172A"
          highlightColor="#ddd"
          count={1}
          className="mb-1 w-1/2 rounded-md"
        />
      </div>

      <div className="mt-5"></div>
    </div>
  );
};

export default ProductSkeleton;
