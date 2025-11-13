import axiosInstance from "../../config/axois.config";

export const fetchAllProductsRequest = async () => {
  try {
    let res = await axiosInstance.get(`/products`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch products: " + error.message);
  }
};

export const updateProductRequest = async (id, productData) => {
  try {
    let res = await axiosInstance.patch(`/product/update/${id}`, productData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update product: " + error.message);
  }
};

export const deleteProductRequest = async (id) => {
  try {
    let res = await axiosInstance.delete(`/product/delete/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to delete product: " + error.message);
  }
};
