import React, { useEffect, useMemo, useState } from "react";
// react icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router";
import Flex from "../components/common/Flex";
import { FaTimes } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // fetch orders
  const fetchOrders = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/order/all`);
    setFilterResult(
      res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
    setOrders(
      res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };
  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for handle search
  const handleSearch = (e) => {
    if (e.target.value == "") {
      setFilterResult(orders);
    } else {
      const searchResult = orders.filter((searchItem) =>
        searchItem.phone.includes(e.target.value.toLowerCase())
      );
      setFilterResult(searchResult); // state for store the search result
    }
  };

  useEffect(() => {
    const handleCLick = (event) => {
      if (
        !event.target.closest(".zenui-table") &&
        !event.target.closest(".action-btn")
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener("click", handleCLick);
    return () => document.removeEventListener("click", handleCLick);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <main className="bg-white dark:bg-slate-900 border-l-[1px] border-black p-2 dark:border-white w-full overflow-y-scroll">
      <Flex className="items-center justify-between">
        <h2 className=" text-black dark:text-white text-2xl font-semibold">
          All Order's
        </h2>

        <div className="mb-4">
          <input
            placeholder="Search by phone..."
            // value={search}
            onChange={handleSearch}
            className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />
        </div>
      </Flex>

      <div className="customTable w-full rounded-md ">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 dark:bg-slate-900">
            <tr>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Order ID
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Customer Name
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Phone
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Grand Total
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Items
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Payment Status
              </th>
              <th className="text-left text-black font-medium dark:text-white p-3">
                Delivery Status
              </th>

              <th className="p-3 text-left font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filterResult.map((item, index) => (
              <tr className="border-t border-gray-200 " key={item._id}>
                <td className=" p-3 text-black dark:text-white">{item._id}</td>
                <td className=" p-3 text-black dark:text-white">{item.name}</td>
                <td className=" p-3 text-black dark:text-white">
                  {item.phone}
                </td>
                <td className=" p-3 text-black dark:text-white">
                  {item.grandTotal} BDT
                </td>
                <td className=" p-3 text-black dark:text-white">
                  {item.cartItems.length}
                </td>
                <td className=" p-3 text-black dark:text-white">
                  {item.paymentStatus == "paid" ? (
                    <div className=" py-1.5 bg-[#18c964] text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <MdDone className="p-0.5 text-[1.4rem] rounded-full bg-[#18c964] text-[#fff]" />
                      Paid
                    </div>
                  ) : (
                    <div className=" py-1.5 bg-red-500 text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <FaTimes className="p-0.5 text-[1.4rem] rounded-full bg-red-500 text-[#fff]" />
                      Unpaid
                    </div>
                  )}
                </td>
                <td className=" p-3 text-black dark:text-white">
                  {item.deliveryStatus == "delivered" ? (
                    <div className=" py-1.5 bg-[#18c964] text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <MdDone className="p-0.5 text-[1.4rem] rounded-full bg-[#18c964] text-[#fff]" />
                      Delivered
                    </div>
                  ) : (
                    <div className=" py-1.5 bg-red-500 text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <FaTimes className="p-0.5 text-[1.4rem] rounded-full bg-red-500 text-[#fff]" />
                      Pending
                    </div>
                  )}
                </td>

                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={() => toggleActionMenu(item._id)}
                    className="action-btn text-gray-600 dark:text-white cursor-pointer"
                  />

                  <div
                    className={`${
                      openActionMenuId === item._id
                        ? "opacity-100 scale-[1] z-30"
                        : "opacity-0 scale-[0.8] z-[-1]"
                    }
                                               ${
                                                 item._id > 1
                                                   ? "bottom-[90%]"
                                                   : "top-[90%]"
                                               }
                                               zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <Link className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdDeleteOutline />
                      Delete
                    </Link>
                    <Link
                      to={`/view/${item._id}`}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                    >
                      <IoEyeOutline />
                      View Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!orders?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
