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

const SegmentFilter = ({
  onChangeSegment,
}: {
  onChangeSegment: (segment: "hotSell" | "featured" | "") => void;
}) => {
  return (
    <div className=" w-full mb-5">
      <h4 className=" text-xl text-shari-mohol-primary font-semibold mb-4">
        Segment
      </h4>

      <Select
        onValueChange={(value: "hotSell" | "featured" | "") =>
          onChangeSegment(value)
        }
      >
        <SelectTrigger className="w-[180px]">
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
      </Select>
    </div>
  );
};

export default SegmentFilter;
