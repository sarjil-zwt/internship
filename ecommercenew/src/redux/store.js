import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";
import productSlice from "./features/productSlice";
import singleProductSlice from "./features/singleProductSlice";
import addressSlice from "./features/addressSlice";
import groupSlice from "./features/groupSlice";
import orderSlice from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    userState: userSlice,
    cartState: cartSlice,
    productState: productSlice,
    singleProduct: singleProductSlice,
    addressState: addressSlice,
    groupsState: groupSlice,
    ordersState: orderSlice,
  },
});
