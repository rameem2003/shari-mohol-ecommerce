import axiosInstance from "../../config/axois.config";

export const fetchAllUsersRequest = async () => {
  try {
    let res = await axiosInstance.get(`/auth/users`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch users: " + error.message);
  }
};

export const fetchCustomerInfoRequest = async (id) => {
  try {
    let res = await axiosInstance.get(`/auth/user/${id}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to fetch user: " + error.message);
  }
};

export const loginRequest = async (email, password) => {
  try {
    let res = await axiosInstance.post(
      `/auth/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);

    return error;
    throw new Error("Failed to login: " + error.message);
  }
};

export const registerRequest = async (data) => {
  try {
    let res = await axiosInstance.post(`/auth/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to register: " + error.message);
  }
};

export const logoutRequest = async () => {
  try {
    let res = await axiosInstance.post(
      `/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to logout: " + error.message);
  }
};

export const resendVerificationEmailRequest = async (email) => {
  try {
    let res = await axiosInstance.post(
      `/auth/send-email-verification`,
      {
        email,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to verify email: " + error.message);
  }
};

export const userUpdateRequest = async (data) => {
  try {
    let res = await axiosInstance.patch(`/auth/update`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update user: " + error.message);
  }
};

export const userPasswordUpdateRequest = async (
  oldPassword,
  newPassword,
  confirmPassword,
) => {
  try {
    let res = await axiosInstance.patch(`/auth/changepassword`, {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update password: " + error.message);
  }
};

export const changeAdminRoleRequest = async (data) => {
  try {
    let res = await axiosInstance.patch(`/auth/admin-role-update`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to change admin role: " + error.message);
  }
};

export const forgotPasswordRequest = async (email) => {
  try {
    let res = await axiosInstance.post(
      `/auth/reset-password`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to forgot password: " + error.message);
  }
};

export const verifyResetPasswordTokenRequest = async (token) => {
  try {
    let res = await axiosInstance.get(`/auth/reset-password-verify/${token}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to verify token: " + error.message);
  }
};

export const passwordResetRequest = async (
  token,
  newPassword,
  confirmPassword,
) => {
  try {
    let res = await axiosInstance.post(
      `/auth/reset-password/${token}`,
      { newPassword, confirmPassword },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to reset password: " + error.message);
  }
};

export const userRequest = async () => {
  try {
    let res = await axiosInstance.get(`/auth/user`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to get user: " + error.message);
  }
};

export const updateUserRoleRequest = async (id, role) => {
  try {
    let res = await axiosInstance.patch(
      `/auth/update-user-role/${id}`,
      { role },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
    throw new Error("Failed to update user role: " + error.message);
  }
};
