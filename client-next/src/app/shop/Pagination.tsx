import { ProductResponse } from "@/types/product";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Pagination = ({
  paginationData,
  setOffset,
}: {
  paginationData: ProductResponse | null;
  setOffset: any;
}) => {
  return (
    <section className=" flex items-start justify-start my-2">
      {paginationData?.currentPage! > 1 && (
        <Link
          onClick={() => setOffset(paginationData?.currentPage! - 1)}
          className="inline-block rounded-l-lg border-2 border-shari-mohol-primary px-4 py-2"
          href={`?offset=${paginationData?.currentPage! - 1}`}
        >
          <ArrowLeft className="cursor-pointer text-shari-mohol-primary" />
        </Link>
      )}

      <span className="inline-block border-2 border-shari-mohol-primary px-4 py-2 text-shari-mohol-primary font-semibold">
        {paginationData?.currentPage}
      </span>

      {paginationData?.currentPage! < paginationData?.totalPages! && (
        <Link
          onClick={() => setOffset(paginationData?.currentPage! + 1)}
          className="inline-block rounded-r-lg border-2 border-shari-mohol-primary px-4 py-2"
          href={`?offset=${paginationData?.currentPage! + 1}`}
        >
          <ArrowRight className="cursor-pointer text-shari-mohol-primary" />
        </Link>
      )}
    </section>
  );
};

export default Pagination;
