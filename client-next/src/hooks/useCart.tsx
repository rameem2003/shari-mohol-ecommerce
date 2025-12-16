"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import {
  addToCart,
  decrementToCart,
  getCart,
  placeOrderRequest,
  removeFromCart,
  userOrderRequest,
} from "@/api/cart-api";
import { toast } from "sonner";
import { CartType, OrderType } from "@/types/Cart";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<CartType>({} as CartType);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = async () => {
    try {
      let res = await getCart();
      // console.log(res);

      setCart(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      let res = await userOrderRequest();
      // console.log(res);

      // setCart(res);
      setOrders(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const addCart = async (id: string) => {
    setLoading(true);
    try {
      if (!user?.data?.id) {
        setLoading(false);
        router.push("/login");
        return;
      }
      let res = await addToCart(id);
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      await fetchCart();
      setLoading(false);
      toast.success(res.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  const decrementCart = async (id: string) => {
    setLoading(true);
    try {
      if (!user.data.id) {
        setLoading(false);
        router.push("/login");
        return;
      }
      let res = await decrementToCart(id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      await fetchCart();
      setLoading(false);
      toast.success(res.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  const deleteCart = async (id: string) => {
    try {
      if (!user.data.id) {
        setLoading(false);
        router.push("/login");
        return;
      }
      let res = await removeFromCart(id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      //   router.push("/");
      await fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove cart");
    }
  };

  const confirmOrder = async (data: any) => {
    try {
      if (!user.data.id) {
        setLoading(false);
        router.push("/login");
        return;
      }
      let res = await placeOrderRequest(data);
      console.log(res);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      await fetchCart();
      toast.success(res.message);

      if (res.url) {
        window.location.href = res.url;
      }
      //   router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove cart");
    }
  };

  //   const applyCoupon = async (code: string) => {
  //     try {
  //       if (!user?.id) {
  //         router.push("/login");
  //         return;
  //       }
  //       let res = await requestCoupon(code);
  //       if (res.success) {
  //         toast.success(res.msg);
  //         await fetchCart();
  //       } else {
  //         toast.error(res.msg);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Failed to add to cart");
  //     }
  //   };

  //   const goToPurchase = async () => {
  //     try {
  //       setLoading(true);
  //       let res = await purchaseCourse();
  //       if (!res.success) {
  //         toast.error(res.msg);
  //         return;
  //       }
  //       toast.success(res.msg);
  //       // router.push("/");

  //       console.log(res);
  //       setLoading(false);

  //       window.location.href = res.url;
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //       toast.error("Failed to add to cart");
  //     }
  //   };

  useEffect(() => {
    fetchCart();
    fetchUserOrders();
  }, [user]);

  // return { fetchCart, addCart, applyCoupon, cart, msg, loading };

  return (
    <CartContext.Provider
      value={{
        fetchCart,
        fetchUserOrders,
        addCart,
        decrementCart,
        deleteCart,
        confirmOrder,
        cart,
        orders,
        msg,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
