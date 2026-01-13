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
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchCategories = async () => {
    let { data } = await getCategories();
    setCategory(data);
  };

  const handleSelectChange = (value: string) => {
    onChangeCategory(value);
    setSelectedCategory(value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" w-full mb-5 border-2 border-shari-mohol-primary rounded-sm">
      <h4 className=" text-xl text-white  font-semibold bg-shari-mohol-primary p-2 mb-4">
        Choose Category
      </h4>

      {/* <Select onValueChange={(value: string) => onChangeCategory(value)}>
        <SelectTrigger className="w-full">
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
      </Select> */}

      <ul className=" px-2">
        {category?.map((cat) => (
          <li
            key={cat._id}
            onClick={() => handleSelectChange(cat._id)}
            className={`${
              selectedCategory === cat._id
                ? "bg-shari-mohol-primary text-white"
                : "bg-gray-100"
            } cursor-pointer p-2 mb-2 hover:bg-shari-mohol-primary hover:text-white rounded-sm`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
