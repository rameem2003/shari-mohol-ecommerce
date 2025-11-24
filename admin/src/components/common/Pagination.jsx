import React from "react";
import Flex from "./Flex";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Pagination = ({ paginationData, setOffset }) => {
  return (
    <Flex className="my-2 items-center justify-start gap-4">
      {paginationData?.currentPage > 1 && (
        <Link
          onClick={() => setOffset(paginationData?.currentPage - 1)}
          className="inline-block rounded-l-lg border-2 border-white p-5"
          to={`?offset=${paginationData?.currentPage - 1}`}
        >
          <FaArrowLeft className="cursor-pointer text-white" />
        </Link>
      )}

      <span className="inline-block border-2 border-white p-4 text-white">
        {paginationData?.currentPage}
      </span>

      {paginationData?.currentPage < paginationData?.totalPages && (
        <Link
          onClick={() => setOffset(paginationData?.currentPage + 1)}
          className="inline-block rounded-r-lg border-2 border-white p-5"
          to={`?offset=${paginationData?.currentPage + 1}`}
        >
          <FaArrowRight className="cursor-pointer text-white" />
        </Link>
      )}
    </Flex>
  );
};

export default Pagination;
