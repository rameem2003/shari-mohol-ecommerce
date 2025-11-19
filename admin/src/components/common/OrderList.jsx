import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { Link } from "react-router";

const OrderList = ({ filteredOrder, toggleActionMenu, openActionMenuId }) => {
  return (
    <section className="customTable w-full rounded-md">
      <table className="w-full text-sm">
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
              Grand Total
            </th>
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Items
            </th>
            {/* <th className="p-3 text-left font-medium text-black dark:text-white">
                   Payment Status
                 </th> */}
            <th className="p-3 text-left font-medium text-black dark:text-white">
              Payment Method
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
          {filteredOrder?.map((item, index) => (
            <tr className="border-t border-gray-200" key={item._id}>
              <td className="p-3 text-black dark:text-white">{item._id}</td>
              <td className="p-3 text-black dark:text-white">
                {item?.userId?.name}
              </td>
              <td className="p-3 text-black dark:text-white">{item.phone}</td>
              <td className="p-3 text-black dark:text-white">
                {item.grandTotal} BDT
              </td>
              <td className="p-3 text-black dark:text-white">
                {item.cartItems.length}
              </td>
              <td className="p-3 capitalize text-black dark:text-white">
                {item.paymentMethod}
              </td>
              <td className="p-3 text-black dark:text-white">
                {item.deliveryStatus == "delivered" ? (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-[#18c964] py-1.5 text-[0.9rem] font-[500] capitalize text-white">
                    <MdDone className="rounded-full bg-[#18c964] p-0.5 text-[1.4rem] text-[#fff]" />
                    {item.deliveryStatus}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-red-500 py-1.5 text-[0.9rem] font-[500] capitalize text-white">
                    <FaTimes className="rounded-full bg-red-500 p-0.5 text-[1.4rem] text-[#fff]" />
                    {item.deliveryStatus}
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
                  {/* <Link className="hidden w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50">
                         <MdDeleteOutline />
                         Delete
                       </Link> */}
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
        </tbody>
      </table>

      {!filteredOrder?.length && (
        <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">
          No data found!
        </p>
      )}
    </section>
  );
};

export default OrderList;
