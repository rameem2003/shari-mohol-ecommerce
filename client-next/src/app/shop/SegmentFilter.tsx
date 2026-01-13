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

const SegmentFilter = ({
  onChangeSegment,
}: {
  onChangeSegment: (segment: "hotSell" | "featured" | "") => void;
}) => {
  const [selectedSegment, setSelectedSegment] = useState<
    "hotSell" | "featured" | ""
  >("");

  const handleSelectChange = (value: "hotSell" | "featured" | "") => {
    onChangeSegment(value);
    setSelectedSegment(value);
  };
  return (
    <div className=" w-full mb-5 border-2 border-shari-mohol-primary rounded-sm">
      <h4 className=" text-xl text-white  font-semibold bg-shari-mohol-primary p-2 mb-4">
        Segment
      </h4>
      {/* 
      <Select
        onValueChange={(value: "hotSell" | "featured" | "") =>
          onChangeSegment(value)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select segment" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Segments</SelectLabel>
            <SelectItem value=" ">All</SelectItem>
            <SelectItem value="hotSell">Hot Sell</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}

      <ul className=" px-2">
        <li
          onClick={() => handleSelectChange("")}
          className={`${
            selectedSegment === ""
              ? "bg-shari-mohol-primary text-white"
              : "bg-gray-100"
          } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
        >
          All
        </li>
        <li
          onClick={() => handleSelectChange("hotSell")}
          className={`${
            selectedSegment === "hotSell"
              ? "bg-shari-mohol-primary text-white"
              : "bg-gray-100"
          } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
        >
          Hot Sell
        </li>
        <li
          onClick={() => handleSelectChange("featured")}
          className={`${
            selectedSegment === "featured"
              ? "bg-shari-mohol-primary text-white"
              : "bg-gray-100"
          } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
        >
          Featured
        </li>
      </ul>
    </div>
  );
};

export default SegmentFilter;
