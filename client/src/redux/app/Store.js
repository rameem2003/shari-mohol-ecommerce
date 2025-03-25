import { configureStore } from "@reduxjs/toolkit";
import BannerSlice from "./../slices/BannerSlice";
import CategorySlice from "../slices/CategorySlice";
import ProductsSlice from "../slices/ProductSlice";
import AccountSlice from "./../slices/AccountSlice";

export default configureStore({
  reducer: {
    banners: BannerSlice,
    category: CategorySlice,
    allproducts: ProductsSlice,
    account: AccountSlice,
  },
});
