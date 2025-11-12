import axiosInstance from "../../config/axois.config";

export const fetchAllBannersRequest = async () => {
  try {
    let res = await axiosInstance.get(`/banner/all`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch banners: " + error.message);
  }
};

export const createBannerRequest = async (formData) => {
  try {
    let res = await axiosInstance.post(`/banner/create`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to create banner: " + error.message);
  }
};

export const deleteBannerRequest = async (id) => {
  try {
    let res = await axiosInstance.delete(`/banner/delete/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to delete banner: " + error.message);
  }
};
