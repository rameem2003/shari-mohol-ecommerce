import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "../features/AdminSlice";

export default configureStore({
  reducer: {
    admin: AdminSlice,
  },
});
