import React, { useEffect, useMemo, useState } from "react";

// react icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const LastOrders = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // fetch orders
  const fetchOrders = async () => {
    let res = await axios.get(`${import.meta.env.VITE_API}/order/all`);
    setOrders(
      res?.data?.data
        ?.filter((data) => data.deliveryStatus == "pending")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    );
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

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
    // fetchOrders();
  }, []);

  return (
    <div className="customTable mb-4 hidden h-auto w-full flex-col items-start gap-5 rounded-md bg-gray-100 p-2 lg:flex xl:w-8/12 dark:bg-slate-800">
      <div className="mx-auto w-full">
        <div className="mb-4 hidden">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300"
          />
        </div>

        <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
          Last 5 Pending Orders
        </h2>

        <div className="customTable w-full rounded-md">
          <table className="w-full overflow-x-scroll text-sm">
            <thead className="bg-gray-200 dark:bg-slate-900">
              <tr>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Order ID
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Customer Name
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Phone
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Payment Status
                </th>
                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Delivery Status
                </th>

                <th className="p-3 text-left font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {/* {orders?.slice(0, 4).map((item, index) => (
                <tr className="border-t border-gray-200" key={item._id}>
                  <td className="p-3 text-black dark:text-white">{item._id}</td>
                  <td className="p-3 text-black dark:text-white">
                    {item.name}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.phone}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.paymentStatus == "paid" ? (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-[#18c964] py-1.5 text-[0.9rem] font-[500] text-white">
                        <MdDone className="rounded-full bg-[#18c964] p-0.5 text-[1.4rem] text-[#fff]" />
                        Paid
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-red-500 py-1.5 text-[0.9rem] font-[500] text-white">
                        <FaTimes className="rounded-full bg-red-500 p-0.5 text-[1.4rem] text-[#fff]" />
                        Unpaid
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-black dark:text-white">
                    {item.deliveryStatus == "delivered" ? (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-[#18c964] py-1.5 text-[0.9rem] font-[500] text-white">
                        <MdDone className="rounded-full bg-[#18c964] p-0.5 text-[1.4rem] text-[#fff]" />
                        Delivered
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-full bg-red-500 py-1.5 text-[0.9rem] font-[500] text-white">
                        <FaTimes className="rounded-full bg-red-500 p-0.5 text-[1.4rem] text-[#fff]" />
                        Pending
                      </div>
                    )}
                  </td>

                  <td className="relative p-3">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(item._id)}
                      className="action-btn cursor-pointer text-gray-600 dark:text-white"
                    />

                    <div
                      className={`${
                        openActionMenuId === item._id
                          ? "z-30 scale-[1] opacity-100"
                          : "z-[-1] scale-[0.8] opacity-0"
                      } ${
                        item._id > 1 ? "bottom-[90%]" : "top-[90%]"
                      } zenui-table absolute right-[80%] min-w-[160px] rounded-md bg-white p-1.5 shadow-md transition-all duration-100`}
                    >
                      <Link className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                        <MdDeleteOutline />
                        Delete
                      </Link>
                      <Link
                        to={`/order/${item._id}`}
                        className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50"
                      >
                        <IoEyeOutline />
                        View Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hidden border-t border-gray-200 hover:bg-gray-50"
                >
                  {Object.entries(item).map(
                    ([key, value]) =>
                      key !== "id" && (
                        <td key={key} className="p-3">
                          {value}
                        </td>
                      ),
                  )}
                  <td className="relative p-3">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(item.id)}
                      className="action-btn cursor-pointer text-gray-600"
                    />

                    <div
                      className={`${
                        openActionMenuId === item.id
                          ? "z-30 scale-[1] opacity-100"
                          : "z-[-1] scale-[0.8] opacity-0"
                      } ${
                        index > 1 ? "bottom-[90%]" : "top-[90%]"
                      } zenui-table absolute right-[80%] min-w-[160px] rounded-md bg-white p-1.5 shadow-md transition-all duration-100`}
                    >
                      <p className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                        <MdOutlineEdit />
                        Edit
                      </p>
                      <p className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                        <MdDeleteOutline />
                        Delete
                      </p>
                      <p className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>

          {!orders?.length && (
            <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
              No data found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastOrders;
