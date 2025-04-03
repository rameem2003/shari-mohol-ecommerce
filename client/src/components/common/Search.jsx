import React, { useEffect, useRef, useState } from "react";
import Flex from "./Flex";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

const Search = ({ setSearchBox, searchBox }) => {
  const allProducts = useSelector((state) => state.allproducts.products); // get all products
  const [search, setSearch] = useState([]); // initial state all products for searching
  const [filterResult, setFilterResult] = useState([]); // state for storing the products after searching
  const inputRef = useRef(null); // ref for search box

  const handleSearch = (e) => {
    // for search event when by typing anything in search box
    if (e.target.value == "") {
      setFilterResult([]);
    } else {
      const searchResult = search.filter((searchItem) =>
        searchItem.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterResult(searchResult); // state for store the search result
    }
  };

  // function for view product
  const viewProduct = (id) => {
    setSearchBox(false); // close search box
    window.location.href = `/product/${id}`; // redirect to product page
  };

  useEffect(() => {
    setSearch(allProducts); // set all products in search state
  }, [allProducts]);

  useEffect(() => {
    inputRef.current.focus(); // focus on search box
  }, []);

  return (
    <div className="w-full px-3 bg-black/80 flex items-center justify-center fixed top-0 left-0 z-[9999999] h-screen overflow-hidden">
      <div className=" max-w-[1024px] w-[1024px] relative">
        <FaTimes
          onClick={() => setSearchBox(false)}
          className=" text-xl text-white absolute top-[-40px] right-0 cursor-pointer"
        />
        <input
          ref={inputRef}
          onChange={handleSearch}
          className=" w-full p-3 border-none outline-none font-medium text-xl shadow-custom"
          placeholder="Search here ..."
          type="text"
          name=""
          id=""
        />

        <div className=" bg-white max-h-[400px] overflow-y-scroll">
          {filterResult.map((item) => (
            <div
              onClick={() => viewProduct(item._id)}
              className=" cursor-pointer p-3 border-b-[1px] border-black bg-white hover:bg-purple-600 group"
            >
              <Flex>
                <Flex>
                  <img
                    src={item.images[0]}
                    className=" w-16 h-16"
                    alt={item.name}
                  />
                  <div className=" ml-3">
                    <h2 className=" text-xl group-hover:text-white">
                      {item.name}
                    </h2>
                    <div>
                      <span className=" text-lg font-bold group-hover:text-white">
                        BDT {item.discountPrice}
                      </span>{" "}
                      <del className=" group-hover:text-white">
                        BDT {item.sellingPrice}
                      </del>
                    </div>
                  </div>
                </Flex>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
