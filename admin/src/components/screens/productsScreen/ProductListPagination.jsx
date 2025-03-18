import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Flex from "../../common/Flex";
import ProductCard from "../../common/ProductCard";

const ProductListPagination = ({
  itemsPerPage,
  products,
  handleDelete,
  handleEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token
  const items = products;

  function Items({ currentItems }) {
    // function for product feature update
    const handleFeaturedUpdate = async (e, id) => {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("featured", e.target.checked);

        const res = await axios.patch(
          `http://localhost:5000/api/v1/product/update/${id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
            },
            withCredentials: true,
          },
        );

        Swal.fire({
          title: res.data.msg,
          confirmButtonText: "Ok",
          confirmButtonColor: "green",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.msg,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Ok",
          cancelButtonColor: "red",
          icon: "error",
        }).then((result) => {
          if (result.isDismissed) {
            location.reload();
          }
        });
      } finally {
        setLoading(false);
      }
    };

    // function for product hotSell update
    const handleHotSellUpdate = async (e, id) => {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("hotSell", e.target.checked);

        const res = await axios.patch(
          `http://localhost:5000/api/v1/product/update/${id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
            },
            withCredentials: true,
          },
        );

        Swal.fire({
          title: res.data.msg,
          confirmButtonText: "Ok",
          confirmButtonColor: "green",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.msg,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "Ok",
          cancelButtonColor: "red",
          icon: "error",
        }).then((result) => {
          if (result.isDismissed) {
            location.reload();
          }
        });
      } finally {
        setLoading(false);
      }
    };
    return (
      <Flex className="flex-wrap justify-between">
        {currentItems &&
          currentItems.map((p, index) => (
            <ProductCard
              data={p}
              handleFeaturedUpdate={handleFeaturedUpdate}
              handleHotSellUpdate={handleHotSellUpdate}
              className="w-full md:w-[48%] lg:w-[32%] 2xl:w-[24%]"
            />
          ))}
      </Flex>
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
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Flex className="mt-10 flex w-full items-center justify-between gap-5 lg:gap-0">
        <ReactPaginate
          breakLabel="..."
          className="flex gap-4"
          activeClassName="bg-slate-800 text-white"
          pageClassName=" p-5 border-[1px] border-[#F0F0F0] font-bold text-[14px] text-secondary"
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=""
          renderOnZeroPageCount={null}
        />
        {/* <p className="font-dm text-secondary text-[14px] font-normal leading-[30px]">
          Products from {itemOffset} to {endOffset} of {items.length}
        </p> */}
      </Flex>
    </>
  );
};

export default ProductListPagination;
