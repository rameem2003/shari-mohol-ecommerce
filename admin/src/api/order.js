import axiosInstance from "../../config/axois.config";

// fetch all orders
export const fetchAllOrdersRequest = async () => {
  try {
    let res = await axiosInstance.get(`/order/all`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

// fetch order by id
export const fetchOrderByIdRequest = async (id) => {
  try {
    let res = await axiosInstance.get(`/order/single/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch order: " + error.message);
  }
};

// order response update
export const updateOrderStatusRequest = async (id, status) => {
  try {
    let res = await axiosInstance.patch(
      `/order/response/${id}?statusText=${status}`,
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update order status: " + error.message);
  }
};

// fetch orders by single user
export const fetchSingleUserOrdersRequest = async (userId) => {
  try {
    let res = await axiosInstance.get(`/order/user/${userId}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch orders: " + error.message);
  }
};
