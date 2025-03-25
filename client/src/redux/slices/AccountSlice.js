import { createSlice } from "@reduxjs/toolkit";

export const AccountSlice = createSlice({
  name: "Account",
  initialState: {
    account: localStorage.getItem("shari-mohol-client")
      ? JSON.parse(localStorage.getItem("shari-mohol-client"))
      : "",
  },
  reducers: {
    AccountReducer: (state, action) => {
      state.account = action.payload;
      localStorage.setItem(
        "shari-mohol-client",
        JSON.stringify(action.payload)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { AccountReducer } = AccountSlice.actions;

export default AccountSlice.reducer;
