"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { searchProductsRequest } from "@/api/product-api";
import { ProductResponse } from "@/types/product";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Container from "./Container";

const SearchComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ProductResponse | null>(null);
  const [query, setQuery] = useState<string>("");

  const handleSearch = async () => {
    setLoading(true);
    let res = await searchProductsRequest(query);
    setResults(res);
    // console.log(res);

    setLoading(false);
  };

  const handleAfterProductRedirect = () => {
    setResults(null);
    setQuery("");
  };

  // Debounced search
  useEffect(() => {
    if (query.trim() === "") {
      setResults(null);
      setLoading(false);
      return;
    }

    const delay = setTimeout(() => {
      handleSearch();
    }, 500); // wait 500ms after user stops typing

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className=" w-full">
      <Container>
        <div className="w-full h-10 lg:h-[50px] bg-white rounded-sm relative">
          <div className=" h-full w-full relative">
            <input
              onChange={(e) => setQuery(e.target.value)}
              className=" w-full h-full px-5 rounded-sm border-2 border-shari-mohol-primary text-shari-mohol-primary outline-none font-medium text-base lg:text-lg placeholder:text-shari-mohol-primary"
              placeholder="Search Your Product....."
              type="text"
              name=""
              id=""
            />

            <Button className=" absolute right-0 top-0 h-full w-[55px] rounded-sm bg-shari-mohol-primary hover:bg-shari-mohol-primary/90 cursor-pointer p-0">
              <Search className=" size-5 text-white" />
            </Button>
          </div>
          {(loading || results) && (
            <div className=" absolute w-full p-2 z-1000 bg-gray-100 top-[70px] rounded-md left-0">
              {loading && (
                <p className=" text-center text-shari-mohol-primary text-lg">
                  Loading...
                </p>
              )}

              {results?.data?.map((product, i) => (
                <div
                  key={product._id}
                  className=" mb-4 flex items-start justify-start gap-3"
                >
                  <div>
                    <img
                      className=" w-10 h-10 rounded-full"
                      src={process.env.NEXT_PUBLIC_MEDIA + product.images[0]}
                      alt={product.name}
                      // width={200}
                      // height={200}
                    />
                  </div>

                  <div>
                    <Link
                      onClick={handleAfterProductRedirect}
                      href={`/product/${product._id}`}
                      className=" text-base font-bold text-shari-mohol-primary"
                    >
                      {product.name}
                    </Link>

                    <div>
                      <span className=" text-sm font-medium text-shari-mohol-primary mr-2">
                        BDT {product.discountPrice}
                      </span>
                      <del className=" text-xs font-medium text-rose-500">
                        BDT {product.sellingPrice}
                      </del>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && results?.data.length === 0 && (
                <p className=" text-center text-shari-mohol-primary text-lg">
                  No results found.
                </p>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SearchComponent;
