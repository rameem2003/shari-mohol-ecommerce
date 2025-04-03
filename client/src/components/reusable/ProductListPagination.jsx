import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Flex from "../common/Flex";
import ProductCard from "./ProductCard";

const ProductListPagination = ({ itemsPerPage, products }) => {
  // Example items, to simulate fetching from another resources.
  const items = products;

  function Items({ currentItems }) {
    return (
      <>
        {/* {items.length == 0 && (
          <>
            <ProductListSkeleton />
            <ProductListSkeleton />
          </>
        )} */}
        <Flex className="flex-wrap justify-between">
          {currentItems &&
            currentItems.map((item, i) => (
              <ProductCard
                key={i}
                className="mb-10 w-full md:w-1/2"
                data={item}
              />
            ))}
        </Flex>
      </>
    );
  }

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Flex className="my-16 flex-col items-center justify-between gap-5 lg:mb-[140px] lg:mt-[50px] lg:flex-row lg:gap-0">
        <ReactPaginate
          breakLabel="..."
          className="ml-[-15px] flex gap-1 lg:gap-4"
          activeClassName="bg-purple-600 text-white"
          pageClassName=" p-3 lg:p-5 border-[1px] border-[#F0F0F0] font-dm font-normal text-[14px] text-secondary"
          nextLabel={products.length <= 6 ? "" : ">"}
          nextClassName={
            products.length > 6 &&
            " p-2 lg:p-5 border-[1px] border-[#F0F0F0] font-dm font-normal text-base text-secondary"
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={products.length <= 6 ? "" : "<"}
          previousClassName={
            products.length > 6 &&
            " p-2 lg:p-5 border-[1px] border-[#F0F0F0] font-dm font-normal text-base text-secondary"
          }
          renderOnZeroPageCount={null}
        />
        <p className="font-dm text-secondary text-[14px] font-normal leading-[30px]">
          Products from {itemOffset} to {endOffset} of {items.length}
        </p>
      </Flex>
    </>
  );
};

export default ProductListPagination;
