import React, { useState } from "react";
import Flex from "./Flex";
import Loader from "./Loader";
import { deleteProductRequest } from "../../api/product";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const ProductCard = ({
  className,
  data,
  handleHotSellUpdate,
  handleFeaturedUpdate,
  handleEdit,
  onUpdate,
}) => {
  const [isLoading, setIsLoading] = useState(false); // set the target category

  // function for product delete
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      let res = await deleteProductRequest(id);

      setIsLoading(false);

      if (!res.success) {
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      await onUpdate();
      console.log(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div
        className={`${className} boxShadow mb-10 rounded-md bg-white dark:bg-slate-800`}
      >
        {isLoading && (
          <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
            <Loader />
          </Flex>
        )}
        <div className="flex w-full items-center justify-between p-4">
          <h2 className="text-[1.4rem] font-semibold text-black dark:text-white">
            {data.name}
          </h2>

          <div
            onClick={() => handleDelete(data._id)}
            className="flex items-center gap-[5px]"
          >
            <FaTrash className="cursor-pointer rounded-full bg-red-300 py-[4px] text-[1.5rem] text-red-800" />
          </div>
        </div>

        <Flex className="justify-between p-4">
          <div className="flex items-center gap-[5px]">
            <input
              type="checkbox"
              checked={data.hotSell}
              onChange={(e) => handleHotSellUpdate(e, data._id)}
              className="size-5"
              name=""
              id="hotSell"
            />
            <label
              htmlFor="hotSell"
              className="flex items-center gap-[5px] font-bold text-black dark:text-white"
            >
              Hot Sell
            </label>
          </div>

          <div className="flex items-center gap-[5px]">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) => handleFeaturedUpdate(e, data._id)}
              className="size-5"
              name=""
              id="featured"
            />
            <label
              htmlFor="featured"
              className="flex items-center gap-[5px] font-bold text-black dark:text-white"
            >
              Featured
            </label>
          </div>
        </Flex>
        <img
          src={`${import.meta.env.VITE_MEDIA}/${data.images[0]}`}
          alt={data.name}
          className="h-[150px] w-full"
        />

        <div className="p-4">
          <p className="text-[1rem] text-gray-700 dark:text-white">
            {data.description}
          </p>
          <p className="text-[1rem] text-gray-700 dark:text-white">
            Category: {data.category?.name || "null"}, SubCategory :{" "}
            {data.subCategory || "null"}
          </p>

          <div className="640px:flex-row 640px:gap-[5px] 640px:items-center mt-5 flex w-full flex-col justify-between gap-[15px]">
            <h3 className="flex items-center gap-[4px] text-[1.4rem] font-semibold text-black dark:text-white">
              BDT {data.discountPrice}
              <del className="text-[1rem] font-[300] text-red-500">
                BDT {data.sellingPrice}
              </del>
            </h3>

            <button
              onClick={() => handleEdit(data)}
              className="rounded-md border border-gray-600 px-6 py-2 text-gray-700 dark:border-white dark:text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
