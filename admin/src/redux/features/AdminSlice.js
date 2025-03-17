import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    admin: localStorage.getItem("shari_mohol_admin")
      ? JSON.parse(localStorage.getItem("shari_mohol_admin"))
      : null,
  },
  reducers: {
    adminLoginReducer: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("shari_mohol_admin", JSON.stringify(action.payload));
    },

    adminLogoutReducer: (state, action) => {
      localStorage.removeItem("shari_mohol_admin");
    },
  },
});

// Action creators are generated for each case reducer function
export const { adminLoginReducer, adminLogoutReducer } = AdminSlice.actions;

export default AdminSlice.reducer;
