import React, { useEffect, useMemo, useState } from "react";
import Flex from "../components/common/Flex";
import useOrder from "../hooks/useOrder";
import Loader from "../components/common/Loader";
import OrderList from "../components/common/OrderList";
import ListSkeleton from "../components/common/ListSkeleton";
import Pagination from "../components/common/Pagination";
import OrderFilter from "../components/screens/orderScreen/OrderFilter";

const OrdersPage = () => {
  const { orders, loading, paginationData, setOffset, setMethod, setStatus } =
    useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // filter order based on search term
  const filteredOrder = orders?.filter(
    (order) =>
      order?.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.userId?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.userId?.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // function for handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <Flex className="items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          All Order's
        </h2>

        <div className="mb-4">
          <input
            placeholder="Search by phone..."
            onChange={handleSearch}
            className="max-w-sm rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300"
          />
        </div>
      </Flex>

      <OrderFilter setStatus={setStatus} setMethod={setMethod} />

      {/* Order's Table */}
      {loading && <ListSkeleton />}
      {!loading && (
        <OrderList
          filteredOrder={filteredOrder}
          toggleActionMenu={toggleActionMenu}
          openActionMenuId={openActionMenuId}
        />
      )}
      {/* Pagination */}
      <Pagination paginationData={paginationData} setOffset={setOffset} />
    </main>
  );
};

export default OrdersPage;
