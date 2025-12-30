import React, { useEffect, useState } from "react";
import ListSkeleton from "../../common/ListSkeleton";
import OrderList from "../../common/OrderList";
import { fetchAllOrdersRequest } from "../../../api/order";

const LastOrders = () => {
  const [orders, setOrders] = useState(null);
  const [search, setSearch] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // fetch orders
  const fetchOrders = async () => {
    let res = await fetchAllOrdersRequest();
    console.log(res);

    setOrders(res?.pendingOrders);
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // Handle search

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
    <div className="customTable mb-4 hidden h-auto w-full flex-col items-start gap-5 rounded-md bg-gray-100 p-2 lg:flex dark:bg-slate-800">
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
          Last Pending Orders
        </h2>
        {!orders && (
          <div className="block w-full">
            <ListSkeleton />
          </div>
        )}

        {orders && (
          <OrderList
            filteredOrder={orders}
            toggleActionMenu={toggleActionMenu}
            openActionMenuId={openActionMenuId}
          />
        )}
      </div>
    </div>
  );
};

export default LastOrders;
