import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Flex from "../components/common/Flex";
import Swal from "sweetalert2";

const ViewOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [deliveryLoading, setDeliveryLoading] = useState(false);

  // fetch order data from the backend
  const fetchOrderInfo = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/order/singlebyid/${id}`,
      );

      console.log(res);
      setOrderData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle delivery status
  const handleDelivery = async (text) => {
    setDeliveryLoading(true);
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API}/order/response/${id}?statusText=${text}`,
      );

      setDeliveryLoading(false);
      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      })
        .then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
        });
    } catch (error) {
      setDeliveryLoading(false);
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
    }
  };

  useEffect(() => {
    fetchOrderInfo();
  }, []);
  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-black dark:text-white">
        View Order
      </h2>

      <section className="mt-10 p-3">
        <Flex className="items-center justify-between">
          <span className="text-base font-medium text-gray-600 dark:text-white">
            Order id : {orderData?._id}
          </span>

          <span className="text-base font-medium text-gray-600 dark:text-white">
            TxID : {orderData?.transactionID}
          </span>
          <span className="text-base font-medium text-gray-600 dark:text-white">
            Order Date : {new Date(orderData?.createdAt).toLocaleString()}
          </span>
          <span className="text-base font-medium text-gray-600 dark:text-white">
            Update at : {new Date(orderData?.updatedAt).toLocaleString()}
          </span>
        </Flex>

        <Flex className="mt-2 items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold text-black dark:text-white">
              {orderData?.name}
            </h2>
            <p className="text-lg font-medium text-black dark:text-white">
              Phone: {orderData?.phone}
            </p>
            <p className="text-lg font-medium text-black dark:text-white">
              Address: {orderData?.address}
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold capitalize text-red-600">
              Delivery: {orderData?.deliveryStatus}
            </p>
            <p className="text-lg font-semibold capitalize text-red-600">
              Payment Method: {orderData?.paymentMethod}
            </p>
            <p className="text-lg font-semibold capitalize text-red-600">
              Payment Status: {orderData?.paymentStatus}
            </p>
          </div>
        </Flex>

        <table className="mt-10 w-full text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            {orderData?.cartItems.map((data, i) => (
              <tr className="border-b bg-white" key={i}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {data?.product?.name.slice(0, 50) || ""}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {data.quantity}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ৳ {data.product.discountPrice} BDT
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  ৳ {data.quantity * data.product.discountPrice} BDT
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Flex className="mt-5 w-full items-center justify-between">
          <button
            onClick={() => handleDelivery("delivered")}
            disabled={deliveryLoading}
            className={`bg-red-500 px-4 py-2 text-lg font-semibold text-white disabled:bg-gray-400`}
          >
            {deliveryLoading ? "Pls Wait..." : "Go Delivery"}
          </button>
          <h3 className="mt-5 text-right text-3xl font-bold text-black dark:text-white">
            Grand Total: ৳ {orderData?.grandTotal} BDT
          </h3>
        </Flex>
      </section>
    </main>
  );
};

export default ViewOrder;
