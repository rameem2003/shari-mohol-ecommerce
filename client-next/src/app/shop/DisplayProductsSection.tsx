"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/api/product-api";
import ProductsList from "./ProductsList";
import { ProductResponse } from "@/types/product";
import Pagination from "./Pagination";
import SegmentFilter from "./SegmentFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import CategoryFilter from "./CategoryFilter";

const DisplayProductsSection = () => {
  const [products, setProducts] = useState<ProductResponse | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [price, setPrice] = useState<string>(
    searchParams.get("price") || "asc"
  );
  const [page, setPage] = useState<string>(searchParams.get("page") || "");
  const [segment, setSegment] = useState<"hotSell" | "featured" | "">(
    (searchParams.get("segment") as "hotSell" | "featured" | "" | null) || ""
  );
  const [offset, setOffset] = useState<number>(
    parseInt(searchParams.get("offset") || "1")
  );

  // Function to update URL query
  const updateQuery = () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (price) params.set("price", price);
    if (page) params.set("page", page.toString());
    if (segment) params.set("segment", segment);
    if (offset) params.set("offset", offset.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const fetchProducts = async () => {
    let res = await getProducts(
      segment,
      offset,
      6,
      category,
      price as "asc" | "desc" | null
    );
    console.log(res);
    setProducts(res);
  };

  useEffect(() => {
    updateQuery();
    fetchProducts();
  }, [category, price, page, segment, offset]);
  return (
    <section className=" flex items-start justify-between gap-5">
      {/* <button onClick={() => setPrice("desc")}>DESC</button> */}
      <div className=" w-2/12">
        <CategoryFilter onChangeCategory={setCategory} />
        <SegmentFilter onChangeSegment={setSegment} />
        <PriceRangeFilter onChangePrice={setPrice} />
      </div>
      <div className=" w-10/12">
        <ProductsList data={products} />
        <Pagination paginationData={products} setOffset={setOffset} />
      </div>
    </section>
  );
};

export default DisplayProductsSection;
