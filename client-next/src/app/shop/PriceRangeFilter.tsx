"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PriceRangeFilter = ({
  onChangePrice,
}: {
  onChangePrice: (price: "asc" | "desc") => void;
}) => {
  const [price, setPrice] = useState<"asc" | "desc" | "">("");
  const handleSelectChange = (value: "asc" | "desc") => {
    onChangePrice(value);
    setPrice(value);
  };

  return (
    <div className=" w-full mb-5 border-2 border-shari-mohol-primary rounded-sm">
      <h4 className=" text-xl text-white  font-semibold bg-shari-mohol-primary p-2 mb-4">
        Price Level
      </h4>

      {/* <Select onValueChange={(value: "asc" | "desc") => onChangePrice(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Price Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Price Levels</SelectLabel>
            <SelectItem value="asc">Low to High</SelectItem>
            <SelectItem value="desc">High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <ul className=" px-2">
        <li
          onClick={() => handleSelectChange("asc")}
          className={`${
            price === "asc"
              ? "bg-shari-mohol-primary text-white"
              : "bg-gray-100"
          } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
        >
          Low to High
        </li>
        <li
          onClick={() => handleSelectChange("desc")}
          className={`${
            price === "desc"
              ? "bg-shari-mohol-primary text-white"
              : "bg-gray-100"
          } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
        >
          High to Low
        </li>
      </ul>
    </div>
  );
};

export default PriceRangeFilter;
