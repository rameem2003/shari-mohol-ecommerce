import React, { useState } from "react";
import Flex from "../../common/Flex";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ProductImagePreview = ({ data }) => {
  const [img, setImg] = useState(0);
  return (
    <Flex className="flex-col lg:flex-row gap-2">
      <div className="w-full lg:w-4/12">
        <Flex className="flex-row gap-4 lg:flex-col">
          {data?.images?.map((img, i) => (
            <img
              key={i}
              onClick={() => setImg(i)}
              src={`${import.meta.env.VITE_MEDIA}/${img}`}
              className="mx-auto h-[138px] w-[170px] cursor-pointer"
            />
          ))}
        </Flex>
      </div>
      <div className="w-full lg:w-8/12">
        <PhotoProvider>
          <PhotoView
            src={`${import.meta.env.VITE_MEDIA}/${data?.images?.[img]}`}
          >
            <img
              src={`${import.meta.env.VITE_MEDIA}/${data?.images?.[img]}`}
              className="h-full w-full object-cover"
            />
          </PhotoView>
        </PhotoProvider>
      </div>
    </Flex>
  );
};

export default ProductImagePreview;
