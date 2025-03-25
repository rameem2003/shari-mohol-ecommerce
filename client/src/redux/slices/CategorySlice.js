import { createSlice } from "@reduxjs/toolkit";

export const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    category: [],
  },
  reducers: {
    CategoryReducer: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { CategoryReducer } = CategorySlice.actions;

export default CategorySlice.reducer;
