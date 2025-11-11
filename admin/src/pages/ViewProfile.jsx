import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import Loader from "../components/common/Loader";
import { Link, useParams } from "react-router";
import { fetchCustomerInfoRequest } from "../api/auth";
import { fetchSingleUserOrdersRequest } from "../api/order";

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch user data from the backend
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const userData = await fetchCustomerInfoRequest(id);
      setIsLoading(false);
      setUser(userData.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // fetch orders from the backend
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      let res = await fetchSingleUserOrdersRequest(id);
      setIsLoading(false);
      setOrders(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, [id]);

  if (isLoading) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-white/70 dark:bg-slate-900/70">
        <Loader />
      </div>
    );
  }

  return (
    <main className="w-full overflow-y-scroll border-l-[1px] border-black bg-white p-2 dark:border-white dark:bg-slate-900">
      {isLoading && (
        <Flex className="fixed left-0 top-0 z-[99999999] h-screen w-full items-center justify-center bg-white dark:bg-slate-900">
          <Loader />
        </Flex>
      )}
      <Flex className="items-start gap-4">
        <div className="w-full lg:w-4/12">
          <div className="w-full rounded bg-white shadow-lg dark:bg-slate-800">
            <div
              style={{
                backgroundImage: `url(${import.meta.env.VITE_MEDIA}/${user.photo})`,
              }}
              className={`relative h-[150px] w-full rounded-t-md bg-[url('${"https://img.freepik.com/premium-vector/content-writer-vector-colored-round-line-illustration_104589-2571.jpg"}')] bg-center`}
            >
              <img
                src={
                  `${import.meta.env.VITE_MEDIA}/${user.photo}` ||
                  "https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg"
                }
                alt=""
                className="border-secondary absolute -bottom-12 left-1/2 h-[80px] w-[80px] -translate-x-1/2 transform rounded-full border-4 object-cover"
              />
            </div>

            <div className="mt-16 w-full text-center">
              <h2 className="text-[1.4rem] font-[600] text-black dark:text-white">
                {user.name}
              </h2>
              <p className="text-[0.9rem] text-[#424242] dark:text-white/80">
                {user.phone}
              </p>
              <p className="text-[0.9rem] text-[#424242] dark:text-white/80">
                {user.email}
              </p>
            </div>

            <div className="border-border mt-8 flex w-full items-center justify-between border-t p-4">
              <div className="flex flex-col items-center justify-center">
                <p className="text-[0.9rem] font-bold uppercase text-[#424242] dark:text-white">
                  {user.role}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-[0.9rem] font-bold text-[#424242] dark:text-white">
                  {user.isVerified
                    ? "Verified Account"
                    : "Not Verified Account"}
                </p>
              </div>

              <div className="hidden flex-col items-center justify-center">
                <h2 className="text-[1.2rem] font-[600]">200k</h2>
                <p className="text-[0.9rem] text-[#424242]">Followers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12">
          <h2 className="mb-10 text-2xl font-semibold text-black dark:text-white">
            Orders
          </h2>

          {orders.map((order, i) => (
            <div
              className="mb-5 rounded-md bg-gray-100 p-3 dark:bg-slate-800"
              key={i}
            >
              <Flex className="items-center justify-between">
                <span className="text-base font-medium text-black dark:text-white">
                  Order Id: {order._id}
                </span>
                <span className="text-base font-medium text-black dark:text-white">
                  Transaction ID: {order.transactionID}
                </span>
                <span className="text-base font-medium text-black dark:text-white">
                  Grand Total: {order.grandTotal}
                </span>
              </Flex>

              <Flex className="mt-4 items-center justify-between">
                <span className="text-base font-medium capitalize text-black dark:text-white">
                  Payment Method: {order.paymentMethod}
                </span>
                <span className="text-base font-medium capitalize text-black dark:text-white">
                  Delivery Status: {order.deliveryStatus}
                </span>
              </Flex>

              {order.cartItems.map((item, i) => (
                <div className="mt-4" key={i}>
                  <Flex className="items-center gap-5">
                    <Image
                      className="h-20 w-20"
                      src={`${import.meta.env.VITE_MEDIA}/${item?.product?.images[0]}`}
                      alt={item?.product?.name}
                    />

                    <div>
                      <p className="text-base font-medium text-black dark:text-white">
                        {item?.product?.name}
                      </p>
                      <p className="text-base font-medium text-black dark:text-white">
                        Quantity: {item?.quantity}
                      </p>
                      <p className="text-base font-medium text-black dark:text-white">
                        Price: {item?.product?.discountPrice * item?.quantity}{" "}
                        BDT
                      </p>
                    </div>
                  </Flex>
                </div>
              ))}

              <Link
                className="mt-4 inline-block rounded-md bg-blue-500 p-2 px-3 text-white"
                to={`/order/${order._id}`}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </Flex>
    </main>
  );
};

export default ViewProfile;
