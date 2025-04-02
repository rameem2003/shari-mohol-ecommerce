import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Flex from "../../common/Flex";

const AllOrders = () => {
  const user = useSelector((state) => state.account.account); // user
  const [orders, setOrders] = useState([]);

  // fetch orders
  const fetchOrders = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/order/single/${user.email}`
      );
      console.log(res.data.data);
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <section>
      {orders.length === 0 && (
        <h1 className=" text-center text-2xl font-bold">No orders found</h1>
      )}
      {orders.map((order, i) => (
        <div className="mb-5 rounded-md bg-gray-100 p-3 " key={i}>
          <Flex className="items-start justify-between flex-col  md:flex-row md:items-center">
            <span className="text-base font-medium text-black">
              Order Id: {order._id}
            </span>
            <span className="text-base font-medium text-black">
              Transaction ID: {order.transactionID}
            </span>
            <span className="text-base font-medium text-black">
              Grand Total: {order.grandTotal}
            </span>
          </Flex>

          <Flex className="mt-4 items-start justify-between flex-col  md:flex-row md:items-center ">
            <span className="text-base font-medium text-black">
              Payment Method: {order.paymentMethod}
            </span>
            <span className="text-base font-medium text-black">
              Payment Status: {order.paymentStatus}
            </span>
          </Flex>

          {order.cartItems.map((item, i) => (
            <div className="mt-4" key={i}>
              <Flex className="items-center gap-5">
                <img
                  className="h-20 w-20"
                  src={item?.product?.images[0]}
                  alt={item?.product?.name}
                />

                <div>
                  <p className="text-base font-medium text-black ">
                    {item?.product?.name}
                  </p>
                  <p className="text-base font-medium text-black ">
                    Quantity: {item?.quantity}
                  </p>
                  <p className="text-base font-medium text-black ">
                    Price: {item?.product?.discountPrice * item?.quantity} BDT
                  </p>
                </div>
              </Flex>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default AllOrders;
