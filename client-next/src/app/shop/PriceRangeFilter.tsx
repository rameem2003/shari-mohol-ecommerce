import React from "react";
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
  return (
    <div className=" w-full mb-5">
      <h4 className=" text-xl text-shari-mohol-primary font-semibold mb-4">
        Price Level
      </h4>

      <Select onValueChange={(value: "asc" | "desc") => onChangePrice(value)}>
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
      </Select>
    </div>
  );
};

export default PriceRangeFilter;
