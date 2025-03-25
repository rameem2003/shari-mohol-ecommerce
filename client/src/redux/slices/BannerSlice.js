import { createSlice } from "@reduxjs/toolkit";

export const BannerSlice = createSlice({
  name: "Banner",
  initialState: {
    banners: [],
  },
  reducers: {
    BannerReducer: (state, action) => {
      state.banners = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { BannerReducer } = BannerSlice.actions;

export default BannerSlice.reducer;
