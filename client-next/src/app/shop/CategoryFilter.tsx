"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/api/category-api";
import { Category } from "@/types/category";

const CategoryFilter = ({
  onChangeCategory,
}: {
  onChangeCategory: (category: string) => void;
}) => {
  const [category, setCategory] = useState<Category[] | null>(null);

  const fetchCategories = async () => {
    let { data } = await getCategories();
    console.log(data);
    setCategory(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" w-full mb-5">
      <h4 className=" text-xl text-shari-mohol-primary font-semibold mb-4">
        Choose Category
      </h4>

      <Select onValueChange={(value: string) => onChangeCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Choose category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {category?.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
