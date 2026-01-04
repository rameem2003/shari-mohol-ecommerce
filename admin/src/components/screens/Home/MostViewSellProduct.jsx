import React, { useEffect, useState } from "react";
import ListSkeleton from "../../common/ListSkeleton";
import OrderList from "../../common/OrderList";
import { fetchAllProductsRequest } from "../../../api/product";

const MostViewSellProduct = () => {
  const [mostSelling, setMostSelling] = useState(null);
  const [mostView, setMostView] = useState(null);
  const [orders, setOrders] = useState(null);
  const [search, setSearch] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // fetch orders
  const fetchOrders = async () => {
    let res = await fetchAllProductsRequest();
    console.log("Most Viewed", res);

    setMostSelling(res.mostSellingProducts);
    setMostView(res.mostViewedProducts);
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
    <div className="customTable mb-4 h-auto w-full flex-col items-start gap-5 rounded-md bg-gray-100 p-2 dark:bg-slate-800">
      <div className="mx-auto w-full">
        <div className="mt-5 flex flex-wrap items-start justify-between gap-2 lg:flex-nowrap">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
              Most Selling Products
            </h2>
            <div className="block w-full">
              {!mostSelling && <ListSkeleton />}
            </div>
            {mostSelling &&
              mostSelling.map((product) => (
                <div
                  key={product._id}
                  className="mb-4 flex items-center gap-4 rounded-md bg-white p-4 shadow-md dark:bg-slate-700"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={`${import.meta.env.VITE_MEDIA}/${product.images[0]}`}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start justify-between">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                      {product.name} {`(Sold: ${product.sellCount})`}
                    </h2>
                    <span className="text-sm font-semibold text-black dark:text-white">
                      {product.discountPrice} BDT
                    </span>
                    <del className="text-xs font-semibold text-red-500">
                      {product.sellingPrice} BDT
                    </del>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
              Most Viewed Products
            </h2>
            <div className="block w-full">{!mostView && <ListSkeleton />}</div>
            {mostView &&
              mostView.map((product) => (
                <div
                  key={product._id}
                  className="mb-4 flex items-center gap-4 rounded-md bg-white p-4 shadow-md dark:bg-slate-700"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={`${import.meta.env.VITE_MEDIA}/${product.images[0]}`}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start justify-between">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                      {product.name} {`(Views: ${product.viewCount})`}
                    </h2>
                    <span className="text-sm font-semibold text-black dark:text-white">
                      {product.discountPrice} BDT
                    </span>
                    <del className="text-xs font-semibold text-red-500">
                      {product.sellingPrice} BDT
                    </del>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* <h2 className="mb-5 text-2xl font-bold text-black dark:text-white">
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
        )} */}
      </div>
    </div>
  );
};

export default MostViewSellProduct;
