"use client";
import { useCart } from "@/hooks/useCart";
import { OrderItemType, OrderType } from "@/types/Cart";
import OrderCard from "./OrderCard";

const page = () => {
  const { orders, loading } = useCart();
  console.log(orders);

  return (
    <div className=" w-full">
      <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
        Your Order's
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && orders?.data?.length > 0 && (
        <div className=" flex flex-col gap-4">
          {orders.data.map((order: OrderItemType) => (
            <OrderCard key={order._id} data={order} />
          ))}
        </div>
      )}

      {orders?.data?.length === 0 && (
        <p className=" text-red-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default page;
