import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  cart: {},
};

const getTotal = (products, discount, shipping) => {
  let total = 0;
  products.forEach((p) => {
    total += p.product.price * p.quantity;
  });
  console.log(total);

  let discounted = (total / 100) * (100 - discount);
  console.log(discounted);
  discounted += shipping;

  return discounted;
};

export const cartStateSlice = createSlice({
  name: "cartState",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
    removeFromCart: (state, action) => {
      state.cart = action.payload;
    },
    setQuantityOfCartProduct: (state, action) => {
      state.cart = action.payload;
    },
    setCartDiscount: (state, action) => {
      state.cart = action.payload;
    },
    setShipping: (state, action) => {
      state.cart = action.payload;
    },
    setCartState: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantityOfCartProduct,
  setCartDiscount,
  setShipping,
  setCartState,
} = cartStateSlice.actions;

export default cartStateSlice.reducer;
