import React, { useEffect, useMemo, useState } from "react";

// react icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";

const LastOrders = () => {
  const initialData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
  ];

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
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

  return (
    <div className="customTable p-2 rounded-md min-h-full mb-4 w-full bg-gray-100 dark:bg-slate-800 flex items-center flex-col gap-5 justify-center lg:w-8/12">
      <div className="w-full mx-auto">
        <div className="mb-4 hidden">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />
        </div>

        <h2 className=" font-bold text-2xl text-black dark:text-white mb-5">
          Last 5 Pending Orders
        </h2>

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
              {initialData.map((item, index) => (
                <tr className="border-t border-gray-200 ">
                  <td className=" p-3 text-black dark:text-white">54546465</td>
                  <td className=" p-3 text-black dark:text-white">Name</td>
                  <td className=" p-3 text-black dark:text-white">41564646</td>
                  <td className=" p-3 text-black dark:text-white">
                    <div className=" py-1.5 bg-[#18c964] text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <MdDone className="p-0.5 text-[1.4rem] rounded-full bg-[#18c964] text-[#fff]" />
                      Paid
                    </div>
                  </td>
                  <td className=" p-3 text-black dark:text-white">
                    <div className=" py-1.5 bg-[#18c964] text-white rounded-full text-[0.9rem] font-[500] flex items-center justify-center gap-2">
                      <MdDone className="p-0.5 text-[1.4rem] rounded-full bg-[#18c964] text-[#fff]" />
                      Delivered
                    </div>
                  </td>

                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(index)}
                      className="action-btn text-gray-600 cursor-pointer"
                    />

                    <div
                      className={`${
                        openActionMenuId === index
                          ? "opacity-100 scale-[1] z-30"
                          : "opacity-0 scale-[0.8] z-[-1]"
                      }
                                         ${
                                           index > 1
                                             ? "bottom-[90%]"
                                             : "top-[90%]"
                                         }
                                         zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdOutlineEdit />
                        Edit
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdDeleteOutline />
                        Delete
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50 hidden"
                >
                  {Object.entries(item).map(
                    ([key, value]) =>
                      key !== "id" && (
                        <td key={key} className="p-3">
                          {value}
                        </td>
                      )
                  )}
                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() => toggleActionMenu(item.id)}
                      className="action-btn text-gray-600 cursor-pointer"
                    />

                    <div
                      className={`${
                        openActionMenuId === item.id
                          ? "opacity-100 scale-[1] z-30"
                          : "opacity-0 scale-[0.8] z-[-1]"
                      }
                                         ${
                                           index > 1
                                             ? "bottom-[90%]"
                                             : "top-[90%]"
                                         }
                                         zenui-table absolute right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdOutlineEdit />
                        Edit
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdDeleteOutline />
                        Delete
                      </p>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!sortedData?.length && (
            <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
              No data found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastOrders;
