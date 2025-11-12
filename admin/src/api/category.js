import axiosInstance from "../../config/axois.config";

export const fetchAllCategoriesRequest = async () => {
  try {
    let res = await axiosInstance.get(`/category/all`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

export const createNewCategoryRequest = async (categoryData) => {
  try {
    let res = await axiosInstance.post(`/category/create`, categoryData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to create category: " + error.message);
  }
};

export const updateCategoryRequest = async (id, categoryData) => {
  try {
    let res = await axiosInstance.patch(
      `/category/update/${id}`,
      categoryData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update category: " + error.message);
  }
};

export const deleteCategoryRequest = async (id) => {
  try {
    let res = await axiosInstance.delete(`/category/delete/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to delete category: " + error.message);
  }
};
